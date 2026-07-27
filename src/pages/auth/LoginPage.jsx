import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUserApi } from "../../services/coreService";
import { toast } from "../../utils/toast.jsx";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUserApi({ email, password });
      if (response.data?.data?.token) {
        localStorage.setItem("token", response.data.data.token);
      }
      toast.success("Login Successful!");
      
      // Auto route based on role
      const role = response.data?.data?.user?.role;
      if (role === "SUPER_ADMIN") {
        navigate("/super-admin");
      } else {
        navigate("/hotel-panel");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-sky-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-sky-100 rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center font-bold text-white text-xl mx-auto mb-3 shadow-lg shadow-sky-500/30">
            HS
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">Sign in to access your hotel portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email Address</label>
            <input
              type="email"
              required
              placeholder="superadmin@admin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold text-sm rounded-xl transition shadow-md shadow-sky-500/20 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-sky-100 text-center">
          <p className="text-xs text-slate-500 mb-3 font-medium">Quick Demo Access:</p>
          <div className="flex gap-2 justify-center">
            <Link
              to="/super-admin"
              className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-semibold transition"
            >
              Super Admin Panel →
            </Link>
            <Link
              to="/hotel-panel"
              className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold transition"
            >
              Hotel Panel →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
