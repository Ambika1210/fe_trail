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
        <>
            <h1>Users Table</h1>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {user.map((u) => (
                        <tr key={u._id}>

                            <td>{u._id}</td>

                            <td>{u.name}</td>

                            <td>{u.email}</td>

                            <td>{u.createdAt}</td>

                            <td>

                                <button
                                    onClick={() => deleteUser(u._id)}
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => {

                                        viewUser(u._id);

                                        setIsEditMode(false);

                                        setShowModal(true);

                                    }}
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
                                >
                                    Update
                                </button>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default UsersTable;