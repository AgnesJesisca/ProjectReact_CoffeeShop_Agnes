import { NavLink } from "react-router-dom";
import { MdDashboard, MdAdd } from "react-icons/md";
import { FaCoffee, FaUsers, FaClipboardList, FaMugHot } from "react-icons/fa";
import { GiCoffeeBeans } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";

export default function Sidebar() {

  const menuClass = ({ isActive }) =>
    `flex items-center rounded-xl p-4 space-x-3 transition
     ${
       isActive
         ? "text-primary bg-soft font-semibold"
         : "text-sub hover:text-primary hover:bg-soft"
     }`;

  return (
    <div className="sticky top-0 h-screen w-72 flex flex-col bg-card p-8 border-r border-soft">
      
      {/* LOGO */}
      <div>
        <span className="text-[40px] font-bold text-primary">
          El Coffee<span className="text-sub">.</span>
        </span>
        <p className="text-sub text-sm">
          Coffee Shop Dashboard
        </p>
      </div>

      {/* MENU */}
      <ul className="mt-10 space-y-2">

        <li>
          <NavLink to="/" className={menuClass}>
            <MdDashboard />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" className={menuClass}>
            <FaClipboardList />
            Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="/customers" className={menuClass}>
            <FaUsers />
            Customers
          </NavLink>
        </li>

        <li>
          <NavLink to="/menu" className={menuClass}>
            <FaCoffee />
            Menu Items
          </NavLink>
        </li>

        <li>
          <NavLink to="/inventory" className={menuClass}>
            <GiCoffeeBeans />
            Inventory
          </NavLink>
        </li>

        <li>
          <NavLink to="/revenue" className={menuClass}>
            <TbReportMoney />
            Revenue
          </NavLink>
        </li>

      </ul>

      {/* FOOTER */}
      <div className="mt-auto">
        <div className="bg-primary text-white p-4 rounded-xl mb-10 flex items-center">
          
          <div className="text-sm">
            <span>Manage your coffee menu ☕</span>

            <div className="flex items-center mt-3 bg-white text-primary p-2 rounded-md cursor-pointer">
              <MdAdd className="mr-2" />
              Add Menu
            </div>
          </div>

          <img
            src="https://i.pinimg.com/736x/2f/a4/72/2fa4722011490073ad1e09422cf1bc37.jpg"
            className="w-16 rounded-full ml-4"
          />
        </div>

        <span className="text-sub text-sm">
          © Coffee Dashboard
        </span>
      </div>

    </div>
  );
}