// FIX: Chỉ thị `/// <reference types="vite/client" />` đã bị xóa
// vì dịch vụ ngôn ngữ TypeScript không thể tìm thấy tệp định nghĩa kiểu.
// Điều này có thể xảy ra trong một số cấu hình dự án nhất định. Các interface bên dưới
// cung cấp các kiểu cần thiết để `import.meta.env` hoạt động chính xác trong ứng dụng.

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly GEMINI_API_KEY?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
