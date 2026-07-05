import { GiftIcon, MapPin } from "lucide-react";

function getBirthdayRewardInfo(tier) {
  switch (tier?.toLowerCase()) {
    case "platinum": return "Diskon 15% + Free Drink Spesial Ultah";
    case "gold":     return "Diskon 10% + Free Birthday Cake Brownies";
    case "silver":   return "Diskon 5% + Free Upsize Coffee";
    default:         return "Kumpulkan poin transaksi untuk dapat kejutan";
  }
}

function getNextTierInfo(points) {
  if (points >= 600) return { next: "Max Tier", target: 600 };
  if (points >= 300) return { next: "Platinum", target: 600 };
  if (points >= 100) return { next: "Gold",     target: 300 };
  return { next: "Silver", target: 100 };
}

export default function MembershipProgress({ profile }) {
  const tierInfo       = getNextTierInfo(profile.points);
  const progressPercent = Math.min((profile.points / tierInfo.target) * 100, 100);

  return (
    <div className="bg-gradient-to-r from-amber-100/30 to-orange-50/30 border border-amber-200/20 rounded-[24px] p-6 relative">
      <h2 className="text-xl font-serif font-bold text-[#3D2517]">Welcome back, {profile.name}! ☕</h2>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed flex items-center gap-1">
        <MapPin className="size-3.5 inline text-gray-400" /> Terdaftar di regional: <strong>{profile.address}</strong>
      </p>

      {/* Birthday Perk */}
      <div className="mt-3 inline-flex items-center gap-2 bg-white/80 border border-amber-200/50 rounded-xl px-3 py-1.5 text-[11px]">
        <GiftIcon className="size-4 text-rose-500 fill-rose-100" />
        <span className="text-gray-600">
          Your Birthday Perk: <strong className="text-[#3D2517]">{getBirthdayRewardInfo(profile.loyalty)}</strong>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 pt-4 border-t border-amber-200/20">
        <div className="flex justify-between items-center text-xs mb-1.5">
          <span className="font-semibold text-stone-700">Membership Progress</span>
          <span className="text-gray-400 text-[11px]">
            {profile.points} / {tierInfo.target} Pts menuju <strong className="text-amber-800">{tierInfo.next}</strong>
          </span>
        </div>
        <div className="w-full bg-stone-200/60 h-2 rounded-full overflow-hidden">
          <div className="h-full bg-amber-700 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
    </div>
  );
}
