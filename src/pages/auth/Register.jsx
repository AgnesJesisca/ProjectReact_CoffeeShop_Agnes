import { Link } from "react-router-dom";

import {
  Mail,
  Lock,
  User,
  Coffee,
} from "lucide-react";

export default function Register() {

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
          Create Account
        </h1>

        <p
          className="
          text-[#A16207]
          mt-2
          text-[15px]
          "
        >
          Register your Coffee Shop account
        </p>

      </div>

      {/* FORM */}
      <form className="space-y-5">

        {/* FULL NAME */}
        <div>

          <label
            className="
            text-sm
            font-medium
            text-[#6B4F3A]
            block mb-2
            "
          >
            Full Name
          </label>

          <div className="relative">

            <User
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
              placeholder="John Doe"
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
              type="email"
              placeholder="you@example.com"
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
              placeholder="••••••••"
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

        {/* CONFIRM PASSWORD */}
        <div>

          <label
            className="
            text-sm
            font-medium
            text-[#6B4F3A]
            block mb-2
            "
          >
            Confirm Password
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
              placeholder="••••••••"
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

        {/* BUTTON */}
        <button
          type="submit"
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
          "
        >
          Register
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
          Already have an account?{" "}

          <Link
            to="/login"
            className="
            text-[#D97706]
            font-semibold
            hover:underline
            "
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}