// import PageHeader from "../../components/PageHeader";

// import customers from "../../data/customers.json";
// import revenue from "../../data/revenue.json";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
// } from "recharts";

// export default function Analytics() {

//   // 📈 DAILY SALES
//   const dailySalesData = revenue.map((item) => ({
//     date: item.date,
//     sales: item.totalRevenue,
//   }));

//   // 👥 CUSTOMER LOYALTY
//   const loyaltyData = [
//     {
//       name: "Gold",
//       value: customers.filter(
//         (c) => c.loyalty === "Gold"
//       ).length,
//     },

//     {
//       name: "Silver",
//       value: customers.filter(
//         (c) => c.loyalty === "Silver"
//       ).length,
//     },

//     {
//       name: "Bronze",
//       value: customers.filter(
//         (c) => c.loyalty === "Bronze"
//       ).length,
//     },
//   ];

//   // 📊 ORDERS DATA
//   const ordersData = revenue.map((item) => ({
//     date: item.date,
//     orders: item.totalOrders,
//   }));

//   // 💳 PAYMENT METHOD MOCK
//   const paymentMethodData = [
//     {
//       name: "QRIS",
//       value: 45,
//     },

//     {
//       name: "Cash",
//       value: 25,
//     },

//     {
//       name: "Transfer",
//       value: 30,
//     },
//   ];

//   const COLORS = [
//     "#8B4513",
//     "#D97706",
//     "#EAB308",
//     "#F97316",
//     "#A855F7",
//   ];
// }