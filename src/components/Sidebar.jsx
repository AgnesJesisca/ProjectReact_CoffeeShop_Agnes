import { NavLink } from "react-router-dom";

import {
  MdDashboard,
  MdOutlineLogout,
} from "react-icons/md";

import {
  FaBox,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";

import { HiDocumentReport } from "react-icons/hi";

import { GiCoffeeBeans } from "react-icons/gi";

import { TbChartBar } from "react-icons/tb";

export default function Sidebar() {

  const menuClass = ({ isActive }) =>
    `
    flex items-center gap-4
    px-6 py-4
    rounded-[22px]
    transition-all duration-300
    text-[16px]
    font-semibold
    text-white

    ${
      isActive
        ? "bg-[#D46300] shadow-lg"
        : "hover:bg-[#7A2C03]"
    }
  `;

  return (
    <div
      className="
      sticky top-0
      h-screen
      w-[280px]
      flex flex-col justify-between
      border-r border-[#7F3008]
      overflow-hidden
      "
      style={{
        background: `
          linear-gradient(
            180deg,
            #7A2B00 0%,
            #682300 45%,
            #562000 100%
          )
        `,
      }}
    >

      {/* GLOW */}
      <div
        className="
        absolute
        top-[-120px]
        right-[-120px]
        w-[260px]
        h-[260px]
        rounded-full
        bg-[#D97706]/20
        blur-3xl
        pointer-events-none
        "
      />

      {/* TOP */}
      <div className="relative z-10">

        {/* LOGO */}
        <div
          className="
          px-7 py-8
          border-b border-[#86370E]
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
              w-14 h-14
              rounded-[20px]
              bg-gradient-to-br
              from-[#F59E0B]
              to-[#D97706]
              flex items-center justify-center
              shadow-lg
              "
            >
              <span className="text-white text-[24px]">
                ☕
              </span>
            </div>

            <div>

              <h1
                className="
                text-white
                text-[30px]
                font-bold
                leading-[1]
                tracking-[-1px]
                "
              >
                Coffee Shop
              </h1>

              <p
                className="
                text-[#FFD166]
                text-[14px]
                mt-2
                "
              >
                Admin Panel
              </p>

            </div>

          </div>

        </div>

        {/* MENU */}
        <ul className="p-5 space-y-2">

          <li>
            <NavLink to="/" className={menuClass}>
              <MdDashboard size={21} className="text-white" />
              <span className="text-white">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/menu" className={menuClass}>
              <FaBox size={18} className="text-white" />
              <span className="text-white">Menu</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className={menuClass}>
              <FaShoppingCart size={18} className="text-white" />
              <span className="text-white">Orders</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/customers" className={menuClass}>
              <FaUsers size={18} className="text-white" />
              <span className="text-white">Customers</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/inventory" className={menuClass}>
              <GiCoffeeBeans size={19} className="text-white" />
              <span className="text-white">Inventory</span>
            </NavLink>
          </li>


          <li>
            <NavLink to="/revenue" className={menuClass}>
              <HiDocumentReport size={20} className="text-white" />
              <span className="text-white">Reports</span>
            </NavLink>
          </li>

        </ul>

      </div>

      {/* LOGOUT */}
      <div
        className="
        relative z-10
        border-t border-[#86370E]
        p-5
        "
      >

        <button
          className="
          w-full
          flex items-center gap-4
          px-6 py-4
          rounded-[22px]
          text-[16px]
          font-semibold
          text-white
          hover:bg-[#7A2C03]
          transition-all duration-300
          "
        >

          <MdOutlineLogout
            size={22}
            className="text-white"
          />

          <span className="text-white">
            Logout
          </span>

        </button>

      </div>

    </div>
  );
}