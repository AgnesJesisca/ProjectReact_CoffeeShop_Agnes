import { useState, useEffect } from "react";

import { revenueAPI }   from "../../services/revenueAPI";
import { customersAPI } from "../../services/customersAPI";
import { ordersAPI }    from "../../services/ordersAPI";
import { inventoryAPI } from "../../services/inventoryAPI";
import { menuAPI }      from "../../services/menuAPI";

import PageHeader    from "../../components/PageHeader";
import DashboardCard from "../../components/DashboardCard";
import ChartCard     from "../../components/ChartCard";
import Badge         from "../../components/Badge";

import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

import {
  FaBox, FaArrowTrendUp, FaBagShopping, FaTriangleExclamation,
  FaUsers, FaStar,
} from "react-icons/fa6";

// Warna palette konsisten coffee theme
const COLORS = ["#B45309", "#D97706", "#92400E", "#78350F", "#F59E0B", "#FCD34D"];
const LOYALTY_COLORS = {
  Gold:     "#D97706",
  Silver:   "#94A3B8",
  Bronze:   "#B45309",
  VIP:      "#7C3AED",
  Platinum: "#6366F1",
};

// Custom tooltip yang konsisten
function CoffeeTooltip({ active, payload, label, prefix = "", suffix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-2xl border border-[#EADBC7] shadow-lg px-4 py-3 text-xs">
      {label && <p className="text-gray-400 mb-1 font-medium">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="font-bold" style={{ color: p.color || "#5B2E0F" }}>
          {p.name}: {prefix}{Number(p.value).toLocaleString("id-ID")}{suffix}
        </p>
      ))}
    </div>
  );
}

// Custom label untuk Pie chart
function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function Dashboard() {
  const [revenue,   setRevenue]   = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders,    setOrders]    = useState([]);
  const [inventory, setInventory] = useState([]);
  const [menus,     setMenus]     = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);
        const [rev, cust, ord, inv, men] = await Promise.all([
          revenueAPI.fetchData(),
          customersAPI.fetchData(),
          ordersAPI.fetchData(),
          inventoryAPI.fetchData(),
          menuAPI.fetchData(),
        ]);
        setRevenue(rev);
        setCustomers(cust);
        setOrders(ord);
        setInventory(inv);
        setMenus(men);
      } catch (err) {
        console.error("Gagal memuat dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-[#FDFBF7] min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Memuat dashboard...</p>
      </div>
    );
  }

  // ── DERIVED STATS ──────────────────────────────────────────
  const totalRevenue    = revenue.reduce((s, r) => s + (r.totalRevenue || 0), 0);
  const totalOrders     = orders.length;
  const totalCustomers  = customers.length;
  const lowStockCount   = inventory.filter((i) => i.stock < 5).length;
  const totalMenus      = menus.length;
  const activeMembers   = customers.filter((c) => c.memberStatus === "Active" || c.memberStatus === "VIP").length;

  // Revenue chart — ambil 7 hari terakhir
  const revenueChart = revenue.slice(-7).map((r) => ({
    ...r,
    date: r.date?.slice(5), // tampilkan MM-DD saja
  }));

  // Loyalty distribution — untuk Pie chart
  const loyaltyCount = customers.reduce((acc, c) => {
    const key = c.loyalty || "Bronze";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const loyaltyPieData = Object.entries(loyaltyCount).map(([name, value]) => ({ name, value }));

  // Top menu berdasarkan order frequency
  const menuFreq = {};
  orders.forEach((o) => {
    (o.items || []).forEach((item) => {
      if (item.name) menuFreq[item.name] = (menuFreq[item.name] || 0) + (item.qty || 1);
    });
  });
  const topMenuChart = Object.entries(menuFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, qty]) => ({ name, qty }));

  // Payment method distribution
  const paymentCount = orders.reduce((acc, o) => {
    const key = o.paymentMethod || "Other";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const paymentChart = Object.entries(paymentCount)
    .map(([name, value]) => ({ name, value }));

  // Recent orders — 5 terbaru
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 5);

  // Top 5 customer by totalSpent — dari field customers di Supabase
  const topSpenderChart = [...customers]
    .filter((c) => c.totalSpent > 0)
    .sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0))
    .slice(0, 5)
    .map((c) => ({
      name: c.customerName?.split(" ")[0] || "—", // tampilkan nama depan saja agar muat
      fullName: c.customerName,
      totalSpent: c.totalSpent,
      loyalty: c.loyalty,
    }));

  return (
    <div className="flex-1 bg-[#FDFBF7] min-h-screen p-6 md:p-8 space-y-8">

      {/* HEADER */}
      <PageHeader
        title="Coffee Dashboard"
        breadcrumb="Overview of your coffee shop"
      />

      {/* ── STAT CARDS ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">

        <DashboardCard
          title="Total Revenue"
          value={`Rp ${(totalRevenue / 1000000).toFixed(1)}Jt`}
          description={`Dari ${revenue.length} hari data`}
          icon={<FaArrowTrendUp className="text-white text-lg" />}
          bgColor="bg-[#606C38] shadow-md shadow-[#606C38]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

        <DashboardCard
          title="Total Orders"
          value={totalOrders.toString()}
          description="Semua transaksi tercatat"
          icon={<FaBagShopping className="text-white text-lg" />}
          bgColor="bg-[#BC6C25] shadow-md shadow-[#BC6C25]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

        <DashboardCard
          title="Total Customers"
          value={totalCustomers.toString()}
          description={`${activeMembers} member aktif`}
          icon={<FaUsers className="text-white text-lg" />}
          bgColor="bg-[#8B5E3C] shadow-md shadow-[#8B5E3C]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

        <DashboardCard
          title="Total Menu"
          value={totalMenus.toString()}
          description="Item tersedia di katalog"
          icon={<FaBox className="text-white text-lg" />}
          bgColor="bg-[#4A7C59] shadow-md shadow-[#4A7C59]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

        <DashboardCard
          title="Avg. Order Value"
          value={totalOrders > 0 ? `Rp ${Math.round(totalRevenue / totalOrders).toLocaleString("id-ID")}` : "Rp 0"}
          description="Rata-rata per transaksi"
          icon={<FaStar className="text-white text-lg" />}
          bgColor="bg-[#7B5EA7] shadow-md shadow-[#7B5EA7]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

        <DashboardCard
          title="Low Stock Items"
          value={lowStockCount.toString()}
          description="Item perlu di-restock"
          icon={<FaTriangleExclamation className="text-white text-lg" />}
          bgColor="bg-[#A63A50] shadow-md shadow-[#A63A50]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

      </div>

      {/* ── ROW 1: Revenue Line + Bar ──────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* LINE CHART — Revenue trend */}
        <ChartCard
          title="Tren Revenue (7 Hari Terakhir)"
          description="Pendapatan harian coffee shop"
        >
          <div className="h-[260px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueChart} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="5 5" stroke="#F4EAE1" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#A18276" }} axisLine={{ stroke: "#EADBC7" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#A18276" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CoffeeTooltip prefix="Rp " />} />
                <Line type="monotone" dataKey="totalRevenue" name="Revenue" stroke="#B45309" strokeWidth={3}
                  dot={{ r: 4, fill: "#B45309", stroke: "#FFF", strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* BAR CHART — Orders per day */}
        <ChartCard
          title="Jumlah Order (7 Hari Terakhir)"
          description="Volume transaksi harian"
        >
          <div className="h-[260px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueChart} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="5 5" stroke="#F4EAE1" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#A18276" }} axisLine={{ stroke: "#EADBC7" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#A18276" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CoffeeTooltip suffix=" order" />} />
                <Bar dataKey="totalOrders" name="Orders" fill="#D97706" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>

      {/* ── ROW 2: Loyalty Pie + Payment Pie ──────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* PIE — Loyalty distribution */}
        <ChartCard
          title="Distribusi Loyalty Member"
          description="Proporsi tier keanggotaan pelanggan"
        >
          <div className="h-[260px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loyaltyPieData}
                  cx="50%" cy="50%"
                  outerRadius={95}
                  dataKey="value"
                  labelLine={false}
                  label={PieLabel}
                >
                  {loyaltyPieData.map((entry, i) => (
                    <Cell key={i} fill={LOYALTY_COLORS[entry.name] || COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} member`, name]} />
                <Legend
                  formatter={(value, entry) => (
                    <span style={{ color: "#5B2E0F", fontSize: 12, fontWeight: 600 }}>
                      {value} ({entry.payload.value})
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* PIE — Payment method */}
        <ChartCard
          title="Metode Pembayaran"
          description="Distribusi metode bayar dari semua order"
        >
          <div className="h-[260px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentChart}
                  cx="50%" cy="50%"
                  outerRadius={95}
                  dataKey="value"
                  labelLine={false}
                  label={PieLabel}
                >
                  {paymentChart.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} transaksi`, name]} />
                <Legend
                  formatter={(value, entry) => (
                    <span style={{ color: "#5B2E0F", fontSize: 12, fontWeight: 600 }}>
                      {value} ({entry.payload.value}x)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>

      {/* ── ROW 3: Top Menu Bar + Member Status Pie ───────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* HORIZONTAL BAR — Top menu */}
        <ChartCard
          title="Top 6 Menu Terlaris"
          description="Berdasarkan total item yang dipesan"
        >
          <div className="h-[260px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topMenuChart}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="5 5" stroke="#F4EAE1" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#A18276" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#5B2E0F", fontWeight: 600 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip content={<CoffeeTooltip suffix=" qty" />} />
                <Bar dataKey="qty" name="Qty Terjual" fill="#B45309" radius={[0, 6, 6, 0]} maxBarSize={24}>
                  {topMenuChart.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* BAR HORIZONTAL — Top 5 customer by total spent */}
        <ChartCard
          title="Top 5 Customer by Spending"
          description="Pelanggan dengan total pembelian tertinggi"
        >
          <div className="h-[260px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topSpenderChart}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="5 5" stroke="#F4EAE1" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "#A18276" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}Jt`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#5B2E0F", fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  width={72}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white rounded-2xl border border-[#EADBC7] shadow-lg px-4 py-3 text-xs space-y-1">
                        <p className="font-bold text-[#5B2E0F]">{d.fullName}</p>
                        <p className="text-gray-500">
                          Total Spent:{" "}
                          <span className="font-bold text-[#B45309]">
                            Rp {d.totalSpent.toLocaleString("id-ID")}
                          </span>
                        </p>
                        <p className="text-gray-500">
                          Tier:{" "}
                          <span
                            className="font-bold"
                            style={{ color: LOYALTY_COLORS[d.loyalty] || "#5B2E0F" }}
                          >
                            {d.loyalty}
                          </span>
                        </p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="totalSpent" name="Total Spent" radius={[0, 6, 6, 0]} maxBarSize={26}>
                  {topSpenderChart.map((entry, i) => (
                    <Cell key={i} fill={LOYALTY_COLORS[entry.loyalty] || COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend warna loyalty */}
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-[#F1DFC8]">
            {topSpenderChart.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#5B2E0F] font-medium">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: LOYALTY_COLORS[c.loyalty] || COLORS[i % COLORS.length] }}
                />
                {c.fullName}
                <span className="text-gray-400 font-normal">
                  · Rp {(c.totalSpent / 1000000).toFixed(1)}Jt
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

      </div>

      {/* ── ROW 4: Recent Orders Table ─────────────────────── */}
      <div className="bg-white rounded-[28px] border border-[#F1DFC8] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#F1DFC8]">
          <h2 className="text-[20px] font-semibold text-[#5B2E0F]">Transaksi Terbaru</h2>
          <p className="text-sm text-gray-400 mt-0.5">5 order terakhir yang masuk</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FFFBF6] border-b border-[#F1DFC8]">
                {["Order ID", "Customer", "Items", "Pembayaran", "Total", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-xs font-bold text-[#5B2E0F] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-gray-400 text-sm">
                    Belum ada data order.
                  </td>
                </tr>
              ) : (
                recentOrders.map((o) => (
                  <tr key={o.orderId} className="border-b border-[#F1DFC8]/50 hover:bg-[#FFFBF6] transition-colors">
                    <td className="px-5 py-4 text-xs font-mono text-[#A16207] font-semibold">{o.orderId}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#5B2E0F]">{o.customer}</td>
                    <td className="px-5 py-4 text-xs text-gray-500 max-w-[180px] truncate">
                      {(o.items || []).map((i) => `${i.name} ×${i.qty}`).join(", ")}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 font-medium">{o.paymentMethod}</td>
                    <td className="px-5 py-4 text-sm font-bold text-[#5B2E0F]">
                      Rp {Number(o.total || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-4">
                      <Badge color={o.status === "Completed" ? "green" : o.status === "Pending" ? "yellow" : "red"}>
                        {o.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ROW 5: Low Stock Warning ───────────────────────── */}
      {lowStockCount > 0 && (
        <div className="bg-white rounded-[28px] border border-[#F1DFC8] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#F1DFC8] flex items-center gap-3">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <FaTriangleExclamation className="text-red-500 text-base" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#5B2E0F]">Peringatan Stok Menipis</h2>
              <p className="text-sm text-gray-400 mt-0.5">{lowStockCount} item di bawah ambang minimal (stok &lt; 5)</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#FFFBF6] border-b border-[#F1DFC8]">
                  {["Item", "Kategori", "Stok", "Unit", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-xs font-bold text-[#5B2E0F] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventory
                  .filter((i) => i.stock < 5)
                  .sort((a, b) => a.stock - b.stock)
                  .map((item) => (
                    <tr key={item.itemId} className="border-b border-[#F1DFC8]/50 hover:bg-[#FFFBF6] transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#5B2E0F]">{item.name}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-500">{item.category}</td>
                      <td className="px-5 py-3.5 text-sm font-bold text-red-600">{item.stock}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-500">{item.unit}</td>
                      <td className="px-5 py-3.5">
                        <Badge color={item.stock === 0 ? "red" : "yellow"}>
                          {item.stock === 0 ? "Habis" : "Hampir Habis"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
