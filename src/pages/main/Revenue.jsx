import PageHeader from "../../components/PageHeader";

import revenueData from "../../data/revenue.json";
import orders from "../../data/orders.json";
import menu from "../../data/menu.json";

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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Revenue() {

  // DAILY SALES
  const salesByDay =
    revenueData.map((r) => ({
      date: r.date,
      sales: r.totalRevenue,
    }));

  // CATEGORY SALES
  const categoryData =
    menu.reduce((acc, item) => {

      if (!acc[item.category]) {
        acc[item.category] = 0;
      }

      orders.forEach((order) => {

        const found =
          order.items.find(
            (i) =>
              i.name === item.name
          );

        if (found) {

          acc[item.category] +=
            found.qty * item.price;
        }
      });

      return acc;

    }, {});

  const categorySalesData =
    Object.entries(categoryData)
      .map(([name, value]) => ({
        name,
        value,
      }));

  // TOP SELLING
  const itemSales =
    menu.map((item) => {

      let totalRevenue = 0;

      orders.forEach((o) => {

        const found =
          o.items.find(
            (i) =>
              i.name === item.name
          );

        if (found) {

          totalRevenue +=
            found.qty * item.price;
        }
      });

      return {
        name: item.name,
        revenue: totalRevenue,
      };

    })

    .sort(
      (a, b) =>
        b.revenue - a.revenue
    )

    .slice(0, 5);

  // PAYMENT
  const paymentMethodData = [

    {
      name: "Card",

      value:
        orders.filter(
          (o) =>
            o.paymentMethod ===
              "Debit" ||
            o.paymentMethod ===
              "Card"
        ).length,
    },

    {
      name: "Cash",

      value:
        orders.filter(
          (o) =>
            o.paymentMethod ===
            "Cash"
        ).length,
    },

    {
      name: "QRIS",

      value:
        orders.filter(
          (o) =>
            o.paymentMethod ===
            "QRIS"
        ).length,
    },

  ];

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];

  return (
    <div
      className="
      flex-1
      min-h-screen
      bg-gradient-to-br
      from-[#FFF7ED]
      via-white
      to-[#FFF1F2]
      "
    >

      <div className="p-8">

        {/* HEADER */}
        <div className="mb-8">

          <PageHeader
            title="Analytics & Reports"
            breadcrumb="Insights into your coffee shop performance"
          />

        </div>

        <div className="space-y-6">

          {/* DAILY SALES */}
          <div
            className="
            bg-white
            rounded-[30px]
            border border-[#F1DFC8]
            shadow-sm
            p-6
            "
          >

            <div className="mb-6">

              <h2
                className="
                text-[24px]
                font-semibold
                text-gray-900
                "
              >
                Daily Sales Trend
              </h2>

              <p
                className="
                text-gray-500
                text-sm
                mt-1
                "
              >
                Revenue over recent days
              </p>

            </div>

            <div className="h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={salesByDay}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="date" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    name="Sales"
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* PIE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* CATEGORY */}
            <div
              className="
              bg-white
              rounded-[30px]
              border border-[#F1DFC8]
              shadow-sm
              p-6
              "
            >

              <div className="mb-6">

                <h2
                  className="
                  text-[24px]
                  font-semibold
                  text-gray-900
                  "
                >
                  Sales by Category
                </h2>

                <p
                  className="
                  text-gray-500
                  text-sm
                  mt-1
                  "
                >
                  Revenue distribution across categories
                </p>

              </div>

              <div className="h-[300px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={categorySalesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      labelLine={false}
                      label={({
                        name,
                        percent,
                      }) =>
                        `${name} ${(
                          percent * 100
                        ).toFixed(0)}%`
                      }
                    >

                      {categorySalesData.map(
                        (
                          entry,
                          index
                        ) => (

                          <Cell
                            key={index}
                            fill={
                              COLORS[
                                index %
                                  COLORS.length
                              ]
                            }
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* PAYMENT */}
            <div
              className="
              bg-white
              rounded-[30px]
              border border-[#F1DFC8]
              shadow-sm
              p-6
              "
            >

              <div className="mb-6">

                <h2
                  className="
                  text-[24px]
                  font-semibold
                  text-gray-900
                  "
                >
                  Payment Methods
                </h2>

                <p
                  className="
                  text-gray-500
                  text-sm
                  mt-1
                  "
                >
                  Distribution of payment types
                </p>

              </div>

              <div className="h-[300px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      labelLine={false}
                      label={({
                        name,
                        percent,
                      }) =>
                        `${name} ${(
                          percent * 100
                        ).toFixed(0)}%`
                      }
                    >

                      {paymentMethodData.map(
                        (
                          entry,
                          index
                        ) => (

                          <Cell
                            key={index}
                            fill={
                              COLORS[
                                index %
                                  COLORS.length
                              ]
                            }
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

          {/* TOP SELLING */}
          <div
            className="
            bg-white
            rounded-[30px]
            border border-[#F1DFC8]
            shadow-sm
            p-6
            "
          >

            <div className="mb-6">

              <h2
                className="
                text-[24px]
                font-semibold
                text-gray-900
                "
              >
                Top Selling Items
              </h2>

              <p
                className="
                text-gray-500
                text-sm
                mt-1
                "
              >
                Best performing menu items by revenue
              </p>

            </div>

            <div className="h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={itemSales}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="revenue"
                    fill="#10B981"
                    radius={[8, 8, 0, 0]}
                    name="Revenue"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}