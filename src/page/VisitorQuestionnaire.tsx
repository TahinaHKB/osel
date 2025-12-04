import { useState, useEffect } from "react";
import { db } from "../firebase"; // ton fichier firebase.ts
import { ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  options: string[];
}

const VisitorQuestionnaire = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // === Récupération des questions ===
  useEffect(() => {
    const questionsRef = ref(db, "questions");
    onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setQuestions([]);
        return;
      }
      const list: Question[] = Object.keys(data).map((key) => ({
        id: key,
        text: data[key].text,
        options: data[key].options,
      }));
      setQuestions(list);
    });
  }, []);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Veuillez entrer votre email");
      return;
    }

    for (let q of questions) {
      if (!answers[q.id]) {
        alert(`Veuillez répondre à la question : "${q.text}"`);
        return;
      }
    }

    try {
      const emailKey = email.replace(/\./g, ","); 
      const responsesRef = ref(db, `responses/${emailKey}`);
      await set(responsesRef, answers);
      setSuccess(true);
      setEmail("");
      setAnswers({});
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 md:p-12 flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-purple-700">Questionnaire</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Retour
          </button>
        </div>

        <div className="text-gray-700 text-sm md:text-base leading-relaxed">
          Ce questionnaire s’inscrit dans une étude visant à évaluer la faisabilité de l’application OSEL, une future plateforme permettant aux Malgaches de la diaspora de commander des vêtements sur mesure à Madagascar, à distance, de manière simple et fiable.
          <br /><br />
          OSEL proposera notamment :
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Un scan corporel pour obtenir vos mensurations avec le téléphone</li>
            <li>Un essayage virtuel sur un avatar personnalisé</li>
            <li>Une sélection de couturiers selon leur style et leurs avis</li>
            <li>Un paiement sécurisé et un suivi jusqu’à la livraison internationale</li>
          </ul>
          <br />
          Vos réponses resteront anonymes et serviront exclusivement à adapter OSEL aux besoins réels de la diaspora malgache.
        </div>

        {success && (
          <div className="p-3 bg-green-100 text-green-800 rounded">
            Merci pour vos réponses !
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Email :</label>
            <input
              type="email"
              className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {questions.map((q) => (
            <div key={q.id}>
              <label className="block mb-1 font-medium">{q.text}</label>
              <select
                className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                required
              >
                <option value="">-- Sélectionnez --</option>
                {q.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-800 transition w-full md:w-auto"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitorQuestionnaire;
