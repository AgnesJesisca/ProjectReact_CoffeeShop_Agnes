export default function Input({
  className = "",
  ...props
}) {
  return (
    <input
      className={`w-full h-[52px] px-4 rounded-2xl border border-[#EADBC8] bg-[#FFFBF7] outline-none focus:ring-4 focus:ring-[#FDE6B8] focus:border-[#D97706] transition-all ${className}`}
      {...props}
    />
  );
}