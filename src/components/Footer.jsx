import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#F1DFC8] bg-white px-8 py-6 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        {/* LEFT */}
        <div>
          <h2 className="text-[20px] font-bold text-[#5B2E0F]"> Coffee Shop CRM</h2>

          <p className="text-sm text-gray-500 mt-1"> Modern coffee shop management dashboard</p>
        </div>

        {/* CENTER */}
        <div className="flex items-center gap-6">
          <a href="#"className="text-[#A16207] hover:text-[#D97706] transition-all">Dashboard</a>
          <a href="#" className="text-[#A16207] hover:text-[#D97706] transition-all">Orders</a>
          <a href="#" className="text-[#A16207] hover:text-[#D97706] transition-all">Analytics</a>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#D97706] flex items-center justify-center hover:bg-[#FDE6B8] transition-all">
            <FaInstagram />
          </button>

          <button className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#D97706] flex items-center justify-center hover:bg-[#FDE6B8] transition-all">
            <FaGithub />
          </button>

          <button className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#D97706] flex items-center justify-center hover:bg-[#FDE6B8] transition-all">
            <FaLinkedin />
          </button>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-6 pt-6 border-t border-[#F5E6D2] text-center text-sm text-gray-400">
        © 2026 Coffee Shop CRM Dashboard. All rights reserved.
      </div>
    </footer>
  );
}