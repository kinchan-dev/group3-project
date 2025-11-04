import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // server backend
});

// ✅ Thêm accessToken vào mỗi request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Tự động refresh token nếu access token hết hạn
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu Access Token hết hạn → gọi API refresh
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.warn("⚠️ Không có refresh token, cần đăng nhập lại!");
        return Promise.reject(error);
      }

      try {
        const res = await axios.post("http://localhost:3000/api/auth/refresh", {
          token: refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        console.log("🔄 Token mới:", newAccessToken);

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        console.error("❌ Refresh token hết hạn, đăng nhập lại!");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
