function UsersTable({
    user,
    deleteUser,
    viewUser,
    setIsEditMode,
    setShowModal,
    setEditUserId,
    setName,
    setEmail,
    setPassword
}) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden w-full">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900">
                <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100">
                    Users List
                </h2>
                <span className="bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {user.length} {user.length === 1 ? 'user' : 'users'}
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-zinc-800/40 border-b border-gray-100 dark:border-zinc-800 text-left">
                            <th className="py-3.5 px-6 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="py-3.5 px-6 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="py-3.5 px-6 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="py-3.5 px-6 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="py-3.5 px-6 text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                        {user.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-sm text-gray-400 dark:text-zinc-500">
                                    No users found. Create a user to get started.
                                </td>
                            </tr>
                        ) : (
                            user.map((u) => (
                                <tr 
                                    key={u._id}
                                    className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-colors duration-150"
                                >
                                    <td className="py-4 px-6 text-xs font-mono text-gray-400 dark:text-zinc-500">
                                        {u._id?.substring(0, 8)}...
                                    </td>
                                    <td className="py-4 px-6 text-sm font-semibold text-gray-800 dark:text-zinc-200">
                                        {u.name}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-zinc-400">
                                        {u.email}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-zinc-400">
                                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        }) : "N/A"}
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium text-right space-x-2">
                                        <button
                                            onClick={() => {
                                                viewUser(u._id);
                                                setIsEditMode(false);
                                                setShowModal(true);
                                            }}
                                            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-900/40 rounded-lg transition-colors cursor-pointer"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditUserId(u._id);
                                                setName(u.name);
                                                setEmail(u.email);
                                                setPassword(u.password || "");
                                                setIsEditMode(true);
                                                setShowModal(true);
                                            }}
                                            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:bg-emerald-900/40 rounded-lg transition-colors cursor-pointer"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => deleteUser(u._id)}
                                            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-900/40 rounded-lg transition-colors cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersTable;