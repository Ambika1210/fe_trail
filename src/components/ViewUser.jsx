function ViewUser({
    userDetail,
    moreDetail
}) {
    return (
        <div className="w-full max-w-md mx-auto text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-6">
                User Details
            </h2>
            <div className="bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col border-b border-gray-100 dark:border-zinc-800 pb-3">
                    <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                        Full Name
                    </span>
                    <span className="text-lg font-medium text-gray-800 dark:text-zinc-200 mt-1">
                        {userDetail?.name || "N/A"}
                    </span>
                </div>

                <div className="flex flex-col border-b border-gray-100 dark:border-zinc-800 pb-3">
                    <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                        Email Address
                    </span>
                    <span className="text-lg font-medium text-gray-800 dark:text-zinc-200 mt-1">
                        {userDetail?.email || "N/A"}
                    </span>
                </div>

                <div className="flex flex-col border-b border-gray-100 dark:border-zinc-800 pb-3">
                    <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                        Joined Date
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-300 mt-1">
                        {userDetail?.createdAt ? new Date(userDetail.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : "N/A"}
                    </span>
                </div>

                <div className="flex flex-col border-b border-gray-100 dark:border-zinc-800 pb-3">
                    <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                        Bio
                    </span>
                    <span className="text-sm text-gray-700 dark:text-zinc-300 mt-1 italic">
                        {moreDetail?.bio || "No biography provided."}
                    </span>
                </div>

                <div className="flex flex-col pb-1">
                    <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                        Phone Number
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-300 mt-1">
                        {moreDetail?.phoneNumber || "N/A"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ViewUser;