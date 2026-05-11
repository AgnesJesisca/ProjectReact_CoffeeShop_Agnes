import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Mail,
  Lock,
  Coffee,
  AlertCircle,
  Loader2,
} from "lucide-react";

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

  // SUBMIT
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    axios
      .post(
        "https://dummyjson.com/user/login",
        {
          username:
            dataForm.email,

          password:
            dataForm.password,
        }
      )

      .then((response) => {

        if (
          response.status !== 200
        ) {

          setError(
            response.data.message
          );

          return;
        }

        navigate("/");
      })

      .catch((err) => {

        if (err.response) {

          setError(
            err.response.data
              .message ||
              "Invalid credentials"
          );

        } else {

          setError(
            "Something went wrong"
          );
        }
      })

      .finally(() => {

        setLoading(false);

      });
  };

  return (
    <div
      className="
      w-full
      max-w-[460px]
      bg-white
      rounded-[36px]
      border border-[#F1DFC8]
      shadow-xl
      p-10
      "
    >

      {/* LOGO */}
      <div className="flex justify-center mb-7">

        <div
          className="
          w-20 h-20
          rounded-[28px]
          bg-gradient-to-br
          from-[#D97706]
          to-[#F59E0B]
          flex items-center justify-center
          shadow-lg
          "
        >

          <Coffee className="text-white size-9" />

        </div>

      </div>

      {/* TITLE */}
      <div className="text-center mb-8">

        <h1
          className="
          text-[36px]
          font-bold
          text-[#5B2E0F]
          tracking-[-1px]
          "
        >
          Welcome Back
        </h1>

        <p
          className="
          text-[#A16207]
          mt-2
          text-[15px]
          "
        >
          Login to your Coffee Shop dashboard
        </p>

      </div>

      {/* ERROR */}
      {error && (

        <div
          className="
          flex items-center gap-3
          bg-red-50
          border border-red-200
          text-red-600
          rounded-2xl
          px-4 py-3
          mb-5
          text-sm
          "
        >

          <AlertCircle className="size-5" />

          {error}

        </div>

      )}

      {/* LOADING */}
      {loading && (

        <div
          className="
          flex items-center gap-3
          bg-[#FFF7ED]
          border border-[#F4E1C8]
          text-[#A16207]
          rounded-2xl
          px-4 py-3
          mb-5
          text-sm
          "
        >

          <Loader2 className="size-5 animate-spin" />

          Brewing your coffee...

        </div>

      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* EMAIL */}
        <div>

          <label
            className="
            text-sm
            font-medium
            text-[#6B4F3A]
            block mb-2
            "
          >
            Email Address
          </label>

          <div className="relative">

            <Mail
              className="
              absolute
              left-4 top-1/2
              -translate-y-1/2
              text-[#A16207]
              size-5
              "
            />

            <input
              type="text"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="
              w-full
              h-[56px]
              rounded-2xl
              border border-[#EADBC8]
              bg-[#FFFBF7]
              pl-12 pr-4
              text-[#5B2E0F]
              outline-none
              focus:border-[#D97706]
              focus:ring-4
              focus:ring-[#FDE6B8]
              transition-all
              "
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div>

          <label
            className="
            text-sm
            font-medium
            text-[#6B4F3A]
            block mb-2
            "
          >
            Password
          </label>

          <div className="relative">

            <Lock
              className="
              absolute
              left-4 top-1/2
              -translate-y-1/2
              text-[#A16207]
              size-5
              "
            />

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="
              w-full
              h-[56px]
              rounded-2xl
              border border-[#EADBC8]
              bg-[#FFFBF7]
              pl-12 pr-4
              text-[#5B2E0F]
              outline-none
              focus:border-[#D97706]
              focus:ring-4
              focus:ring-[#FDE6B8]
              transition-all
              "
            />

          </div>

        </div>

        {/* FORGOT */}
        <div className="flex justify-end">

          <Link
            to="/forgot"
            className="
            text-sm
            text-[#D97706]
            hover:text-[#B45309]
            font-medium
            transition-all
            "
          >
            Forgot Password?
          </Link>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          h-[58px]
          rounded-2xl
          bg-gradient-to-r
          from-[#D97706]
          to-[#F59E0B]
          text-white
          font-semibold
          text-[16px]
          shadow-lg
          hover:scale-[1.01]
          hover:opacity-95
          transition-all duration-300
          disabled:opacity-70
          "
        >

          {loading
            ? "Loading..."
            : "Login"}

        </button>

      </form>

      {/* FOOTER */}
      <div className="mt-8 text-center">

        <p
          className="
          text-sm
          text-[#A16207]
          "
        >
          Don't have an account?{" "}

          <Link
            to="/register"
            className="
            text-[#D97706]
            font-semibold
            hover:underline
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}