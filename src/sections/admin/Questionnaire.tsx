import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, set, push, onValue, remove } from "firebase/database";
import { Trash2 } from "lucide-react"; // pour l'icône de suppression

interface Question {
  id: string;
  text: string;
  options: string[];
}

const Questionnaire = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newText, setNewText] = useState("");
  const [newOptions, setNewOptions] = useState([""]);

  // === Récupérer les questions depuis Firebase ===
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

  // === Gestion ajout/suppression d'options dynamiques ===
  const addOptionField = () => setNewOptions([...newOptions, ""]);
  const handleOptionChange = (index: number, value: string) => {
    const copy = [...newOptions];
    copy[index] = value;
    setNewOptions(copy);
  };
  const removeOptionField = (index: number) => {
    const copy = [...newOptions];
    copy.splice(index, 1);
    setNewOptions(copy);
  };

  // === Sauvegarder nouvelle question ===
  const saveQuestion = async () => {
    if (
      !newText.trim() ||
      newOptions.length === 0 ||
      newOptions.some((o) => !o.trim())
    ) {
      alert("Veuillez remplir la question et toutes les options.");
      return;
    }
    const questionsRef = ref(db, "questions");
    const newQRef = push(questionsRef);
    await set(newQRef, { text: newText, options: newOptions });
    setNewText("");
    setNewOptions([""]);
  };

  // === Supprimer une question ===
  const deleteQuestion = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette question ?"))
      return;
    const questionRef = ref(db, `questions/${id}`);
    await remove(questionRef);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Ajouter une nouvelle question
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input
          type="text"
          placeholder="Texte de la question"
          className="border p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        {newOptions.map((opt, i) => (
          <div key={i} className="flex gap-2 mb-3 items-center">
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
            {newOptions.length > 1 && (
              <button
                onClick={() => removeOptionField(i)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addOptionField}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded mb-4 transition"
        >
          Ajouter une option
        </button>
        <button
          onClick={saveQuestion}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded w-full md:w-auto transition"
        >
          Sauvegarder la question
        </button>
      </div>
      { questions.length > 0 && <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Questions existantes
      </h2> }

      <div className="grid gap-4 mb-10">
        { questions.map((q) => (
          <div
            key={q.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row md:justify-between items-start md:items-center"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{q.text}</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                {q.options.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => deleteQuestion(q.id)}
              className="mt-3 md:mt-0 flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold"
            >
              <Trash2 size={18} />
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questionnaire;
