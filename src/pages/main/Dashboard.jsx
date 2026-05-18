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
    <div className="flex-1 bg-[#F8F4EE] min-h-screen p-8">

      <PageHeader
        title="Coffee Dashboard"
        breadcrumb="Overview of your coffee shop"
      />

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Products"
          value="156"
          description="+12 this month"
          icon={<FaBox className="text-white" />}
          bgColor="bg-[#2563EB]"
        />

        <DashboardCard
          title="Daily Sales"
          value="$2,450"
          description="+18% from yesterday"
          icon={<FaArrowTrendUp className="text-white" />}
          bgColor="bg-[#16A34A]"
        />

        <DashboardCard
          title="Purchases"
          value="$1,250"
          description="5 transactions today"
          icon={<FaBagShopping className="text-white" />}
          bgColor="bg-[#EA580C]"
        />

        <DashboardCard
          title="Low Stock Items"
          value="8"
          description="Needs attention"
          icon={<FaTriangleExclamation className="text-white" />}
          bgColor="bg-[#E11D48]"
        />

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

        {/* LINE */}
        <ChartCard
          title="Weekly Sales Overview"
          description="Sales and purchases trend"
        >

          <div className="h-[260px] mt-5">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={revenue}>

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#F3E2C8"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="#B45300"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#B45300",
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

        {/* BAR */}
        <ChartCard
          title="Daily Revenue"
          description="Last 7 days performance"
        >

          <div className="h-[260px] mt-5">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={revenue}>

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#F3E2C8"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Bar
                  dataKey="totalRevenue"
                  fill="#B45300"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </ChartCard>

      </div>

    </div>
  );
}