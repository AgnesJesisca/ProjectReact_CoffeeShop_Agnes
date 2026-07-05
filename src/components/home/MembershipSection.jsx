import { Link } from "react-router-dom";

const loyaltyColor = {
  Bronze:   { bg: "#FDF0E8", text: "#9B5D2E", border: "#E8C9A8" },
  Silver:   { bg: "#F3F4F6", text: "#4B5563", border: "#D1D5DB" },
  Gold:     { bg: "#FFFBEB", text: "#92400E", border: "#FCD34D" },
  Platinum: { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD" },
  VIP:      { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD" },
};

const tiers = [
  { level: "Bronze",   icon: "🥉", points: "0 – 499 Poin",       gradient: "linear-gradient(135deg,#FDF0E8,#F5DEC8)", border: "#E8C9A8", badge: "#9B5D2E", badgeBg: "#FDF0E8",
    benefits: ["Cashback 2%","Birthday Voucher","E-Card Member Digital","Akses Katalog Reward"] },
  { level: "Silver",   icon: "🥈", points: "500 – 999 Poin",     gradient: "linear-gradient(135deg,#F3F4F6,#E5E7EB)", border: "#D1D5DB", badge: "#374151", badgeBg: "#F3F4F6",
    benefits: ["Cashback 5%","Free Upsize Drink","Birthday Voucher","Prioritas Antrean Outlet"] },
  { level: "Gold",     icon: "🥇", points: "1.000 – 1.999 Poin", gradient: "linear-gradient(135deg,#FFFBEB,#FEF3C7)", border: "#FCD34D", badge: "#92400E", badgeBg: "#FFFBEB",
    benefits: ["Cashback 10%","Free Drink / 10 Transaksi","Priority Promo","Birthday Voucher + Cake"] },
  { level: "Platinum", icon: "💎", points: "≥ 2.000 Poin",       gradient: "linear-gradient(135deg,#F5F3FF,#EDE9FE)", border: "#C4B5FD", badge: "#5B21B6", badgeBg: "#F5F3FF",
    benefits: ["Cashback 15%","Free Menu Setiap Bulan","Exclusive Event Access","Priority Service VIP"] },
];

export default function MembershipSection({ progressMembers }) {
  return (
    <>
      {/* MEMBERSHIP PROGRAM — 4 level card */}
      <section id="membership" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Program Keanggotaan</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Tingkat Apresiasi Member</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>Semakin sering bertransaksi, semakin tinggi level — semakin eksklusif benefit yang Anda dapatkan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <div key={i} className="rounded-3xl p-6 flex flex-col justify-between border transition-all duration-300 cursor-default"
                style={{ background: tier.gradient, borderColor: tier.border, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div>
                  <div className="text-4xl mb-3">{tier.icon}</div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>{tier.level}</h3>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ backgroundColor: tier.badgeBg, color: tier.badge, border: `1px solid ${tier.border}` }}>{tier.level}</span>
                  </div>
                  <p className="text-xs font-semibold mb-5" style={{ color: tier.badge }}>{tier.points}</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((b, bi) => (
                      <li key={bi} className="flex items-center gap-2 text-sm" style={{ color: "#2E1F17" }}>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: tier.border, color: tier.badge }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/register" className="mt-6 block text-center py-2.5 rounded-xl text-sm font-bold transition hover:opacity-90" style={{ backgroundColor: tier.badge, color: "#FFFFFF" }}>
                  Mulai {tier.level}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PROGRESS */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Simulasi Progress</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Membership Progress</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Pantau perjalanan poin Anda menuju level berikutnya. Data diperbarui setiap transaksi.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {progressMembers.map((m, i) => {
              const lc = loyaltyColor[m.levelName] || loyaltyColor["Bronze"];
              return (
                <div key={i} className="bg-white rounded-3xl p-7 border" style={{ borderColor: "#F0E6DA", boxShadow: "0 2px 16px rgba(111,78,55,0.08)" }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>{m.customerName.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-sm" style={{ color: "#2E1F17" }}>{m.customerName}</h4>
                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ backgroundColor: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>{m.levelName} Member</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-bold" style={{ color: "#6F4E37", fontFamily: "serif" }}>{m.points.toLocaleString("id-ID")}</span>
                    <span className="text-xs font-medium" style={{ color: "#7A5C48" }}>/ {m.nextTarget.toLocaleString("id-ID")} Poin</span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden mb-3" style={{ backgroundColor: "#F0E6DA" }}>
                    <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${m.pct}%`, background: "linear-gradient(90deg, #6F4E37, #D4A373)" }} />
                  </div>
                  <p className="text-xs" style={{ color: "#7A5C48" }}>
                    {m.pct < 100
                      ? <><strong style={{ color: "#6F4E37" }}>Sisa {(m.nextTarget - m.points).toLocaleString("id-ID")} poin</strong> menuju {m.nextLevel} Member</>
                      : <strong style={{ color: "#6F4E37" }}>Level maksimum tercapai! 🎉</strong>}
                  </p>
                  <div className="mt-4 pt-4 border-t text-xs flex items-center gap-2" style={{ borderColor: "#F0E6DA", color: "#7A5C48" }}>
                    <span>☕</span>
                    <span>Favorit: <strong style={{ color: "#2E1F17" }}>{m.favoriteMenu}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
