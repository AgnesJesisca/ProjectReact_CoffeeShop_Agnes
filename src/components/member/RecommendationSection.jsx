import { Sparkles } from "lucide-react";

function getDynamicRecommendations(favMenu) {
  const baseMenu = favMenu && favMenu !== "Belum Ada" ? favMenu : "Caramel Latte";

  if (baseMenu.toLowerCase().includes("latte")) {
    return [
      { name: baseMenu,         desc: "Your all-time favorite drink",          icon: "☕" },
      { name: "Vanilla Latte",  desc: "Creamy with warm vanilla notes",         icon: "☕" },
      { name: "Hazelnut Latte", desc: "Nutty and smooth espresso combo",        icon: "☕" },
    ];
  } else if (
    baseMenu.toLowerCase().includes("espresso") ||
    baseMenu.toLowerCase().includes("americano") ||
    baseMenu.toLowerCase().includes("black")
  ) {
    return [
      { name: baseMenu,     desc: "Your all-time favorite drink",           icon: "☕" },
      { name: "Cold Brew",  desc: "Steeped 16 hours for pure smoothness",   icon: "🧊" },
      { name: "Long Black", desc: "Rich aroma with robust crema flavor",    icon: "☕" },
    ];
  } else {
    return [
      { name: baseMenu,           desc: "Your all-time favorite drink",        icon: "☕" },
      { name: "Butter Croissant", desc: "Flaky, buttery, perfect with coffee", icon: "🥐" },
      { name: "Matcha Latte",     desc: "Pure Japanese green tea indulgence",  icon: "🍵" },
    ];
  }
}

export default function RecommendationSection({ profile }) {
  const recommendations = getDynamicRecommendations(profile.favoriteMenu);

  return (
    <div>
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <Sparkles className="size-4 text-amber-600" /> Personalized Recommendations
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {recommendations.map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex gap-3 items-center">
            <div className="text-2xl">{item.icon}</div>
            <div className="truncate">
              <h5 className="text-xs font-bold text-gray-800 truncate">{item.name}</h5>
              <p className="text-[9px] text-gray-400 font-medium truncate mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
