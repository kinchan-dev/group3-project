import React from "react";

function UserList({ users }) {
  return (
    <div>
      <h2>Danh sách User</h2>
      {users.length === 0 ? (
        <p>Không có user nào</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>{u.name} - {u.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
