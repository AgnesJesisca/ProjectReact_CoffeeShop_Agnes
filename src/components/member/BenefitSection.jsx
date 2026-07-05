import { Award } from "lucide-react";

const tierBenefitsGuide = [
  { tier: "Bronze",   points: "0-99 Pts",    perk: "E-Card Member, 1x Point tiap transaksi kelipatan Rp10k.",                             color: "border-orange-200 bg-orange-50/20" },
  { tier: "Silver",   points: "100-299 Pts",  perk: "Welcome Gift Free Upsize, Potongan Ultah 5%, Prioritas Antrean.",                    color: "border-slate-200 bg-slate-50/20"   },
  { tier: "Gold",     points: "300-599 Pts",  perk: "Welcome Gift Free Upsize, Potongan Ultah 10% + Cake, Gratis Ekstra Shot.",           color: "border-amber-200 bg-amber-50/20"   },
  { tier: "Platinum", points: "600+ Pts",     perk: "Welcome Gift Free Upsize, Potongan Ultah 15% + Free Drink, Akses Menu Rahasia.",     color: "border-indigo-200 bg-indigo-50/20" },
];

export default function BenefitSection({ profile }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm space-y-3">
      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
        <Award className="size-4 text-amber-700" /> Tier Benefits Guide
      </h4>
      <div className="space-y-2">
        {tierBenefitsGuide.map((b) => {
          const isCurrentTier = profile.loyalty.toLowerCase() === b.tier.toLowerCase();
          return (
            <div
              key={b.tier}
              className={`p-3 rounded-xl border text-[11px] relative transition-all ${b.color} ${
                isCurrentTier ? "ring-2 ring-[#3D2517] border-transparent" : "opacity-75"
              }`}
            >
              <div className="flex justify-between items-center font-bold text-gray-800">
                <span className="flex items-center gap-1.5">
                  {b.tier}
                  {isCurrentTier && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                </span>
                <span className="text-[9px] text-gray-400 font-medium">{b.points}</span>
              </div>
              <p className="mt-1 text-gray-600 leading-relaxed">{b.perk}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
