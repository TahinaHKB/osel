import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  options: string[];
  multi: boolean;
}

const VisitorQuestionnaire = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
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
        multi: data[key].multi ?? false,
      }));

      setQuestions(list);
    });
  }, []);

  // === Gestion réponses ===
  const handleSingleAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleMultiAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];

      if (!Array.isArray(current)) return prev;

      if (current.includes(option)) {
        return {
          ...prev,
          [questionId]: current.filter((o) => o !== option),
        };
      } else {
        return {
          ...prev,
          [questionId]: [...current, option],
        };
      }
    });
  };

  // === Envoi du questionnaire ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Veuillez entrer votre email");
      return;
    }

    for (let q of questions) {
      const ans = answers[q.id];
      const empty =
        ans === undefined ||
        ans === "" ||
        (Array.isArray(ans) && ans.length === 0);

      if (empty) {
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

  // === Progression ===
  const total = questions.length;
  const answered = Object.values(answers).filter((a) => {
    if (Array.isArray(a)) return a.length > 0;
    return a !== "" && a !== undefined;
  }).length;

  const progressPercent = total > 0 ? Math.round((answered / total) * 100) : 0;

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

        {/* ProgressBar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-purple-600 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <p className="text-right text-sm text-gray-600">
          {progressPercent}% complété
        </p>

        {/* Intro */}
        <div className="text-gray-700 text-sm md:text-base leading-relaxed">
          Ce questionnaire s’inscrit dans une étude visant à évaluer la faisabilité de l’application OSEL...
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Un scan corporel</li>
            <li>Un essayage virtuel</li>
            <li>Un choix de couturiers</li>
            <li>Un paiement sécurisé</li>
          </ul>
          <br />
          Vos réponses resteront anonymes.
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
              className="border p-3 w-full rounded focus:ring-2 focus:ring-purple-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* QUESTIONS */}
          {questions.map((q) => (
            <div key={q.id} className="p-4 border rounded-lg bg-gray-50">
              <p className="font-semibold mb-3">{q.text}</p>

              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-3 cursor-pointer">

                    {/* SINGLE */}
                    {!q.multi && (
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => handleSingleAnswer(q.id, opt)}
                        className="h-4 w-4 text-purple-700"
                        required
                      />
                    )}

                    {/* MULTI */}
                    {q.multi && (
                      <input
                        type="checkbox"
                        value={opt}
                        checked={Array.isArray(answers[q.id]) && answers[q.id].includes(opt)}
                        onChange={() => handleMultiAnswer(q.id, opt)}
                        className="h-5 w-5 text-purple-700"
                      />
                    )}

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
