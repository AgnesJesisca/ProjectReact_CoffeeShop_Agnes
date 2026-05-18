export default function Modal({
  open,
  onClose,
  children,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[28px] p-6 w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}