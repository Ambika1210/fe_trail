import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiUser, FiSettings, FiLogOut, FiX } from "react-icons/fi";

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    // Navigation links helper
    const navItems = [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: <FiHome className="w-4.5 h-4.5" />
        },
        {
            to: "/my-user",
            label: "Users Hub",
            icon: <FiUsers className="w-4.5 h-4.5" />
        },
        {
            to: "/profile",
            label: "My Profile",
            icon: <FiUser className="w-4.5 h-4.5" />
        },
        {
            to: "/settings",
            label: "Settings",
            icon: <FiSettings className="w-4.5 h-4.5" />
        }
    ];

    return (
        <>
            {/* Mobile Sidebar Overlay Backdrop */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-zinc-950/20 backdrop-blur-xs lg:hidden transition-opacity duration-300"
                />
            )}

            {/* Sidebar container */}
            <aside
                className={`fixed top-0 lg:top-14 bottom-0 left-0 z-50 lg:z-35 flex flex-col w-48 bg-gray-50 text-gray-500 border-r border-gray-200 transition-transform duration-300 ease-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Mobile Navigation Header */}
                <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 bg-gray-50 lg:hidden">
                    <span className="text-xs font-bold text-gray-800 tracking-tight">Navigation</span>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                {/* Main Nav Links list */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto bg-gray-50">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-200 ${isActive
                                    ? "bg-indigo-50/70 text-indigo-600"
                                    : "text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-2xs"
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User Section & Logout at Footer */}
                <div className="p-3.5 border-t border-gray-100 space-y-3 bg-gray-50">
                    {/* User profile brief card */}
                    <div className="flex items-center gap-2.5 px-1.5">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-250 flex items-center justify-center text-gray-700 text-xs font-bold shadow-xs">
                            AD
                        </div>
                        <div className="text-left min-w-0 flex-1">
                            <span className="block text-xs font-bold text-gray-800 truncate">Admin User</span>
                            <span className="block text-[10px] text-gray-455 truncate">admin@myapp.com</span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg text-xs font-bold text-red-500 hover:text-red-600 bg-red-50/20 hover:bg-red-50 border border-red-500/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer"
                    >
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;