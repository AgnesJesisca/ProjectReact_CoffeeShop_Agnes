import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, AlertCircle, Loader2, Coffee, Info } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";
import AuthInput from "../../components/AuthInput";
import Button from "../../components/Button";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const users = await usersAPI.fetchUsers();
      const user = users.find(
        (u) => u.email === dataForm.email && u.password === dataForm.password
      );

      if (!user) {
        setError("Email atau Password salah. Silakan coba lagi.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/member");
      }
    } catch (err) {
      console.log(err);
      setError("Gagal terhubung ke server El-Coffee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#FAF7F2] flex items-center justify-center p-4 overflow-hidden font-sans z-[9999]">
      {/* Background soft blur decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#EEDFCE]/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* CARD UTAMA */}
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
            Sign In to Your Dashboard
          </p>
        </div>

        {/* NOTIFIKASI ERROR */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200/50 text-red-700 rounded-xl px-4 py-3 mb-5 text-xs font-medium animate-pulse">
            <AlertCircle className="size-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* NOTIFIKASI LOADING */}
        {loading && (
          <div className="flex items-center gap-3 bg-[#FFF7ED] border border-[#F4E1C8]/60 text-[#A16207] rounded-xl px-4 py-3 mb-5 text-xs font-medium">
            <Loader2 className="size-4 animate-spin shrink-0" />
            Brewing your session...
          </div>
        )}

        {/* FORM ISIAN */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="Email Address"
            icon={<Mail className="size-4 text-gray-400" />}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={dataForm.email}
            onChange={handleChange}
            required
          />

          <AuthInput
            label="Password"
            icon={<Lock className="size-4 text-gray-400" />}
            type="password"
            name="password"
            placeholder="••••••••"
            value={dataForm.password}
            onChange={handleChange}
            required
          />

          {/* LINK LUPA PASSWORD */}
          <div className="flex justify-end pt-0.5">
            <Link
              to="/forgot"
              className="text-xs text-[#D97706] hover:text-[#B45309] font-semibold transition-colors hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* TOMBOL SIGN IN */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm tracking-wide"
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </div>
        </form>

        {/* KOTAK SAMPEL LOGIN (DEMO ACCOUNT) */}
        <div className="mt-5 p-3.5 bg-amber-50/60 border border-amber-200/40 rounded-2xl text-[11px] text-amber-900/80">
          <div className="flex items-center gap-1.5 font-bold text-[#3D2517] mb-1.5">
            <Info className="size-3.5 text-[#D97706]" />
            <span>Akun Sampel Login:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <div className="p-1.5 bg-white/80 rounded-lg border border-amber-100">
              <p className="font-bold text-[#D97706] mb-0.5">🟢 Admin</p>
              <p>Email: <span className="font-mono text-gray-800 selection:bg-amber-200">admin@gmail.com</span></p>
              <p>Pass: <span className="font-mono text-gray-800">123</span></p>
            </div>
            <div className="p-1.5 bg-white/80 rounded-lg border border-amber-100">
              <p className="font-bold text-[#D97706] mb-0.5">🔵 Customer</p>
              <p>Email: <span className="font-mono text-gray-800">andi@mail.com</span></p>
              <p>Pass: <span className="font-mono text-gray-800">password123</span></p>
            </div>
          </div>
        </div>

        {/* PERPINDAHAN LINK KE REGISTRASI */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#D97706] font-bold hover:text-[#B45309] transition-colors ml-1 hover:underline"
            >
              Register Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}