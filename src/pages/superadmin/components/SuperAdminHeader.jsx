import { useLocation } from "react-router-dom";

const SuperAdminHeader = () => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.endsWith("/hotels")) {
      return "Hotel Management";
    }
    if (location.pathname.endsWith("/users")) {
      return "User & Role Management";
    }
    return "System Overview";
  };

  return (
    <header className="border-b border-sky-100 bg-white px-6 py-2 flex items-center justify-between sticky top-0 z-10 shadow-xs">
      <div>
        <h1 className="!text-base !font-extrabold text-slate-900 tracking-tight capitalize !m-0 !leading-tight">
          {getTitle()}
        </h1>
        <p className="text-[10px] text-sky-600 font-semibold mt-0.5">
          Welcome back, Super Admin • Admin Operations
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-250 text-emerald-700 text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          System Live
        </span>

        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
          SA
        </div>
      </div>
    </header>
  );
};

export default SuperAdminHeader;
