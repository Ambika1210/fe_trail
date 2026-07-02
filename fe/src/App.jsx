import { useEffect, useState } from "react";
import { createUserApi, getAllUsersApi, getUserByIdApi, updateUserApi, deleteUserApi } from "./services/coreService.js";
import CreateUserForm from "./components/CreateUserForm";
import UpdateUser from "./components/UpdateUser";
import ViewUser from "./components/ViewUser";
import UsersTable from "./components/UsersTable"
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
      const isConfirm = window.confirm("Are you sure you want to delete this user?");
      if (!isConfirm) {
        return;
      }
      await deleteUserApi(userId)
      getUser();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <CreateUserForm
        name={name}
        email={email}
        password={password}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        createUser={createUser}

      />
      <hr />

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
                <UpdateUser
                  name={name}
                  email={email}
                  password={password}
                  setName={setName}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  updateUser={updateUser}
                />
              ) : (
                <ViewUser
                  userDetail={userDetail}
                  moreDetail={moreDetail}
                />
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