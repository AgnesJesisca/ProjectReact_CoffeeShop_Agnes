import { Ticket } from "lucide-react";

export default function VoucherSection({ vouchers }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm space-y-3">
      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
        <Ticket className="size-4 text-amber-700" /> My Vouchers
      </h4>
      <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
        {vouchers.map((vcr) => (
          <div
            key={vcr.voucherId}
            className={`p-2.5 rounded-xl border text-xs ${
              vcr.status === "Unused"
                ? "bg-amber-50/50 border-amber-200"
                : "bg-gray-50 border-gray-100 opacity-60"
            }`}
          >
            <div className="flex justify-between items-center font-semibold text-gray-800">
              <span className="truncate max-w-[140px]">{vcr.label}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                vcr.status === "Unused"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {vcr.status}
              </span>
            </div>
            <div className="mt-1.5 bg-white border border-dashed border-gray-200 px-2 py-1 rounded flex justify-between items-center font-mono text-[11px] font-bold text-amber-800">
              <span>{vcr.code}</span>
              {vcr.status === "Unused" && (
                <span className="text-[8px] font-sans font-medium text-gray-400">Scan at Cashier</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
