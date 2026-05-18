import Badge from "./Badge";

export default function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-[24px] border border-[#F1DFC8] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#5B2E0F]">
          {order.customer}
        </h2>

        <Badge color="green">
          Paid
        </Badge>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {order.items}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-bold text-[#D97706]">
          Rp {(order.total || 0).toLocaleString("id-ID")}
        </span>

        <span className="text-sm text-gray-500">
          {order.paymentMethod}
        </span>
      </div>
    </div>
  );
}