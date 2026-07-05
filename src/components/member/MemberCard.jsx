import { Coffee } from "lucide-react";

function getCardTheme(tier) {
  switch (tier?.toLowerCase()) {
    case "platinum": return "bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 text-indigo-50 shadow-indigo-900/20";
    case "gold":     return "bg-gradient-to-br from-[#B45309] via-[#D97706] to-[#78350F] text-amber-50 shadow-amber-900/20";
    case "silver":   return "bg-gradient-to-br from-slate-500 via-slate-600 to-slate-800 text-slate-50 shadow-slate-900/20";
    default:         return "bg-gradient-to-br from-[#7C2D12] via-[#9A3412] to-[#431407] text-orange-50 shadow-orange-900/20";
  }
}

export default function MemberCard({ profile }) {
  return (
    <div className={`rounded-[24px] p-6 shadow-xl relative overflow-hidden h-56 flex flex-col justify-between transition-all ${getCardTheme(profile.loyalty)}`}>
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl" />

      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">{profile.loyalty} Membership</p>
          <h3 className="text-xl font-serif font-bold tracking-wide mt-1 truncate max-w-[180px]">{profile.name}</h3>
        </div>
        <Coffee className="size-8 opacity-30" />
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] opacity-50 uppercase tracking-wider">Member ID</p>
          <p className="font-mono text-sm tracking-widest opacity-90">{profile.id}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] opacity-50 uppercase tracking-wider">Points Balance</p>
          <p className="text-xl font-black">{profile.points} <span className="text-xs font-normal opacity-70">Pts</span></p>
        </div>
      </div>
    </div>
  );
}
