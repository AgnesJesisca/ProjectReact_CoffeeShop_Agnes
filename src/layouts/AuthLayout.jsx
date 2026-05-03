import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3EDE5]">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-4xl font-poppins font-extrabold text-gray-800">
                        <span>Coffee</span>
                        <span className="text-amber-500">.</span>
                    </h1>
                </div>

                <Outlet/>

                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2025 Coffee Shop Dashboard
                </p>
            </div>
        </div>
    )
}