export default function ContactSection({ contactForm, setContactForm, formSubmitted, handleContactSubmit }) {
  return (
    <section id="contact" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        {/* Info kiri */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Hubungi Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Terhubung dengan El-Coffee</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>Ada pertanyaan tentang keanggotaan, poin, atau ingin memberi masukan? Tim kami siap membantu Anda.</p>
          </div>
          <div className="space-y-4 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
            {[
              { icon: "💬", label: "WhatsApp",        value: "+62 812-3456-7890",                  bg: "#D1FAE5", color: "#065F46" },
              { icon: "✉️", label: "Email Resmi",     value: "hello@elcoffee.com",                bg: "#FEF3C7", color: "#92400E" },
              { icon: "🕒", label: "Jam Operasional", value: "Setiap Hari — 07.00 s/d 22.00 WIB", bg: "#EFF6FF", color: "#1E40AF" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: c.bg }}>{c.icon}</div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#A07855" }}>{c.label}</h4>
                  <p className="text-sm font-medium" style={{ color: "#2E1F17" }}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
            <h4 className="font-bold text-sm" style={{ color: "#2E1F17" }}>Lokasi Outlet</h4>
            {[
              ["El-Coffee Senopati (HQ)", "Jl. Senopati Raya No. 45, Kebayoran Baru, Jakarta Selatan"],
              ["El-Coffee Dago",          "Jl. Ir. H. Juanda No. 102, Dago, Bandung"],
              ["El-Coffee Prawirotaman",  "Jl. Prawirotaman No. 18, Brontokusuman, Yogyakarta"],
            ].map(([name, addr], i) => (
              <div key={i} className="flex gap-2.5">
                <span style={{ color: "#D4A373" }}>📍</span>
                <div>
                  <p className="font-bold text-xs" style={{ color: "#2E1F17" }}>{name}</p>
                  <p className="text-xs" style={{ color: "#7A5C48" }}>{addr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form kanan */}
        <div className="bg-white rounded-3xl border p-8" style={{ borderColor: "#F0E6DA", boxShadow: "0 2px 20px rgba(111,78,55,0.08)" }}>
          <h3 className="text-xl font-bold mb-6" style={{ color: "#2E1F17", fontFamily: "serif" }}>Kirim Pesan Langsung</h3>
          {formSubmitted ? (
            <div className="text-center p-8 rounded-2xl space-y-2" style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
              <div className="text-3xl">✅</div>
              <h4 className="font-bold" style={{ color: "#065F46" }}>Pesan Berhasil Terkirim!</h4>
              <p className="text-sm" style={{ color: "#059669" }}>Tim El-Coffee akan menghubungi Anda segera.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-5">
              {[
                { label: "Nama Lengkap", type: "text",  key: "name",  placeholder: "Masukkan nama Anda" },
                { label: "Alamat Email", type: "email", key: "email", placeholder: "nama@email.com"      },
              ].map(({ label, type, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#A07855" }}>{label}</label>
                  <input type={type} value={contactForm[key]}
                    onChange={(e) => setContactForm({ ...contactForm, [key]: e.target.value })}
                    placeholder={placeholder} required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                    style={{ backgroundColor: "#FFF8F2", border: "1.5px solid #F0E6DA", color: "#2E1F17" }}
                    onFocus={(e) => (e.target.style.borderColor = "#6F4E37")}
                    onBlur={(e)  => (e.target.style.borderColor = "#F0E6DA")} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#A07855" }}>Pesan</label>
                <textarea rows="4" value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Tuliskan pertanyaan atau saran Anda..." required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors resize-none"
                  style={{ backgroundColor: "#FFF8F2", border: "1.5px solid #F0E6DA", color: "#2E1F17" }}
                  onFocus={(e) => (e.target.style.borderColor = "#6F4E37")}
                  onBlur={(e)  => (e.target.style.borderColor = "#F0E6DA")} />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition hover:opacity-90" style={{ backgroundColor: "#6F4E37" }}>
                Kirim Pesan
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
