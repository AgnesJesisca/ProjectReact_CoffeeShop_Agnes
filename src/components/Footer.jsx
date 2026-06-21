import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#F5E7D4] bg-white px-8 py-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* LEFT: Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-black tracking-tight text-[#5B2E0F]">
            El-Coffee
          </h2>
          <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">
            Modern Coffee Shop Dashboard
          </p>
        </div>

        {/* CENTER: Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
          <a href="#" className="text-[#A16207] hover:text-[#D46300] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-500 hover:after:w-full after:transition-all">
            Dashboard
          </a>
          <a href="#" className="text-[#A16207] hover:text-[#D46300] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-500 hover:after:w-full after:transition-all">
            Orders
          </a>
          <a href="#" className="text-[#A16207] hover:text-[#D46300] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-500 hover:after:w-full after:transition-all">
            Analytics
          </a>
        </div>

        {/* RIGHT: Social Media Links */}
        <div className="flex items-center gap-3">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#F5E7D4]/60 text-[#D46300] flex items-center justify-center hover:bg-orange-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-lg"
          >
            <FaInstagram />
          </a>

          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#F5E7D4]/60 text-[#D46300] flex items-center justify-center hover:bg-orange-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-lg"
          >
            <FaGithub />
          </a>

          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#F5E7D4]/60 text-[#D46300] flex items-center justify-center hover:bg-orange-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-lg"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-8 pt-6 border-t border-[#F5E7D4]/50 text-center text-xs font-medium text-gray-400 tracking-wide">
        © 2026 El-Coffee Shop Dashboard. All rights reserved.
      </div>
    </footer>
  );
}