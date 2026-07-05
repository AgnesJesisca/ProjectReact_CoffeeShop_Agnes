import { Link } from "react-router-dom";

export default function HeroSection({ revenueData, customersData, ordersData }) {
  return (
    <section id="home" className="min-h-[88vh] flex items-center px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center py-16 lg:py-0">
        <div className="space-y-7">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>☕ Premium Coffee CRM Experience</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: "#2E1F17", fontFamily: "serif" }}>
            More Than Coffee,<br />
            <span style={{ color: "#6F4E37" }}>It's Your Daily</span><br />
            Experience
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: "#7A5C48" }}>
            El-Coffee hadir dengan sistem CRM terintegrasi — kumpulkan poin, naik level, klaim reward, dan nikmati pengalaman personal di setiap kunjungan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link to="/register" className="px-8 py-3.5 rounded-2xl font-semibold text-white text-sm shadow-md hover:opacity-90 text-center" style={{ backgroundColor: "#6F4E37" }}>Join Membership</Link>
            <Link to="/login"    className="px-8 py-3.5 rounded-2xl font-semibold text-sm border hover:opacity-80 text-center" style={{ border: "2px solid #6F4E37", color: "#6F4E37" }}>Login</Link>
          </div>
          <div className="flex gap-6 pt-4">
            {[
              { val: revenueData.length + "hr",  label: "Data Aktif"  },
              { val: customersData.length + "+", label: "Member"      },
              { val: ordersData.length + "+",    label: "Transaksi"   },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold" style={{ color: "#6F4E37" }}>{s.val}</div>
                <div className="text-xs" style={{ color: "#7A5C48" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center shadow-inner" style={{ background: "radial-gradient(circle at 35% 35%, #F5E6D8, #D4A373)" }}>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-40" style={{ backgroundColor: "#D4A373" }} />
            <div className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full opacity-30" style={{ backgroundColor: "#6F4E37" }} />
            <span className="text-8xl md:text-9xl select-none">☕</span>
            <div className="absolute top-6 right-0 md:-right-6 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md" style={{ backgroundColor: "#FFFFFF", color: "#6F4E37" }}>Premium Beans ✦</div>
            <div className="absolute bottom-10 left-0 md:-left-6 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md" style={{ backgroundColor: "#FFFFFF", color: "#6F4E37" }}>Fresh Daily 🌿</div>
          </div>
        </div>
      </div>
    </section>
  );
}
