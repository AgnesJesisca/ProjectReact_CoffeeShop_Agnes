import { Search } from "lucide-react";

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A16207] size-5" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full h-[52px] pl-12 pr-4 rounded-2xl border border-[#EADBC8] bg-[#FFFBF7] outline-none focus:ring-4 focus:ring-[#FDE6B8] focus:border-[#D97706] transition-all ${className}`}
      />
    </div>
  );
}