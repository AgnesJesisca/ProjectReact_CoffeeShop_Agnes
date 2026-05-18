export default function CustomerCard({ customer }) {
  return (
    <div className="bg-white rounded-[24px] border border-[#F1DFC8] p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={customer.image}
          alt={customer.name}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold text-[#5B2E0F]">
            {customer.name}
          </h2>

          <p className="text-sm text-gray-500">
            {customer.email}
          </p>
        </div>
      </div>
    </div>
  );
}