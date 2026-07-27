import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-100">HotelSync PMS</h2>
          <p className="text-xs text-slate-500 mt-1">Multi-Tenant Hotel Management Platform</p>
        </div>

        <div className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-slate-200 transition">Home</Link>
          <Link to="/super-admin" className="hover:text-slate-200 transition">Super Admin</Link>
          <Link to="/hotel-panel" className="hover:text-slate-200 transition">Hotel Panel</Link>
          <Link to="/login" className="hover:text-slate-200 transition">Login</Link>
        </div>

        <div className="text-slate-500 text-xs">
          © {new Date().getFullYear()} HotelSync PMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
