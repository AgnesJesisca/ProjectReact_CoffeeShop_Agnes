export default function Table({
  headers,
  children,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#F1DFC8]">
            {headers.map((header) => (
              <th
                key={header}
                className="py-4 text-left text-sm text-[#5B2E0F]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}