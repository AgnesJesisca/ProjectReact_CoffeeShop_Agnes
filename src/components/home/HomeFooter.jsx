export default function HomeFooter() {
  return (
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
  );
}
