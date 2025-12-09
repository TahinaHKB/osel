import { useState, useEffect } from "react";
import { db } from "../firebase";
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

  // === Récupérer les questions ===
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

  const handleAnswerChange = (questionId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Veuillez entrer votre email");
      return;
    }

    // Vérifier que toutes les questions sont répondues
    for (let q of questions) {
      if (!answers[q.id]) {
        alert(`Veuillez répondre à : "${q.text}"`);
        return;
      }
    }

    try {
      const emailKey = email.replace(/\./g, ",");
      await set(ref(db, `responses/${emailKey}`), answers);

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

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-purple-700">Questionnaire</h2>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Retour
          </button>
        </div>

        {/* TEXTE INTRO */}
        <div className="text-gray-700 text-sm md:text-base leading-relaxed">
          Ce questionnaire s’inscrit dans une étude visant à évaluer la faisabilité de l’application OSEL, une future plateforme permettant aux Malgaches de la diaspora de commander des vêtements sur mesure à Madagascar, à distance, de manière simple et fiable.
          <br /><br />
          OSEL proposera notamment :
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
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

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
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

          {/* QUESTIONS AVEC RADIO */}
          {questions.map((q) => (
            <div key={q.id} className="p-4 border rounded-lg bg-gray-50">
              <p className="font-semibold mb-3">{q.text}</p>

              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleAnswerChange(q.id, opt)}
                      className="h-4 w-4 text-purple-700"
                      required
                    />
                    <span className="text-gray-800">{opt}</span>
                  </label>
                ))}
              </div>
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
