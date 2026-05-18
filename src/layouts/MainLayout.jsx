import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function MainLayout() {

  return (
    <div className="flex min-h-screen bg-[#F8F4EE]">

      {/* SIDEBAR */}
      <div className="shrink-0">
        <Sidebar />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        <Header />

        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>

        <Footer />

      </div>

    </div>
  );
}