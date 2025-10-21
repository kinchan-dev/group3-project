import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);

  // Hàm tải danh sách user
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Gọi lại khi thêm user
  const handleUserAdded = () => {
    fetchUsers();
  };

  return (
    <div>
      <h1>Quản lý User</h1>

      <h2>Thêm User</h2>
      <AddUser onUserAdded={handleUserAdded} />

      <h2>Danh sách User</h2>
      {/* ✅ Truyền thêm onUserUpdated vào đây */}
      <UserList users={users} onUserUpdated={fetchUsers} />
    </div>
  );
}

export default App;
