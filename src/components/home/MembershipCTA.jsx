import { Link } from "react-router-dom";

export default function MembershipCTA() {
  return (
    <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#6F4E37" }}>
      <div className="max-w-3xl mx-auto text-center space-y-7">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#F5E6D8" }}>✦ Bergabung Sekarang</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug" style={{ color: "#FFFFFF", fontFamily: "serif" }}>
          Gabung menjadi Member El-Coffee sekarang dan nikmati berbagai keuntungan.
        </h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: "#F5E6D8" }}>
          Kumpulkan poin di setiap pembelian, dapatkan reward eksklusif, dan rasakan pengalaman kopi yang lebih dari sekadar secangkir minuman.
        </p>
        <Link to="/register" className="inline-block px-10 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all hover:opacity-90" style={{ backgroundColor: "#D4A373", color: "#2E1F17" }}>
          Daftar Sekarang
        </Link>
      </div>
    </section>
  );
}
