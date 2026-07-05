const loyaltyColor = {
  Bronze:   { bg: "#FDF0E8", text: "#9B5D2E", border: "#E8C9A8" },
  Silver:   { bg: "#F3F4F6", text: "#4B5563", border: "#D1D5DB" },
  Gold:     { bg: "#FFFBEB", text: "#92400E", border: "#FCD34D" },
  Platinum: { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD" },
  VIP:      { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD" },
};

export default function Testimonials({ featuredReviews }) {
  return (
    <section className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Testimoni</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Suara Pelanggan El-Coffee</h2>
          <p className="text-sm" style={{ color: "#7A5C48" }}>Ulasan autentik dari member yang telah merasakan pengalaman El-Coffee.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredReviews.map((customer) => {
            const lc = loyaltyColor[customer.loyalty] || loyaltyColor["Bronze"];
            return (
              <div key={customer.customerId} className="p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300"
                style={{ backgroundColor: "#FDFAF7", borderColor: "#F0E6DA", boxShadow: "0 1px 8px rgba(111,78,55,0.05)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(111,78,55,0.10)"; e.currentTarget.style.borderColor = "#D4A373"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.05)"; e.currentTarget.style.borderColor = "#F0E6DA"; }}>
                <div className="flex gap-0.5 text-sm mb-3" style={{ color: "#F59E0B" }}>⭐⭐⭐⭐⭐</div>
                <p className="text-sm leading-relaxed italic flex-grow" style={{ color: "#5C3D2E" }}>"{customer.review}"</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t" style={{ borderColor: "#F0E6DA" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>
                    {customer.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: "#2E1F17" }}>{customer.customerName}</h4>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mt-0.5"
                      style={{ backgroundColor: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>
                      {customer.loyalty}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
