export default function FilterSelect({
  options = [],
  value,
  onChange,
  className = "",
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`h-[52px] px-4 rounded-2xl border border-[#EADBC8] bg-[#FFFBF7] text-[#5B2E0F] outline-none focus:ring-4 focus:ring-[#FDE6B8] focus:border-[#D97706] transition-all ${className}`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}