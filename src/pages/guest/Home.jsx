import { useState } from "react";
import { Link } from "react-router-dom";
import menuData from "../../data/menu.json";
import customersData from "../../data/customers.json";

// ============================================================
// PRD V2 — Landing Page El-Coffee
// Dikembangkan dari PRD V1 (Navbar, Hero, About, CTA, Footer)
// Tambahan PRD V2:
//   1. Why Choose El-Coffee
//   2. Best Seller Menu (dari menu.json)
//   3. Customer Reviews (dari customers.json — field "review")
//   4. Promo Section
//   5. Statistics
//   6. Gallery
// Yang BELUM ditampilkan (untuk PRD V3):
//   Membership System, Badge Progress, Reward Point, Voucher,
//   Coupon, Progress Membership, Contact Form, Chatbot,
//   Personalized Recommendation, CRM Dashboard, Loyalty Tracking
// ============================================================

// 6 menu best seller (slice 6 pertama, sudah urut dari data)
const bestSellerMenu = menuData.slice(0, 6);

// 6 review dari customers.json (ambil yang punya review bermakna)
const featuredReviews = customersData
  .filter((c) => c.review && c.review.length > 30)
  .slice(0, 6);

// Warna badge loyalty
const loyaltyColor = {
  Bronze: { bg: "#FDF0E8", text: "#9B5D2E", border: "#E8C9A8" },
  Silver: { bg: "#F3F4F6", text: "#4B5563", border: "#D1D5DB" },
  Gold:   { bg: "#FFFBEB", text: "#92400E", border: "#FCD34D" },
  VIP:    { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD" },
};

export default function GuestHome() {

  // State navbar mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ============================================================
  // [V3] State untuk fitur Kupon, Chatbot, Form Kontak
  // const [copiedCoupon, setCopiedCoupon] = useState(false);
  // const [isChatOpen, setIsChatOpen] = useState(false);
  // const [chatMessages, setChatMessages] = useState([...]);
  // const [contactForm, setContactForm] = useState({...});
  // const [formSubmitted, setFormSubmitted] = useState(false);
  // ============================================================

  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: "#FFF8F2", color: "#2E1F17" }}
    >

      {/* ==================================================
          SECTION 1 — NAVBAR
          (dari PRD V1, tidak diubah)
      ================================================== */}
      <nav
        className="sticky top-0 z-50 shadow-sm"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base shadow"
              style={{ backgroundColor: "#6F4E37" }}
            >
              ☕
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: "#2E1F17", fontFamily: "serif" }}
            >
              El-Coffee
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home"   className="hover:opacity-60 transition-opacity" style={{ color: "#2E1F17" }}>Home</a>
            <a href="#about"  className="hover:opacity-60 transition-opacity" style={{ color: "#2E1F17" }}>About</a>
            <a href="#menu"   className="hover:opacity-60 transition-opacity" style={{ color: "#2E1F17" }}>Menu</a>
            <a href="#promo"  className="hover:opacity-60 transition-opacity" style={{ color: "#2E1F17" }}>Promo</a>
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl text-sm font-semibold border transition-colors hover:opacity-80"
              style={{ border: "1.5px solid #6F4E37", color: "#6F4E37" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: "#6F4E37" }}
            >
              Register
            </Link>
          </div>

          {/* Hamburger Mobile */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: "#2E1F17" }}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t px-6 py-5 flex flex-col gap-4 text-sm font-medium"
            style={{ borderColor: "#F0E6DA", backgroundColor: "#FFFFFF" }}
          >
            <a href="#home"  onClick={() => setMobileMenuOpen(false)} style={{ color: "#2E1F17" }}>Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: "#2E1F17" }}>About</a>
            <a href="#menu"  onClick={() => setMobileMenuOpen(false)} style={{ color: "#2E1F17" }}>Menu</a>
            <a href="#promo" onClick={() => setMobileMenuOpen(false)} style={{ color: "#2E1F17" }}>Promo</a>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl font-semibold border"
              style={{ border: "1.5px solid #6F4E37", color: "#6F4E37" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl font-semibold text-white"
              style={{ backgroundColor: "#6F4E37" }}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
      {/* END NAVBAR */}


      {/* ==================================================
          SECTION 2 — HERO
          (dari PRD V1, tidak diubah)
      ================================================== */}
      <section
        id="home"
        className="min-h-[88vh] flex items-center px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#FFF8F2" }}
      >
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center py-16 lg:py-0">

          {/* Teks Kiri */}
          <div className="space-y-7">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
            >
              ☕ Premium Coffee Experience
            </span>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: "#2E1F17", fontFamily: "serif" }}
            >
              More Than Coffee,
              <br />
              <span style={{ color: "#6F4E37" }}>It's Your Daily</span>
              <br />
              Experience
            </h1>

            <p className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: "#7A5C48" }}>
              El-Coffee hadir untuk menghadirkan cita rasa kopi terbaik Nusantara
              dalam setiap tegukan, lengkap dengan program keanggotaan yang memberikan
              pengalaman lebih dari sekadar secangkir kopi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/register"
                className="px-8 py-3.5 rounded-2xl font-semibold text-white text-sm shadow-md transition-all hover:opacity-90 text-center"
                style={{ backgroundColor: "#6F4E37" }}
              >
                Join Membership
              </Link>
              <Link
                to="/login"
                className="px-8 py-3.5 rounded-2xl font-semibold text-sm border transition-all hover:opacity-80 text-center"
                style={{ border: "2px solid #6F4E37", color: "#6F4E37" }}
              >
                Login
              </Link>
            </div>
          </div>

          {/* Ilustrasi Kanan */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center shadow-inner"
              style={{ background: "radial-gradient(circle at 35% 35%, #F5E6D8, #D4A373)" }}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-40" style={{ backgroundColor: "#D4A373" }} />
              <div className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full opacity-30" style={{ backgroundColor: "#6F4E37" }} />
              <span className="text-8xl md:text-9xl select-none">☕</span>
              <div
                className="absolute top-6 right-0 md:-right-6 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md"
                style={{ backgroundColor: "#FFFFFF", color: "#6F4E37" }}
              >
                Premium Beans ✦
              </div>
              <div
                className="absolute bottom-10 left-0 md:-left-6 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md"
                style={{ backgroundColor: "#FFFFFF", color: "#6F4E37" }}
              >
                Fresh Daily 🌿
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* END HERO */}


      {/* ==================================================
          SECTION 3 — ABOUT EL-COFFEE
          (dari PRD V1, tidak diubah)
      ================================================== */}
      <section
        id="about"
        className="py-20 px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          {/* Gambar Kiri */}
          <div className="rounded-3xl overflow-hidden shadow-lg h-80 md:h-[440px]">
            <img
              src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800"
              alt="El-Coffee Interior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Teks Kanan */}
          <div className="space-y-6">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
            >
              Tentang Kami
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold leading-snug"
              style={{ color: "#2E1F17", fontFamily: "serif" }}
            >
              Secangkir Kopi Penuh Cerita & Dedikasi
            </h2>

            <p className="text-sm md:text-base leading-relaxed" style={{ color: "#7A5C48" }}>
              El-Coffee lahir dari kecintaan mendalam pada kekayaan biji kopi Nusantara.
              Kami bermitra langsung dengan petani lokal dari Gayo, Kintamani, hingga Toraja
              untuk menghadirkan kualitas terbaik yang diproses secara etis dan berkelanjutan.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
                >🎯</div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{ color: "#2E1F17" }}>Visi</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>
                    Menjadi coffee shop lokal terpercaya yang mengangkat cita rasa kopi Indonesia ke panggung dunia.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
                >💡</div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{ color: "#2E1F17" }}>Misi</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>
                    Menyajikan kopi berkualitas tinggi dengan pelayanan hangat, mendukung petani lokal, dan memberikan
                    pengalaman tak terlupakan di setiap kunjungan.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: "#FFF8F2" }}>
                <div className="text-xl mb-1">🫘</div>
                <h5 className="font-bold text-sm" style={{ color: "#2E1F17" }}>Premium Coffee Beans</h5>
                <p className="text-xs mt-1" style={{ color: "#7A5C48" }}>Biji kopi Specialty Grade pilihan langsung dari petani lokal.</p>
              </div>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: "#FFF8F2" }}>
                <div className="text-xl mb-1">🤝</div>
                <h5 className="font-bold text-sm" style={{ color: "#2E1F17" }}>Friendly Service</h5>
                <p className="text-xs mt-1" style={{ color: "#7A5C48" }}>Barista berpengalaman yang siap memberi rekomendasi terbaik.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END ABOUT */}


      {/* ==================================================
          [BARU V2] SECTION 4 — WHY CHOOSE EL-COFFEE
          4 card keunggulan dengan hover effect
      ================================================== */}
      <section
        className="py-20 px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#FFF8F2" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
            >
              Keunggulan Kami
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#2E1F17", fontFamily: "serif" }}
            >
              Kenapa Harus El-Coffee?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>
              Lebih dari sekadar kopi — kami menghadirkan pengalaman menyeluruh yang membuat Anda selalu ingin kembali.
            </p>
          </div>

          {/* 4 Card */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "☕",
                iconBg: "#FEF3C7",
                iconColor: "#92400E",
                title: "Premium Coffee Beans",
                desc: "Biji kopi Specialty Grade dari Gayo, Kintamani, dan Toraja. Dipilih langsung dari petani lokal terpercaya.",
              },
              {
                icon: "🥐",
                iconBg: "#FFF7ED",
                iconColor: "#C2410C",
                title: "Fresh Daily Bakery",
                desc: "Pastri & snack dipanggang segar setiap pagi. Nikmati croissant, muffin, dan kue pilihan yang selalu hangat.",
              },
              {
                icon: "📶",
                iconBg: "#EFF6FF",
                iconColor: "#1D4ED8",
                title: "Free Wi-Fi & Workspace",
                desc: "Koneksi internet stabil berkecepatan tinggi. Tersedia banyak colokan dan meja nyaman untuk remote working.",
              },
              {
                icon: "💳",
                iconBg: "#F0FDF4",
                iconColor: "#15803D",
                title: "Easy Cashless Payment",
                desc: "Bayar dengan QRIS, e-wallet, atau kartu debit/kredit. Transaksi cepat, aman, dan tanpa antrean panjang.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white p-7 rounded-3xl border transition-all duration-300 cursor-default"
                style={{
                  borderColor: "#F0E6DA",
                  boxShadow: "0 1px 8px rgba(111,78,55,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(111,78,55,0.14)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#D4A373";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#F0E6DA";
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ backgroundColor: item.iconBg }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#2E1F17" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END WHY CHOOSE US */}


      {/* ==================================================
          [BARU V2] SECTION 5 — STATISTICS
          4 angka highlight dalam card modern
      ================================================== */}
      <section
        className="py-16 px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#2E1F17" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "30+",   label: "Coffee Menu",         icon: "☕" },
            { value: "5000+", label: "Happy Customers",     icon: "😊" },
            { value: "15000+",label: "Orders Completed",    icon: "✅" },
            { value: "4.9★",  label: "Average Rating",      icon: "⭐" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-7 rounded-3xl"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,163,115,0.2)" }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ color: "#D4A373", fontFamily: "serif" }}
              >
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: "#C4A882" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      {/* END STATISTICS */}


      {/* ==================================================
          [BARU V2] SECTION 6 — BEST SELLER MENU
          6 menu dari menu.json, card dengan tombol Order Now
      ================================================== */}
      <section
        id="menu"
        className="py-20 px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
            >
              Menu Pilihan
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#2E1F17", fontFamily: "serif" }}
            >
              Best Seller El-Coffee
            </h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>
              Sajian terlaris pilihan komunitas El-Coffee — diracik dengan biji kopi terbaik dan bahan-bahan segar.
            </p>
          </div>

          {/* Grid 6 Menu */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {bestSellerMenu.map((item) => (
              <div
                key={item.menuId}
                className="bg-white rounded-3xl overflow-hidden border transition-all duration-300"
                style={{
                  borderColor: "#F0E6DA",
                  boxShadow: "0 1px 8px rgba(111,78,55,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(111,78,55,0.12)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Gambar */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={`${item.image}${item.image.includes("?") ? "&" : "?"}auto=format&fit=crop&q=80&w=600`}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Konten */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-base" style={{ color: "#2E1F17" }}>
                      {item.name}
                    </h3>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                      style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <p className="font-bold text-base mt-2" style={{ color: "#6F4E37" }}>
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>

                  <button
                    className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "#6F4E37" }}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END BEST SELLER MENU */}



      {/* ==================================================
          [BARU V2] SECTION 7 — PROMO SECTION
          4 card promo (belum terkoneksi database)
      ================================================== */}
      <section
        id="promo"
        className="py-20 px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#FFF8F2" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
            >
              Promo & Penawaran
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#2E1F17", fontFamily: "serif" }}
            >
              Nikmati Penawaran Spesial
            </h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>
              Promo terbatas setiap minggu — jangan sampai kehabisan!
            </p>
          </div>

          {/* Grid 4 Promo */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                badge: "Best Deal",
                badgeBg: "#FEF3C7",
                badgeText: "#92400E",
                icon: "🎁",
                iconBg: "#FEF9EE",
                title: "Buy 2 Get 1",
                desc: "Beli 2 minuman apa saja, gratis 1 minuman pilihan. Berlaku setiap hari pukul 14.00–16.00.",
                tag: "Setiap Hari",
                tagBg: "#F5E6D8",
                tagText: "#6F4E37",
              },
              {
                badge: "Weekend Only",
                badgeBg: "#EFF6FF",
                badgeText: "#1E40AF",
                icon: "🌅",
                iconBg: "#EFF6FF",
                title: "Weekend Promo",
                desc: "Diskon 20% untuk semua minuman di hari Sabtu & Minggu. Tunjukkan kode di kasir.",
                tag: "Sabtu & Minggu",
                tagBg: "#DBEAFE",
                tagText: "#1D4ED8",
              },
              {
                badge: "Pelajar",
                badgeBg: "#F0FDF4",
                badgeText: "#166534",
                icon: "🎓",
                iconBg: "#F0FDF4",
                title: "Student Discount",
                desc: "Tunjukkan kartu pelajar/mahasiswa dan dapatkan diskon 15% untuk semua menu.",
                tag: "Berlaku Setiap Hari",
                tagBg: "#DCFCE7",
                tagText: "#15803D",
              },
              {
                badge: "Member Exclusive",
                badgeBg: "#FDF4FF",
                badgeText: "#7E22CE",
                icon: "👑",
                iconBg: "#FDF4FF",
                title: "Birthday Treat",
                desc: "Rayakan ulang tahunmu di El-Coffee dan dapatkan 1 minuman gratis pilihan menu spesial dari kami.",
                tag: "Khusus Member",
                tagBg: "#F3E8FF",
                tagText: "#7E22CE",
              },
            ].map((promo, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300"
                style={{
                  borderColor: "#F0E6DA",
                  boxShadow: "0 1px 8px rgba(111,78,55,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(111,78,55,0.12)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#D4A373";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#F0E6DA";
                }}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: promo.badgeBg, color: promo.badgeText }}
                  >
                    {promo.badge}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: promo.iconBg }}
                  >
                    {promo.icon}
                  </div>
                </div>

                <div className="space-y-2 flex-grow">
                  <h3 className="font-bold text-base" style={{ color: "#2E1F17" }}>{promo.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#7A5C48" }}>{promo.desc}</p>
                </div>

                <div className="mt-5 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
                  <span
                    className="text-[11px] font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: promo.tagBg, color: promo.tagText }}
                  >
                    {promo.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END PROMO */}


      {/* ==================================================
          [BARU V2] SECTION 8 — CUSTOMER REVIEWS
          6 review dari customers.json (field "review")
          Card: nama, badge loyalty, rating, review
      ================================================== */}
      <section
        className="py-20 px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
            >
              Testimoni
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#2E1F17", fontFamily: "serif" }}
            >
              Suara Pelanggan El-Coffee
            </h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>
              Ulasan autentik dari member yang telah merasakan pengalaman El-Coffee.
            </p>
          </div>

          {/* Grid 6 Review */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReviews.map((customer) => {
              const lc = loyaltyColor[customer.loyalty] || loyaltyColor["Bronze"];
              return (
                <div
                  key={customer.customerId}
                  className="p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300"
                  style={{
                    backgroundColor: "#FDFAF7",
                    borderColor: "#F0E6DA",
                    boxShadow: "0 1px 8px rgba(111,78,55,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(111,78,55,0.10)";
                    e.currentTarget.style.borderColor = "#D4A373";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.05)";
                    e.currentTarget.style.borderColor = "#F0E6DA";
                  }}
                >
                  {/* Rating bintang */}
                  <div className="flex gap-0.5 text-sm mb-3" style={{ color: "#F59E0B" }}>
                    ⭐⭐⭐⭐⭐
                  </div>

                  {/* Teks review */}
                  <p
                    className="text-sm leading-relaxed italic flex-grow"
                    style={{ color: "#5C3D2E" }}
                  >
                    "{customer.review}"
                  </p>

                  {/* Footer card */}
                  <div
                    className="flex items-center gap-3 mt-5 pt-4 border-t"
                    style={{ borderColor: "#F0E6DA" }}
                  >
                    {/* Avatar inisial */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
                    >
                      {customer.customerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm" style={{ color: "#2E1F17" }}>
                        {customer.customerName}
                      </h4>
                      {/* Badge loyalty */}
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mt-0.5"
                        style={{
                          backgroundColor: lc.bg,
                          color: lc.text,
                          border: `1px solid ${lc.border}`,
                        }}
                      >
                        {customer.loyalty}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* END CUSTOMER REVIEWS */}


      {/* ==================================================
          [BARU V2] SECTION 9 — GALLERY
          6 gambar café/kopi dalam layout masonry grid
      ================================================== */}
      <section
        className="py-20 px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#FFF8F2" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
            >
              Galeri
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#2E1F17", fontFamily: "serif" }}
            >
              Suasana El-Coffee
            </h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>
              Sekilas pandang ruang, minuman, dan momen hangat yang menanti Anda.
            </p>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
                alt: "Interior El-Coffee",
                tall: true,
              },
              {
                url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
                alt: "Secangkir Kopi Hangat",
                tall: false,
              },
              {
                url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
                alt: "Espresso Shot",
                tall: false,
              },
              {
                url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
                alt: "Latte Art",
                tall: false,
              },
              {
                url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800",
                alt: "Cold Brew",
                tall: true,
              },
              {
                url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
                alt: "Fresh Croissant",
                tall: false,
              },
            ].map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-3xl ${img.tall ? "row-span-2" : ""}`}
                style={{
                  height: img.tall ? "100%" : "220px",
                  minHeight: img.tall ? "460px" : "220px",
                }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ borderRadius: "1.5rem" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END GALLERY */}


      {/* ==================================================
          SECTION 10 — CALL TO ACTION
          (dari PRD V1, tidak diubah)
      ================================================== */}
      <section
        className="py-20 px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#6F4E37" }}
      >
        <div className="max-w-3xl mx-auto text-center space-y-7">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#F5E6D8" }}
          >
            ✦ Bergabung Sekarang
          </span>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
            style={{ color: "#FFFFFF", fontFamily: "serif" }}
          >
            Gabung menjadi Member El-Coffee sekarang dan nikmati berbagai keuntungan.
          </h2>

          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#F5E6D8" }}>
            Kumpulkan poin di setiap pembelian, dapatkan reward eksklusif, dan rasakan
            pengalaman kopi yang lebih dari sekadar secangkir minuman.
          </p>

          <div className="pt-2">
            <Link
              to="/register"
              className="inline-block px-10 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all hover:opacity-90"
              style={{ backgroundColor: "#D4A373", color: "#2E1F17" }}
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>
      {/* END CTA */}


      {/* ==================================================
          SECTION 11 — FOOTER
          (dari PRD V1, tidak diubah)
      ================================================== */}
      <footer
        className="py-14 px-6 md:px-10 lg:px-20"
        style={{ backgroundColor: "#2E1F17", color: "#D4A373" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

          {/* Logo & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base"
                style={{ backgroundColor: "#6F4E37" }}
              >
                ☕
              </div>
              <span
                className="text-xl font-bold"
                style={{ color: "#FFF8F2", fontFamily: "serif" }}
              >
                El-Coffee
              </span>
            </div>
            <p className="text-xs max-w-xs leading-relaxed" style={{ color: "#A07855" }}>
              More Than Coffee, It's Your Daily Experience.
            </p>
          </div>

          {/* Info Kontak */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <span style={{ color: "#D4A373" }}>📍</span>
              <span style={{ color: "#C4A882" }}>
                Jl. Senopati Raya No. 45, Kebayoran Baru, Jakarta Selatan
              </span>
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

        <div
          className="max-w-6xl mx-auto mt-10 pt-6 border-t text-center text-xs"
          style={{ borderColor: "#3D2517", color: "#7A5C48" }}
        >
          &copy; 2026 El-Coffee. All rights reserved.
        </div>
      </footer>
      {/* END FOOTER */}


      {/* ==================================================
          [V3] MEMBERSHIP SYSTEM — disembunyikan untuk PRD V2
          Badge Progress, Reward Point, Voucher, Coupon,
          Progress Membership, Loyalty Tracking
      ================================================== */}
      {/*
      <section id="membership" ...>
        ... Badge Bronze / Silver / Gold / Platinum ...
        ... Progress poin, Reward, Voucher, Kupon ...
      </section>
      */}

      {/* ==================================================
          [V3] CONTACT FORM — disembunyikan untuk PRD V2
      ================================================== */}
      {/*
      <section id="contact" ...>
        ... Form Kontak + Info Lokasi ...
      </section>
      */}

      {/* ==================================================
          [V3] CHATBOT — disembunyikan untuk PRD V2
      ================================================== */}
      {/*
      <div className="fixed bottom-6 right-6 z-50 ...">
        ... Virtual Assistant Chatbot ...
      </div>
      */}

    </div>
  );
}
