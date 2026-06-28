import { Navigate } from "react-router-dom";

// ProtectedRoute — hanya untuk halaman Admin (/admin/*)
// Aturan:
//   1. Belum login          → redirect ke /login
//   2. Login tapi bukan admin → redirect ke /member (halaman customer)
//   3. Login sebagai admin  → izinkan masuk
export default function ProtectedRoute({ children }) {
  const savedUser = localStorage.getItem("user");

  // 1. Tidak ada session → paksa login
  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(savedUser);
  } catch {
    // Data localStorage korup — bersihkan dan paksa login ulang
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // 2. Bukan admin (case-insensitive) → customer tidak boleh masuk halaman admin
  if (user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/member" replace />;
  }

  // 3. Admin → izinkan
  return children;
}
