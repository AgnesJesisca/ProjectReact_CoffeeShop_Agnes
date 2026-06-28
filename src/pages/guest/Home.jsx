import { useState } from "react";
import { Link } from "react-router-dom";
import menuData from "../../data/menu.json";
import customersData from "../../data/customers.json";
import ordersData from "../../data/orders.json";
import revenueData from "../../data/revenue.json";

// ============================================================
// PRD V3 — Landing Page CRM El-Coffee
// Dikembangkan dari PRD V2. Tambahan PRD V3:
//   1. Membership Program (4 level)
//   2. Membership Progress (simulasi poin)
//   3. Reward & Voucher
//   4. Personalized Recommendation
//   5. Loyalty Program (timeline)
//   6. Membership Benefits
//   7. CRM Features
//   8. FAQ (accordion)
//   9. Contact Us (form)
//  10. Floating Chat Assistant
// ============================================================

// ---------- Data helpers ----------
const bestSellerMenu = menuData.slice(0, 6);

const featuredReviews = customersData
  .filter((c) => c.review && c.review.length > 30)
  .slice(0, 6);

// Statistik dari revenue.json
const totalRevenue = revenueData.reduce((s, r) => s + r.totalRevenue, 0);
const totalOrdersRevenue = revenueData.reduce((s, r) => s + r.totalOrders, 0);

// Metode pembayaran terbanyak dari orders.json
const paymentCount = ordersData.reduce((acc, o) => {
  acc[o.paymentMethod] = (acc[o.paymentMethod] || 0) + 1;
  return acc;
}, {});
const topPayment = Object.entries(paymentCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "QRIS";

// Simulasi member untuk Membership Progress (pakai 3 customer pertama)
const progressMembers = customersData.slice(0, 3).map((c) => {
  const points = Math.floor(c.totalSpent / 1500);
  const nextTarget = points < 500 ? 500 : points < 1000 ? 1000 : points < 2000 ? 2000 : 3000;
  const levelName = points < 500 ? "Bronze" : points < 1000 ? "Silver" : points < 2000 ? "Gold" : "Platinum";
  const nextLevel = points < 500 ? "Silver" : points < 1000 ? "Gold" : points < 2000 ? "Platinum" : "Platinum";
  const pct = Math.min(Math.round((points / nextTarget) * 100), 100);
  return { ...c, points, nextTarget, levelName, nextLevel, pct };
});

// Rekomendasi personal dari favoriteMenu gold customers
const goldCustomers = customersData.filter((c) => c.loyalty === "Gold");
const favMenuFreq = goldCustomers.reduce((acc, c) => {
  if (c.favoriteMenu) acc[c.favoriteMenu] = (acc[c.favoriteMenu] || 0) + 1;
  return acc;
}, {});
const topFavMenus = Object.entries(favMenuFreq)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 4)
  .map(([menu, count]) => ({ menu, count }));

// Pasangan rekomendasi
const menuPairs = {
  "Caramel Latte": "Vanilla Latte",
  "Flat White": "Piccolo",
  "Hazelnut Latte": "Cappuccino",
  "Vanilla Latte": "Caramel Latte",
};

// Warna badge loyalty
const loyaltyColor = {
  Bronze: { bg: "#FDF0E8", text: "#9B5D2E", border: "#E8C9A8" },
  Silver: { bg: "#F3F4F6", text: "#4B5563", border: "#D1D5DB" },
  Gold:   { bg: "#FFFBEB", text: "#92400E", border: "#FCD34D" },
  Platinum: { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD" },
  VIP:    { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD" },
};

export default function GuestHome() {
  // Navbar mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState(null);

  // Contact form
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Chat assistant
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Halo 👋 Selamat datang di El-Coffee! Ada yang bisa kami bantu?" },
  ]);

  // Voucher claim state
  const [claimedVouchers, setClaimedVouchers] = useState({});

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: "", email: "", message: "" });
      }, 4000);
    }
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Terima kasih pesannya! Tim El-Coffee akan segera membalas. Untuk info lebih lanjut, silakan hubungi kami via WhatsApp. ☕",
        },
      ]);
    }, 800);
  };

  const handleClaimVoucher = (code) => {
    setClaimedVouchers((prev) => ({ ...prev, [code]: true }));
  };

  const faqItems = [
    {
      q: "Bagaimana cara mendapatkan poin?",
      a: "Setiap transaksi senilai Rp 1.500 di El-Coffee akan memberikan 1 poin keanggotaan secara otomatis setelah Anda terdaftar sebagai member.",
    },
    {
      q: "Bagaimana cara redeem voucher?",
      a: "Tunjukkan kode voucher atau QR Code kepada kasir sebelum melakukan pembayaran. Voucher akan diverifikasi dan potongan harga langsung diterapkan.",
    },
    {
      q: "Apakah poin memiliki masa berlaku?",
      a: "Poin berlaku selama 12 bulan sejak transaksi terakhir. Pastikan Anda aktif bertransaksi agar poin tidak hangus.",
    },
    {
      q: "Bagaimana cara naik ke Gold Member?",
      a: "Kumpulkan minimal 1.000 poin untuk naik ke level Gold. Semakin sering bertransaksi, semakin cepat level Anda meningkat.",
    },
    {
      q: "Apakah benefit bisa digunakan bersamaan?",
      a: "Beberapa benefit dapat dikombinasikan, namun voucher promo tidak dapat digabung dengan cashback di transaksi yang sama.",
    },
  ];

  const vouchers = [
    { code: "ELCF-LATTE01", reward: "Free Latte", points: 1000, status: "Available", desc: "Tukarkan dengan 1 gelas Latte pilihan ukuran reguler." },
    { code: "ELCF-CAKE02",  reward: "Free Slice Cake", points: 800, status: "Available", desc: "Dapatkan 1 potong cake pilihan tersedia di outlet." },
    { code: "ELCF-20OFF03", reward: "Diskon 20%", points: 500, status: "Available", desc: "Potongan 20% untuk total belanja minimal Rp 50.000." },
    { code: "ELCF-BDAY04",  reward: "Birthday Free Drink", points: 0, status: "Available", desc: "Khusus hari ulang tahun Anda. Berlaku 1 hari penuh." },
  ];

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: "#FFF8F2", color: "#2E1F17" }}>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base shadow" style={{ backgroundColor: "#6F4E37" }}>☕</div>
            <span className="text-xl font-bold tracking-tight" style={{ color: "#2E1F17", fontFamily: "serif" }}>El-Coffee</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[["#home","Home"],["#about","About"],["#menu","Menu"],["#membership","Member"],["#promo","Promo"],["#faq","FAQ"],["#contact","Kontak"]].map(([href, label]) => (
              <a key={href} href={href} className="hover:opacity-60 transition-opacity" style={{ color: "#2E1F17" }}>{label}</a>
            ))}
            <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-semibold border transition hover:opacity-80" style={{ border: "1.5px solid #6F4E37", color: "#6F4E37" }}>Login</Link>
            <Link to="/register" className="px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90" style={{ backgroundColor: "#6F4E37" }}>Register</Link>
          </div>
          <button className="md:hidden p-2 rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" style={{ color: "#2E1F17" }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-6 py-5 flex flex-col gap-4 text-sm font-medium" style={{ borderColor: "#F0E6DA", backgroundColor: "#FFFFFF" }}>
            {[["#home","Home"],["#about","About"],["#menu","Menu"],["#membership","Member"],["#promo","Promo"],["#faq","FAQ"],["#contact","Kontak"]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} style={{ color: "#2E1F17" }}>{label}</a>
            ))}
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl font-semibold border" style={{ border: "1.5px solid #6F4E37", color: "#6F4E37" }}>Login</Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl font-semibold text-white" style={{ backgroundColor: "#6F4E37" }}>Register</Link>
          </div>
        )}
      </nav>
      {/* ── END NAVBAR ─────────────────────────────────────── */}

      {/* ── HERO ───────────────────────────────────────────── */}
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
              <Link to="/login" className="px-8 py-3.5 rounded-2xl font-semibold text-sm border hover:opacity-80 text-center" style={{ border: "2px solid #6F4E37", color: "#6F4E37" }}>Login</Link>
            </div>
            <div className="flex gap-6 pt-4">
              {[
                { val: revenueData.length + "hr", label: "Data Aktif" },
                { val: customersData.length + "+", label: "Member" },
                { val: ordersData.length + "+", label: "Transaksi" },
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
      {/* ── END HERO ───────────────────────────────────────── */}

      {/* ── ABOUT ──────────────────────────────────────────── */}
      <section id="about" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg h-80 md:h-[440px]">
            <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800" alt="El-Coffee Interior" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Tentang Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-snug" style={{ color: "#2E1F17", fontFamily: "serif" }}>Secangkir Kopi Penuh Cerita & Dedikasi</h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: "#7A5C48" }}>El-Coffee lahir dari kecintaan mendalam pada kekayaan biji kopi Nusantara. Kami bermitra langsung dengan petani lokal dari Gayo, Kintamani, hingga Toraja untuk menghadirkan kualitas terbaik yang diproses secara etis dan berkelanjutan.</p>
            <div className="space-y-4 pt-2">
              {[
                { icon: "🎯", title: "Visi", desc: "Menjadi coffee shop lokal terpercaya yang mengangkat cita rasa kopi Indonesia ke panggung dunia." },
                { icon: "💡", title: "Misi", desc: "Menyajikan kopi berkualitas tinggi dengan pelayanan hangat, mendukung petani lokal, dan memberikan pengalaman tak terlupakan." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm mb-1" style={{ color: "#2E1F17" }}>{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
              {[["🫘","Premium Coffee Beans","Biji kopi Specialty Grade pilihan."],["🤝","Friendly Service","Barista siap memberi rekomendasi terbaik."]].map(([icon, title, desc], i) => (
                <div key={i} className="p-4 rounded-2xl" style={{ backgroundColor: "#FFF8F2" }}>
                  <div className="text-xl mb-1">{icon}</div>
                  <h5 className="font-bold text-sm" style={{ color: "#2E1F17" }}>{title}</h5>
                  <p className="text-xs mt-1" style={{ color: "#7A5C48" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── END ABOUT ──────────────────────────────────────── */}

      {/* ── WHY CHOOSE US ──────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Keunggulan Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Kenapa Harus El-Coffee?</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>Lebih dari sekadar kopi — pengalaman menyeluruh yang membuat Anda selalu ingin kembali.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "☕", iconBg: "#FEF3C7", title: "Premium Coffee Beans", desc: "Biji kopi Specialty Grade dari Gayo, Kintamani, dan Toraja. Dipilih langsung dari petani lokal terpercaya." },
              { icon: "🥐", iconBg: "#FFF7ED", title: "Fresh Daily Bakery", desc: "Pastri & snack dipanggang segar setiap pagi. Croissant, muffin, dan kue pilihan yang selalu hangat." },
              { icon: "📶", iconBg: "#EFF6FF", title: "Free Wi-Fi & Workspace", desc: "Koneksi internet stabil berkecepatan tinggi dengan banyak colokan dan meja nyaman untuk bekerja." },
              { icon: "💳", iconBg: "#F0FDF4", title: "Easy Cashless Payment", desc: "Bayar dengan QRIS, e-wallet, atau kartu debit/kredit. Transaksi cepat dan aman." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-7 rounded-3xl border transition-all duration-300 cursor-default"
                style={{ borderColor: "#F0E6DA", boxShadow: "0 1px 8px rgba(111,78,55,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(111,78,55,0.14)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#D4A373"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#F0E6DA"; }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5" style={{ backgroundColor: item.iconBg }}>{item.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#2E1F17" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── END WHY CHOOSE US ──────────────────────────────── */}

      {/* ── STATISTICS ─────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#2E1F17" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: menuData.length + "+", label: "Coffee Menu", icon: "☕" },
            { value: customersData.length + "+", label: "Happy Customers", icon: "😊" },
            { value: totalOrdersRevenue.toLocaleString("id-ID") + "+", label: "Orders Completed", icon: "✅" },
            { value: "4.9★", label: "Average Rating", icon: "⭐" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-7 rounded-3xl" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,163,115,0.2)" }}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "#D4A373", fontFamily: "serif" }}>{stat.value}</div>
              <div className="text-sm" style={{ color: "#C4A882" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      {/* ── END STATISTICS ─────────────────────────────────── */}

      {/* ── BEST SELLER MENU ───────────────────────────────── */}
      <section id="menu" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Menu Pilihan</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Best Seller El-Coffee</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Sajian terlaris pilihan komunitas — diracik dengan biji kopi terbaik dan bahan-bahan segar.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {bestSellerMenu.map((item) => (
              <div key={item.menuId} className="bg-white rounded-3xl overflow-hidden border transition-all duration-300"
                style={{ borderColor: "#F0E6DA", boxShadow: "0 1px 8px rgba(111,78,55,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(111,78,55,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div className="h-48 overflow-hidden">
                  <img src={`${item.image}${item.image.includes("?") ? "&" : "?"}auto=format&fit=crop&q=80&w=600`} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-base" style={{ color: "#2E1F17" }}>{item.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>{item.category}</span>
                  </div>
                  <p className="font-bold text-base mt-2" style={{ color: "#6F4E37" }}>Rp {item.price.toLocaleString("id-ID")}</p>
                  <button className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#6F4E37" }}>Order Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── END BEST SELLER MENU ───────────────────────────── */}

      {/* ── PROMO ──────────────────────────────────────────── */}
      <section id="promo" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Promo & Penawaran</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Nikmati Penawaran Spesial</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Promo terbatas setiap minggu — jangan sampai kehabisan!</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { badge: "Best Deal", badgeBg: "#FEF3C7", badgeText: "#92400E", icon: "🎁", iconBg: "#FEF9EE", title: "Buy 2 Get 1", desc: "Beli 2 minuman apa saja, gratis 1 minuman pilihan. Berlaku setiap hari pukul 14.00–16.00.", tag: "Setiap Hari", tagBg: "#F5E6D8", tagText: "#6F4E37" },
              { badge: "Weekend Only", badgeBg: "#EFF6FF", badgeText: "#1E40AF", icon: "🌅", iconBg: "#EFF6FF", title: "Weekend Promo", desc: "Diskon 20% untuk semua minuman di hari Sabtu & Minggu. Tunjukkan kode di kasir.", tag: "Sabtu & Minggu", tagBg: "#DBEAFE", tagText: "#1D4ED8" },
              { badge: "Pelajar", badgeBg: "#F0FDF4", badgeText: "#166534", icon: "🎓", iconBg: "#F0FDF4", title: "Student Discount", desc: "Tunjukkan kartu pelajar/mahasiswa dan dapatkan diskon 15% untuk semua menu.", tag: "Berlaku Setiap Hari", tagBg: "#DCFCE7", tagText: "#15803D" },
              { badge: "Member Exclusive", badgeBg: "#FDF4FF", badgeText: "#7E22CE", icon: "👑", iconBg: "#FDF4FF", title: "Birthday Treat", desc: "Rayakan ulang tahunmu di El-Coffee dan dapatkan 1 minuman gratis pilihan menu spesial dari kami.", tag: "Khusus Member", tagBg: "#F3E8FF", tagText: "#7E22CE" },
            ].map((promo, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300"
                style={{ borderColor: "#F0E6DA", boxShadow: "0 1px 8px rgba(111,78,55,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(111,78,55,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#D4A373"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#F0E6DA"; }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ backgroundColor: promo.badgeBg, color: promo.badgeText }}>{promo.badge}</span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: promo.iconBg }}>{promo.icon}</div>
                </div>
                <div className="space-y-2 flex-grow">
                  <h3 className="font-bold text-base" style={{ color: "#2E1F17" }}>{promo.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#7A5C48" }}>{promo.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: promo.tagBg, color: promo.tagText }}>{promo.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── END PROMO ──────────────────────────────────────── */}

      {/* ── CUSTOMER REVIEWS ───────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Testimoni</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Suara Pelanggan El-Coffee</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Ulasan autentik dari member yang telah merasakan pengalaman El-Coffee.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReviews.map((customer) => {
              const lc = loyaltyColor[customer.loyalty] || loyaltyColor["Bronze"];
              return (
                <div key={customer.customerId} className="p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300"
                  style={{ backgroundColor: "#FDFAF7", borderColor: "#F0E6DA", boxShadow: "0 1px 8px rgba(111,78,55,0.05)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(111,78,55,0.10)"; e.currentTarget.style.borderColor = "#D4A373"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.05)"; e.currentTarget.style.borderColor = "#F0E6DA"; }}>
                  <div className="flex gap-0.5 text-sm mb-3" style={{ color: "#F59E0B" }}>⭐⭐⭐⭐⭐</div>
                  <p className="text-sm leading-relaxed italic flex-grow" style={{ color: "#5C3D2E" }}>"{customer.review}"</p>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>{customer.customerName.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-sm" style={{ color: "#2E1F17" }}>{customer.customerName}</h4>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mt-0.5" style={{ backgroundColor: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>{customer.loyalty}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ── END CUSTOMER REVIEWS ───────────────────────────── */}

      {/* ── GALLERY ────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Galeri</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Suasana El-Coffee</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Sekilas pandang ruang, minuman, dan momen hangat yang menanti Anda.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800", alt: "Interior El-Coffee", tall: true },
              { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800", alt: "Secangkir Kopi Hangat", tall: false },
              { url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800", alt: "Espresso Shot", tall: false },
              { url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800", alt: "Latte Art", tall: false },
              { url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800", alt: "Cold Brew", tall: true },
              { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800", alt: "Fresh Croissant", tall: false },
            ].map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-3xl ${img.tall ? "row-span-2" : ""}`} style={{ height: img.tall ? "100%" : "220px", minHeight: img.tall ? "460px" : "220px" }}>
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" style={{ borderRadius: "1.5rem" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── END GALLERY ────────────────────────────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] MEMBERSHIP PROGRAM — 4 level card
      ══════════════════════════════════════════════════════ */}
      <section id="membership" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Program Keanggotaan</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Tingkat Apresiasi Member</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>Semakin sering bertransaksi, semakin tinggi level — semakin eksklusif benefit yang Anda dapatkan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { level: "Bronze", icon: "🥉", points: "0 – 499 Poin", gradient: "linear-gradient(135deg,#FDF0E8,#F5DEC8)", border: "#E8C9A8", badge: "#9B5D2E", badgeBg: "#FDF0E8",
                benefits: ["Cashback 2%", "Birthday Voucher", "E-Card Member Digital", "Akses Katalog Reward"] },
              { level: "Silver", icon: "🥈", points: "500 – 999 Poin", gradient: "linear-gradient(135deg,#F3F4F6,#E5E7EB)", border: "#D1D5DB", badge: "#374151", badgeBg: "#F3F4F6",
                benefits: ["Cashback 5%", "Free Upsize Drink", "Birthday Voucher", "Prioritas Antrean Outlet"] },
              { level: "Gold",   icon: "🥇", points: "1.000 – 1.999 Poin", gradient: "linear-gradient(135deg,#FFFBEB,#FEF3C7)", border: "#FCD34D", badge: "#92400E", badgeBg: "#FFFBEB",
                benefits: ["Cashback 10%", "Free Drink / 10 Transaksi", "Priority Promo", "Birthday Voucher + Cake"] },
              { level: "Platinum", icon: "💎", points: "≥ 2.000 Poin", gradient: "linear-gradient(135deg,#F5F3FF,#EDE9FE)", border: "#C4B5FD", badge: "#5B21B6", badgeBg: "#F5F3FF",
                benefits: ["Cashback 15%", "Free Menu Setiap Bulan", "Exclusive Event Access", "Priority Service VIP"] },
            ].map((tier, i) => (
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
      {/* ── END MEMBERSHIP PROGRAM ─────────────────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] MEMBERSHIP PROGRESS — simulasi poin 3 member
      ══════════════════════════════════════════════════════ */}
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
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>{m.customerName.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-sm" style={{ color: "#2E1F17" }}>{m.customerName}</h4>
                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ backgroundColor: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>{m.levelName} Member</span>
                    </div>
                  </div>
                  {/* Poin */}
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-bold" style={{ color: "#6F4E37", fontFamily: "serif" }}>{m.points.toLocaleString("id-ID")}</span>
                    <span className="text-xs font-medium" style={{ color: "#7A5C48" }}>/ {m.nextTarget.toLocaleString("id-ID")} Poin</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-3 rounded-full overflow-hidden mb-3" style={{ backgroundColor: "#F0E6DA" }}>
                    <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${m.pct}%`, background: "linear-gradient(90deg, #6F4E37, #D4A373)" }} />
                  </div>
                  <p className="text-xs" style={{ color: "#7A5C48" }}>
                    {m.pct < 100
                      ? <>Sisa <strong style={{ color: "#6F4E37" }}>{(m.nextTarget - m.points).toLocaleString("id-ID")} poin</strong> menuju {m.nextLevel} Member</>
                      : <strong style={{ color: "#6F4E37" }}>Level maksimum tercapai! 🎉</strong>}
                  </p>
                  {/* Favorite menu */}
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
      {/* ── END MEMBERSHIP PROGRESS ────────────────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] REWARD & VOUCHER — klaim voucher interaktif
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Reward Center</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Klaim Reward & Voucher</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Tukarkan poin Anda dengan voucher eksklusif. Tunjukkan QR Code kepada kasir saat bertransaksi.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vouchers.map((v) => {
              const claimed = claimedVouchers[v.code];
              return (
                <div key={v.code} className="bg-white rounded-3xl border overflow-hidden transition-all duration-300"
                  style={{ borderColor: claimed ? "#D4A373" : "#F0E6DA", boxShadow: claimed ? "0 4px 20px rgba(212,163,115,0.3)" : "0 1px 8px rgba(111,78,55,0.06)" }}>
                  {/* Top strip */}
                  <div className="h-2" style={{ background: claimed ? "linear-gradient(90deg,#D4A373,#6F4E37)" : "linear-gradient(90deg,#F0E6DA,#F5E6D8)" }} />
                  <div className="p-6">
                    {/* QR placeholder */}
                    <div className="w-full h-24 rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed" style={{ borderColor: "#D4A373", backgroundColor: "#FFF8F2" }}>
                      {claimed ? (
                        <div className="text-center">
                          <div className="text-2xl">✅</div>
                          <p className="text-[10px] font-bold mt-1" style={{ color: "#6F4E37" }}>Diklaim</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-2xl">▦</div>
                          <p className="text-[10px] font-semibold mt-1" style={{ color: "#7A5C48" }}>QR Voucher</p>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-base mb-1" style={{ color: "#2E1F17" }}>{v.reward}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "#7A5C48" }}>{v.desc}</p>
                    {/* Kode voucher */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-dashed" style={{ backgroundColor: "#FFF8F2", borderColor: "#D4A373", color: "#6F4E37" }}>{v.code}</span>
                      {v.points > 0 && <span className="text-xs font-semibold" style={{ color: "#7A5C48" }}>{v.points.toLocaleString("id-ID")} poin</span>}
                    </div>
                    {/* Status */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: claimed ? "#D1FAE5" : "#F0FDF4", color: claimed ? "#065F46" : "#15803D" }}>
                        {claimed ? "Berhasil Diklaim ✓" : "Available"}
                      </span>
                    </div>
                    {claimed ? (
                      <div className="text-center text-xs font-semibold p-3 rounded-xl" style={{ backgroundColor: "#FFF8F2", color: "#6F4E37" }}>
                        Voucher Code: <strong>{v.code}</strong>
                      </div>
                    ) : (
                      <button onClick={() => handleClaimVoucher(v.code)} className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90" style={{ backgroundColor: "#6F4E37" }}>
                        Claim Reward
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ── END REWARD & VOUCHER ───────────────────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] PERSONALIZED RECOMMENDATION
          Berdasarkan favoriteMenu member Gold dari customers.json
      ══════════════════════════════════════════════════════ */}
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
              const menuItem = menuData.find((m) => m.name === menu) || menuData[i];
              const recItem  = menuData.find((m) => m.name === recommended) || menuData[i + 1];
              return (
                <div key={i} className="bg-white rounded-3xl p-6 border flex flex-col gap-4" style={{ borderColor: "#F0E6DA", boxShadow: "0 2px 12px rgba(111,78,55,0.07)" }}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">🤖</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#2E1F17" }}>
                      Karena pelanggan <strong style={{ color: "#6F4E37" }}>Gold</strong> paling banyak menyukai{" "}
                      <strong style={{ color: "#6F4E37" }}>{menu}</strong> ({count}x),
                      kamu mungkin juga akan menyukai{" "}
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
      {/* ── END PERSONALIZED RECOMMENDATION ───────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] LOYALTY PROGRAM — timeline vertikal
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Cara Kerja</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Program Loyalitas</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>6 langkah mudah dari pendaftaran hingga reward berbagai keuntungan eksklusif.</p>
          </div>
          <div className="flex flex-col items-center gap-0">
            {[
              { icon: "✅", title: "Daftar Member", desc: "Buat akun El-Coffee secara gratis dan mulai perjalanan keanggotaan Anda.", color: "#6F4E37", bg: "#F5E6D8" },
              { icon: "☕", title: "Lakukan Pembelian", desc: "Beli minuman atau makanan favorit Anda di outlet El-Coffee.", color: "#D97706", bg: "#FEF3C7" },
              { icon: "⭐", title: "Kumpulkan Poin", desc: "Setiap Rp 1.500 transaksi otomatis dikonversi menjadi 1 poin keanggotaan.", color: "#0284C7", bg: "#E0F2FE" },
              { icon: "🏆", title: "Naik Level", desc: "Poin terkumpul membuka level Bronze → Silver → Gold → Platinum secara otomatis.", color: "#7C3AED", bg: "#EDE9FE" },
              { icon: "🎁", title: "Klaim Reward", desc: "Tukarkan poin dengan voucher, cashback, atau benefit eksklusif pilihan Anda.", color: "#BE185D", bg: "#FCE7F3" },
              { icon: "🎟️", title: "Dapatkan Voucher", desc: "Voucher langsung bisa digunakan di kasir atau disimpan untuk transaksi berikutnya.", color: "#059669", bg: "#D1FAE5" },
            ].map((step, i, arr) => (
              <div key={i} className="flex flex-col items-center w-full max-w-lg">
                <div className="flex items-center gap-5 w-full bg-white rounded-3xl px-6 py-5 border transition-all duration-300"
                  style={{ borderColor: "#F0E6DA", boxShadow: "0 1px 8px rgba(111,78,55,0.06)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(111,78,55,0.12)"; e.currentTarget.style.borderColor = "#D4A373"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.06)"; e.currentTarget.style.borderColor = "#F0E6DA"; }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: step.bg, color: step.color }}>{step.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: "#2E1F17" }}>{step.title}</h4>
                    <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#7A5C48" }}>{step.desc}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-6" style={{ backgroundColor: "#D4A373" }} />
                    <span style={{ color: "#D4A373" }}>▼</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── END LOYALTY PROGRAM ────────────────────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] MEMBERSHIP BENEFITS — 6 benefit card + icon
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Keuntungan Member</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Membership Benefits</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Nikmati berbagai keuntungan eksklusif yang dirancang khusus untuk member setia El-Coffee.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎂", title: "Birthday Reward", desc: "Dapatkan hadiah spesial di hari ulang tahun Anda — free drink dan voucher kejutan langsung di akun member.", bg: "#FEF3C7", color: "#92400E" },
              { icon: "💰", title: "Cashback Otomatis", desc: "Setiap transaksi menghasilkan cashback sesuai level member Anda. Langsung masuk ke saldo reward.", bg: "#D1FAE5", color: "#065F46" },
              { icon: "🏷️", title: "Exclusive Promo", desc: "Akses promo khusus member yang tidak tersedia untuk pelanggan umum, termasuk early access menu baru.", bg: "#E0F2FE", color: "#075985" },
              { icon: "⚡", title: "Priority Queue", desc: "Member Gold & Platinum mendapatkan jalur prioritas di outlet. Tidak perlu menunggu antrean panjang.", bg: "#F3E8FF", color: "#6D28D9" },
              { icon: "✨", title: "Double Point Event", desc: "Di hari-hari tertentu, setiap transaksi menghasilkan 2x poin. Cek kalender event member secara berkala.", bg: "#FEE2E2", color: "#991B1B" },
              { icon: "🎫", title: "Voucher Bulanan", desc: "Member aktif mendapatkan voucher kejutan setiap bulan — bisa berupa diskon, free menu, atau upgrade ukuran.", bg: "#FFF7ED", color: "#C2410C" },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border transition-all duration-300"
                style={{ borderColor: "#F0E6DA", boxShadow: "0 1px 8px rgba(111,78,55,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(111,78,55,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#D4A373"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#F0E6DA"; }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: b.bg }}>{b.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#2E1F17" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── END MEMBERSHIP BENEFITS ────────────────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] CRM FEATURES — cara kerja sistem CRM
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#2E1F17" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "rgba(212,163,115,0.2)", color: "#D4A373" }}>Teknologi CRM</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#FFF8F2", fontFamily: "serif" }}>Cara Kerja Sistem CRM El-Coffee</h2>
            <p className="text-sm" style={{ color: "#C4A882" }}>Platform CRM kami dirancang untuk memahami dan melayani setiap pelanggan secara personal.</p>
          </div>
          {/* Statistik CRM dari data nyata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Total Revenue (Mei)", value: "Rp " + (totalRevenue / 1_000_000).toFixed(1) + "Jt" },
              { label: "Total Transaksi", value: ordersData.length + " Order" },
              { label: "Top Payment", value: topPayment },
              { label: "Customer Aktif", value: customersData.filter(c => c.memberStatus === "Active" || c.memberStatus === "VIP").length + " Member" },
            ].map((s, i) => (
              <div key={i} className="text-center p-5 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,163,115,0.2)" }}>
                <div className="text-xl font-bold" style={{ color: "#D4A373", fontFamily: "serif" }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ color: "#A07855" }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Fitur CRM */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎯", title: "Personalized Promotion", desc: "Sistem CRM menganalisis histori pembelian dan memberikan promo yang relevan untuk setiap pelanggan secara otomatis.", color: "#FEF3C7" },
              { icon: "👑", title: "Customer Loyalty", desc: "Semakin sering bertransaksi, semakin tinggi level keanggotaan. Sistem mencatat setiap interaksi pelanggan secara real-time.", color: "#E0F2FE" },
              { icon: "📋", title: "Purchase History", desc: "Seluruh riwayat transaksi pelanggan tersimpan secara terstruktur dan dapat diakses kapan saja melalui akun member.", color: "#D1FAE5" },
              { icon: "🤖", title: "Smart Recommendation", desc: "Algoritma rekomendasi menyarankan menu berdasarkan pola pembelian dan preferensi menu favorit pelanggan sejenis.", color: "#F3E8FF" },
            ].map((f, i) => (
              <div key={i} className="rounded-3xl p-6 border transition-all duration-300"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(212,163,115,0.2)", boxShadow: "none" }}
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
      {/* ── END CRM FEATURES ───────────────────────────────── */}

      {/* ── CTA ────────────────────────────────────────────── */}
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
      {/* ── END CTA ────────────────────────────────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] FAQ — accordion sederhana
      ══════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Pertanyaan yang Sering Ditanyakan</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Temukan jawaban atas pertanyaan umum seputar program keanggotaan El-Coffee.</p>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border overflow-hidden transition-all duration-200" style={{ borderColor: openFaq === i ? "#D4A373" : "#F0E6DA" }}>
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: "#2E1F17" }}>{item.q}</span>
                  <span className="text-xl flex-shrink-0 transition-transform duration-300" style={{ color: "#6F4E37", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── END FAQ ────────────────────────────────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] CONTACT US — form kontak
      ══════════════════════════════════════════════════════ */}
      <section id="contact" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          {/* Info kiri */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Hubungi Kami</span>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Terhubung dengan El-Coffee</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>Ada pertanyaan tentang keanggotaan, poin, atau ingin memberi masukan? Tim kami siap membantu Anda.</p>
            </div>
            <div className="space-y-4 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
              {[
                { icon: "💬", label: "WhatsApp", value: "+62 812-3456-7890", bg: "#D1FAE5", color: "#065F46" },
                { icon: "✉️", label: "Email Resmi", value: "hello@elcoffee.com", bg: "#FEF3C7", color: "#92400E" },
                { icon: "🕒", label: "Jam Operasional", value: "Setiap Hari — 07.00 s/d 22.00 WIB", bg: "#EFF6FF", color: "#1E40AF" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: c.bg }}>{c.icon}</div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#A07855" }}>{c.label}</h4>
                    <p className="text-sm font-medium" style={{ color: "#2E1F17" }}>{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
              <h4 className="font-bold text-sm" style={{ color: "#2E1F17" }}>Lokasi Outlet</h4>
              {[
                ["El-Coffee Senopati (HQ)", "Jl. Senopati Raya No. 45, Kebayoran Baru, Jakarta Selatan"],
                ["El-Coffee Dago", "Jl. Ir. H. Juanda No. 102, Dago, Bandung"],
                ["El-Coffee Prawirotaman", "Jl. Prawirotaman No. 18, Brontokusuman, Yogyakarta"],
              ].map(([name, addr], i) => (
                <div key={i} className="flex gap-2.5">
                  <span style={{ color: "#D4A373" }}>📍</span>
                  <div>
                    <p className="font-bold text-xs" style={{ color: "#2E1F17" }}>{name}</p>
                    <p className="text-xs" style={{ color: "#7A5C48" }}>{addr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form kanan */}
          <div className="bg-white rounded-3xl border p-8" style={{ borderColor: "#F0E6DA", boxShadow: "0 2px 20px rgba(111,78,55,0.08)" }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: "#2E1F17", fontFamily: "serif" }}>Kirim Pesan Langsung</h3>
            {formSubmitted ? (
              <div className="text-center p-8 rounded-2xl space-y-2" style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                <div className="text-3xl">✅</div>
                <h4 className="font-bold" style={{ color: "#065F46" }}>Pesan Berhasil Terkirim!</h4>
                <p className="text-sm" style={{ color: "#059669" }}>Tim El-Coffee akan menghubungi Anda segera.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                {[
                  { label: "Nama Lengkap", type: "text", key: "name", placeholder: "Masukkan nama Anda" },
                  { label: "Alamat Email", type: "email", key: "email", placeholder: "nama@email.com" },
                ].map(({ label, type, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#A07855" }}>{label}</label>
                    <input type={type} value={contactForm[key]} onChange={(e) => setContactForm({ ...contactForm, [key]: e.target.value })}
                      placeholder={placeholder} required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      style={{ backgroundColor: "#FFF8F2", border: "1.5px solid #F0E6DA", color: "#2E1F17" }}
                      onFocus={(e) => e.target.style.borderColor = "#6F4E37"}
                      onBlur={(e) => e.target.style.borderColor = "#F0E6DA"} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#A07855" }}>Pesan</label>
                  <textarea rows="4" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tuliskan pertanyaan atau saran Anda..." required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors resize-none"
                    style={{ backgroundColor: "#FFF8F2", border: "1.5px solid #F0E6DA", color: "#2E1F17" }}
                    onFocus={(e) => e.target.style.borderColor = "#6F4E37"}
                    onBlur={(e) => e.target.style.borderColor = "#F0E6DA"} />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition hover:opacity-90" style={{ backgroundColor: "#6F4E37" }}>
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      {/* ── END CONTACT US ─────────────────────────────────── */}

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="py-14 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#2E1F17", color: "#D4A373" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base" style={{ backgroundColor: "#6F4E37" }}>☕</div>
              <span className="text-xl font-bold" style={{ color: "#FFF8F2", fontFamily: "serif" }}>El-Coffee</span>
            </div>
            <p className="text-xs max-w-xs leading-relaxed" style={{ color: "#A07855" }}>More Than Coffee, It's Your Daily Experience.</p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <span style={{ color: "#D4A373" }}>📍</span>
              <span style={{ color: "#C4A882" }}>Jl. Senopati Raya No. 45, Kebayoran Baru, Jakarta Selatan</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span style={{ color: "#D4A373" }}>✉️</span>
              <span style={{ color: "#C4A882" }}>hello@elcoffee.com</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span style={{ color: "#D4A373" }}>💬</span>
              <span style={{ color: "#C4A882" }}>+62 812-3456-7890</span>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t text-center text-xs" style={{ borderColor: "#3D2517", color: "#7A5C48" }}>
          &copy; 2026 El-Coffee. All rights reserved.
        </div>
      </footer>
      {/* ── END FOOTER ─────────────────────────────────────── */}

      {/* ══════════════════════════════════════════════════════
          [BARU V3] FLOATING CHAT ASSISTANT
      ══════════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {chatOpen && (
          <div className="mb-4 w-80 rounded-3xl overflow-hidden border" style={{ backgroundColor: "#FFFFFF", borderColor: "#F0E6DA", boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ backgroundColor: "#6F4E37" }}>
              <div className="flex items-center gap-2">
                <span className="text-lg">☕</span>
                <div>
                  <h4 className="text-sm font-bold text-white">El-Coffee Assistant</h4>
                  <p className="text-[10px]" style={{ color: "#F5E6D8" }}>Online — Siap membantu</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white text-xl font-bold leading-none hover:opacity-70">&times;</button>
            </div>

            {/* Pesan */}
            <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: "260px", backgroundColor: "#FFF8F2" }}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed"
                    style={msg.sender === "user"
                      ? { backgroundColor: "#6F4E37", color: "#FFFFFF", borderBottomRightRadius: "4px" }
                      : { backgroundColor: "#FFFFFF", color: "#2E1F17", border: "1px solid #F0E6DA", borderBottomLeftRadius: "4px" }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 p-4 border-t" style={{ borderColor: "#F0E6DA" }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                placeholder="Ketik pesan..."
                className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                style={{ backgroundColor: "#FFF8F2", border: "1.5px solid #F0E6DA", color: "#2E1F17" }}
              />
              <button onClick={handleChatSend} className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ backgroundColor: "#6F4E37" }}>
                Kirim
              </button>
            </div>
          </div>
        )}

        {/* Tombol buka chat */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white shadow-xl transition-all hover:scale-105"
          style={{ backgroundColor: "#6F4E37" }}
          aria-label="Buka chat assistant"
        >
          {chatOpen ? "✕" : "💬"}
        </button>
      </div>
      {/* ── END FLOATING CHAT ASSISTANT ────────────────────── */}

    </div>
  );
}
