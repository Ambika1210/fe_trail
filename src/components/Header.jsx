import { FiMenu, FiBell } from "react-icons/fi";

const Header = ({ onMenuClick }) => {
    return (
        <header className="sticky top-0 z-40 h-14 bg-gray-200/95 backdrop-blur-sm border-b border-gray-300 flex items-center justify-between px-6">
            
            {/* Left side: Logo + Hamburger button */}
            <div className="flex items-center gap-3">
                {/* Brand Logo */}
                <div className="flex items-center gap-2.5 mr-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                        M
                    </div>
                    <span className="font-bold text-gray-800 text-sm tracking-tight">MyApp</span>
                </div>

                {/* Hamburger Button for mobile */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    <FiMenu className="w-5 h-5" />
                </button>
            </div>

            {/* Right side: Actions & Status */}
            <div className="flex items-center gap-4 ml-auto">
                {/* Quick Date Display */}
                <span className="hidden sm:inline-block text-[11px] font-semibold text-gray-400">
                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                
                <div className="w-px h-4 bg-gray-200 hidden sm:block" />

                {/* Notifications Bell */}
                <button className="relative p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                    <FiBell className="w-4.5 h-4.5" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                </button>

                {/* Status indicator */}
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active</span>
                </div>
            </div>

        </header>
    );
};

export default Header;
