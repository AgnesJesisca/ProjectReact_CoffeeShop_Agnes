export default function AuthInput({
  icon,
  className = "",
  ...props
}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A16207]">
        {icon}
      </div>

      <input
        className={`w-full h-[56px] rounded-2xl border border-[#EADBC8] bg-[#FFFBF7] pl-12 pr-4 outline-none focus:border-[#D97706] focus:ring-4 focus:ring-[#FDE6B8] transition-all ${className}`}
        {...props}
      />
    </div>
  );
}