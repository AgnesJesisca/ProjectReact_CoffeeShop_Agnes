import { Coffee, LogOut } from "lucide-react";

export default function MemberNavbar({ profile, handleLogout }) {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#3D2517] rounded-lg flex items-center justify-center text-[#EEDFCE]">
            <Coffee className="size-4" />
          </div>
          <span className="font-serif font-bold text-[#3D2517] text-lg">El-Coffee</span>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
            profile.loyalty.toLowerCase() === "platinum" ? "bg-indigo-100 text-indigo-800" :
            profile.loyalty.toLowerCase() === "gold"     ? "bg-amber-100 text-amber-800"   :
            profile.loyalty.toLowerCase() === "silver"   ? "bg-slate-100 text-slate-800"   :
            "bg-orange-100 text-orange-800"
          }`}>
            {profile.loyalty} Tier
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-3 py-2 rounded-xl"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}
