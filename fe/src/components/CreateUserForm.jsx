

function CreateUserForm({
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    createUser
}) {
    return (<>

        <h1>Create User</h1>

        <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button onClick={createUser}>
            Create User
        </button>


    </>)
}

export default CreateUserForm;