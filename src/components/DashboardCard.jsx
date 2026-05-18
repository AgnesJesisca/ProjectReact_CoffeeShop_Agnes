export default function DashboardCard({
  title,
  value,
  description,
  icon,
  bgColor,
}) {
  return (
    <div className="bg-white rounded-[28px] border border-[#F1DFC8] shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm text-gray-500 font-medium">
            {title}
          </h3>
        </div>

        <div className={`p-3 rounded-2xl shadow-lg ${bgColor}`}>
          {icon}
        </div>
      </div>

      <h1 className="text-[34px] font-bold text-[#5B2E0F] tracking-[-1px]">
        {value}
      </h1>

      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>
    </div>
  );
}