import { FaBell, FaSearch } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  return (
   <div
  id="header-container"
  className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-soft bg-card"
  >
      
      {/* SEARCH */}
      <div id="search-bar" className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search menu, drinks, beans..."
          className="input-coffee pr-10"
        />
        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
      </div>

      {/* RIGHT */}
      <div className="flex items-center space-x-4">

        {/* NOTIF */}
        <div className="relative p-3 bg-soft rounded-xl text-primary cursor-pointer">
          <FaBell />
          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full px-2 text-xs">
            5
          </span>
        </div>

        {/* SETTINGS */}
        <div className="p-3 bg-soft rounded-xl text-primary cursor-pointer">
          <SlSettings />
        </div>

        {/* PROFILE */}
        <div className="flex items-center space-x-4 border-l pl-4">
          <span className="text-sm">
            Hello, <b>Barista Admin ☕</b>
          </span>
          <img
            src="https://i.pinimg.com/736x/2f/a4/72/2fa4722011490073ad1e09422cf1bc37.jpg"
            className="w-10 h-10 rounded-full"
          />
        </div>

      </div>
    </div>
  );
}