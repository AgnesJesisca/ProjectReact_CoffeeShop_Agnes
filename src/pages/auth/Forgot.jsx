import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, KeyRound, AlertCircle, Loader2, Coffee, CheckCircle2, Eye, EyeOff } from "lucide-react";

import { usersAPI } from "../../services/usersAPI";
import AuthInput from "../../components/AuthInput";
import Button from "../../components/Button";

export default function Forgot() {
  // step: "email" | "reset" | "done"
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── STEP 1 — cari akun berdasarkan email ─────────────────
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const users = await usersAPI.fetchUsers();
      const user = users.find(
        (u) => u.email?.toLowerCase() === email.trim().toLowerCase()
      );
      if (!user) {
        setError("Email tidak ditemukan. Pastikan email terdaftar di El-Coffee.");
        return;
      }
      setFoundUser(user);
      setStep("reset");
    } catch {
      setError("Gagal terhubung ke server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 2 — simpan password baru ────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      await usersAPI.updateUser(foundUser.id, { password: newPassword });
      setStep("done");
    } catch {
      setError("Gagal menyimpan password baru. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#FAF7F2] flex items-center justify-center p-4 overflow-hidden font-sans z-[9999]">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#EEDFCE]/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-[420px] bg-white border border-gray-100 rounded-[32px] p-8 shadow-xl shadow-amber-900/5 z-50">

        {/* BRANDING */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="w-12 h-12 bg-[#3D2517] rounded-2xl flex items-center justify-center shadow-md text-[#EEDFCE] mb-3">
            <Coffee className="size-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#3D2517] tracking-wide">
            El-Coffee
          </h2>
          <p className="text-[10px] text-gray-400 font-semibold mt-1.5 uppercase tracking-widest">
            {step === "email" && "Reset Your Password"}
            {step === "reset" && "Set New Password"}
            {step === "done"  && "Password Updated"}
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200/50 text-red-700 rounded-xl px-4 py-3 mb-5 text-xs font-medium">
            <AlertCircle className="size-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex items-center gap-3 bg-[#FFF7ED] border border-[#F4E1C8]/60 text-[#A16207] rounded-xl px-4 py-3 mb-5 text-xs font-medium">
            <Loader2 className="size-4 animate-spin shrink-0" />
            Memproses permintaan...
          </div>
        )}

        {/* ── STEP 1: cek email ───────────────────────────── */}
        {step === "email" && (
          <form onSubmit={handleCheckEmail} className="space-y-4">
            <p className="text-xs text-gray-500 leading-relaxed -mt-2 mb-4">
              Masukkan email akun El-Coffee Anda. Kami akan memverifikasi akunnya dan mempersilakan Anda mengatur password baru.
            </p>

            <AuthInput
              icon={<Mail className="size-4 text-gray-400" />}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm tracking-wide"
              >
                {loading ? "Mencari Akun..." : "Cari Akun"}
              </Button>
            </div>
          </form>
        )}

        {/* ── STEP 2: set password baru ───────────────────── */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Info akun ditemukan */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200/50 text-green-700 rounded-xl px-4 py-3 text-xs font-medium -mt-2 mb-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <div>
                <p className="font-bold">Akun ditemukan!</p>
                <p className="opacity-80 mt-0.5">
                  {foundUser?.username} · {foundUser?.email}
                </p>
              </div>
            </div>

            {/* New Password */}
            <div className="relative">
              <AuthInput
                icon={<KeyRound className="size-4 text-gray-400" />}
                type={showNew ? "text" : "password"}
                placeholder="Password Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <AuthInput
                icon={<KeyRound className="size-4 text-gray-400" />}
                type={showConfirm ? "text" : "password"}
                placeholder="Konfirmasi Password Baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {/* Password strength hint */}
            {newPassword.length > 0 && (
              <div className="flex gap-1.5 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      newPassword.length >= i * 3
                        ? newPassword.length < 6
                          ? "bg-red-400"
                          : newPassword.length < 9
                          ? "bg-amber-400"
                          : "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
                <span className={`text-[10px] font-semibold ml-1 ${
                  newPassword.length < 6 ? "text-red-500"
                  : newPassword.length < 9 ? "text-amber-500"
                  : "text-green-600"
                }`}>
                  {newPassword.length < 6 ? "Lemah" : newPassword.length < 9 ? "Sedang" : "Kuat"}
                </span>
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => { setStep("email"); setError(""); setFoundUser(null); setNewPassword(""); setConfirmPassword(""); }}
                className="flex-1"
              >
                Kembali
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm tracking-wide"
              >
                {loading ? "Menyimpan..." : "Simpan Password"}
              </Button>
            </div>
          </form>
        )}

        {/* ── STEP 3: done ────────────────────────────────── */}
        {step === "done" && (
          <div className="text-center space-y-5">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-200">
              <CheckCircle2 className="size-8 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold text-[#3D2517] text-base">Password berhasil diperbarui!</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                Password akun <span className="font-semibold text-[#D97706]">{foundUser?.email}</span> sudah diperbarui. Silakan login dengan password baru Anda.
              </p>
            </div>
            <Link to="/login">
              <Button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm tracking-wide">
                Kembali ke Login
              </Button>
            </Link>
          </div>
        )}

        {/* BACK TO LOGIN link (step 1 & 2) */}
        {step !== "done" && (
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-medium">
              Sudah ingat password?{" "}
              <Link
                to="/login"
                className="text-[#D97706] font-bold hover:text-[#B45309] transition-colors ml-1 hover:underline"
              >
                Kembali Login
              </Link>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
