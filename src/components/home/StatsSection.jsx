export default function StatsSection({ menuData, customersData, totalOrdersRevenue }) {
  const stats = [
    { value: menuData.length + "+",                             label: "Coffee Menu",      icon: "☕" },
    { value: customersData.length + "+",                        label: "Happy Customers",  icon: "😊" },
    { value: totalOrdersRevenue.toLocaleString("id-ID") + "+", label: "Orders Completed", icon: "✅" },
    { value: "4.9★",                                            label: "Average Rating",   icon: "⭐" },
  ];

  return (
    <section className="py-16 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#2E1F17" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="text-center p-7 rounded-3xl" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,163,115,0.2)" }}>
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "#D4A373", fontFamily: "serif" }}>{stat.value}</div>
            <div className="text-sm" style={{ color: "#C4A882" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
