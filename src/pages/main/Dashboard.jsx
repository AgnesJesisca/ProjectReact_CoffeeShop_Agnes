import PageHeader from "../../components/PageHeader";

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
      <div className="grid grid-cols-4 gap-6">

        <Card
          title="Total Products"
          value="156"
          desc="+12 this month"
          icon={<FaBox />}
          color="bg-[#2563EB]"
        />

        <Card
          title="Daily Sales"
          value="$2,450"
          desc="+18% from yesterday"
          icon={<FaArrowTrendUp />}
          color="bg-[#16A34A]"
        />

        <Card
          title="Purchases"
          value="$1,250"
          desc="5 transactions today"
          icon={<FaBagShopping />}
          color="bg-[#EA580C]"
        />

        <Card
          title="Low Stock Items"
          value="8"
          desc="Needs attention"
          icon={<FaTriangleExclamation />}
          color="bg-[#E11D48]"
        />

      </div>

      {/* CHART */}
      <div className="grid grid-cols-2 gap-6 mt-6">

        {/* LINE */}
        <div
          className="
          bg-white
          rounded-[24px]
          border border-[#EDD8B8]
          p-6
          shadow-sm
          "
        >

          <h2
            className="
            text-[#6B2400]
            text-[16px]
            font-bold
            "
          >
            Weekly Sales Overview
          </h2>

          <p
            className="
            text-[#E57A10]
            text-[13px]
            mt-1
            "
          >
            Sales and purchases trend
          </p>

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

        </div>

        {/* BAR */}
        <div
          className="
          bg-white
          rounded-[24px]
          border border-[#EDD8B8]
          p-6
          shadow-sm
          "
        >

          <h2
            className="
            text-[#6B2400]
            text-[16px]
            font-bold
            "
          >
            Daily Revenue
          </h2>

          <p
            className="
            text-[#E57A10]
            text-[13px]
            mt-1
            "
          >
            Last 7 days performance
          </p>

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

        </div>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  desc,
  icon,
  color,
}) {

  return (
    <div
      className="
      bg-white
      rounded-[24px]
      border border-[#EDD8B8]
      px-8 py-7
      shadow-sm
      h-[220px]
      flex flex-col justify-between
      "
    >

      {/* TOP */}
      <div className="flex items-start justify-between">

        <p
          className="
          text-[#6B2400]
          text-[15px]
          font-semibold
          leading-[1.5]
          max-w-[140px]
          "
        >
          {title}
        </p>

        <div
          className={`
          w-[54px] h-[54px]
          rounded-[18px]
          ${color}
          flex items-center justify-center
          text-white text-[18px]
          shadow-md
        `}
        >
          {icon}
        </div>

      </div>

      {/* BOTTOM */}
      <div>

        <h1
          className="
          text-[40px]
          font-bold
          text-[#6B2400]
          leading-none
          tracking-[-1px]
          "
        >
          {value}
        </h1>

        <p
          className="
          text-[#E57A10]
          text-[14px]
          mt-3
          "
        >
          {desc}
        </p>

      </div>

    </div>
  );
}