export default function InventoryCard({ item }) {
  return (
    <div className="bg-white rounded-[24px] border border-[#F1DFC8] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#5B2E0F]">
          {item.name}
        </h2>

        <span className="text-sm text-[#D97706] font-semibold">
          {item.stock} pcs
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {item.category}
      </p>
    </div>
  );
}