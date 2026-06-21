import { NavLink, useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdOutlineLogout,
} from "react-icons/md";

import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaCoffee,
  FaCommentAlt, // Tambahkan ikon untuk Review/Feedback
} from "react-icons/fa";

import { GiCoffeeBeans } from "react-icons/gi";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

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
      className="sticky top-0 h-screen w-[280px] flex flex-col justify-between border-r border-[#7F3008] overflow-hidden overflow-y-auto"
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
      <div className="absolute top-[-120px] right-[-120px] w-[260px] h-[260px] rounded-full bg-[#D97706]/20 blur-3xl pointer-events-none" />

      {/* TOP */}
      <div className="relative z-10">
        {/* LOGO EL-COFFEE */}
        <div className="px-7 py-8 border-b border-[#86370E]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[16px] bg-[#3E2723] flex items-center justify-center shadow-md border border-[#5D4037]/40">
              <FaCoffee className="text-[#F59E0B] size-5" />
            </div>
            <div>
              <h1 className="text-white text-[24px] font-bold tracking-wide leading-none font-serif">
                El-Coffee
              </h1>
              <p className="text-[#FFD166]/80 text-[12px] font-medium tracking-widest uppercase mt-1.5">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <ul className="p-5 space-y-2">
          <li>
            <NavLink to="/admin/dashboard" className={menuClass}>
              <MdDashboard size={21} color="white" />
              <span className="text-white">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/menu" className={menuClass}>
              <FaBox size={18} color="white" />
              <span className="text-white">Menu</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/orders" className={menuClass}>
              <FaShoppingCart size={18} color="white" />
              <span className="text-white">Orders</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/customers" className={menuClass}>
              <FaUsers size={18} color="white" />
              <span className="text-white">Customers</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/inventory" className={menuClass}>
              <GiCoffeeBeans size={19} color="white" />
              <span className="text-white">Inventory</span>
            </NavLink>
          </li>

          {/* MENU BARU: REVIEWS & FEEDBACK */}
          <li>
            <NavLink to="/admin/reviews" className={menuClass}>
              <FaCommentAlt size={16} color="white" />
              <span className="text-white">Reviews</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users" className={menuClass}>
              <FaUsers size={18} color="white" />
              <span className="text-white">Users</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* LOGOUT */}
      <div className="relative z-10 border-t border-[#86370E] p-5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-[22px] text-[16px] font-semibold text-white hover:bg-[#7A2C03] transition-all duration-300"
        >
          <MdOutlineLogout size={22} color="white" />
          <span className="text-white">Logout</span>
        </button>
      </div>
    </div>
  );
}