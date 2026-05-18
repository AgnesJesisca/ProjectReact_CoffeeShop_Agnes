export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white shadow-md hover:opacity-90",

    secondary: "bg-[#FFF7ED] text-[#D97706] border border-[#F5D7B2] hover:bg-[#FDE6B8]",

    outline: "border border-[#D97706] text-[#D97706] bg-transparent hover:bg-[#FFF7ED]",

    ghost: "bg-transparent text-[#A16207] hover:bg-[#FFF7ED]",

    danger: "border border-[#DC2626] text-[#DC2626] bg-transparent hover:bg-red-50",

    debit: "bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-md hover:scale-[1.01]",

    qris: "bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md hover:scale-[1.01]",

    cash: "bg-gradient-to-r from-[#16A34A] to-[#10B981] text-white shadow-md hover:scale-[1.01]",
  };

  return (
    <button
      className={`h-[52px] px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}