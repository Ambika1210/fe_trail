import axios from "axios";
import { useEffect, useState } from "react";
import { createUserApi, getAllUsersApi, getUserByIdApi, updateUserApi } from "./services/coreService.js";


const baseUrl = "http://localhost:3000";

function App() {

  const [user, setUser] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [userDetail, setUserDetail] = useState();

  const [editUserId, setEditUserId] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [moreDetail, setMoreDetail] = useState()


  const getUser = async () => {
    try {
      const response = await getAllUsersApi()
      setUser(response?.data?.result || response?.data?.data || response?.data);
    } catch (error) {
      console.error(error);
    }
  };


  const createUser = async () => {
    try {
      await createUserApi({ name, email, password })
      getUser();
      setName("");
      setEmail("");
      setPassword("");
      alert("User Created");
    } catch (error) {
      console.error(error);
    }
  };


  const viewUser = async (userId) => {
    try {
      const response = await getUserByIdApi(userId)
      setUserDetail(response?.data?.data?.user || response?.data?.user);
      setMoreDetail(response?.data?.data?.userDetail || response?.data?.userDetail);
    } catch (error) {
      console.error(error);
    }
  };


  const updateUser = async () => {
    try {
      const data = { name, email }
      await updateUserApi(editUserId, data)
      alert("User Updated");
      getUser();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteUser = async (userId) => {
    try {

      await axios.delete(
        `${baseUrl}/v1/users/${userId}/delete-user`
      );

      getUser();

      alert("User Deleted");

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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

            {
              isEditMode ? (
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
              ) : (
                <>

                  <h1>View User</h1>

                  <h2>
                    Name - {userDetail?.name}
                  </h2>

                  <h2>
                    Email - {userDetail?.email}
                  </h2>

                  <h2>
                    CreatedAt - {userDetail?.createdAt}
                  </h2>

                  <h2>
                    Bio - {moreDetail?.bio}
                  </h2>

                  <h2>
                    phone number - {moreDetail?.phoneNumber}
                  </h2>

                </>
              )
            }

            <br />

            <button
              onClick={() => setShowModal(false)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </>
  );
}

export default App;