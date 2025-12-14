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

  /* =======================
     LOAD QUESTIONS
  ======================= */
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

  /* =======================
     ANSWERS HANDLING
  ======================= */
  const handleSingleAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleMultiAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      if (!Array.isArray(current)) return prev;

      return current.includes(option)
        ? { ...prev, [questionId]: current.filter((o) => o !== option) }
        : { ...prev, [questionId]: [...current, option] };
    });
  };

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Veuillez entrer votre email");
      return;
    }

    for (let q of questions) {
      const ans = answers[q.id];
      if (
        ans === undefined ||
        ans === "" ||
        (Array.isArray(ans) && ans.length === 0)
      ) {
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

  /* =======================
     PROGRESS
  ======================= */
  const total = questions.length;
  const answered = Object.values(answers).filter((a) =>
    Array.isArray(a) ? a.length > 0 : a
  ).length;

  const progressPercent = total ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===== FIXED PROGRESS BAR ===== */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-2">

          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold text-purple-700">
              Questionnaire
            </h2>

            <button
              onClick={() => navigate("/")}
              className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Retour
            </button>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-right text-xs text-gray-600">
            {progressPercent}% complété
          </p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="flex justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 md:p-10 space-y-8">

          {/* INTRO */}
          <div className="text-gray-700 text-sm md:text-base leading-relaxed">
            Ce questionnaire s’inscrit dans une étude visant à évaluer la faisabilité de l’application OSEL.
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Un scan corporel</li>
              <li>Un essayage virtuel</li>
              <li>Un choix de couturiers</li>
              <li>Un paiement sécurisé</li>
            </ul>
            <p className="mt-2 font-medium">Vos réponses resteront anonymes.</p>
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
              <label className="block mb-1 font-medium">
                Email de préscription :
              </label>
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
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">

                      {!q.multi ? (
                        <input
                          type="radio"
                          name={q.id}
                          checked={answers[q.id] === opt}
                          onChange={() => handleSingleAnswer(q.id, opt)}
                          className="h-4 w-4 text-purple-700"
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={Array.isArray(answers[q.id]) && answers[q.id].includes(opt)}
                          onChange={() => handleMultiAnswer(q.id, opt)}
                          className="h-5 w-5 text-purple-700"
                        />
                      )}

                      <span>{opt}</span>
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
    </div>
  );
};

export default VisitorQuestionnaire;
