export default function PopularMenu({ bestSellerMenu }) {
  return (
    <section id="menu" className="py-20 px-6 md:px-10 lg:px-20" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>Menu Pilihan</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#2E1F17", fontFamily: "serif" }}>Best Seller El-Coffee</h2>
          <p className="text-sm" style={{ color: "#7A5C48" }}>Sajian terlaris pilihan komunitas — diracik dengan biji kopi terbaik dan bahan-bahan segar.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {bestSellerMenu.map((item) => (
            <div key={item.menuId} className="bg-white rounded-3xl overflow-hidden border transition-all duration-300"
              style={{ borderColor: "#F0E6DA", boxShadow: "0 1px 8px rgba(111,78,55,0.06)" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(111,78,55,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(111,78,55,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div className="h-48 overflow-hidden">
                <img
                  src={`${item.image}${item.image.includes("?") ? "&" : "?"}auto=format&fit=crop&q=80&w=600`}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-base" style={{ color: "#2E1F17" }}>{item.name}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ backgroundColor: "#F5E6D8", color: "#6F4E37" }}>{item.category}</span>
                </div>
                <p className="font-bold text-base mt-2" style={{ color: "#6F4E37" }}>Rp {item.price.toLocaleString("id-ID")}</p>
                <button className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#6F4E37" }}>Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
