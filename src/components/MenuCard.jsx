import Button from "./Button";

export default function MenuCard({ menu }) {
  return (
    <div className="bg-white rounded-[28px] border border-[#F1DFC8] overflow-hidden shadow-sm">
      <img
        src={menu.image}
        alt={menu.name}
        className="w-full h-[220px] object-cover"
      />

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#5B2E0F]">
            {menu.name}
          </h2>

          <span className="text-[#D97706] font-bold">
            Rp {menu.price.toLocaleString("id-ID")}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {menu.category}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-[#5B2E0F]">
            Stock: {menu.stock}
          </span>

          <Button
            variant="primary"
            className="h-[42px] px-4 text-sm"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}