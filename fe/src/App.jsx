import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = "http://localhost:3000"

function App() {

  const [user, setUser] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [userDetail, setUserDetail] = useState()

  const getUser = async () => {
    try {

      const response = await axios.get(`${baseUrl}/v1/users/get-all-users`);

      setUser(response?.data?.result || response?.data?.data || response?.data);

    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {

      const response = await axios.post(`${baseUrl}/users/create-user`,
        {
          name,
          email,
          password
        }
      );

      getUser()
      setName("");
      setEmail("");
      setPassword("")

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${baseUrl}/v1/users/${userId}/delete-user`,)
      getUser();
      alert("User Deleted")
    } catch (error) {
      console.error(error)
    }

  }



  const viewUser = async (userId) => {
    try {

      const response = await axios.get(`${baseUrl}/v1/users/${userId}/get-user-by-id`,)

      setUserDetail(response?.data?.data || response?.data || response?.data?.data?.data);
      console.log(userDetail)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
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
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={createUser}>
        Create User
      </button>

      <hr />

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
            <tr key={u.id}>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.createdAt}</td>
              <td>
                <button onClick={() => { deleteUser(u._id) }} >Delete</button>
                <button onClick={
                  () => {
                    viewUser(u._id)
                    setShowModal(true)

                  }} >View</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px"
            }}
          >
            <h1>View User</h1>
            <h1>Name- {userDetail?.name}</h1>
            <h1>Email- {userDetail?.email}</h1>
            <h1>createdAt: {userDetail?.createdAt}</h1>

            <button onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

    </>
  );
}

export default App;