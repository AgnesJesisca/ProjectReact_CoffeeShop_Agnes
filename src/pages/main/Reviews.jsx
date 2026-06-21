import { useState } from "react";
import { MessageSquare, Star, User } from "lucide-react";
import customersData from "../../data/customers.json"; // Mengambil data pelanggan langsung

import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import Badge from "../../components/Badge";

export default function Reviews() {
  const [search, setSearch] = useState("");
  const [filterLoyalty, setFilterLoyalty] = useState("All");

  // Filter ulasan berdasarkan pencarian nama/menu favorit dan tier loyalty member
  const filteredReviews = customersData.filter((cust) => {
    // Memastikan hanya menampilkan customer yang memiliki review tertulis saja
    if (!cust.review) return false;

    const matchesSearch =
      cust.customerName.toLowerCase().includes(search.toLowerCase()) ||
      cust.favoriteMenu.toLowerCase().includes(search.toLowerCase());

    const matchesLoyalty =
      filterLoyalty === "All" ? true : cust.loyalty === filterLoyalty;

    return matchesSearch && matchesLoyalty;
  });

  // Fungsi dinamis untuk memberikan badge warna berdasarkan status loyalty
  const getLoyaltyColor = (tier) => {
    switch (tier) {
      case "Gold":
      case "VIP":
        return "amber";
      case "Silver":
        return "gray";
      default:
        return "orange"; // Bronze atau lainnya
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F8F4EE] p-6 space-y-6">
      <PageHeader
        title="Customer Reviews Log"
        breadcrumb="Daftar testimoni dan ulasan langsung dari profil member El-Coffee"
      />

      {/* FILTER & SEARCH */}
      <Card className="bg-white border border-[#F5E7D4] p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <SearchBar
          placeholder="Cari nama member atau menu favorit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80"
        />
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-semibold text-[#5B2E0F] whitespace-nowrap">
            Tier Member:
          </span>
          <select
            value={filterLoyalty}
            onChange={(e) => setFilterLoyalty(e.target.value)}
            className="w-full md:w-40 px-3 py-2 border border-[#F5E7D4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D46300] text-[#5B2E0F] font-medium bg-[#FFFBF6]"
          >
            <option value="All">Semua Tier</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </Card>

      {/* REVIEWS GRID LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredReviews.length === 0 ? (
          <div className="col-span-2 text-center py-10 text-[#A16207] bg-white rounded-2xl border border-[#F5E7D4]">
            Tidak ada ulasan member yang cocok dengan kriteria pencarian.
          </div>
        ) : (
          filteredReviews.map((cust) => (
            <Card
              key={cust.customerId}
              className="bg-white border border-[#F5E7D4] p-6 flex flex-col justify-between hover:shadow-md transition-all rounded-2xl"
            >
              <div className="space-y-4">
                {/* Header Profil Ringkas Customer */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF7ED] flex items-center justify-center border border-[#F5E7D4] text-[#D46300]">
                      <User className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#5B2E0F]">
                        {cust.customerName}
                      </h3>
                      <p className="text-xs text-[#A16207] mt-0.5">
                        Joined: {cust.joinDate}
                      </p>
                    </div>
                  </div>
                  <Badge color={getLoyaltyColor(cust.loyalty)}>
                    {cust.loyalty} Member
                  </Badge>
                </div>

                {/* Balon Kutipan Ulasan Anggota */}
                <div className="relative bg-[#FFFBF6] p-4 rounded-xl border border-[#F5E7D4]/60">
                  <MessageSquare className="size-4 text-[#F5E7D4] absolute top-3 right-3" />
                  <p className="text-[#6B4F3A] text-sm leading-relaxed italic">
                    "{cust.review}"
                  </p>
                </div>
              </div>

              {/* Informasi Kopi Favorit Terkait */}
              <div className="mt-5 pt-3 border-t border-[#F5E7D4]/60 flex items-center justify-between text-xs">
                <span className="font-semibold uppercase text-[#A16207] tracking-wider">
                  Menu Favorit:
                </span>
                <span className="font-bold text-[#5B2E0F] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  ☕ {cust.favoriteMenu}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}