import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Topbar Header */}
            <Header onMenuClick={() => setIsSidebarOpen(true)} />

            <div className="flex-1 flex relative">
                {/* Sidebar Component */}
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 lg:pl-48 bg-white">
                    {/* Sub-page Content Outlet */}
                    <main className="flex-grow p-6 md:p-8 max-w-7xl w-full mx-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;