export default function Badge({
  children,
  color = "green",
}) {
  const colors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",

    gold: "bg-gradient-to-r from-yellow-300 to-amber-400 text-amber-900 shadow-sm",

    silver: "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 shadow-sm",

    bronze: "bg-gradient-to-r from-orange-200 to-amber-300 text-orange-800 shadow-sm",
  };

  return (
    <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${colors[color]}`}>
      {children}
    </span>
  );
}