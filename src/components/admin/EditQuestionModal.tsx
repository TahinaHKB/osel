import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, update } from "firebase/database";

interface Question {
  id: string;
  text: string;
  options: string[];
  multi: boolean;
}

interface Props {
  question: Question;
  onClose: () => void;
}

const EditQuestionModal: React.FC<Props> = ({ question, onClose }) => {
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState<string[]>([...question.options]);
  const [multi, setMulti] = useState(question.multi);
  const [saving, setSaving] = useState(false);

  /* ===============================
     BLOQUER SCROLL DU SITE
  =============================== */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /* ===============================
     OPTIONS
  =============================== */
  const handleOptionChange = (i: number, value: string) => {
    const copy = [...options];
    copy[i] = value;
    setOptions(copy);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (i: number) =>
    setOptions(options.filter((_, idx) => idx !== i));

  /* ===============================
     SAVE
  =============================== */
  const saveChanges = async () => {
    if (!text.trim() || options.some((o) => !o.trim())) {
      alert("Question et options obligatoires");
      return;
    }

    setSaving(true);
    await update(ref(db, `questions/${question.id}`), {
      text,
      options,
      multi,
    });
    setSaving(false);
    onClose();
  };

  return (
    <>
      {/* BACKDROP FLOU */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="
            bg-white rounded-xl shadow-2xl
            w-full max-w-xl
            max-h-[90vh]
            flex flex-col
            animate-fadeIn
          "
        >
          {/* CONTENU SCROLLABLE */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <h2 className="text-2xl font-bold text-purple-700">
              Modifier la question
            </h2>

            {/* QUESTION */}
            <input
              className="w-full border p-3 rounded focus:ring-2 focus:ring-purple-600"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* OPTIONS */}
            <div className="space-y-2">
              {options.map((opt, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className="flex-1 border p-2 rounded"
                    value={opt}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                  />
                  {options.length > 1 && (
                    <button
                      onClick={() => removeOption(i)}
                      className="bg-red-500 text-white px-3 rounded"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addOption}
              className="text-sm text-purple-700 font-semibold"
            >
              + Ajouter une option
            </button>

            {/* MULTI */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                checked={multi}
                onChange={(e) => setMulti(e.target.checked)}
                className="h-5 w-5"
              />
              <span className="font-medium">Réponses multiples</span>
            </div>
          </div>

          {/* ACTIONS FIXES */}
          <div className="flex justify-end gap-3 p-4 border-t bg-white rounded-b-xl">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Annuler
            </button>

            <button
              onClick={saveChanges}
              disabled={saving}
              className="px-6 py-2 rounded bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50"
            >
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuestionModal;
