import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const savedUser = localStorage.getItem("user");

  // 1. Jika tidak ada data user di localStorage, tendang ke login
  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(savedUser);

  // 2. Jika bukan "Admin", tendang ke halaman home/dashboard customer biasa
  if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  // 3. Jika dia Admin, izinkan masuk ke halaman admin
  return children;
}