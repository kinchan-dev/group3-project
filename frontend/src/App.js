import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./AddUser"; // 

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h1>Quản lý User</h1>
      <h2>Thêm User</h2>
      <AddUser onUserAdded={handleUserAdded} />

      <h2>Danh sách User</h2>
      {users.length === 0 ? (
        <p>Không có user nào</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} - {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
