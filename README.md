
# Đại học Thông minh - Trợ lý định hướng AI

Một ứng dụng web sử dụng AI để giúp sinh viên lựa chọn chuyên ngành dựa trên lộ trình học tập hoặc định hướng nghề nghiệp dựa trên các môn học yêu thích. Được thiết kế để trao quyền cho sinh viên đưa ra quyết định sáng suốt về tương lai học tập và sự nghiệp.

## Cấu trúc thư mục

Dự án được cấu trúc để tách biệt các mối quan tâm (separation of concerns), giúp dễ dàng quản lý và mở rộng.

```
.
├── public/               # Chứa các tài sản tĩnh
├── src/
│   ├── components/       # Các React components
│   │   ├── common/       # Components tái sử dụng (Button, Spinner)
│   │   ├── CareerPathfinder.tsx
│   │   ├── ChatBot.tsx
│   │   ├── Header.tsx
│   │   ├── Home.tsx
│   │   └── RoadmapSelector.tsx
│   ├── config/           # Tập trung toàn bộ cấu hình
│   │   ├── prompt/       # Cấu hình prompt cho Gemini AI
│   │   ├── api.ts
│   │   ├── constants.ts
│   │   ├── errors.ts
│   │   ├── index.ts
│   │   └── ui.ts
│   ├── services/         # Logic nghiệp vụ, gọi API
│   │   ├── chatService.ts
│   │   └── geminiService.ts
│   ├── App.tsx           # Component gốc của ứng dụng
│   ├── index.tsx         # Điểm vào của ứng dụng React
│   └── types.ts          # Định nghĩa các kiểu TypeScript
├── .env.example          # Tệp môi trường mẫu
├── index.html            # Tệp HTML gốc
├── package.json
└── tsconfig.json
```

## Cài đặt và Chạy dự án

1.  **Clone a repository:**
    ```bash
    git clone https://your-repository-url.git
    cd your-project-directory
    ```

2.  **Cài đặt dependencies:**
    ```bash
    npm install
    ```

3.  **Thiết lập biến môi trường:**
    Tạo một tệp `.env` ở thư mục gốc và thêm API key của bạn vào:
    ```env
    VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

4.  **Chạy ứng dụng:**
    ```bash
    npm run dev
    ```
    Ứng dụng sẽ có sẵn tại `http://localhost:3000`.

## Cấu hình

Toàn bộ cấu hình được tập trung trong thư mục `src/config` để tránh hardcode và dễ dàng quản lý.

-   **`config/api.ts`**: Cấu hình liên quan đến API (keys, endpoints).
-   **`config/errors.ts`**: Các thông báo lỗi sử dụng trong ứng dụng.
-   **`config/ui.ts`**: Các chuỗi văn bản, nhãn hiển thị trên giao diện người dùng.
-   **`config/constants.ts`**: Các hằng số, dữ liệu tĩnh như danh sách lộ trình, môn học.
-   **`config/prompt/`**: Chứa các file cấu hình chi tiết cho các prompt gửi đến Gemini AI, tách biệt logic prompt khỏi service.
