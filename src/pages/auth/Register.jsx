import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { usersAPI } from "../../services/usersAPI";

import AuthCard from "../../components/AuthCard";
import AuthInput from "../../components/AuthInput";
import Button from "../../components/Button";

export default function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Password dan Confirm Password tidak sama"
      );

      return;
    }

    try {

      setLoading(true);

      await usersAPI.createUser({
        username:
          formData.username,
        email:
          formData.email,
        password:
          formData.password,
        role: "Customer",
      });

      navigate("/login");

    } catch (err) {

      console.log(err);

      setError(
        "Gagal melakukan registrasi"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Register your Coffee Shop account"
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
          Creating account...
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <AuthInput
          icon={<User />}
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
        />

        <AuthInput
          icon={<Mail />}
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <AuthInput
          icon={<Lock />}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <AuthInput
          icon={<Lock />}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Loading..."
            : "Register"}
        </Button>

      </form>

      <div className="mt-8 text-center">

        <p className="text-sm text-[#A16207]">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-[#D97706] font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </AuthCard>
  );
}