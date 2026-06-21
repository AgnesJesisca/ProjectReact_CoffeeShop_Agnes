import { useState } from "react";
import { Link } from "react-router-dom";

export default function GuestNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#8C5E3C] flex items-center justify-center text-white text-lg shadow-md group-hover:bg-[#734A2E] transition-colors">
            ☕
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#3D2517] tracking-tight">
              El-Coffee
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              Premium Roastery & Experience
            </p>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#home" className="hover:text-[#8C5E3C] transition-colors">Beranda</a>
          <a href="#story" className="hover:text-[#8C5E3C] transition-colors">Cerita Kami</a>
          <a href="#menu" className="hover:text-[#8C5E3C] transition-colors">Menu Populer</a>
          <a href="#membership" className="hover:text-[#8C5E3C] transition-colors">Keanggotaan</a>
          <a href="#review" className="hover:text-[#8C5E3C] transition-colors">Ulasan</a>
          <a href="#contact" className="hover:text-[#8C5E3C] transition-colors">Kontak</a>
        </div>

        {/* ACTION BUTTONS (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 text-sm rounded-xl text-[#8C5E3C] font-semibold hover:bg-amber-50/50 transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 text-sm rounded-xl bg-[#8C5E3C] hover:bg-[#734A2E] text-white font-semibold shadow-sm transition-colors"
          >
            Gabung Member
          </Link>
        </div>

        {/* TOMBOL HAMBURGER (MOBILE) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-[#8C5E3C] focus:outline-none p-2 rounded-xl hover:bg-gray-50 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              // Ikon Silang (X) saat menu terbuka
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Ikon Garis Tiga (Hamburger) saat menu tertutup
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* MENU PANEL (MOBILE DISCLOSURE) */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in">
          <div className="px-6 pt-2 pb-6 space-y-3 flex flex-col text-sm font-medium text-gray-600">
            <a href="#home" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#8C5E3C] transition-colors">Beranda</a>
            <a href="#story" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#8C5E3C] transition-colors">Cerita Kami</a>
            <a href="#menu" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#8C5E3C] transition-colors">Menu Populer</a>
            <a href="#membership" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#8C5E3C] transition-colors">Keanggotaan</a>
            <a href="#review" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#8C5E3C] transition-colors">Ulasan</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="py-2 hover:text-[#8C5E3C] transition-colors">Kontak</a>
            
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-[#8C5E3C] font-semibold bg-amber-50/50 hover:bg-amber-50 transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-[#8C5E3C] hover:bg-[#734A2E] text-white font-semibold shadow-sm transition-colors"
              >
                Gabung Member
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}