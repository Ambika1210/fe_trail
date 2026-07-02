function UpdateUser({
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    updateUser
}) {
    return (


        <>
            <h1>Update User</h1>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br />
            <br />

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <br />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <br />

            <button onClick={updateUser}>
                Save Update
            </button>

        </>

    )
}
export default UpdateUser