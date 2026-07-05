import { ShoppingBag, Heart } from "lucide-react";

export default function ActivityCard({ profile }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[24px] p-5 grid grid-cols-2 gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700">
          <ShoppingBag className="size-5" />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-medium">Total Orders</p>
          <p className="text-sm font-bold text-gray-800">{profile.totalOrders}x</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
          <Heart className="size-5" />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-medium">Favorite</p>
          <p className="text-xs font-bold text-gray-800 truncate max-w-[80px]">{profile.favoriteMenu}</p>
        </div>
      </div>
    </div>
  );
}
