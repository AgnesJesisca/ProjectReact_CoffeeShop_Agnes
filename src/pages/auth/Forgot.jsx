import { Link } from "react-router-dom";

import {
  Mail,
  Coffee,
  ArrowLeft,
} from "lucide-react";

export default function Forgot() {

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
          text-[34px]
          font-bold
          text-[#5B2E0F]
          tracking-[-1px]
          leading-tight
          "
        >
          Forgot Password?
        </h1>

        <p
          className="
          text-[#A16207]
          mt-3
          text-[15px]
          leading-relaxed
          "
        >
          Enter your email address and we’ll send
          you a link to reset your password.
        </p>

      </div>

      {/* FORM */}
      <form className="space-y-5">

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
          Send Reset Link
        </button>

      </form>

      {/* FOOTER */}
      <div className="mt-8 text-center">

        <Link
          to="/login"
          className="
          inline-flex
          items-center gap-2
          text-[#D97706]
          font-medium
          hover:underline
          text-sm
          "
        >

          <ArrowLeft className="size-4" />

          Back to Login

        </Link>

      </div>

    </div>
  );
}