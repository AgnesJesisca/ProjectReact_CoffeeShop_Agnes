
import { useState, useEffect } from "react";

import { menuAPI }      from "../../services/menuAPI";
import { customersAPI } from "../../services/customersAPI";
import { ordersAPI }    from "../../services/ordersAPI";
import { revenueAPI }   from "../../services/revenueAPI";

import HomeNavbar        from "../../components/home/HomeNavbar";
import HeroSection       from "../../components/home/HeroSection";
import AboutSection      from "../../components/home/AboutSection";
import StatsSection      from "../../components/home/StatsSection";
import PopularMenu       from "../../components/home/PopularMenu";
import Testimonials      from "../../components/home/Testimonials";
import MembershipSection from "../../components/home/MembershipSection";
import CRMSection        from "../../components/home/CRMSection";
import MembershipCTA     from "../../components/home/MembershipCTA";
import FAQSection        from "../../components/home/FAQSection";
import ContactSection    from "../../components/home/ContactSection";
import HomeFooter        from "../../components/home/HomeFooter";
import ChatAssistant     from "../../components/home/ChatAssistant";

export default function GuestHome() {
  const [menuData,      setMenuData]      = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [ordersData,    setOrdersData]    = useState([]);
  const [revenueData,   setRevenueData]   = useState([]);

  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [openFaq,         setOpenFaq]         = useState(null);
  const [contactForm,     setContactForm]     = useState({ name: "", email: "", message: "" });
  const [formSubmitted,   setFormSubmitted]   = useState(false);
  const [chatOpen,        setChatOpen]        = useState(false);
  const [chatInput,       setChatInput]       = useState("");
  const [chatMessages,    setChatMessages]    = useState([
    { sender: "bot", text: "Halo 👋 Selamat datang di El-Coffee! Ada yang bisa kami bantu?" },
  ]);
  const [claimedVouchers, setClaimedVouchers] = useState({});

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [menus, customers, orders, revenue] = await Promise.all([
          menuAPI.fetchData(),
          customersAPI.fetchData(),
          ordersAPI.fetchData(),
          revenueAPI.fetchData(),
        ]);
        setMenuData(menus);
        setCustomersData(customers);
        setOrdersData(orders);
        setRevenueData(revenue);
      } catch (err) {
        console.error("Gagal memuat data Home:", err);
      }
    };
    loadAll();
  }, []);

  // Derived data
  const bestSellerMenu     = menuData.slice(0, 6);
  const featuredReviews    = customersData.filter((c) => c.review && c.review.length > 30).slice(0, 6);
  const totalRevenue       = revenueData.reduce((s, r) => s + r.totalRevenue, 0);
  const totalOrdersRevenue = revenueData.reduce((s, r) => s + r.totalOrders, 0);

  const paymentCount = ordersData.reduce((acc, o) => {
    acc[o.paymentMethod] = (acc[o.paymentMethod] || 0) + 1;
    return acc;
  }, {});
  const topPayment = Object.entries(paymentCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "QRIS";

  const progressMembers = customersData.slice(0, 3).map((c) => {
    const points     = Math.floor(c.totalSpent / 1500);
    const nextTarget = points < 500 ? 500 : points < 1000 ? 1000 : points < 2000 ? 2000 : 3000;
    const levelName  = points < 500 ? "Bronze" : points < 1000 ? "Silver" : points < 2000 ? "Gold" : "Platinum";
    const nextLevel  = points < 500 ? "Silver" : points < 1000 ? "Gold"   : points < 2000 ? "Platinum" : "Platinum";
    const pct        = Math.min(Math.round((points / nextTarget) * 100), 100);
    return { ...c, points, nextTarget, levelName, nextLevel, pct };
  });

  const goldCustomers = customersData.filter((c) => c.loyalty === "Gold");
  const favMenuFreq   = goldCustomers.reduce((acc, c) => {
    if (c.favoriteMenu) acc[c.favoriteMenu] = (acc[c.favoriteMenu] || 0) + 1;
    return acc;
  }, {});
  const topFavMenus = Object.entries(favMenuFreq)
    .sort((a, b) => b[1] - a[1]).slice(0, 4)
    .map(([menu, count]) => ({ menu, count }));

  // Handlers
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
    const msg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        sender: "bot",
        text: "Terima kasih pesannya! Tim El-Coffee akan segera membalas. Untuk info lebih lanjut, silakan hubungi kami via WhatsApp. ☕",
      }]);
    }, 800);
  };

  const handleClaimVoucher = (code) => {
    setClaimedVouchers((prev) => ({ ...prev, [code]: true }));
  };

  const vouchers = [
    { code: "ELCF-LATTE01",  reward: "Free Latte",          points: 1000, desc: "Tukarkan dengan 1 gelas Latte pilihan ukuran reguler." },
    { code: "ELCF-CAKE02",   reward: "Free Slice Cake",     points: 800,  desc: "Dapatkan 1 potong cake pilihan tersedia di outlet." },
    { code: "ELCF-20OFF03",  reward: "Diskon 20%",          points: 500,  desc: "Potongan 20% untuk total belanja minimal Rp 50.000." },
    { code: "ELCF-BDAY04",   reward: "Birthday Free Drink", points: 0,    desc: "Khusus hari ulang tahun Anda. Berlaku 1 hari penuh." },
  ];

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: "#FFF8F2", color: "#2E1F17" }}>

      <HomeNavbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection revenueData={revenueData} customersData={customersData} ordersData={ordersData} />
      <AboutSection />

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Keunggulan Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Kenapa Harus El-Coffee?</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>Lebih dari sekadar kopi — pengalaman menyeluruh yang membuat Anda selalu ingin kembali.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "☕", iconBg: "#FEF3C7", title: "Premium Coffee Beans",  desc: "Biji kopi Specialty Grade dari Gayo, Kintamani, dan Toraja. Dipilih langsung dari petani lokal terpercaya." },
              { icon: "🥐", iconBg: "#FFF7ED", title: "Fresh Daily Bakery",    desc: "Pastri & snack dipanggang segar setiap pagi. Croissant, muffin, dan kue pilihan yang selalu hangat." },
              { icon: "📶", iconBg: "#EFF6FF", title: "Free Wi-Fi & Workspace",desc: "Koneksi internet stabil berkecepatan tinggi dengan banyak colokan dan meja nyaman untuk bekerja." },
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

      <StatsSection menuData={menuData} customersData={customersData} totalOrdersRevenue={totalOrdersRevenue} />
      <PopularMenu bestSellerMenu={bestSellerMenu} />

      {/* PROMO */}
      <section id="promo" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Promo & Penawaran</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Nikmati Penawaran Spesial</h2>
            <p className="text-sm" style={{ color: "#7A5C48" }}>Promo terbatas setiap minggu — jangan sampai kehabisan!</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { badge:"Best Deal",        badgeBg:"#FEF3C7",badgeText:"#92400E",icon:"🎁",iconBg:"#FEF9EE",title:"Buy 2 Get 1",      desc:"Beli 2 minuman apa saja, gratis 1 minuman pilihan. Berlaku setiap hari pukul 14.00–16.00.",tag:"Setiap Hari",        tagBg:"#F5E6D8",tagText:"#6F4E37" },
              { badge:"Weekend Only",     badgeBg:"#EFF6FF",badgeText:"#1E40AF",icon:"🌅",iconBg:"#EFF6FF",title:"Weekend Promo",    desc:"Diskon 20% untuk semua minuman di hari Sabtu & Minggu. Tunjukkan kode di kasir.",         tag:"Sabtu & Minggu",   tagBg:"#DBEAFE",tagText:"#1D4ED8" },
              { badge:"Pelajar",          badgeBg:"#F0FDF4",badgeText:"#166534",icon:"🎓",iconBg:"#F0FDF4",title:"Student Discount", desc:"Tunjukkan kartu pelajar/mahasiswa dan dapatkan diskon 15% untuk semua menu.",             tag:"Berlaku Setiap Hari",tagBg:"#DCFCE7",tagText:"#15803D" },
              { badge:"Member Exclusive", badgeBg:"#FDF4FF",badgeText:"#7E22CE",icon:"👑",iconBg:"#FDF4FF",title:"Birthday Treat",   desc:"Rayakan ulang tahunmu di El-Coffee dan dapatkan 1 minuman gratis pilihan menu spesial.",  tag:"Khusus Member",    tagBg:"#F3E8FF",tagText:"#7E22CE" },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300"
                style={{ borderColor:"#F0E6DA", boxShadow:"0 1px 8px rgba(111,78,55,0.06)" }}
                onMouseEnter={(e)=>{ e.currentTarget.style.boxShadow="0 8px 30px rgba(111,78,55,0.12)"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor="#D4A373"; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.boxShadow="0 1px 8px rgba(111,78,55,0.06)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="#F0E6DA"; }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ backgroundColor:p.badgeBg, color:p.badgeText }}>{p.badge}</span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor:p.iconBg }}>{p.icon}</div>
                </div>
                <div className="space-y-2 flex-grow">
                  <h3 className="font-bold text-base" style={{ color:"#2E1F17" }}>{p.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color:"#7A5C48" }}>{p.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t" style={{ borderColor:"#F0E6DA" }}>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ backgroundColor:p.tagBg, color:p.tagText }}>{p.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials featuredReviews={featuredReviews} />

      {/* GALLERY */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor:"#F5E6D8", color:"#6F4E37" }}>Galeri</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color:"#2E1F17", fontFamily:"serif" }}>Suasana El-Coffee</h2>
            <p className="text-sm" style={{ color:"#7A5C48" }}>Sekilas pandang ruang, minuman, dan momen hangat yang menanti Anda.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { url:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",alt:"Interior El-Coffee",  tall:true  },
              { url:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",alt:"Secangkir Kopi Hangat",tall:false },
              { url:"https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",alt:"Espresso Shot",        tall:false },
              { url:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",alt:"Latte Art",            tall:false },
              { url:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800",alt:"Cold Brew",            tall:true  },
              { url:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",alt:"Fresh Croissant",      tall:false },
            ].map((img,i) => (
              <div key={i} className={`overflow-hidden rounded-3xl ${img.tall?"row-span-2":""}`} style={{ height:img.tall?"100%":"220px", minHeight:img.tall?"460px":"220px" }}>
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" style={{ borderRadius:"1.5rem" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <MembershipSection progressMembers={progressMembers} />

      {/* REWARD & VOUCHER */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor:"#F5E6D8",color:"#6F4E37" }}>Reward Center</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color:"#2E1F17",fontFamily:"serif" }}>Klaim Reward & Voucher</h2>
            <p className="text-sm" style={{ color:"#7A5C48" }}>Tukarkan poin Anda dengan voucher eksklusif. Tunjukkan QR Code kepada kasir saat bertransaksi.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vouchers.map((v) => {
              const claimed = claimedVouchers[v.code];
              return (
                <div key={v.code} className="bg-white rounded-3xl border overflow-hidden transition-all duration-300"
                  style={{ borderColor:claimed?"#D4A373":"#F0E6DA", boxShadow:claimed?"0 4px 20px rgba(212,163,115,0.3)":"0 1px 8px rgba(111,78,55,0.06)" }}>
                  <div className="h-2" style={{ background:claimed?"linear-gradient(90deg,#D4A373,#6F4E37)":"linear-gradient(90deg,#F0E6DA,#F5E6D8)" }} />
                  <div className="p-6">
                    <div className="w-full h-24 rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed" style={{ borderColor:"#D4A373",backgroundColor:"#FFF8F2" }}>
                      {claimed
                        ? <div className="text-center"><div className="text-2xl">✅</div><p className="text-[10px] font-bold mt-1" style={{ color:"#6F4E37" }}>Diklaim</p></div>
                        : <div className="text-center"><div className="text-2xl">▦</div><p className="text-[10px] font-semibold mt-1" style={{ color:"#7A5C48" }}>QR Voucher</p></div>
                      }
                    </div>
                    <h3 className="font-bold text-base mb-1" style={{ color:"#2E1F17" }}>{v.reward}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color:"#7A5C48" }}>{v.desc}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-dashed" style={{ backgroundColor:"#FFF8F2",borderColor:"#D4A373",color:"#6F4E37" }}>{v.code}</span>
                      {v.points > 0 && <span className="text-xs font-semibold" style={{ color:"#7A5C48" }}>{v.points.toLocaleString("id-ID")} poin</span>}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor:claimed?"#D1FAE5":"#F0FDF4",color:claimed?"#065F46":"#15803D" }}>
                        {claimed ? "Berhasil Diklaim ✓" : "Available"}
                      </span>
                    </div>
                    {claimed
                      ? <div className="text-center text-xs font-semibold p-3 rounded-xl" style={{ backgroundColor:"#FFF8F2",color:"#6F4E37" }}>Voucher Code: <strong>{v.code}</strong></div>
                      : <button onClick={() => handleClaimVoucher(v.code)} className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90" style={{ backgroundColor:"#6F4E37" }}>Claim Reward</button>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CRMSection topFavMenus={topFavMenus} menuData={menuData} totalRevenue={totalRevenue} ordersData={ordersData} customersData={customersData} topPayment={topPayment} />

      {/* LOYALTY TIMELINE */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor:"#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor:"#F5E6D8",color:"#6F4E37" }}>Cara Kerja</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color:"#2E1F17",fontFamily:"serif" }}>Program Loyalitas</h2>
            <p className="text-sm" style={{ color:"#7A5C48" }}>6 langkah mudah dari pendaftaran hingga reward berbagai keuntungan eksklusif.</p>
          </div>
          <div className="flex flex-col items-center gap-0">
            {[
              { icon:"✅",title:"Daftar Member",    desc:"Buat akun El-Coffee secara gratis dan mulai perjalanan keanggotaan Anda.",               color:"#6F4E37",bg:"#F5E6D8" },
              { icon:"☕",title:"Lakukan Pembelian", desc:"Beli minuman atau makanan favorit Anda di outlet El-Coffee.",                            color:"#D97706",bg:"#FEF3C7" },
              { icon:"⭐",title:"Kumpulkan Poin",    desc:"Setiap Rp 1.500 transaksi otomatis dikonversi menjadi 1 poin keanggotaan.",              color:"#0284C7",bg:"#E0F2FE" },
              { icon:"🏆",title:"Naik Level",        desc:"Poin terkumpul membuka level Bronze → Silver → Gold → Platinum secara otomatis.",        color:"#7C3AED",bg:"#EDE9FE" },
              { icon:"🎁",title:"Klaim Reward",      desc:"Tukarkan poin dengan voucher, cashback, atau benefit eksklusif pilihan Anda.",           color:"#BE185D",bg:"#FCE7F3" },
              { icon:"🎟️",title:"Dapatkan Voucher", desc:"Voucher langsung bisa digunakan di kasir atau disimpan untuk transaksi berikutnya.",     color:"#059669",bg:"#D1FAE5" },
            ].map((step, i, arr) => (
              <div key={i} className="flex flex-col items-center w-full max-w-lg">
                <div className="flex items-center gap-5 w-full bg-white rounded-3xl px-6 py-5 border transition-all duration-300"
                  style={{ borderColor:"#F0E6DA",boxShadow:"0 1px 8px rgba(111,78,55,0.06)" }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.boxShadow="0 6px 24px rgba(111,78,55,0.12)"; e.currentTarget.style.borderColor="#D4A373"; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.boxShadow="0 1px 8px rgba(111,78,55,0.06)"; e.currentTarget.style.borderColor="#F0E6DA"; }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor:step.bg,color:step.color }}>{step.icon}</div>
                  <div><h4 className="font-bold text-sm" style={{ color:"#2E1F17" }}>{step.title}</h4><p className="text-xs leading-relaxed mt-0.5" style={{ color:"#7A5C48" }}>{step.desc}</p></div>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-6" style={{ backgroundColor:"#D4A373" }} />
                    <span style={{ color:"#D4A373" }}>▼</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP BENEFITS */}
      <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor:"#FFF8F2" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor:"#F5E6D8",color:"#6F4E37" }}>Keuntungan Member</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color:"#2E1F17",fontFamily:"serif" }}>Membership Benefits</h2>
            <p className="text-sm" style={{ color:"#7A5C48" }}>Nikmati berbagai keuntungan eksklusif yang dirancang khusus untuk member setia El-Coffee.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon:"🎂",title:"Birthday Reward",   desc:"Dapatkan hadiah spesial di hari ulang tahun Anda — free drink dan voucher kejutan langsung di akun member.",bg:"#FEF3C7" },
              { icon:"💰",title:"Cashback Otomatis", desc:"Setiap transaksi menghasilkan cashback sesuai level member Anda. Langsung masuk ke saldo reward.",          bg:"#D1FAE5" },
              { icon:"🏷️",title:"Exclusive Promo",  desc:"Akses promo khusus member yang tidak tersedia untuk pelanggan umum, termasuk early access menu baru.",      bg:"#E0F2FE" },
              { icon:"⚡",title:"Priority Queue",    desc:"Member Gold & Platinum mendapatkan jalur prioritas di outlet. Tidak perlu menunggu antrean panjang.",       bg:"#F3E8FF" },
              { icon:"✨",title:"Double Point Event",desc:"Di hari-hari tertentu, setiap transaksi menghasilkan 2x poin. Cek kalender event member secara berkala.",   bg:"#FEE2E2" },
              { icon:"🎫",title:"Voucher Bulanan",   desc:"Member aktif mendapatkan voucher kejutan setiap bulan — bisa berupa diskon, free menu, atau upgrade ukuran.",bg:"#FFF7ED" },
            ].map((b,i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border transition-all duration-300"
                style={{ borderColor:"#F0E6DA",boxShadow:"0 1px 8px rgba(111,78,55,0.06)" }}
                onMouseEnter={(e)=>{ e.currentTarget.style.boxShadow="0 8px 28px rgba(111,78,55,0.12)"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor="#D4A373"; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.boxShadow="0 1px 8px rgba(111,78,55,0.06)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="#F0E6DA"; }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor:b.bg }}>{b.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color:"#2E1F17" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"#7A5C48" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MembershipCTA />
      <FAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <ContactSection contactForm={contactForm} setContactForm={setContactForm} formSubmitted={formSubmitted} handleContactSubmit={handleContactSubmit} />
      <HomeFooter />
      <ChatAssistant chatOpen={chatOpen} setChatOpen={setChatOpen} chatInput={chatInput} setChatInput={setChatInput} chatMessages={chatMessages} handleChatSend={handleChatSend} />

    </div>
  );
}
