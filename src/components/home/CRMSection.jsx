const menuPairs = {
  "Caramel Latte":  "Vanilla Latte",
  "Flat White":     "Piccolo",
  "Hazelnut Latte": "Cappuccino",
  "Vanilla Latte":  "Caramel Latte",
};

export default function CRMSection({ topFavMenus, menuData, totalRevenue, ordersData, customersData, topPayment }) {
  return (
    <>
      {/* PERSONALIZED RECOMMENDATION */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Smart Recommendation</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Rekomendasi Personal</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Berdasarkan data transaksi dan preferensi member El-Coffee.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {topFavMenus.map(({ menu, count }, i) => {
              const recommended = menuPairs[menu] || "Caramel Latte";
              const menuItem = menuData.find((m) => m.name === menu)       || menuData[i];
              const recItem  = menuData.find((m) => m.name === recommended) || menuData[i + 1];
              return (
                <div key={i} className="bg-white rounded-3xl p-6 border flex flex-col gap-4" style={{ borderColor: "#F0E6DA", boxShadow: "0 2px 12px rgba(111,78,55,0.07)" }}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">🤖</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#2E1F17" }}>
                      Karena pelanggan <strong style={{ color: "#6F4E37" }}>Gold</strong> paling banyak menyukai{" "}
                      <strong style={{ color: "#6F4E37" }}>{menu}</strong> ({count}x), kamu mungkin juga akan menyukai{" "}
                      <strong style={{ color: "#6F4E37" }}>{recommended}</strong>.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ item: menuItem, label: "Favorit" }, { item: recItem, label: "Rekomendasi" }].map(({ item, label }, j) => item && (
                      <div key={j} className="rounded-2xl overflow-hidden border" style={{ borderColor: "#F0E6DA" }}>
                        <div className="h-28 overflow-hidden">
                          <img src={`${item.image}${item.image.includes("?") ? "&" : "?"}auto=format&fit=crop&q=80&w=300`} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-2.5">
                          <span className="text-[10px] font-bold uppercase" style={{ color: "#D4A373" }}>{label}</span>
                          <p className="font-bold text-xs mt-0.5" style={{ color: "#2E1F17" }}>{item.name}</p>
                          <p className="text-xs" style={{ color: "#6F4E37" }}>Rp {item.price.toLocaleString("id-ID")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CRM FEATURES */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#2E1F17" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "rgba(212,163,115,0.2)", color: "#D4A373" }}>Teknologi CRM</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#FFF8F2", fontFamily: "serif" }}>Cara Kerja Sistem CRM El-Coffee</h2>
            <p className="text-sm" style={{ color: "#C4A882" }}>Platform CRM kami dirancang untuk memahami dan melayani setiap pelanggan secara personal.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Total Revenue (Mei)", value: "Rp " + (totalRevenue / 1_000_000).toFixed(1) + "Jt" },
              { label: "Total Transaksi",     value: ordersData.length + " Order" },
              { label: "Top Payment",         value: topPayment },
              { label: "Customer Aktif",      value: customersData.filter(c => c.memberStatus === "Active" || c.memberStatus === "VIP").length + " Member" },
            ].map((s, i) => (
              <div key={i} className="text-center p-5 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,163,115,0.2)" }}>
                <div className="text-xl font-bold" style={{ color: "#D4A373", fontFamily: "serif" }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ color: "#A07855" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎯", title: "Personalized Promotion", desc: "Sistem CRM menganalisis histori pembelian dan memberikan promo yang relevan untuk setiap pelanggan secara otomatis." },
              { icon: "👑", title: "Customer Loyalty",       desc: "Semakin sering bertransaksi, semakin tinggi level keanggotaan. Sistem mencatat setiap interaksi pelanggan secara real-time." },
              { icon: "📋", title: "Purchase History",       desc: "Seluruh riwayat transaksi pelanggan tersimpan secara terstruktur dan dapat diakses kapan saja melalui akun member." },
              { icon: "🤖", title: "Smart Recommendation",   desc: "Algoritma rekomendasi menyarankan menu berdasarkan pola pembelian dan preferensi menu favorit pelanggan sejenis." },
            ].map((f, i) => (
              <div key={i} className="rounded-3xl p-6 border transition-all duration-300"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(212,163,115,0.2)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(212,163,115,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(212,163,115,0.2)"; }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>{f.icon}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "#FFF8F2" }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#A07855" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
