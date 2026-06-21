import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, User, AlertCircle, Loader2, Coffee } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";
import AuthInput from "../../components/AuthInput";
import Button from "../../components/Button";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    try {
      setLoading(true);

      await usersAPI.createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "Customer",
        loyalty: "Bronze", // Otomatis terdaftar sebagai Customer / Member biasa
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Gagal melakukan registrasi, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#FAF7F2] flex items-center justify-center p-4 overflow-hidden font-sans z-[9999]">
      {/* Background soft blur decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EEDFCE]/40 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* SATU-SATUNYA CARD YANG AKTIF (Menghilangkan total card luar) */}
      <div className="w-full max-w-[420px] bg-white border border-gray-100 rounded-[32px] p-8 shadow-xl shadow-amber-900/5 z-50">
        
        {/* BRANDING LOGO & JUDUL */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="w-12 h-12 bg-[#3D2517] rounded-2xl flex items-center justify-center shadow-md text-[#EEDFCE] mb-3">
            <Coffee className="size-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#3D2517] tracking-wide">
            El-Coffee
          </h2>
          <p className="text-[10px] text-gray-400 font-semibold mt-1.5 uppercase tracking-widest">
            Create Your Member Account
          </p>
        </div>

        {/* NOTIFIKASI ERROR */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200/50 text-red-700 rounded-xl px-4 py-3 mb-5 text-xs font-medium">
            <AlertCircle className="size-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* NOTIFIKASI LOADING */}
        {loading && (
          <div className="flex items-center gap-3 bg-[#FFF7ED] border border-[#F4E1C8]/60 text-[#A16207] rounded-xl px-4 py-3 mb-5 text-xs font-medium">
            <Loader2 className="size-4 animate-spin shrink-0" />
            Grinding account details...
          </div>
        )}

        {/* FORM ISIAN */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            icon={<User className="size-4 text-gray-400" />}
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <AuthInput
            icon={<Mail className="size-4 text-gray-400" />}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <AuthInput
            icon={<Lock className="size-4 text-gray-400" />}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <AuthInput
            icon={<Lock className="size-4 text-gray-400" />}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* TOMBOL REGISTER */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm tracking-wide"
            >
              {loading ? "Loading..." : "Register Account"}
            </Button>
          </div>
        </form>

        {/* PERPINDAHAN LINK KE LOGIN */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#D97706] font-bold hover:text-[#B45309] transition-colors ml-1 hover:underline"
            >
              Login Instead
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}