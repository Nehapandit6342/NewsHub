import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ArticlePage from "./pages/ArticlePage";

import Login from "./features/auth/pages/Login";
import Unauthorized from "./pages/Unauthorized";

import AdminLayout from "./features/admin/layout/AdminLayout";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import AdminArticles from "./features/admin/pages/AdminArticles";
import AdminComments from "./features/admin/pages/AdminComments";
import Editor from "./features/admin/pages/Editor";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicLayout from "./components/layout/PublicLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ================= ADMIN ================= */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "editor"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="comments" element={<AdminComments />} />
            <Route path="editors" element={<Editor />} />
          </Route>
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
