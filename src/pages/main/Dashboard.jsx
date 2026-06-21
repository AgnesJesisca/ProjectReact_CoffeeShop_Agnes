import PageHeader from "../../components/PageHeader";
import DashboardCard from "../../components/DashboardCard";
import ChartCard from "../../components/ChartCard";
import revenue from "../../data/revenue.json";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import {
  FaBox,
  FaArrowTrendUp,
  FaBagShopping,
  FaTriangleExclamation,
} from "react-icons/fa6";

export default function Dashboard() {
  return (
    <div className="flex-1 bg-[#FDFBF7] min-h-screen p-8 transition-all duration-300">
      
      {/* HEADER */}
      <PageHeader
        title="Coffee Dashboard"
        breadcrumb="Overview of your coffee shop"
      />

      {/* STATS CARDS (Updated to Warm Coffee & Earthy Palette) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">

        {/* Total Products - Cokelat Hangat */}
        <DashboardCard
          title="Total Products"
          value="156"
          description="+12 this month"
          icon={<FaBox className="text-white text-lg" />}
          bgColor="bg-[#8B5E3C] shadow-md shadow-[#8B5E3C]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

        {/* Daily Sales - Hijau Sage/Olive Teduh */}
        <DashboardCard
          title="Daily Sales"
          value="$2,450"
          description="+18% from yesterday"
          icon={<FaArrowTrendUp className="text-white text-lg" />}
          bgColor="bg-[#606C38] shadow-md shadow-[#606C38]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

        {/* Purchases - Terakota / Oranye Hangat */}
        <DashboardCard
          title="Purchases"
          value="$1,250"
          description="5 transactions today"
          icon={<FaBagShopping className="text-white text-lg" />}
          bgColor="bg-[#BC6C25] shadow-md shadow-[#BC6C25]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

        {/* Low Stock Items - Merah Bata Muted */}
        <DashboardCard
          title="Low Stock Items"
          value="8"
          description="Needs attention"
          icon={<FaTriangleExclamation className="text-white text-lg" />}
          bgColor="bg-[#A63A50] shadow-md shadow-[#A63A50]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        />

      </div>

      {/* CHARTS CONTAINER */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        {/* LINE CHART CARD */}
        <ChartCard
          title="Weekly Sales Overview"
          description="Sales and purchases trend"
          className="shadow-sm border border-[#EADBC7]/40 hover:shadow-md transition-all duration-300"
        >
          <div className="h-[280px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke="#F4EAE1"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#A18276" }}
                  axisLine={{ stroke: "#EADBC7" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#A18276" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FFFFFF", 
                    borderRadius: "12px", 
                    border: "1px solid #EADBC7",
                    boxShadow: "0 4px 12px rgba(107, 36, 0, 0.05)"
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="#6B2400"
                  strokeWidth={3.5}
                  dot={{
                    r: 5,
                    fill: "#6B2400",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* BAR CHART CARD */}
        <ChartCard
          title="Daily Revenue"
          description="Last 7 days performance"
          className="shadow-sm border border-[#EADBC7]/40 hover:shadow-md transition-all duration-300"
        >
          <div className="h-[280px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke="#F4EAE1"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#A18276" }}
                  axisLine={{ stroke: "#EADBC7" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#A18276" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "#FFFFFF", 
                    borderRadius: "12px", 
                    border: "1px solid #EADBC7",
                    boxShadow: "0 4px 12px rgba(107, 36, 0, 0.05)"
                  }}
                  cursor={{ fill: "#FDFBF7", opacity: 0.7 }}
                />
                <Bar
                  dataKey="totalRevenue"
                  fill="#B45300"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>

    </div>
  );
}