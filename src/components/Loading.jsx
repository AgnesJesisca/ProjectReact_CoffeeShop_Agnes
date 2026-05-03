export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F7F3EF]">
      <div className="w-12 h-12 border-4 border-[#6F4E37] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-[#6F4E37] text-lg">Brewing your coffee...</p>
    </div>
  );
}