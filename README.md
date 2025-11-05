# 🌐 Hệ thống Quản lý & Đăng nhập Người dùng (Group 3 Project)

## 🧭 Giới thiệu
Dự án mô phỏng hệ thống quản lý tài khoản người dùng với các tính năng cơ bản và nâng cao:
- Đăng ký / Đăng nhập / Đăng xuất
- Xem & cập nhật thông tin cá nhân (Profile)
- Phân quyền (User / Admin)
- Quên mật khẩu & Đặt lại mật khẩu (Token)
- Upload ảnh đại diện (Cloudinary)
- Admin quản lý danh sách người dùng

---

## ⚙️ Công nghệ sử dụng
| Thành phần | Công nghệ |
|-------------|------------|
| Backend | Node.js + Express + MongoDB (Mongoose) |
| Frontend | React (Bootstrap 5) |
| Xác thực | JWT + bcryptjs |
| Upload ảnh | Cloudinary API |
| Công cụ test | Postman |
| Quản lý mã nguồn | GitHub + Git Flow |

---

## 🚀 Hướng dẫn cài đặt & chạy project

### 1️⃣ Clone repo về máy
git clone https://github.com/kinchan-dev/group3-project.git
cd group3-project
2️⃣ Cài đặt thư viện
cd backend
npm install
cd ../frontend
npm install
3️⃣ Chạy server & client
Mở 2 terminal song song:

Backend
cd backend
node server.js


Server sẽ chạy tại:
👉 http://localhost:3000

Frontend
cd frontend
npm start


Giao diện React sẽ chạy tại:
👉 http://localhost:3001

🧩 Các API chính (Postman test)
Chức năng	Method	Endpoint	Ghi chú
Đăng ký	POST	/api/auth/signup	Tạo user mới
Đăng nhập	POST	/api/auth/login	Trả về token JWT
Xem thông tin cá nhân	GET	/api/profile	Header: Authorization: Bearer <token>
Cập nhật thông tin	PUT	/api/profile	Cập nhật name, email, password
Quên mật khẩu	POST	/api/forgot-password	Gửi token reset
Đặt lại mật khẩu	POST	/api/reset-password	Dùng token để đổi password
Upload avatar	POST	/api/upload-avatar	FormData: avatar, userId
🖼️ Ảnh minh họa (screenshots)

Các ảnh này lưu trong thư mục /screenshots:

Hình ảnh	             Mô tả
api_signup.png	       Test API đăng ký
api_login.png	         Test API đăng nhập
react_profile.png	     Giao diện Profile React
admin_dashboard.png	   Trang quản trị người dùng

🎥 Video demo chức năng
https://drive.google.com/file/d/1B2bqCDBVjqcDL6B-e7NwCd4SJEJlw5Qv/view?usp=sharing

👥 Thành viên nhóm
Họ và tên	        Vai trò	              Nhiệm vụ
Đoàn Minh Trị	    Backend Developer	    API Auth, Forgot Password, Upload Avatar
Trần Trung Kiên	  Frontend Developer	  React UI (SignUp, Login, Profile)
Trần Trung Kiên	  DevOps / Reviewer	    GitHub, Pull Request, Merge, Test

📝 Quy trình Git Workflow

Nhánh phát triển:
backend-auth, backend-advanced
frontend-auth, frontend-advanced

Quy trình làm việc:
Mỗi thành viên làm việc trên nhánh riêng.
Push code và tạo Pull Request.
Thành viên thứ 3 (reviewer) review & merge vào main.

Kết quả cuối:
Repo main chạy ổn định cả frontend + backend.

# Website hỗ trợ tư vấn tâm lý (Full Stack App)

## 🚀 Chức năng chính
- Đăng ký, đăng nhập, refresh token
- Đặt lại mật khẩu qua email
- Upload avatar người dùng
- Ghi log hoạt động người dùng (rate limit)
- Quản lý quyền: Admin / Moderator / User
- Protected Routes trên frontend bằng Redux Toolkit

## 🧩 Công nghệ sử dụng
- Backend: Node.js, Express, MongoDB
- Frontend: React, Redux Toolkit, React Router
- Thư viện: bcryptjs, jsonwebtoken, express-rate-limit, nodemailer

## 🧪 Cách chạy dự án

### 1️⃣ Backend
```bash
cd backend
npm install
node server.js

### 2️⃣ Frontend 
```bash
cd frontend
npm install
npm start
