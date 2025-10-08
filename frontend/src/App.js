import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy users:", err);
    }
  };

  const handleUserAdded = () => {
    fetchUsers(); // gọi lại API sau khi thêm user
  };

  return (
    <div>
      <h1>Quản lý User</h1>
      <h2>Thêm User</h2>
      <AddUser onUserAdded={handleUserAdded} />
      <h2>Danh sách User</h2>
      <UserList users={users} />
    </div>
  );
}

export default App;
