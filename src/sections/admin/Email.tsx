import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue, push } from "firebase/database";
import emailjs from "@emailjs/browser";

interface AdminMessage {
  id: string;
  message: string;
  emails: string[];
  date: string;
}

const AdminEmails: React.FC = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sentMessages, setSentMessages] = useState<AdminMessage[]>([]);

  // === Récupérer tous les emails depuis Firebase ===
  useEffect(() => {
    const emailsRef = ref(db, "responses");
    onValue(emailsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setEmails([]);
        return;
      }
      const emailList = Object.keys(data).map((email) =>
        email.replace(/,/g, ".")
      );
      setEmails(emailList);
    });
  }, []);

  // === Récupérer tous les messages envoyés ===
  useEffect(() => {
    const messagesRef = ref(db, "adminMessages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setSentMessages([]);
        return;
      }
      const list: AdminMessage[] = Object.keys(data).map((key) => ({
        id: key,
        message: data[key].message,
        emails: data[key].emails || [],
        date: data[key].date,
      }));
      setSentMessages(list.reverse()); // afficher du plus récent au plus ancien
    });
  }, []);

  // === Envoi du message ===
  const handleSend = async () => {
    if (!message.trim()) {
      alert("Veuillez écrire un message avant d'envoyer.");
      return;
    }

    setSending(true);

    try {
      const messagesRef = ref(db, "adminMessages");

      await push(messagesRef, {
        emails,
        message,
        date: new Date().toISOString(),
      });

      for (const email of emails) {
        const emailKey = email.replace(",", ".");
        await emailjs.send(
          "service_za7lk38",
          "template_3p3c859",
          {
            email: emailKey,
            message: message,
            name: "OSEL",
          },
          "2S4EQi9Xv7eh7Qpur"
        );
      }

      alert(`Message enregistré pour ${emails.length} destinataires`);
      setMessage("");
    } catch (err: any) {
      console.error(err);
      alert("Erreur lors de l'envoi du message.");
    }

    setSending(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Section Emails */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Liste des emails des participants
        </h2>
        <div className="mb-6 max-h-64 overflow-y-auto border rounded-lg p-4 bg-white shadow-sm">
          {emails.length === 0 ? (
            <p className="text-gray-500">Aucun email trouvé.</p>
          ) : (
            <ul className="space-y-1">
              {emails.map((email) => (
                <li
                  key={email}
                  className="px-2 py-1 bg-purple-50 rounded text-purple-800"
                >
                  {email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Section Envoi Message */}
      <div>
        <h2 className="text-2xl font-bold mb-2">
          Envoyer un message à tous les participants
        </h2>
        <textarea
          className="w-full p-3 rounded border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={6}
          placeholder="Écrire votre message ici..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          disabled={sending || emails.length === 0}
          className={`bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow hover:bg-purple-800 transition ${
            sending || emails.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {sending ? "Envoi..." : `Envoyer à ${emails.length} emails`}
        </button>
      </div>

      {/* Section Messages envoyés */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Messages envoyés</h2>
        <div className="max-h-96 overflow-y-auto border rounded-lg p-4 bg-white shadow-sm space-y-3">
          {sentMessages.length === 0 ? (
            <p className="text-gray-500">
              Aucun message envoyé pour le moment.
            </p>
          ) : (
            sentMessages.map((msg) => (
              <div key={msg.id} className="p-3 border rounded bg-purple-50">
                <p className="text-gray-800 mb-1">{msg.message}</p>
                <p className="text-gray-500 text-sm">
                  Envoyé à {msg.emails.length} destinataires le{" "}
                  {new Date(msg.date).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEmails;
