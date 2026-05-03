import PageHeader from "../../components/PageHeader";
import customers from "../../data/customers.json";
import revenue from "../../data/revenue.json";

import { FaCoffee, FaUsers } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function Dashboard() {

  // 📊 CALC DATA
  const totalOrders = revenue.reduce((a, b) => a + b.totalOrders, 0);
  const totalRevenue = revenue.reduce((a, b) => a + b.totalRevenue, 0);
  const lastRevenue = revenue[revenue.length - 1]?.totalRevenue || 0;

  // 🍩 LOYALTY DATA
  const loyaltyData = [
    { name: "Gold", value: customers.filter(c => c.loyalty === "Gold").length },
    { name: "Silver", value: customers.filter(c => c.loyalty === "Silver").length },
    { name: "Bronze", value: customers.filter(c => c.loyalty === "Bronze").length }
  ];

  const COLORS = ["#D4AF37", "#C0C0C0", "#CD7F32"];

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-5 space-y-5">

        <PageHeader 
          title="Coffee Dashboard" 
          breadcrumb="Overview of your coffee shop"
        />

        {/* 🔥 STAT CARDS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">

          <div className="card-coffee flex items-center space-x-5">
            <div className="bg-soft p-4 rounded-full text-primary">
              <FaCoffee />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{totalOrders}</h2>
              <p className="text-muted">Total Orders</p>
            </div>
          </div>

          <div className="card-coffee flex items-center space-x-5">
            <div className="bg-soft p-4 rounded-full text-primary">
              <FaUsers />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{customers.length}</h2>
              <p className="text-muted">Customers</p>
            </div>
          </div>

          <div className="card-coffee flex items-center space-x-5">
            <div className="bg-soft p-4 rounded-full text-primary">
              <TbReportMoney />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Rp {lastRevenue.toLocaleString("id-ID")}
              </h2>
              <p className="text-muted">Latest Revenue</p>
            </div>
          </div>

          <div className="card-coffee flex items-center space-x-5">
            <div className="bg-soft p-4 rounded-full text-primary">
              <TbReportMoney />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Rp {totalRevenue.toLocaleString("id-ID")}
              </h2>
              <p className="text-muted">Total Revenue</p>
            </div>
          </div>

        </div>

        {/* 🔥 CHART + DONUT */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* 📈 LINE CHART */}
          <div className="card-coffee h-[400px]">

            <h2 className="font-semibold mb-4 text-primary">
              Revenue & Orders Overview
            </h2>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(v) => v.toLocaleString("id-ID")} />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="#6F4E37"
                  strokeWidth={3}
                  name="Revenue"
                />

                <Line
                  type="monotone"
                  dataKey="totalOrders"
                  stroke="#C8A27C"
                  strokeWidth={2}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* 🍩 DONUT CHART */}
          <div className="card-coffee h-[400px] flex flex-col">

            <h2 className="font-semibold mb-4 text-primary">
              Customer Loyalty
            </h2>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loyaltyData}
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {loyaltyData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* LEGEND */}
            <div className="flex justify-center gap-4 mt-4 text-sm">
              {loyaltyData.map((l, i) => (
                <div key={l.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: COLORS[i] }}
                  />
                  {l.name} ({l.value})
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}