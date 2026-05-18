export default function Card({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={`bg-white rounded-[28px] border border-[#F1DFC8] shadow-sm p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}