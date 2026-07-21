import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/20">
          HS
        </div>
        <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          HotelSync PMS
        </span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
        <Link
          to="/"
          className="text-slate-300 hover:text-white transition duration-200"
        >
          Home
        </Link>

        <Link
          to="/super-admin"
          className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30 transition duration-200 flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          Super Admin Panel
        </Link>

        <Link
          to="/hotel-panel"
          className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition duration-200 flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Hotel Panel
        </Link>

        <Link
          to="/login"
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/20 transition duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
