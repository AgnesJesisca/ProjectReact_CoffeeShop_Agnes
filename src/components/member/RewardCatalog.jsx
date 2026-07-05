import { Gift } from "lucide-react";

const rewardsCatalog = [
  { id: "R1", pointsCost: 50,  label: "Free Espresso"    },
  { id: "R2", pointsCost: 100, label: "Voucher Rp10.000" },
  { id: "R3", pointsCost: 250, label: "Free Latte"       },
  { id: "R4", pointsCost: 500, label: "Voucher Rp50.000" },
];

export default function RewardCatalog({ profile, handleRedeem }) {
  return (
    <div>
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <Gift className="size-4 text-amber-700" /> Rewards Catalog (Exchange Points)
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rewardsCatalog.map((reward) => (
          <div
            key={reward.id}
            className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:border-amber-200 transition-all"
          >
            <div className="flex justify-between items-start">
              <h5 className="text-xs font-bold text-gray-800">{reward.label}</h5>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-100">
                {reward.pointsCost} Pts
              </span>
            </div>
            <button
              onClick={() => handleRedeem(reward)}
              disabled={profile.points < reward.pointsCost}
              className={`mt-3 w-full py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all ${
                profile.points >= reward.pointsCost
                  ? "bg-[#3D2517] text-[#EEDFCE] hover:bg-[#26160e]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Redeem Reward
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
