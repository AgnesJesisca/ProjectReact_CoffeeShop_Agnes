import { useState } from "react";
import GuestNavbar from "../../components/GuestNavbar";
import MenuCard from "../../components/MenuCard";
import menuData from "../../data/menu.json"; 

// MOCK DATA FALLBACK
const defaultCustomers = [
  { customerName: "Andi Saputra", loyalty: "Gold", review: "Caramel Latte di El-Coffee selalu konsisten. Program keanggotaannya sangat transparan dan menguntungkan." },
  { customerName: "Olivia Wijaya", loyalty: "Platinum", review: "Pelayanan super ramah. Avocado Coffee-nya tidak ada tandingan di tempat lain." },
  { customerName: "Dina Mariana", loyalty: "Platinum", review: "Sudah berlangganan sejak hari pertama buka. Tempat ternyaman untuk bekerja sekaligus bersantai." }
];

export default function GuestHome() {
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Halo! Selamat datang di El-Coffee Virtual Assistant. Ada yang bisa kami bantu secara otomatis hari ini?" }
  ]);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // AMBIL 3 MENU PERTAMA ATAU FAVORIT DARI menu.json
  const displayMenu = menuData && menuData.length > 0 ? menuData.slice(0, 3) : [];

  // Klaim Kupon
  const handleCopyCoupon = () => {
    navigator.clipboard.writeText("WELCOMEELCOFFEE");
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 3000);
  };

  // Form Kontak
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

  // Chatbot otomatis untuk FAQ
  const triggerBotReply = (userQuestion, botAnswer) => {
    setChatMessages((prev) => [...prev, { sender: "user", text: userQuestion }]);
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "bot", text: botAnswer }]);
    }, 600);
  };

  const chatbotOptions = [
    { 
      q: "Bagaimana cara mengumpulkan poin?", 
      a: "Setiap transaksi Rp 10.000 di outlet maupun pemesanan online akan otomatis dikonversi menjadi 1 poin keanggotaan Anda setelah mendaftar." 
    },
    { 
      q: "Di mana lokasi El-Coffee?", 
      a: "Kami berlokasi di Jakarta Selatan (Senopati), Bandung (Dago), dan Yogyakarta (Prawirotaman)." 
    },
    { 
      q: "Rekomendasi menu non-kopi?", 
      a: "Kami sangat merekomendasikan Matcha Latte Jepang premium dan Iced Lychee Tea segar kami." 
    }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#2C1A11] font-sans antialiased selection:bg-amber-100 selection:text-amber-900 relative">
      
      <GuestNavbar />

      {/* HERO SECTION */}
      <section id="home" className="min-h-[80vh] flex items-center px-6 md:px-12 lg:px-20 pt-10 bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center bg-amber-50 border border-amber-200/60 text-amber-800 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              Selamat Datang di Rumah Seduh El-Coffee
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#3D2517] leading-tight">
              Apresiasi Terbaik di<br />Setiap Cangkir Kopi Anda
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg">
              Kami memadukan kualitas biji kopi Nusantara pilihan dengan sistem apresiasi loyalitas yang dirancang khusus untuk memberikan kenyamanan ekstra di setiap kunjungan Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="/register" className="bg-[#8C5E3C] hover:bg-[#734A2E] text-white px-8 py-3.5 rounded-xl font-medium shadow-md transition-all text-center">
                Daftar Member Sekarang
              </a>
              <a href="#membership" className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-xl font-medium shadow-sm transition-all text-center">
                Keuntungan Level Keanggotaan
              </a>
            </div>

            {/* Kupon Promo */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm max-w-md">
                <div className="bg-amber-50 text-amber-800 font-mono text-xs font-bold px-3 py-1.5 rounded border border-dashed border-amber-300">
                  WELCOMEELCOFFEE
                </div>
                <button onClick={handleCopyCoupon} className="text-xs bg-gray-900 hover:bg-gray-800 text-white font-medium px-3 py-1.5 rounded-lg transition-colors">
                  {copiedCoupon ? "Tersalin! ✓" : "Salin Kupon Kunjungan Pertama"}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full bg-gradient-to-tr from-amber-100 to-[#EEDFCE] flex items-center justify-center text-[100px] md:text-[130px] shadow-inner animate-fade-in">
              ☕
            </div>
          </div>
        </div>
      </section>

      {/* COFFEE SHOP PROFILE */}
      <section id="story" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800" 
              alt="El-Coffee Roastery" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D2517]">
              Sebuah Cerita tentang Dedikasi, Rasa, & Koneksi
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Didirikan dengan kecintaan mendalam pada kekayaan tanah Nusantara, El-Coffee bukan sekadar kedai kopi biasa. Kami bermitra langsung dengan para petani lokal dari Gayo, Kintamani, hingga Toraja untuk memastikan kualitas biji kopi terbaik yang diproses secara etis dan berkelanjutan.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Setiap cangkir yang disajikan merupakan buah dari dedikasi roasting profil presisi tinggi dan keahlian penuh para barista kami.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
              <div>
                <h4 className="font-bold text-[#8C5E3C] text-lg">100% Arabica</h4>
                <p className="text-sm text-gray-500">Biji kopi pilihan kualitas Specialty grade.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#8C5E3C] text-lg">Freshly Roasted</h4>
                <p className="text-sm text-gray-500">Roasting berkala untuk menjaga kesegaran notes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-[#8C5E3C] uppercase tracking-widest">Alasan Memilih Kami</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D2517]">Kenapa Harus El-Coffee?</h2>
            <p className="text-gray-500 text-sm">Komitmen kami dalam menghadirkan standar kualitas terbaik dan kenyamanan ekstra di setiap kunjungan Anda.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center text-xl font-bold mb-6">🌱</div>
              <h3 className="text-lg font-bold text-[#3D2517] mb-2">100% Etikal & Fair Trade</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Kami bermitra langsung (*Direct Trade*) dengan kelompok tani lokal dari Gayo hingga Toraja. Kolaborasi berkelanjutan ini memastikan harga yang adil bagi petani sekaligus menjaga kualitas ceri kopi terbaik sejak masa panen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold mb-6">🔥</div>
              <h3 className="text-lg font-bold text-[#3D2517] mb-2">Roasting Presisi Terkomputerisasi</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Setiap batch biji kopi dipanggang menggunakan profil sensorik digital khusus. Pendekatan berbasis sains dan ketelitian ini bertujuan mengunci keaslian rasa alami kopi (*notes*) agar menghasilkan seduhan yang bersih, kaya, dan seimbang.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold mb-6">👑</div>
              <h3 className="text-lg font-bold text-[#3D2517] mb-2">Ekosistem Loyalitas Terintegrasi</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Nikmati kemudahan pelacakan poin secara *real-time* melalui sistem keanggotaan digital kami. Dirancang transparan dengan berbagai benefit berjenjang yang eksklusif dan proses penukaran reward yang instan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-[#3D2517] p-8 rounded-3xl text-white text-center shadow-inner">
            <div>
              <div className="text-2xl md:text-3xl font-serif font-black text-amber-400">15k+</div>
              <div className="text-xs text-gray-300 mt-1">Cangkir Terjual</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-serif font-black text-amber-400">4.8★</div>
              <div className="text-xs text-gray-300 mt-1">Rating Kepuasan</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-serif font-black text-amber-400">120+</div>
              <div className="text-xs text-gray-300 mt-1">Mitra Petani Lokal</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-serif font-black text-amber-400">3</div>
              <div className="text-xs text-gray-300 mt-1">Kota Outlet Utama</div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR MENU SECTION */}
      <section id="menu" className="py-20 px-6 md:px-12 lg:px-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D2517]">Menu Favorit Kurasi Komunitas</h2>
            <p className="text-gray-500 text-sm">Daftar minuman andalan berdasarkan tingkat kepuasan pelanggan kami.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayMenu.map((item) => {
              const cleanImage = item.image.includes('?') 
                ? item.image 
                : `${item.image}?auto=format&fit=crop&q=80&w=600`;

              const processedItem = { ...item, image: cleanImage };

              return (
                <div key={item.menuId || item.id} className="relative group">
                  <MenuCard menu={processedItem} />
                  {/* FIX: Menggunakan tag style biasa tanpa atribut jsx global */}
                  <style>{`
                    .group button {
                      display: none !important;
                    }
                  `}</style>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECIAL BUNDLING PROMO */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#8C5E3C] uppercase tracking-widest">Paket Spesial Pekan Ini</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D2517]">Bundling Lebih Hemat</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#8C5E3C] to-[#5B3920] text-white p-8 rounded-3xl relative overflow-hidden shadow-lg flex flex-col justify-between h-64">
              <div className="absolute right-[-20px] bottom-[-20px] text-[140px] opacity-10 select-none">🥐</div>
              <div>
                <span className="bg-amber-400 text-[#3D2517] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Productivity Pack</span>
                <h3 className="text-xl font-bold mt-3">Espresso + Butter Croissant</h3>
                <p className="text-gray-200 text-xs mt-1 max-w-xs">Sinergi kafein dan karbohidrat murni yang tepat untuk menemani sesi kerja remote produktif Anda.</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/20">
                <span className="text-lg font-mono font-bold text-amber-300">Rp 45.000 <span className="text-xs line-through text-gray-300 font-normal">Rp 55k</span></span>
                <a href="/register" className="bg-white hover:bg-amber-50 text-[#3D2517] font-semibold text-xs px-4 py-2 rounded-xl shadow-md transition-all">Klaim via App</a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-3xl relative overflow-hidden shadow-sm flex flex-col justify-between h-64">
              <div className="absolute right-[-20px] bottom-[-20px] text-[140px] opacity-5 select-none">👥</div>
              <div>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Sharing Pack</span>
                <h3 className="text-xl font-bold text-[#3D2517] mt-3">2 Iced Aren Latte + 1 Fries</h3>
                <p className="text-gray-500 text-xs mt-1 max-w-xs">Nongkrong berdua lebih hemat dengan racikan es kopi susu gula aren legit terlaris kami.</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-lg font-mono font-bold text-[#8C5E3C]">Rp 65.000 <span className="text-xs line-through text-gray-400 font-normal">Rp 82k</span></span>
                <a href="/register" className="bg-[#8C5E3C] hover:bg-[#734A2E] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-md transition-all">Klaim via App</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP LEVELS */}
      <section id="membership" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D2517]">Tingkat Apresiasi Keanggotaan</h2>
          <p className="text-gray-500 text-sm">Setiap transaksi mengumpulkan poin untuk membuka keuntungan eksklusif di tiap tingkatan badge.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { level: "Bronze", points: "0 - 99 Poin", benefits: ["E-Card Member Digital", "1x Point kelipatan Rp10k", "Akses penukaran poin katalog"] },
            { level: "Silver", points: "100 - 299 Poin", benefits: ["Welcome Gift: Free Upsize", "Diskon Ulang Tahun 5%", "Prioritas Antrean Outlet"] },
            { level: "Gold", points: "300 - 599 Poin", benefits: ["Welcome Gift: Free Upsize", "Diskon Ultah 10% + Cake", "Gratis Ekstra Shot Espresso"] },
            { level: "Platinum", points: "600+ Poin", benefits: ["Welcome Gift: Free Upsize", "Diskon Ultah 15% + Free Drink", "Akses Eksklusif Menu Rahasia"] },
          ].map((tier, i) => (
            <div key={i} className="bg-white border border-gray-200/70 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-amber-300 transition-all">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#3D2517]">{tier.level}</h3>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md inline-block">
                  {tier.points}
                </span>
              </div>
              <ul className="space-y-2.5 text-sm text-gray-600 border-t border-gray-100 pt-4 mt-6">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-tight">
                    <span className="text-amber-700 font-bold mt-0.5">&bull;</span> <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FEEDBACK & TESTIMONY */}
      <section id="review" className="py-20 px-6 md:px-12 lg:px-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D2517]">Suara Pelanggan Setia</h2>
            <p className="text-gray-500 text-sm">Ulasan autentik dari anggota komunitas terdaftar.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {defaultCustomers.map((review, index) => (
              <div key={index} className="bg-[#FAF7F2] border border-gray-200/40 p-8 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex text-amber-400 gap-0.5 text-base">⭐⭐⭐⭐⭐</div>
                  <p className="text-gray-600 italic text-sm leading-relaxed">"{review.review}"</p>
                </div>
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200/60">
                  <div className="w-9 h-9 rounded-full bg-[#EEDFCE] flex items-center justify-center font-bold text-[#8C5E3C] text-sm">
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{review.customerName}</h4>
                    <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Member {review.loyalty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section id="contact" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#8C5E3C] uppercase tracking-widest">Hubungi Kami</span>
              <h2 className="text-3xl font-serif font-bold text-[#3D2517]">Terhubung dengan El-Coffee</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ada pertanyaan seputar kemitraan, kendala poin loyalitas, atau ingin menyapa? Tim kami siap melayani Anda sepenuh hati.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg">💬</div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">WhatsApp Business</h4>
                  <p className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors cursor-pointer">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg">✉️</div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Surel Resmi</h4>
                  <p className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors cursor-pointer">hello@elcoffee.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg">🕒</div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Jam Operasional</h4>
                  <p className="text-sm font-medium text-gray-700">Setiap Hari — 07:00 s/d 22:00 WIB</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h4 className="font-serif font-bold text-[#3D2517] text-base">Lokasi Outlet Kami</h4>
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <span className="text-[#8C5E3C] mt-0.5">📍</span>
                  <div>
                    <h5 className="font-bold text-gray-800 text-xs">El-Coffee Senopati (HQ)</h5>
                    <p className="text-xs text-gray-500">Jl. Senopati Raya No. 45, Kebayoran Baru, Jakarta Selatan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C5E3C] mt-0.5">📍</span>
                  <div>
                    <h5 className="font-bold text-gray-800 text-xs">El-Coffee Dago</h5>
                    <p className="text-xs text-gray-500">Jl. Ir. H. Juanda No. 102, Dago, Bandung</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#8C5E3C] mt-0.5">📍</span>
                  <div>
                    <h5 className="font-bold text-gray-800 text-xs">El-Coffee Prawirotaman</h5>
                    <p className="text-xs text-gray-500">Jl. Prawirotaman No. 18, Brontokusuman, Yogyakarta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-6">Kirim Pesan Langsung</h3>
            {formSubmitted ? (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-6 rounded-2xl text-center space-y-2">
                <h4 className="font-bold">Pesan Anda Berhasil Terkirim!</h4>
                <p className="text-sm">Terima kasih, tim kami akan menghubungi Anda kembali via e-mail secepatnya.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="Masukkan nama Anda" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8C5E3C] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Alamat E-mail</label>
                  <input 
                    type="email" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="nama@email.com" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8C5E3C] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Isi Pesan</label>
                  <textarea 
                    rows="4" 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Tuliskan pertanyaan, keluhan, atau saran Anda di sini..." 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8C5E3C] resize-none transition-colors"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-[#8C5E3C] hover:bg-[#734A2E] text-white font-medium py-3 rounded-xl shadow-sm text-sm transition-colors">
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#3D2517] text-white py-12 px-6 text-center border-t border-[#4E3424]">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-serif font-bold text-amber-50">El-Coffee Roastery</h2>
          <p className="text-xs text-gray-500 pt-4">&copy; 2026 El-Coffee Roastery. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

      {/* FLOATING CHATBOT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="bg-white w-[320px] md:w-[360px] h-[420px] rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col mb-4">
            <div className="bg-[#8C5E3C] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>🤖</span>
                <h4 className="font-bold text-sm">Asisten Virtual El-Coffee</h4>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white text-lg font-bold">&times;</button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-[#FAF7F2] text-xs">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2.5 shadow-sm ${
                    msg.sender === "user" ? "bg-[#8C5E3C] text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white border-t border-gray-100 space-y-1.5">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 px-1">Pertanyaan Populer:</p>
              <div className="flex flex-wrap gap-1">
                {chatbotOptions.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => triggerBotReply(opt.q, opt.a)}
                    className="text-[10px] bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-[#8C5E3C] border border-gray-200 rounded-lg px-2.5 py-1.5 transition-all"
                  >
                    {opt.q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-[#8C5E3C] text-white flex items-center justify-center text-2xl shadow-xl transition-all"
        >
          {isChatOpen ? "💬" : "🤖"}
        </button>
      </div>

    </div>
  );
}