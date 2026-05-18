import Card from "./Card";

export default function ChartCard({
  title,
  description,
  children,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-[22px] font-semibold text-[#5B2E0F]">
          {title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>

      {children}
    </Card>
  );
}