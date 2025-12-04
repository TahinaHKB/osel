import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./page/HomePage";
import AdminPage from "./page/AdminPage";
import LoginAdmin from "./page/LoginAdmin"; // si tu as une page login
import VisitorQuestionnaire from "./page/VisitorQuestionnaire";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/question" element={<VisitorQuestionnaire />} />
      {/* Page login admin */}
      <Route path="/admin/login" element={<LoginAdmin />} />

      {/* Redirection /admin vers /admin/1 */}
      <Route path="/admin" element={<Navigate to="/admin/1" replace />} />

      {/* Page admin avec id */}
      <Route path="/admin/:id" element={<AdminPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
