# Đại học Thông minh - Trợ lý định hướng AI

Một ứng dụng web full-stack sử dụng AI để giúp sinh viên lựa chọn chuyên ngành và định hướng nghề nghiệp.

## Kiến trúc

Dự án được xây dựng theo kiến trúc monorepo-style với hai phần chính:

-   `client/`: Ứng dụng Frontend được xây dựng bằng React, TypeScript và Vite.
-   `server/`: Ứng dụng Backend được xây dựng bằng Node.js, Express, MongoDB và tích hợp Gemini AI.

## Cài đặt và Chạy dự án

Bạn cần chạy cả client và server trên hai cửa sổ terminal khác nhau.

### 1. Cài đặt Backend (Server)

a. **Di chuyển vào thư mục server:**
```bash
cd server
```

b. **Cài đặt dependencies:**
```bash
npm install
```

c. **Thiết lập biến môi trường:**
Tạo một file `.env` trong thư mục `server` và thêm các biến sau:
```env
# Link kết nối tới cơ sở dữ liệu MongoDB của bạn
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# Một chuỗi ký tự bí mật, ngẫu nhiên và phức tạp để mã hóa/giải mã JWT
# LỖI 401 UNAUTHORIZED SẼ XẢY RA NẾU BIẾN NÀY BỊ THIẾU!
JWT_SECRET=DAY_LA_MOT_CHUOI_BI_MAT_RAT_QUAN_TRONG_HAY_THAY_THE_NO

# API Key cho Google Gemini
API_KEY=YOUR_GEMINI_API_KEY_HERE

# (Tùy chọn) Cấu hình để gửi email (ví dụ: quên mật khẩu)
# Sử dụng Gmail, bạn cần tạo "Mật khẩu ứng dụng" (App Password)
# Xem hướng dẫn tại: https://support.google.com/accounts/answer/185833
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# --- Cấu hình OAuth 2.0 cho Đăng nhập Mạng xã hội ---
# URL của ứng dụng frontend (ví dụ: http://localhost:5173)
CLIENT_URL=http://localhost:3000

# Google (tạo tại https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# Facebook (tạo tại https://developers.facebook.com/apps/)
FACEBOOK_APP_ID=YOUR_FACEBOOK_APP_ID
FACEBOOK_APP_SECRET=YOUR_FACEBOOK_APP_SECRET

# GitHub (tạo tại https://github.com/settings/developers)
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
```

d. **Chạy server:**
```bash
npm start
```
Server sẽ chạy trên `http://localhost:5000`.

### 2. Cài đặt Frontend (Client)

a. **Mở một terminal mới và di chuyển vào thư mục client:**
```bash
cd client
```

b. **Cài đặt dependencies:**
```bash
npm install
```

c. **Thiết lập biến môi trường:**
Tạo một file `.env` trong thư mục `client` và thêm API key của bạn vào:
```env
# API Key này dùng cho các tính năng AI chạy trực tiếp trên client (ví dụ: Did you know?)
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

d. **Chạy client:**
```bash
npm run dev
```
Ứng dụng client sẽ có sẵn tại một địa chỉ do Vite cung cấp (thường là `http://localhost:5173` hoặc `http://localhost:3000`). Vite đã được cấu hình proxy để tự động chuyển tiếp các yêu cầu `/api` đến server backend.

## Gỡ lỗi thường gặp

-   **Lỗi `401 Unauthorized`**: Đảm bảo bạn đã tạo file `.env` trong thư mục `server` và đã cung cấp một giá trị cho `JWT_SECRET`.
-   **Lỗi kết nối MongoDB**: Kiểm tra lại chuỗi `MONGO_URI` trong file `.env` của server.
-   **Lỗi API Key**: Đảm bảo bạn đã cung cấp `API_KEY` trong `.env` của server và `VITE_GEMINI_API_KEY` trong `.env` của client.
-   **Lỗi Đăng nhập Mạng xã hội**: Đảm bảo bạn đã cấu hình đầy đủ `CLIENT_ID` và `CLIENT_SECRET` cho Google, Facebook, GitHub trong file `.env` của server. URL callback bạn cấu hình trên trang của nhà cung cấp phải là `http://<your-server-address>/api/auth/<provider>/callback`.
-   **Lỗi gửi Email**: Đảm bảo bạn đã cấu hình `EMAIL_USER` và `EMAIL_PASS` trong file `.env` của server. Nếu dùng Gmail, `EMAIL_PASS` phải là một "Mật khẩu ứng dụng" (App Password), không phải mật khẩu đăng nhập thông thường của bạn.
