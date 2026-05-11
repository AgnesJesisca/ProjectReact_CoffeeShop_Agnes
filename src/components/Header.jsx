import { FaUser } from "react-icons/fa";

export default function Header() {

  return (
    <div
      className="
      sticky top-0 z-50
      h-[86px]
      bg-white
      border-b border-[#EADBC7]
      px-10
      flex justify-between items-center
      "
    >

      {/* LEFT */}
      <div>

        <h1
          className="
          text-[30px]
          font-extrabold
          text-[#6B2400]
          leading-none
          tracking-[-0.5px]
          "
        >
          Dashboard
        </h1>

        <p
          className="
          text-[#E57A10]
          text-[14px]
          mt-1
          font-medium
          "
        >
          Welcome back, Admin
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <div className="text-right">

          <h2
            className="
            text-[#6B2400]
            text-[14px]
            font-bold
            leading-none
            "
          >
            Admin User
          </h2>

          <p
            className="
            text-[#E57A10]
            text-[13px]
            mt-1
            "
          >
            admin@coffeeshop.com
          </p>

        </div>

        <div
          className="
          w-12 h-12
          rounded-full
          bg-[#B45300]
          flex items-center justify-center
          text-white
          text-sm
          shadow-md
          "
        >
          <FaUser />
        </div>

      </div>

    </div>
  );
}