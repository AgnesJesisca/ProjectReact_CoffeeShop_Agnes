import Badge from "./Badge";

export default function ActivityTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#F1DFC8]">
            <th className="text-left py-4 text-sm text-[#5B2E0F]">Action</th>
            <th className="text-left py-4 text-sm text-[#5B2E0F]">Item</th>
            <th className="text-left py-4 text-sm text-[#5B2E0F]">Amount</th>
            <th className="text-left py-4 text-sm text-[#5B2E0F]">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-[#F8EAD7]">
              <td className="py-4 text-sm text-[#5B2E0F]">{item.action}</td>
              <td className="py-4 text-sm text-gray-500">{item.name}</td>
              <td className="py-4 text-sm text-[#D97706]">{item.amount}</td>
              <td className="py-4">
                <Badge color="green">{item.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}