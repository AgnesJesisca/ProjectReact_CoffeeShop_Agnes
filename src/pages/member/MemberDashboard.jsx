import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, Award, LogOut, ShoppingBag, Heart, MapPin, Ticket, Gift, Sparkles, GiftIcon, ShieldAlert } from "lucide-react";

// DATA SUMBER MEMBERSHIP EL-COFFEE
const customerDatabase = [
  { "customerId": "CUST-1001", "customerName": "Andi Saputra", "email": "andi@mail.com", "phone": "081234567001", "loyalty": "Silver", "totalOrders": 45, "totalSpent": 1250000, "address": "Jakarta Selatan", "joinDate": "2025-08-12", "favoriteMenu": "Caramel Latte", "memberStatus": "Active" },
  { "customerId": "CUST-1002", "customerName": "Budi Santoso", "email": "budi@mail.com", "phone": "081234567002", "loyalty": "Silver", "totalOrders": 20, "totalSpent": 500000, "address": "Bandung", "joinDate": "2025-01-18", "favoriteMenu": "Americano", "memberStatus": "Active" },
  { "customerId": "CUST-1003", "customerName": "Citra Lestari", "email": "citra@mail.com", "phone": "081234567003", "loyalty": "Bronze", "totalOrders": 10, "totalSpent": 200000, "address": "Surabaya", "joinDate": "2025-03-20", "favoriteMenu": "Matcha Latte", "memberStatus": "Inactive" },
  { "customerId": "CUST-1004", "customerName": "Dewi Anggraini", "email": "dewi@mail.com", "phone": "081234567004", "loyalty": "Gold", "totalOrders": 50, "totalSpent": 1500000, "address": "Medan", "joinDate": "2024-11-02", "favoriteMenu": "Vanilla Latte", "memberStatus": "Active" },
  { "customerId": "CUST-1005", "customerName": "Eko Prasetyo", "email": "eko@mail.com", "phone": "081234567005", "loyalty": "Silver", "totalOrders": 22, "totalSpent": 600000, "address": "Yogyakarta", "joinDate": "2025-05-12", "favoriteMenu": "Espresso", "memberStatus": "Active" },
  { "customerId": "CUST-1006", "customerName": "Fajar Nugroho", "email": "fajar@mail.com", "phone": "081234567006", "loyalty": "Bronze", "totalOrders": 8, "totalSpent": 180000, "address": "Bekasi", "joinDate": "2025-06-01", "favoriteMenu": "Cappuccino", "memberStatus": "Active" },
  { "customerId": "CUST-1007", "customerName": "Gita Putri", "email": "gita@mail.com", "phone": "081234567007", "loyalty": "Gold", "totalOrders": 60, "totalSpent": 2000000, "address": "Jakarta Barat", "joinDate": "2024-10-10", "favoriteMenu": "Hazelnut Latte", "memberStatus": "VIP" },
  { "customerId": "CUST-1008", "customerName": "Hendra Wijaya", "email": "hendra@mail.com", "phone": "081234567008", "loyalty": "Silver", "totalOrders": 25, "totalSpent": 700000, "address": "Tangerang", "joinDate": "2025-02-14", "favoriteMenu": "Mocha", "memberStatus": "Active" },
  { "customerId": "CUST-1009", "customerName": "Indah Sari", "email": "indah@mail.com", "phone": "081234567009", "loyalty": "Bronze", "totalOrders": 12, "totalSpent": 250000, "address": "Bogor", "joinDate": "2025-04-02", "favoriteMenu": "Iced Latte", "memberStatus": "Active" },
  { "customerId": "CUST-1010", "customerName": "Joko Susilo", "email": "joko@mail.com", "phone": "081234567010", "loyalty": "Gold", "totalOrders": 55, "totalSpent": 1700000, "address": "Semarang", "joinDate": "2024-09-11", "favoriteMenu": "Flat White", "memberStatus": "VIP" },
  { "customerId": "CUST-1011", "customerName": "Kartika Sari", "email": "kartika@mail.com", "phone": "081234567011", "loyalty": "Silver", "totalOrders": 30, "totalSpent": 850000, "address": "Malang", "joinDate": "2025-07-05", "favoriteMenu": "Affogato", "memberStatus": "Active" },
  { "customerId": "CUST-1012", "customerName": "Lutfi Hakim", "email": "lutfi@mail.com", "phone": "081234567012", "loyalty": "Bronze", "totalOrders": 5, "totalSpent": 120000, "address": "Depok", "joinDate": "2026-01-10", "favoriteMenu": "Iced Lemon Tea", "memberStatus": "Active" },
  { "customerId": "CUST-1013", "customerName": "Maya Aprilia", "email": "maya@mail.com", "phone": "081234567013", "loyalty": "Gold", "totalOrders": 42, "totalSpent": 1300000, "address": "Jakarta Timur", "joinDate": "2025-03-15", "favoriteMenu": "V60 Gayo", "memberStatus": "Active" },
  { "customerId": "CUST-1014", "customerName": "Nanda Putra", "email": "nanda@mail.com", "phone": "081234567014", "loyalty": "Silver", "totalOrders": 18, "totalSpent": 450000, "address": "Solo", "joinDate": "2025-10-20", "favoriteMenu": "Piccolo", "memberStatus": "Active" },
  { "customerId": "CUST-1015", "customerName": "Olivia Wijaya", "email": "olivia@mail.com", "phone": "081234567015", "loyalty": "Gold", "totalOrders": 75, "totalSpent": 2500000, "address": "Palembang", "joinDate": "2024-05-01", "favoriteMenu": "Avocado Coffee", "memberStatus": "VIP" },
  { "customerId": "CUST-1016", "customerName": "Panji Ramadhan", "email": "panji@mail.com", "phone": "081234567016", "loyalty": "Bronze", "totalOrders": 4, "totalSpent": 95000, "address": "Denpasar", "joinDate": "2026-03-12", "favoriteMenu": "Cold Brew", "memberStatus": "Active" },
  { "customerId": "CUST-1017", "customerName": "Qory Sandika", "email": "qory@mail.com", "phone": "081234567017", "loyalty": "Silver", "totalOrders": 28, "totalSpent": 780000, "address": "Makassar", "joinDate": "2025-06-22", "favoriteMenu": "Red Velvet Latte", "memberStatus": "Active" },
  { "customerId": "CUST-1018", "customerName": "Rian Hidayat", "email": "rian@mail.com", "phone": "081234567018", "loyalty": "Gold", "totalOrders": 52, "totalSpent": 1600000, "address": "Jakarta Pusat", "joinDate": "2024-12-12", "doubleEspresso": "Double Espresso", "favoriteMenu": "Double Espresso", "memberStatus": "Active" },
  { "customerId": "CUST-1019", "customerName": "Siska Putra", "email": "siska@mail.com", "phone": "081234567019", "loyalty": "Bronze", "totalOrders": 15, "totalSpent": 320000, "address": "Pontianak", "joinDate": "2025-09-01", "favoriteMenu": "Iced Lychee Tea", "memberStatus": "Active" },
  { "customerId": "CUST-1020", "customerName": "Taufik Ismail", "email": "taufik@mail.com", "phone": "081234567020", "loyalty": "Silver", "totalOrders": 35, "totalSpent": 950000, "address": "Manado", "joinDate": "2025-04-18", "favoriteMenu": "Long Black", "memberStatus": "Active" },
  { "customerId": "CUST-1021", "customerName": "Ulysses Grant", "email": "uly@mail.com", "phone": "081234567021", "loyalty": "Gold", "totalOrders": 48, "totalSpent": 1900000, "address": "Jakarta Utara", "joinDate": "2024-08-30", "favoriteMenu": "Dirty Chai Latte", "memberStatus": "VIP" },
  { "customerId": "CUST-1022", "customerName": "Viona Adelia", "email": "viona@mail.com", "phone": "081234567022", "loyalty": "Bronze", "totalOrders": 7, "totalSpent": 150000, "address": "Lampung", "joinDate": "2026-02-14", "favoriteMenu": "Hot Chocolate", "memberStatus": "Active" },
  { "customerId": "CUST-1023", "customerName": "Wahyu Pratama", "email": "wahyu@mail.com", "phone": "081234567023", "loyalty": "Silver", "totalOrders": 24, "totalSpent": 650000, "address": "Banjarmasin", "joinDate": "2025-07-28", "favoriteMenu": "Macchiato", "memberStatus": "Active" },
  { "customerId": "CUST-1024", "customerName": "Xena Arianti", "email": "xena@mail.com", "phone": "081234567024", "loyalty": "Gold", "totalOrders": 58, "totalSpent": 2100000, "address": "Balikpapan", "joinDate": "2024-06-15", "favoriteMenu": "Irish Coffee", "memberStatus": "VIP" },
  { "customerId": "CUST-1025", "customerName": "Yusuf Mansur", "email": "yusuf@mail.com", "phone": "081234567025", "loyalty": "Bronze", "totalOrders": 3, "totalSpent": 65000, "address": "Cirebon", "joinDate": "2026-04-20", "favoriteMenu": "Tubruk Arabica", "memberStatus": "Active" },
  { "customerId": "Zahra Amira", "customerName": "Zahra Amira", "email": "zahra@mail.com", "phone": "081234567026", "loyalty": "Silver", "totalOrders": 19, "totalSpent": 480000, "address": "Samarinda", "joinDate": "2025-11-05", "favoriteMenu": "Cafe Mocha", "memberStatus": "Active" },
  { "customerId": "CUST-1027", "customerName": "Abimanyu Putra", "email": "abi@mail.com", "phone": "081234567027", "loyalty": "Gold", "totalOrders": 40, "totalSpent": 1150000, "address": "Pekanbaru", "joinDate": "2025-02-10", "favoriteMenu": "Flat White", "memberStatus": "Active" },
  { "customerId": "CUST-1028", "customerName": "Bella Hadid", "email": "bella@mail.com", "phone": "081234567028", "loyalty": "Bronze", "totalOrders": 2, "totalSpent": 80000, "address": "Jakarta Selatan", "joinDate": "2026-05-01", "favoriteMenu": "Oatmilk Latte", "memberStatus": "Active" },
  { "customerId": "CUST-1029", "customerName": "Chandra Wijaya", "email": "chandra@mail.com", "phone": "081234567029", "loyalty": "Silver", "totalOrders": 31, "totalSpent": 920000, "address": "Yogyakarta", "joinDate": "2025-01-25", "favoriteMenu": "Ice Coffee Gula Aren", "memberStatus": "Active" },
  { "customerId": "CUST-1030", "customerName": "Dina Mariana", "email": "dina@mail.com", "phone": "081234567030", "loyalty": "Gold", "totalOrders": 88, "totalSpent": 3200000, "address": "Jakarta Barat", "joinDate": "2024-01-10", "favoriteMenu": "Rose Latte", "memberStatus": "VIP" }
];

const rewardsCatalog = [
  { id: 'R1', pointsCost: 50, label: 'Free Espresso' },
  { id: 'R2', pointsCost: 100, label: 'Voucher Rp10.000' },
  { id: 'R3', pointsCost: 250, label: 'Free Latte' },
  { id: 'R4', pointsCost: 500, label: 'Voucher Rp50.000' },
];

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [vouchers, setVouchers] = useState([
    { voucherId: "VCR-999", code: "ELC-7A21BM", label: "Free Latte", status: "Used" }
  ]);

  useEffect(() => {
    const loggedInUserStr = localStorage.getItem("user");
    if (!loggedInUserStr) {
      navigate("/login");
      return;
    }

    const loggedInUser = JSON.parse(loggedInUserStr);

    // 1. Cari di database mock berdasarkan email
    let currentMember = customerDatabase.find(
      (c) => c.email.toLowerCase() === loggedInUser.email.toLowerCase()
    );

    // 2. Jika tidak ditemukan (member baru pendaftaran), buatkan objek otomatis
    if (!currentMember) {
      currentMember = {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: loggedInUser.name || loggedInUser.email.split("@")[0],
        email: loggedInUser.email,
        phone: loggedInUser.phone || "0812-xxxx-xxxx",
        loyalty: "Bronze",
        totalOrders: 0,
        totalSpent: 0,
        points: 15, // Bonus awal untuk pendaftar baru
        address: "Belum Diatur",
        joinDate: new Date().toISOString().split("T")[0],
        favoriteMenu: "Belum Ada",
        memberStatus: "Active"
      };
    } else {
      // Untuk member lama, petakan properti database agar match dengan property JSX (id, name, points)
      currentMember = {
        ...currentMember,
        id: currentMember.customerId,
        name: currentMember.customerName,
        points: Math.floor(currentMember.totalSpent / 10000) // Konversi totalSpent jadi poin dinamis
      };
    }

    // FIX UTAMA: Ubah setMemberData menjadi setProfile agar sesuai state
    setProfile(currentMember);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleRedeem = (reward) => {
    if (profile.points < reward.pointsCost) {
      alert("Poin Anda tidak mencukupi untuk menukar reward ini!");
      return;
    }

    const uniqueCode = `ELC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setProfile(prev => ({ ...prev, points: prev.points - reward.pointsCost }));
    
    const newVoucher = {
      voucherId: `VCR-${Date.now()}`,
      code: uniqueCode,
      label: reward.label,
      status: "Unused"
    };

    setVouchers([newVoucher, ...vouchers]);
    alert(`Sukses Klaim Reward!\nKode Voucher: ${uniqueCode}\nTunjukkan ke kasir untuk digunakan.`);
  };

  const getDynamicRecommendations = (favMenu) => {
    const baseMenu = favMenu && favMenu !== "Belum Ada" ? favMenu : "Caramel Latte";
    
    if (baseMenu.toLowerCase().includes("latte")) {
      return [
        { name: baseMenu, desc: "Your all-time favorite drink", icon: "☕" },
        { name: "Vanilla Latte", desc: "Creamy with warm vanilla notes", icon: "☕" },
        { name: "Hazelnut Latte", desc: "Nutty and smooth espresso combo", icon: "☕" }
      ];
    } else if (baseMenu.toLowerCase().includes("espresso") || baseMenu.toLowerCase().includes("americano") || baseMenu.toLowerCase().includes("black")) {
      return [
        { name: baseMenu, desc: "Your all-time favorite drink", icon: "☕" },
        { name: "Cold Brew", desc: "Steeped 16 hours for pure smoothness", icon: "🧊" },
        { name: "Long Black", desc: "Rich aroma with robust crema flavor", icon: "☕" }
      ];
    } else {
      return [
        { name: baseMenu, desc: "Your all-time favorite drink", icon: "☕" },
        { name: "Butter Croissant", desc: "Flaky, buttery, perfect with coffee", icon: "🥐" },
        { name: "Matcha Latte", desc: "Pure Japanese green tea indulgence", icon: "🍵" }
      ];
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="text-gray-500 animate-pulse font-medium">Memuat data keanggotaan El-Coffee...</p>
      </div>
    );
  }

  const getCardTheme = (tier) => {
    switch (tier?.toLowerCase()) {
      case "platinum":
        return "bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 text-indigo-50 shadow-indigo-900/20";
      case "gold":
        return "bg-gradient-to-br from-[#B45309] via-[#D97706] to-[#78350F] text-amber-50 shadow-amber-900/20";
      case "silver":
        return "bg-gradient-to-br from-slate-500 via-slate-600 to-slate-800 text-slate-50 shadow-slate-900/20";
      default: 
        return "bg-gradient-to-br from-[#7C2D12] via-[#9A3412] to-[#431407] text-orange-50 shadow-orange-900/20";
    }
  };

  const getBirthdayRewardInfo = (tier) => {
    switch (tier?.toLowerCase()) {
      case "platinum": return "Diskon 15% + Free Drink Spesial Ultah";
      case "gold": return "Diskon 10% + Free Birthday Cake Brownies";
      case "silver": return "Diskon 5% + Free Upsize Coffee";
      default: return "Kumpulkan poin transaksi untuk dapat kejutan";
    }
  };

  const recommendations = getDynamicRecommendations(profile.favoriteMenu);

  const getNextTierInfo = (points) => {
    if (points >= 600) return { next: "Max Tier", target: 600 };
    if (points >= 300) return { next: "Platinum", target: 600 };
    if (points >= 100) return { next: "Gold", target: 300 };
    return { next: "Silver", target: 100 };
  };
  const tierInfo = getNextTierInfo(profile.points);
  const progressPercent = Math.min((profile.points / tierInfo.target) * 100, 100);

  const tierBenefitsGuide = [
    { tier: "Bronze", points: "0-99 Pts", perk: "E-Card Member, 1x Point tiap transaksi kelipatan Rp10k.", color: "border-orange-200 bg-orange-50/20" },
    { tier: "Silver", points: "100-299 Pts", perk: "Welcome Gift Free Upsize, Potongan Ultah 5%, Prioritas Antrean.", color: "border-slate-200 bg-slate-50/20" },
    { tier: "Gold", points: "300-599 Pts", perk: "Welcome Gift Free Upsize, Potongan Ultah 10% + Cake, Gratis Ekstra Shot.", color: "border-amber-200 bg-amber-50/20" },
    { tier: "Platinum", points: "600+ Pts", perk: "Welcome Gift Free Upsize, Potongan Ultah 15% + Free Drink, Akses Menu Rahasia.", color: "border-indigo-200 bg-indigo-50/20" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans pb-12">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3D2517] rounded-lg flex items-center justify-center text-[#EEDFCE]">
              <Coffee className="size-4" />
            </div>
            <span className="font-serif font-bold text-[#3D2517] text-lg">El-Coffee</span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              profile.loyalty.toLowerCase() === 'platinum' ? 'bg-indigo-100 text-indigo-800' :
              profile.loyalty.toLowerCase() === 'gold' ? 'bg-amber-100 text-amber-800' :
              profile.loyalty.toLowerCase() === 'silver' ? 'bg-slate-100 text-slate-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {profile.loyalty} Tier
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-3 py-2 rounded-xl"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* SIDEBAR UTAMA (KIRI) */}
        <div className="md:col-span-1 space-y-4">
          {/* KARTU MEMBER DIGITAL */}
          <div className={`rounded-[24px] p-6 shadow-xl relative overflow-hidden h-56 flex flex-col justify-between transition-all ${getCardTheme(profile.loyalty)}`}>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl" />
            
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">{profile.loyalty} Membership</p>
                <h3 className="text-xl font-serif font-bold tracking-wide mt-1 truncate max-w-[180px]">{profile.name}</h3>
              </div>
              <Coffee className="size-8 opacity-30" />
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] opacity-50 uppercase tracking-wider">Member ID</p>
                <p className="font-mono text-sm tracking-widest opacity-90">{profile.id}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] opacity-50 uppercase tracking-wider">Points Balance</p>
                <p className="text-xl font-black">{profile.points} <span className="text-xs font-normal opacity-70">Pts</span></p>
              </div>
            </div>
          </div>

          {/* INFORMASI REKAP TRANSAKSI */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-5 grid grid-cols-2 gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700">
                <ShoppingBag className="size-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Total Orders</p>
                <p className="text-sm font-bold text-gray-800">{profile.totalOrders}x</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                <Heart className="size-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium">Favorite</p>
                <p className="text-xs font-bold text-gray-800 truncate max-w-[80px]">{profile.favoriteMenu}</p>
              </div>
            </div>
          </div>

          {/* MY VOUCHERS LIST */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <Ticket className="size-4 text-amber-700" /> My Vouchers
            </h4>
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {vouchers.map((vcr) => (
                <div key={vcr.voucherId} className={`p-2.5 rounded-xl border text-xs ${vcr.status === "Unused" ? "bg-amber-50/50 border-amber-200" : "bg-gray-50 border-gray-100 opacity-60"}`}>
                  <div className="flex justify-between items-center font-semibold text-gray-800">
                    <span className="truncate max-w-[140px]">{vcr.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${vcr.status === "Unused" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}>
                      {vcr.status}
                    </span>
                  </div>
                  <div className="mt-1.5 bg-white border border-dashed border-gray-200 px-2 py-1 rounded flex justify-between items-center font-mono text-[11px] font-bold text-amber-800">
                    <span>{vcr.code}</span>
                    {vcr.status === "Unused" && <span className="text-[8px] font-sans font-medium text-gray-400">Scan at Cashier</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIER BENEFITS GUIDE */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="size-4 text-amber-700" /> Tier Benefits Guide
            </h4>
            <div className="space-y-2">
              {tierBenefitsGuide.map((b) => {
                const isCurrentTier = profile.loyalty.toLowerCase() === b.tier.toLowerCase();
                return (
                  <div 
                    key={b.tier} 
                    className={`p-3 rounded-xl border text-[11px] relative transition-all ${b.color} ${
                      isCurrentTier ? "ring-2 ring-[#3D2517] border-transparent" : "opacity-75"
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold text-gray-800">
                      <span className="flex items-center gap-1.5">
                        {b.tier}
                        {isCurrentTier && (
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        )}
                      </span>
                      <span className="text-[9px] text-gray-400 font-medium">{b.points}</span>
                    </div>
                    <p className="mt-1 text-gray-600 leading-relaxed">{b.perk}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PANELS UTAMA (KANAN) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-amber-100/30 to-orange-50/30 border border-amber-200/20 rounded-[24px] p-6 relative">
            <h2 className="text-xl font-serif font-bold text-[#3D2517]">Welcome back, {profile.name}! ☕</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed flex items-center gap-1">
              <MapPin className="size-3.5 inline text-gray-400" /> Terdaftar di regional: <strong>{profile.address}</strong>
            </p>
            
            {/* Birthday Program Benefit Badge */}
            <div className="mt-3 inline-flex items-center gap-2 bg-white/80 border border-amber-200/50 rounded-xl px-3 py-1.5 text-[11px]">
              <GiftIcon className="size-4 text-rose-500 fill-rose-100" />
              <span className="text-gray-600">
                Your Birthday Perk: <strong className="text-[#3D2517]">{getBirthdayRewardInfo(profile.loyalty)}</strong>
              </span>
            </div>
            
            {/* Progress Bar Tier System */}
            <div className="mt-4 pt-4 border-t border-amber-200/20">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-stone-700">Membership Progress</span>
                <span className="text-gray-400 text-[11px]">
                  {profile.points} / {tierInfo.target} Pts menuju <strong className="text-amber-800">{tierInfo.next}</strong>
                </span>
              </div>
              <div className="w-full bg-stone-200/60 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-amber-700 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>

          {/* REWARDS CATALOG */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Gift className="size-4 text-amber-700" /> Rewards Catalog (Exchange Points)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rewardsCatalog.map((reward) => (
                <div key={reward.id} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:border-amber-200 transition-all">
                  <div className="flex justify-between items-start">
                    <h5 className="text-xs font-bold text-gray-800">{reward.label}</h5>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-100">
                      {reward.pointsCost} Pts
                    </span>
                  </div>
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={profile.points < reward.pointsCost}
                    className={`mt-3 w-full py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all ${
                      profile.points >= reward.pointsCost
                        ? "bg-[#3D2517] text-[#EEDFCE] hover:bg-[#26160e]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Redeem Reward
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* REKOMENDASI PINTAR ADAPTIF */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Sparkles className="size-4 text-amber-600" /> Personalized Recommendations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendations.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex gap-3 items-center">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="truncate">
                    <h5 className="text-xs font-bold text-gray-800 truncate">{item.name}</h5>
                    <p className="text-[9px] text-gray-400 font-medium truncate mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}