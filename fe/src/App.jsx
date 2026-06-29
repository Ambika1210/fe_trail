import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [user, setUser] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/users/get-all-users")

        setUser(response.data.data)

        console.log(user)
      } catch (error) {
        console.error(error)
      }
    }
    getUser()

  }, [])
  useEffect(() => {
    console.log(user);
  }, [user]);




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
            <th>Updated At</th>
          </tr>
        </thead>

        <tbody>
          {user.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.createdAt}</td>
              <td>{u.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
