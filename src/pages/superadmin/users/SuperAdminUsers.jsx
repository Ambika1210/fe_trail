const SuperAdminUsers = () => {
  return (
    <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-500/5">
      <h2 className="text-lg font-bold text-slate-900 mb-2">Users & Role Access</h2>
      <p className="text-xs text-slate-500 mb-6">Overview of registered platform users and assigned roles</p>

      <div className="overflow-x-auto border border-sky-100 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-sky-100 bg-sky-50/50">
              <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Name</th>
              <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Email</th>
              <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Role</th>
              <th className="py-2 px-3 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-50">
            <tr className="hover:bg-sky-50/30 transition-colors">
              <td className="py-2 px-3 text-sm font-bold text-slate-900">Super Admin</td>
              <td className="py-2 px-3 text-sm text-slate-600">superadmin@admin.com</td>
              <td className="py-2 px-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                  SUPER_ADMIN
                </span>
              </td>
              <td className="py-2 px-3 text-emerald-600 text-xs font-bold">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminUsers;
