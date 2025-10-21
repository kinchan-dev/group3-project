# 🌐 Group3 Project – Hệ thống Quản lý User (Frontend + Backend)

## 🚀 Mô tả dự án
Dự án xây dựng hệ thống quản lý người dùng đơn giản bằng **Node.js (Express)** cho backend và **ReactJS** cho frontend.  
Người dùng có thể thực hiện đầy đủ chức năng CRUD (thêm, sửa, xóa, xem danh sách).

---

## 🛠️ Công nghệ sử dụng
### 🔹 Backend:
- Node.js + Express
- MongoDB + Mongoose
- CORS, dotenv

### 🔹 Frontend:
- ReactJS (useState, useEffect)
- Axios
- Bootstrap 5

---

## ⚙️ Hướng dẫn chạy dự án

### 1️⃣ Backend
cd backend
npm install
node server.js
### 2️⃣ Frontend
cd frontend
npm install
npm start
🔄 API endpoints
Method	    Endpoint	     Mô tả
GET	        /users	       Lấy danh sách user
POST	      users	         Thêm user mới
PUT	        /users/:id	   Cập nhật user
DELETE	    /users/:id	   Xóa user
👥 Thành viên nhóm
Họ và tên	                           Vai trò	            Phụ trách
Đoàn Minh Trị                        Backend	            API CRUD, MongoDB
Trần Trung Kiên                      Frontend	            React, Validation, Giao diện
Trần Trung Kiên - Đoàn Minh Trị	    Full-stack	          Kết nối Frontend–Backend, test
Trần Trung Kiên	                     Tổng hợp	            Kiểm thử, viết README, hoàn thiện báo cáo
🧪 Kết quả đạt được

- Hoàn thiện CRUD đầy đủ.

- Xử lý state bằng useState, useEffect.

- Form có validation (name, email hợp lệ).

- Giao diện hiển thị danh sách user, có nút ✏️ Sửa và 🗑️ Xóa.

- Code sạch, đã squash commit và merge main.
📦 Cấu trúc thư mục
group3-project/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── components/
│   └── App.jsx
└── README.md
