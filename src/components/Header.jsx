import { useEffect, useState } from "react";

export default function Header() {
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("admin@coffeeshop.com");

  // Mengambil data real dari localStorage jika ada
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.username) setAdminName(parsed.username);
        if (parsed.email) setAdminEmail(parsed.email);
      } catch (e) {
        console.error("Gagal membaca data user dari localStorage", e);
      }
    }
  }, []);

  // Ambil inisial nama untuk avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    /* PERUBAHAN UTAMA: 
      Menggunakan 'sticky top-0 w-full' dan menghilangkan 'left-0 right-0'.
      Ini membuatnya terkunci di atas tanpa memotong area Sidebar di sebelah kiri.
    */
    <div className="sticky top-0 z-40 w-full h-[76px] bg-white/90 backdrop-blur-md border-b border-[#EADBC7]/60 px-8 flex justify-between items-center transition-all shadow-sm">
      
      {/* KIRI: Judul & Subtitle Dinamis */}
      <div className="space-y-0.5">
        <h1 className="text-[22px] font-bold text-[#6B2400] tracking-tight">
          El-Coffee Admin
        </h1>
        <p className="text-gray-400 text-[12px] font-medium hidden sm:block">
          Monitor sales, orders, and store activity
        </p>
      </div>

      {/* KANAN: Informasi Akun & Avatar */}
      <div className="flex items-center gap-4 select-none">
        
        {/* Detail Teks Akun */}
        <div className="text-right hidden xs:block">
          <h2 className="text-[#6B2400] text-[14px] font-semibold capitalize leading-tight">
            {adminName}
          </h2>
          <p className="text-gray-400 text-[12px] mt-0.5 font-mono">
            {adminEmail}
          </p>
        </div>

        {/* Lingkaran Avatar Premium dengan Status Online */}
        <div className="relative group cursor-pointer">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#6B2400] to-[#B45300] flex items-center justify-center text-white text-sm font-bold shadow-md transition-transform duration-300 group-hover:scale-105">
            {getInitials(adminName)}
          </div>
          
          {/* Status Badge Ring (Online Indicator) */}
          <span className="absolute bottom-[-2px] right-[-2px] block h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-100 animate-pulse" />
        </div>

      </div>
    </div>
  );
}