import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

interface QuestionStats {
  text: string;
  options: string[];
  counts: number[];
}

const AdminDashboard: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionStats[]>([]);
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    // Récupérer toutes les réponses
    const responsesRef = ref(db, "responses");
    onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setQuestions([]);
        setTotalParticipants(0);
        return;
      }

      const emails = Object.keys(data);
      setTotalParticipants(emails.length);

      // Calculer les stats par question
      const questionsRef = ref(db, "questions");
      onValue(questionsRef, (qsnap) => {
        const qdata = qsnap.val();
        if (!qdata) return;

        const stats: QuestionStats[] = Object.keys(qdata).map((qid) => {
          const q = qdata[qid];
          const counts = q.options.map(() => 0);

          // Compter les réponses
          emails.forEach((email) => {
            const answer = data[email]?.[qid];
            const index = q.options.indexOf(answer);
            if (index !== -1) counts[index]++;
          });

          return { text: q.text, options: q.options, counts };
        });

        setQuestions(stats);
      });
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard des réponses</h2>
      <p className="mb-6 text-gray-700">Nombre total de participants : <strong>{totalParticipants}</strong></p>

      <div className="grid md:grid-cols-2 gap-6">
        {questions.map((q, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 text-lg">{q.text}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={q.options.map((opt, i) => ({ name: opt, count: q.counts[i] }))}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
            <ul className="mt-2 text-sm text-gray-600">
              {q.options.map((opt, i) => (
                <li key={i}>
                  {opt} : {q.counts[i]} réponse{q.counts[i] > 1 ? "s" : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
