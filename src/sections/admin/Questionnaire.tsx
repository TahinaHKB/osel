import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { Trash2 } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  multi: boolean;
}

const Questionnaire = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [newText, setNewText] = useState("");
  const [newOptions, setNewOptions] = useState([""]);
  const [newMulti, setNewMulti] = useState(false);

  // === Récupérer questions ===
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
        multi: data[key].multi ?? false, // fallback sécurité
      }));

      setQuestions(list);
    });
  }, []);

  // === Ajout / suppression d’options dynamiques ===
  const addOptionField = () => setNewOptions([...newOptions, ""]);
  const handleOptionChange = (i: number, value: string) => {
    const copy = [...newOptions];
    copy[i] = value;
    setNewOptions(copy);
  };
  const removeOptionField = (i: number) =>
    setNewOptions(newOptions.filter((_, idx) => idx !== i));

  // === Sauvegarder une nouvelle question ===
  const saveQuestion = async () => {
    if (!newText.trim() || newOptions.some((o) => !o.trim())) {
      alert("Veuillez remplir la question et toutes les options.");
      return;
    }

    const qRef = push(ref(db, "questions"));
    await set(qRef, {
      text: newText,
      options: newOptions,
      multi: newMulti,
    });

    setNewText("");
    setNewOptions([""]);
    setNewMulti(false);
  };

  // === Supprimer une question ===
  const deleteQuestion = async (id: string) => {
    if (!window.confirm("Supprimer cette question ?")) return;
    await remove(ref(db, `questions/${id}`));
  };

  // === Modifier multi pour une question existante ===
  const toggleMulti = async (q: Question) => {
    const qRef = ref(db, `questions/${q.id}`);
    await update(qRef, { multi: !q.multi });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Créer une question</h2>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <input
          type="text"
          placeholder="Texte de la question"
          className="border p-3 w-full mb-4 rounded focus:ring-2 focus:ring-purple-500"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />

        {newOptions.map((opt, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              className="border p-2 flex-1 rounded focus:ring-2 focus:ring-purple-500"
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
            {newOptions.length > 1 && (
              <button
                onClick={() => removeOptionField(i)}
                className="text-white bg-red-600 px-3 py-1 rounded"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addOptionField}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Ajouter une option
        </button>

        {/* Multi / Single selection */}
        <div className="mb-4">
          <label className="font-semibold mr-4">Réponses multiples ?</label>
          <input
            type="checkbox"
            checked={newMulti}
            onChange={(e) => setNewMulti(e.target.checked)}
            className="h-5 w-5"
          />
        </div>

        <button
          onClick={saveQuestion}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Sauvegarder
        </button>
      </div>

      {/* -------- Questions existantes -------- */}
      {questions.length > 0 && (
        <h2 className="text-3xl font-bold mb-4">Questions existantes</h2>
      )}

      <div className="grid gap-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{q.text}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Type :{" "}
                <span className="text-purple-700 font-bold">
                  {q.multi ? "🔘 MULTI" : "⚪ SIMPLE"}
                </span>
              </p>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                {q.options.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 mt-3 md:mt-0">

              {/* Toggle multi */}
              <button
                onClick={() => toggleMulti(q)}
                className="px-4 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Basculer multi
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteQuestion(q.id)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Trash2 size={18} /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questionnaire;
