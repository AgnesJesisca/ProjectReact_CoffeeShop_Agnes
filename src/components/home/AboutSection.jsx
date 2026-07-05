export default function AboutSection() {
  return (
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
            {[
              ["🫘", "Premium Coffee Beans", "Biji kopi Specialty Grade pilihan."],
              ["🤝", "Friendly Service",      "Barista siap memberi rekomendasi terbaik."],
            ].map(([icon, title, desc], i) => (
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
  );
}
