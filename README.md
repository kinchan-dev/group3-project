# ✅ **Ứng dụng Web MERN Stack: Quản lý Người dùng Nâng cao**

Chào mừng đến với dự án cuối kỳ của **Nhóm 3**. Đây là một ứng dụng Full-stack hoàn chỉnh được xây dựng bằng **MERN Stack** (MongoDB, Express.js, React, Node.js), tập trung vào các tính năng xác thực và quản lý người dùng bảo mật và chuyên nghiệp.

---

# ✨ **Tính năng chính**

Ứng dụng mang đến hệ thống User Management toàn diện với nhiều chức năng nâng cao.

## 👨‍💻 **Chức năng cho Người dùng**

* Xác thực: Đăng ký, Đăng nhập, Đăng xuất
* Quản lý phiên đăng nhập bằng **Access Token + Refresh Token**
* Quản lý tài khoản: cập nhật thông tin cá nhân
* Upload Avatar: upload và xử lý ảnh với **Cloudinary**
* Bảo mật cấp cao:

  * Quên mật khẩu
  * Đặt lại mật khẩu qua email thật (Gmail + SMTP)

---

## 👮‍♂️ **Chức năng cho Quản trị viên**

* Hệ thống phân quyền **RBAC** gồm: User, Moderator, Admin
* Quản lý người dùng toàn hệ thống
* Xóa tài khoản (chỉ Admin)
* Xem nhật ký hoạt động chi tiết

---

## 🛡️ **Các lớp bảo mật**

* Mật khẩu được băm bằng **bcryptjs**
* API bảo vệ bởi **JWT**
* Chống brute force đăng nhập bằng **express-rate-limit**
* Protected Routes trên frontend dựa vào role + trạng thái đăng nhập

---

# 🖥️ **Frontend**

* Sử dụng **React + Redux Toolkit** quản lý state
* Giao diện tự động ẩn/hiện tính năng theo vai trò user

---

# 🛠️ **Công nghệ sử dụng**

### **Backend**

Node.js, Express.js, Multer, Sharp, Cloudinary SDK, Nodemailer, JWT, bcryptjs, cors, express-rate-limit

### **Frontend**

React, Redux Toolkit, Axios

### **Database**

MongoDB Atlas

### **Môi trường**

dotenv

---

# 🚀 **Hướng dẫn Cài đặt và Chạy dự án**

## ✅ 1. Yêu cầu

* Node.js v16+
* npm
* Git
* Tài khoản MongoDB Atlas
* Tài khoản Cloudinary
* Gmail bật xác minh 2 bước và có App Password

---

## ✅ 2. Clone Project

```sh
git clone https://github.com/kinchan-dev/group3-project.git
cd group3-project
```

---

## ✅ 3. Cấu hình Backend

```sh
cd backend
npm install
```

Tạo file `.env` trong thư mục backend:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=<chuoi_ket_noi_mongodb_atlas_cua_ban>

# JWT Secrets
JWT_SECRET=<chuoi_bi_mat>

# Frontend URL
FRONTEND_URL=http://localhost:3001

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>

# Nodemailer (Gmail)
EMAIL_USER=<gmail>
EMAIL_PASS=<app_password>
```

Chạy server:

```sh
node server.js
```

---

## ✅ 4. Cấu hình Frontend

```sh
cd frontend
npm install
```

Tạo file `.env`:

```
REACT_APP_API_URL=http://localhost:3000
```

Chạy frontend:

```sh
npm start
```

Ứng dụng React chạy tại:

```
http://localhost:3001
```

---

# 👥 **Thành viên Nhóm 3**

| STT | Họ và Tên           | MSSV       | Vai trò                                                            |
| --- | ------------------- | ---------- | ------------------------------------------------------------------ |
| 1   | **Đoàn Minh Trị**   | **226320** | Trưởng nhóm, Database, Lập trình viên Backend                      |                    
| 2   | **Trần Trung Kiên** | **220415** | Lập trình viên Frontend, Git Manager, Tester                       |
