import { Link } from "react-router-dom";

import {
  Mail,
  Lock,
  User,
} from "lucide-react";

import AuthCard from "../../components/AuthCard";
import AuthInput from "../../components/AuthInput";
import Button from "../../components/Button";

export default function Register() {

  return (
    <AuthCard
      title="Create Account"
      subtitle="Register your Coffee Shop account"
    >

      {/* FORM */}
      <form className="space-y-5">

        <AuthInput
          label="Full Name"
          icon={User}
          type="text"
          placeholder="John Doe"
        />

        <AuthInput
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
        />

        <AuthInput
          label="Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
        />

        <AuthInput
          label="Confirm Password"
          icon={Lock}
          type="password"
          placeholder="••••••••"
        />

        {/* BUTTON */}
        <Button
          type="submit"
          className="w-full"
        >
          Register
        </Button>

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

    </AuthCard>
  );
}