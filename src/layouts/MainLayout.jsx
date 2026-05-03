import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#F7F3EF] min-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}