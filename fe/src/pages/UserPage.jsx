import { useEffect, useState } from "react";
import { createUserApi, getAllUsersApi, getUserByIdApi, updateUserApi, deleteUserApi } from "../services/coreService.js";
import CreateUserForm from "../components/CreateUserForm";
import UpdateUser from "../components/UpdateUser";
import ViewUser from "../components/ViewUser";
import UsersTable from "../components/UsersTable";

function UserPage() {
    const [user, setUser] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userDetail, setUserDetail] = useState();
    const [editUserId, setEditUserId] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [moreDetail, setMoreDetail] = useState();
    const [addUser, setAddUser] = useState(false);

    const getUser = async () => {
        try {
            const response = await getAllUsersApi();
            setUser(response?.data?.result || response?.data?.data || response?.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createUser = async () => {
        try {
            await createUserApi({ name, email, password });
            getUser();
            setName("");
            setEmail("");
            setPassword("");
            alert("User Created");
            setShowModal(false);
            setAddUser(false);
        } catch (error) {
            console.error(error);
        }
    };

    const viewUser = async (userId) => {
        try {
            const response = await getUserByIdApi(userId);
            setUserDetail(response?.data?.data?.user || response?.data?.user);
            setMoreDetail(response?.data?.data?.userDetail || response?.data?.userDetail);
            setAddUser(false);
        } catch (error) {
            console.error(error);
        }
    };

    const updateUser = async () => {
        try {
            const data = { name, email };
            await updateUserApi(editUserId, data);
            alert("User Updated");
            getUser();
            setShowModal(false);
            setAddUser(false);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const isConfirm = window.confirm("Are you sure you want to delete this user?");
            if (!isConfirm) {
                return;
            }
            await deleteUserApi(userId);
            getUser();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (!showModal || isEditMode) {
            setAddUser(false);
        }
    }, [showModal, isEditMode]);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-200 dark:border-zinc-800">
                <div className="text-left space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-zinc-55 tracking-tight">
                        User Hub
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        Add, update, view, and delete user profiles from one central dashboard.
                    </p>
                    <div className="pt-2">
                        <button
                            onClick={() => {
                                setAddUser(true);
                                setIsEditMode(false);
                                setShowModal(true);
                            }}
                            className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New User
                        </button>
                    </div>
                </div>

            </div>

            {/* Dashboard Container - Users List Table Section */}
            <div className="w-full">
                <UsersTable
                    user={user}
                    deleteUser={deleteUser}
                    viewUser={viewUser}
                    setIsEditMode={setIsEditMode}
                    setShowModal={setShowModal}
                    setEditUserId={setEditUserId}
                    setName={setName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />
            </div>

            {/* Modern Overlay Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm transition-opacity duration-300">
                    <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-xl transition-all scale-100 duration-300">

                        {/* Close Button Cross Icon */}
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setAddUser(false);
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Modal Body */}
                        <div className="mt-2">
                            {addUser ? (
                                <CreateUserForm
                                    name={name}
                                    email={email}
                                    password={password}
                                    setName={setName}
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    createUser={createUser}
                                    onClose={() => {
                                        setShowModal(false);
                                        setAddUser(false);
                                    }}
                                />
                            ) : isEditMode ? (
                                <UpdateUser
                                    name={name}
                                    email={email}
                                    password={password}
                                    setName={setName}
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    updateUser={updateUser}
                                    onClose={() => {
                                        setShowModal(false);
                                        setAddUser(false);
                                    }}
                                />
                            ) : (
                                <ViewUser
                                    userDetail={userDetail}
                                    moreDetail={moreDetail}
                                />
                            )}
                        </div>

                        {/* Modal Footer Close Button */}
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setAddUser(false);
                            }}
                            className="mt-6 w-full py-2.5 px-4 border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-semibold rounded-xl transition-colors cursor-pointer text-center"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserPage;
