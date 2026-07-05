import { Link } from "react-router-dom";

export default function HomeNavbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const navLinks = [
    ["#home", "Home"],
    ["#about", "About"],
    ["#menu", "Menu"],
    ["#membership", "Member"],
    ["#promo", "Promo"],
    ["#faq", "FAQ"],
    ["#contact", "Kontak"],
  ];

  return (
    <nav className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-base shadow" style={{ backgroundColor: "#6F4E37" }}>☕</div>
          <span className="text-xl font-bold tracking-tight" style={{ color: "#2E1F17", fontFamily: "serif" }}>El-Coffee</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} className="hover:opacity-60 transition-opacity" style={{ color: "#2E1F17" }}>{label}</a>
          ))}
          <Link to="/login"    className="px-4 py-2 rounded-xl text-sm font-semibold border transition hover:opacity-80" style={{ border: "1.5px solid #6F4E37", color: "#6F4E37" }}>Login</Link>
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
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} style={{ color: "#2E1F17" }}>{label}</a>
          ))}
          <Link to="/login"    onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl font-semibold border" style={{ border: "1.5px solid #6F4E37", color: "#6F4E37" }}>Login</Link>
          <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl font-semibold text-white" style={{ backgroundColor: "#6F4E37" }}>Register</Link>
        </div>
      )}
    </nav>
  );
}
