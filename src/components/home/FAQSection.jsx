const faqItems = [
  { q: "Bagaimana cara mendapatkan poin?",        a: "Setiap transaksi senilai Rp 1.500 di El-Coffee akan memberikan 1 poin keanggotaan secara otomatis setelah Anda terdaftar sebagai member." },
  { q: "Bagaimana cara redeem voucher?",           a: "Tunjukkan kode voucher atau QR Code kepada kasir sebelum melakukan pembayaran. Voucher akan diverifikasi dan potongan harga langsung diterapkan." },
  { q: "Apakah poin memiliki masa berlaku?",       a: "Poin berlaku selama 12 bulan sejak transaksi terakhir. Pastikan Anda aktif bertransaksi agar poin tidak hangus." },
  { q: "Bagaimana cara naik ke Gold Member?",      a: "Kumpulkan minimal 1.000 poin untuk naik ke level Gold. Semakin sering bertransaksi, semakin cepat level Anda meningkat." },
  { q: "Apakah benefit bisa digunakan bersamaan?", a: "Beberapa benefit dapat dikombinasikan, namun voucher promo tidak dapat digabung dengan cashback di transaksi yang sama." },
];

export default function FAQSection({ openFaq, setOpenFaq }) {
  return (
    <section id="faq" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFF8F2" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Pertanyaan yang Sering Ditanyakan</h2>
          <p className="text-sm" style={{ color: "#7A5C48" }}>Temukan jawaban atas pertanyaan umum seputar program keanggotaan El-Coffee.</p>
        </div>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border overflow-hidden transition-all duration-200" style={{ borderColor: openFaq === i ? "#D4A373" : "#F0E6DA" }}>
              <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="font-semibold text-sm pr-4" style={{ color: "#2E1F17" }}>{item.q}</span>
                <span className="text-xl flex-shrink-0 transition-transform duration-300" style={{ color: "#6F4E37", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed" style={{ color: "#7A5C48" }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
