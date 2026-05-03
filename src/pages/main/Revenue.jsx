import revenueData from "../../data/revenue.json";
import PageHeader from "../../components/PageHeader";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Revenue() {

  const totalRevenue = revenueData.reduce((a, b) => a + b.totalRevenue, 0);
  const totalOrders = revenueData.reduce((a, b) => a + b.totalOrders, 0);

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-5 space-y-5">

        <PageHeader title="Revenue" breadcrumb="Dashboard / Revenue" />

        {/* SUMMARY */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card-coffee">
            <h2 className="text-xl font-semibold">
              Rp {totalRevenue.toLocaleString("id-ID")}
            </h2>
            <p className="text-muted">Total Revenue</p>
          </div>

          <div className="card-coffee">
            <h2 className="text-xl font-semibold">{totalOrders}</h2>
            <p className="text-muted">Total Orders</p>
          </div>
        </div>

        {/* CHART */}
        <div className="card-coffee h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="totalRevenue" stroke="#6F4E37" />

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

      </div>
    </div>
  );
}