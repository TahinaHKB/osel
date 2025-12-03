import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import AdminPage from "./page/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
