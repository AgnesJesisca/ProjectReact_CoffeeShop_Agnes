import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { customersAPI } from "../../services/customersAPI";

import MemberNavbar        from "../../components/member/MemberNavbar";
import MemberCard          from "../../components/member/MemberCard";
import ActivityCard        from "../../components/member/ActivityCard";
import VoucherSection      from "../../components/member/VoucherSection";
import BenefitSection      from "../../components/member/BenefitSection";
import MembershipProgress  from "../../components/member/MembershipProgress";
import RewardCatalog       from "../../components/member/RewardCatalog";
import RecommendationSection from "../../components/member/RecommendationSection";

export default function MemberDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [vouchers, setVouchers] = useState([
    { voucherId: "VCR-999", code: "ELC-7A21BM", label: "Free Latte", status: "Used" },
  ]);

  useEffect(() => {
    const loggedInUserStr = localStorage.getItem("user");
    if (!loggedInUserStr) {
      navigate("/login");
      return;
    }
    const loggedInUser = JSON.parse(loggedInUserStr);
    loadProfile(loggedInUser);
  }, [navigate]);

  const loadProfile = async (loggedInUser) => {
    try {
      const found = await customersAPI.fetchByEmail(loggedInUser.email);

      let currentMember;
      if (!found) {
        // Member baru — belum ada di tabel customers
        currentMember = {
          id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
          name: loggedInUser.name || loggedInUser.email.split("@")[0],
          email: loggedInUser.email,
          phone: loggedInUser.phone || "0812-xxxx-xxxx",
          loyalty: "Bronze",
          totalOrders: 0,
          totalSpent: 0,
          points: 15,
          address: "Belum Diatur",
          joinDate: new Date().toISOString().split("T")[0],
          favoriteMenu: "Belum Ada",
          memberStatus: "Active",
        };
      } else {
        currentMember = {
          ...found,
          id: found.customerId,
          name: found.customerName,
          points: Math.floor(found.totalSpent / 10000),
        };
      }
      setProfile(currentMember);
    } catch (err) {
      console.error("Gagal memuat profil member:", err);
      const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
      setProfile({
        id: "CUST-TEMP",
        name: loggedInUser.name || loggedInUser.email?.split("@")[0] || "Member",
        email: loggedInUser.email || "",
        phone: loggedInUser.phone || "0812-xxxx-xxxx",
        loyalty: "Bronze",
        totalOrders: 0,
        totalSpent: 0,
        points: 15,
        address: "Belum Diatur",
        joinDate: new Date().toISOString().split("T")[0],
        favoriteMenu: "Belum Ada",
        memberStatus: "Active",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleRedeem = (reward) => {
    if (profile.points < reward.pointsCost) {
      alert("Poin Anda tidak mencukupi untuk menukar reward ini!");
      return;
    }
    const uniqueCode = `ELC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setProfile((prev) => ({ ...prev, points: prev.points - reward.pointsCost }));
    setVouchers((prev) => [
      { voucherId: `VCR-${Date.now()}`, code: uniqueCode, label: reward.label, status: "Unused" },
      ...prev,
    ]);
    alert(`Sukses Klaim Reward!\nKode Voucher: ${uniqueCode}\nTunjukkan ke kasir untuk digunakan.`);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="text-gray-500 animate-pulse font-medium">Memuat data keanggotaan El-Coffee...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans pb-12">

      <MemberNavbar profile={profile} handleLogout={handleLogout} />

      <div className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* SIDEBAR KIRI */}
        <div className="md:col-span-1 space-y-4">
          <MemberCard profile={profile} />
          <ActivityCard profile={profile} />
          <VoucherSection vouchers={vouchers} />
          <BenefitSection profile={profile} />
        </div>

        {/* PANEL KANAN */}
        <div className="md:col-span-2 space-y-6">
          <MembershipProgress profile={profile} />
          <RewardCatalog profile={profile} handleRedeem={handleRedeem} />
          <RecommendationSection profile={profile} />
        </div>

      </div>
    </div>
  );
}
