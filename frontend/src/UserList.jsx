import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  return (
    <div>
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

export default UserList;
