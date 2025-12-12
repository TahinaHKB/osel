import { db } from "./firebase";
import { ref, get, update } from "firebase/database";

export async function migrateQuestionsAddMultiFlag() {
  const questionsRef = ref(db, "questions");

  try {
    const snapshot = await get(questionsRef);
    if (!snapshot.exists()) {
      console.log("❌ Aucune question trouvée.");
      return;
    }

    const questions = snapshot.val();
    const updates: any = {};

    Object.keys(questions).forEach((key) => {
      const q = questions[key];
      if (q.multi === undefined) {
        updates[key] = { ...q, multi: false };
      }
    });

    if (Object.keys(updates).length === 0) {
      console.log("✔ Toutes les questions ont déjà 'multi'. Aucune modification.");
      return;
    }

    await update(questionsRef, updates);
    console.log("🔥 Migration réussie ! 'multi: false' ajouté.");
  } catch (err) {
    console.error("Erreur migration :", err);
  }
}
