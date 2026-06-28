import { useState } from "react";
import { Link } from "react-router-dom";

// ============================================================
// PRD V1 — Landing Page El-Coffee (Versi Sederhana / Tahap Awal)
// Hanya menampilkan: Navbar, Hero, About, CTA, Footer
// Section yang disembunyikan (di-comment) akan diaktifkan pada V2/V3:
//   - Why Choose Us, Popular Menu, Promo/Bundling, Membership Levels,
//     Customer Reviews, Contact Form, Chatbot, FAQ, Statistik
// ============================================================

// ============================================================
// [V2/V3] Import komponen & data yang akan dipakai nanti
// import GuestNavbar from "../../components/GuestNavbar";
// import MenuCard from "../../components/MenuCard";
// import menuData from "../../data/menu.json";
// ============================================================

// ============================================================
// [V2/V3] Mock data ulasan pelanggan
// const defaultCustomers = [
//   { customerName: "Andi Saputra", loyalty: "Gold", review: "Caramel Latte di El-Coffee selalu konsisten. Program keanggotaannya sangat transparan dan menguntungkan." },
//   { customerName: "Olivia Wijaya", loyalty: "Platinum", review: "Pelayanan super ramah. Avocado Coffee-nya tidak ada tandingan di tempat lain." },
//   { customerName: "Dina Mariana", loyalty: "Platinum", review: "Sudah berlangganan sejak hari pertama buka. Tempat ternyaman untuk bekerja sekaligus bersantai." }
// ];
// ============================================================

export default function GuestHome() {

  // ============================================================
  // [V2/V3] State untuk fitur Kupon, Chatbot, Form Kontak
  // const [copiedCoupon, setCopiedCoupon] = useState(false);
  // const [isChatOpen, setIsChatOpen] = useState(false);
  // const [chatMessages, setChatMessages] = useState([
  //   { sender: "bot", text: "Halo! Selamat datang di El-Coffee Virtual Assistant. Ada yang bisa kami bantu secara otomatis hari ini?" }
  // ]);
  // const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  // const [formSubmitted, setFormSubmitted] = useState(false);
  // ============================================================

  // ============================================================
  // [V2/V3] Ambil 3 menu pertama dari menu.json
  // const displayMenu = menuData && menuData.length > 0 ? menuData.slice(0, 3) : [];
  // ============================================================

  // ============================================================
  // [V2/V3] Handler Kupon
  // const handleCopyCoupon = () => {
  //   navigator.clipboard.writeText("WELCOMEELCOFFEE");
  //   setCopiedCoupon(true);
  //   setTimeout(() => setCopiedCoupon(false), 3000);
  // };
  // ============================================================

  // ============================================================
  // [V2/V3] Handler Form Kontak
  // const handleContactSubmit = (e) => {
  //   e.preventDefault();
  //   if (contactForm.name && contactForm.email && contactForm.message) {
  //     setFormSubmitted(true);
  //     setTimeout(() => {
  //       setFormSubmitted(false);
  //       setContactForm({ name: "", email: "", message: "" });
  //     }, 4000);
  //   }
  // };
  // ============================================================

  // ============================================================
  // [V2/V3] Handler Chatbot
  // const triggerBotReply = (userQuestion, botAnswer) => {
  //   setChatMessages((prev) => [...prev, { sender: "user", text: userQuestion }]);
  //   setTimeout(() => {
  //     setChatMessages((prev) => [...prev, { sender: "bot", text: botAnswer }]);
  //   }, 600);
  // };
  // const chatbotOptions = [
  //   { q: "Bagaimana cara mengumpulkan poin?", a: "Setiap transaksi Rp 10.000 di outlet maupun pemesanan online akan otomatis dikonversi menjadi 1 poin keanggotaan Anda setelah mendaftar." },
  //   { q: "Di mana lokasi El-Coffee?", a: "Kami berlokasi di Jakarta Selatan (Senopati), Bandung (Dago), dan Yogyakarta (Prawirotaman)." },
  //   { q: "Rekomendasi menu non-kopi?", a: "Kami sangat merekomendasikan Matcha Latte Jepang premium dan Iced Lychee Tea segar kami." }
  // ];
  // ============================================================

  // State untuk mobile menu (dipakai di Navbar PRD V1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: "#FFF8F2", color: "#2E1F17" }}
    >

      {/* ====================================================
          SECTION 1 — NAVBAR (PRD V1)
          Sticky, background putih, shadow tipis
          Menu: Home | About | Login | Register
          Desktop: logo kiri, menu kanan
          Mobile: menu collapsible (tanpa hamburger di desktop)
      ==================================================== */}
      <nav
        className="sticky top-0 z-50 shadow-sm"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "#2E1F17" }}>
            <a
              href="#home"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "#2E1F17" }}
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "#2E1F17" }}
            >
              About
            </a>
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl text-sm font-semibold border transition-colors hover:opacity-80"
              style={{ border: "1.5px solid #6F4E37", color: "#6F4E37", backgroundColor: "transparent" }}
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
          <div className="md:hidden border-t px-6 py-5 flex flex-col gap-4 text-sm font-medium" style={{ borderColor: "#F0E6DA", backgroundColor: "#FFFFFF" }}>
            <a href="#home" onClick={() => setMobileMenuOpen(false)} style={{ color: "#2E1F17" }}>Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: "#2E1F17" }}>About</a>
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


      {/* ====================================================
          SECTION 2 — HERO (PRD V1)
          Judul, deskripsi, 2 tombol (Join Membership + Login),
          Ilustrasi kopi di sebelah kanan
      ==================================================== */}
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
              dalam setiap tegukan, lengkap dengan program keanggotaan yang
              memberikan pengalaman lebih dari sekadar secangkir kopi.
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
                style={{ border: "2px solid #6F4E37", color: "#6F4E37", backgroundColor: "transparent" }}
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
              {/* Lingkaran dekorasi */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-40"
                style={{ backgroundColor: "#D4A373" }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full opacity-30"
                style={{ backgroundColor: "#6F4E37" }}
              />
              {/* Emoji kopi besar */}
              <span className="text-8xl md:text-9xl select-none">☕</span>

              {/* Badge kecil floating */}
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


      {/* ====================================================
          SECTION 3 — ABOUT EL-COFFEE (PRD V1)
          Kiri: gambar   |   Kanan: teks profil, visi, misi
          + 2 highlight kecil: Premium Coffee Beans & Friendly Service
      ==================================================== */}
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

            {/* Visi & Misi */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
                >
                  🎯
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{ color: "#2E1F17" }}>Visi</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>
                    Menjadi coffee shop lokal terpercaya yang mengangkat cita rasa kopi
                    Indonesia ke panggung dunia.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}
                >
                  💡
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{ color: "#2E1F17" }}>Misi</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>
                    Menyajikan kopi berkualitas tinggi dengan pelayanan hangat, mendukung
                    petani lokal, dan memberikan pengalaman tak terlupakan di setiap kunjungan.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 Highlight Kecil */}
            <div
              className="grid grid-cols-2 gap-4 pt-4 border-t"
              style={{ borderColor: "#F0E6DA" }}
            >
              <div
                className="p-4 rounded-2xl"
                style={{ backgroundColor: "#FFF8F2" }}
              >
                <div className="text-xl mb-1">🫘</div>
                <h5 className="font-bold text-sm" style={{ color: "#2E1F17" }}>
                  Premium Coffee Beans
                </h5>
                <p className="text-xs mt-1" style={{ color: "#7A5C48" }}>
                  Biji kopi Specialty Grade pilihan langsung dari petani lokal.
                </p>
              </div>

              <div
                className="p-4 rounded-2xl"
                style={{ backgroundColor: "#FFF8F2" }}
              >
                <div className="text-xl mb-1">🤝</div>
                <h5 className="font-bold text-sm" style={{ color: "#2E1F17" }}>
                  Friendly Service
                </h5>
                <p className="text-xs mt-1" style={{ color: "#7A5C48" }}>
                  Barista berpengalaman yang siap memberi rekomendasi terbaik.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* END ABOUT */}


      {/* ====================================================
          [V2] WHY CHOOSE US — disembunyikan untuk PRD V1
      ==================================================== */}
      {/* 
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#FAF7F2] to-white">
        ... Why Choose Us + Statistik ...
      </section>
      */}

      {/* ====================================================
          [V2] POPULAR MENU — disembunyikan untuk PRD V1
      ==================================================== */}
      {/* 
      <section id="menu" className="py-20 px-6 md:px-12 lg:px-20 bg-white border-y border-gray-100">
        ... Popular Menu (MenuCard dari menu.json) ...
      </section>
      */}

      {/* ====================================================
          [V2] SPECIAL BUNDLING PROMO — disembunyikan untuk PRD V1
      ==================================================== */}
      {/* 
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF7F2]">
        ... Promo Bundling ...
      </section>
      */}

      {/* ====================================================
          [V2] MEMBERSHIP LEVELS — disembunyikan untuk PRD V1
      ==================================================== */}
      {/* 
      <section id="membership" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        ... Badge Bronze / Silver / Gold / Platinum ...
      </section>
      */}

      {/* ====================================================
          [V3] CUSTOMER REVIEWS — disembunyikan untuk PRD V1
      ==================================================== */}
      {/* 
      <section id="review" className="py-20 px-6 md:px-12 lg:px-20 bg-white border-t border-gray-100">
        ... Ulasan Pelanggan (defaultCustomers) ...
      </section>
      */}

      {/* ====================================================
          [V3] CONTACT FORM — disembunyikan untuk PRD V1
      ==================================================== */}
      {/* 
      <section id="contact" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        ... Form Kontak + Info Lokasi ...
      </section>
      */}


      {/* ====================================================
          SECTION 4 — CALL TO ACTION (PRD V1)
          Background coklat, teks ajakan bergabung Member,
          Tombol "Daftar Sekarang"
      ==================================================== */}
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


      {/* ====================================================
          SECTION 5 — FOOTER (PRD V1)
          Logo, Alamat, Email, WhatsApp, Copyright
      ==================================================== */}
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

        {/* Divider + Copyright */}
        <div
          className="max-w-6xl mx-auto mt-10 pt-6 border-t text-center text-xs"
          style={{ borderColor: "#3D2517", color: "#7A5C48" }}
        >
          &copy; 2026 El-Coffee. All rights reserved.
        </div>
      </footer>
      {/* END FOOTER */}


      {/* ====================================================
          [V3] FLOATING CHATBOT — disembunyikan untuk PRD V1
      ==================================================== */}
      {/* 
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        ... Chatbot Virtual Assistant ...
      </div>
      */}

    </div>
  );
}
