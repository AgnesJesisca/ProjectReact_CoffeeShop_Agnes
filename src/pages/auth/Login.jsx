import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Mail,
  Lock,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { usersAPI } from "../../services/usersAPI";

import AuthCard from "../../components/AuthCard";
import AuthInput from "../../components/AuthInput";
import Button from "../../components/Button";

export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [dataForm, setDataForm] =
    useState({
      email: "",
      password: "",
    });

  // HANDLE CHANGE
  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const users =
        await usersAPI.fetchUsers();

      const user =
        users.find(
          (u) =>
            u.email ===
              dataForm.email &&
            u.password ===
              dataForm.password
        );

      if (!user) {

        setError(
          "Email atau Password salah"
        );

        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/");

    } catch (err) {

      console.log(err);

      setError(
        "Gagal terhubung ke server"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Login to your Coffee Shop dashboard"
    >

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 mb-5 text-sm">
          <AlertCircle className="size-5" />
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-3 bg-[#FFF7ED] border border-[#F4E1C8] text-[#A16207] rounded-2xl px-4 py-3 mb-5 text-sm">
          <Loader2 className="size-5 animate-spin" />
          Brewing your coffee...
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

      <AuthInput
        label="Email Address"
        icon={<Mail />}
        type="email"
        name="email"
        placeholder="you@example.com"
        value={dataForm.email}
        onChange={handleChange}
      />

      <AuthInput
        label="Password"
        icon={<Lock />}
        type="password"
        name="password"
        placeholder="••••••••"
        value={dataForm.password}
        onChange={handleChange}
      />

        {/* FORGOT */}
        <div className="flex justify-end">
          <Link
            to="/forgot"
            className="text-sm text-[#D97706] hover:text-[#B45309] font-medium transition-all"
          >
            Forgot Password?
          </Link>
        </div>

        {/* BUTTON */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </Button>

      </form>

      {/* FOOTER */}
      <div className="mt-8 text-center">

        <p className="text-sm text-[#A16207]">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-[#D97706] font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </AuthCard>
  );
}