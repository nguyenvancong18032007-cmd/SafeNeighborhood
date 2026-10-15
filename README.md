# SafeNeighborhood – Trang Báo cáo sự cố

Bài kiểm tra giữa kỳ học phần Phát triển ứng dụng Web cơ bản – CSE122.

## 1. Thông tin chung

| Mục | Nội dung |
|---|---|
| Sinh viên | _(Họ tên – Mã sinh viên – SVxx)_ |
| Đề tài BTL của nhóm | SafeNeighborhood – nền tảng báo cáo và theo dõi sự cố an toàn từ cộng đồng |
| Trang đã thực hiện | **Báo cáo sự cố** (Bước 2: Chi tiết sự cố) |
| Đối tượng sử dụng | Cư dân trong khu dân cư (ngoài ra có thể chuyển không gian Vận hành, Điều phối, Quản trị) |

## 2. Mục đích của trang

Cho phép cư dân mô tả một sự cố trong khu phố (đèn đường hỏng, ổ gà, cây xanh đổ, vật cản...) một cách đầy đủ và có cấu trúc: chọn loại sự cố, nhập tiêu đề, mô tả chi tiết, chọn mức độ khẩn cấp và quyết định có công khai vị trí hay không. Nhờ đó đội vận hành tiếp nhận và xử lý nhanh hơn.

Bên phải có thẻ Safe AI phát hiện các sự cố tương tự gần đó để tránh báo cáo trùng, người dùng có thể chấp nhận, sửa, từ chối hoặc yêu cầu tạo lại gợi ý.

## 3. Các thành phần chính của giao diện

- Thanh bên: logo, chọn không gian làm việc, menu điều hướng (Bản đồ sự cố, Báo cáo sự cố, Sự cố của tôi, Hồ sơ), mục tham chiếu, thông tin    người dùng.
- Thanh trên: đường dẫn, ô tìm kiếm (phím tắt Ctrl/⌘ + K), chuông thông báo có huy hiệu số, avatar người dùng.
- Thanh tiến trình 3 bước: Vị trí & Hình ảnh (đã xong) → Chi tiết sự cố (đang làm) → Xem lại & Gửi.
- Biểu mẫu chi tiết sự cố: loại sự cố, tiêu đề, mô tả (đếm ký tự), mức khẩn cấp, công khai vị trí, nút Quay lại / Gửi báo cáo.
- Thẻ Safe AI: danh sách sự cố tương tự, độ tin cậy 87%, mục "Vì sao có kết quả này?", 4 nút Chấp nhận / Sửa / Từ chối / Tạo lại.
- Toast: thông báo nổi ở góc dưới phải theo từng thao tác.

## 4. Chức năng JavaScript

| Chức năng | Kích hoạt khi | Hàm / xử lý chính |
|---|---|---|
| Chọn loại sự cố | Click vào một trong 4 thẻ | `veLoaiSuCo()`, biến `loaiDangChon` |
| Chọn mức khẩn cấp | Chọn radio Thấp / Trung bình / Cao | `veMucKhanCap()`, sự kiện `change` |
| Đếm ký tự mô tả | Gõ vào ô mô tả (`input`) | cập nhật `#demKyTu` |
| Kiểm tra form | Bấm Gửi báo cáo (`submit`) | `hienLoi()`, `anLoi()`: tiêu đề bắt buộc, mô tả tối thiểu 10 ký tự |
| Gửi thành công | Form hợp lệ | Bước 2 chuyển sang hoàn thành, hiện toast kèm mã theo dõi |
| Mở/đóng hộp thông báo | Click chuông, click ra ngoài hoặc nhấn Esc | `dongHopThongBao()` |
| Đánh dấu đã đọc | Click từng thông báo hoặc nút "Đánh dấu đã đọc" | `veThongBao()` cập nhật danh sách và huy hiệu |
| Safe AI | Click 4 nút Chấp nhận / Sửa / Từ chối / Tạo lại | `datTrangThaiAI()`, `khoaNutAI()`, `setTimeout` mô phỏng đang xử lý |
| Toast | Mọi thao tác trên | `hienToast()` tự đóng sau 4 giây hoặc bấm nút đóng |
| Đổi vai trò | Chọn trong ô "Không gian làm việc" | cập nhật tên vai trò ở sidebar và thanh trên |
| Tìm kiếm | Nhấn Enter trong ô tìm kiếm | hiện toast từ khóa |
| Menu di động | Bấm nút menu khi màn hình hẹp | bật/tắt class `mo` của thanh bên |

Dữ liệu được lưu trong các mảng đối tượng (`danhSachLoaiSuCo`, `danhSachMucKhanCap`, `danhSachThongBao`, `danhSachSuCoTrung`) và render ra giao diện bằng `map()` + `innerHTML`.

## 5. Công nghệ sử dụng

- HTML5 semantic: `aside`, `nav`, `header`, `main`, `section`, `form`, `fieldset`, `legend`, `label`, `input`, `textarea`, `button`, `details`, `ol`, `ul`.
- CSS3: biến CSS (`:root`), Flexbox, CSS Grid, hover/focus, `:has()`, `@media` (1100px, 900px, 600px), animation nhẹ.
- JavaScript thuần (ES6): `let/const`, function, array, object, `if/else`, DOM (`getElementById`, `querySelector`, `classList`, `textContent`, `innerHTML`), event (`click`, `input`, `change`, `submit`, `keydown`).
- **Khác:** font Inter (Google Fonts), icon SVG nhúng bằng `<symbol>`. Không dùng framework hay thư viện ngoài.

## 6. Responsive

| Độ rộng | Thay đổi |
|---|---|
| ≤ 1100px | Thẻ Safe AI xuống dưới biểu mẫu (1 cột) |
| ≤ 900px | Sidebar ẩn, mở bằng nút menu; ẩn ô tìm kiếm; hộp thông báo rộng gần hết màn hình |
| ≤ 600px | Lưới loại sự cố còn 2 cột, mức khẩn cấp xếp dọc, thanh tiến trình rút gọn |

## 7. Cấu trúc thư mục

```
project/
├── index.html
├── style.css
├── main.js
├── assets/
└── README.md
```

## 8. Cách chạy

1. Tải hoặc clone repository.
2. Mở file `index.html` bằng trình duyệt (hoặc dùng Live Server trong VS Code).
3. Không cần cài đặt thêm. Cần kết nối mạng để tải font Inter, nếu không trang dùng font hệ thống.

## 9. Liên kết nộp bài

- Figma:https://www.figma.com/make/Q3F3EYAw5HoFgc2YPqz8SQ/Design-System-for-SafeNeighborhood?t=qjcCzrTbR40lLk9D-1
- Video trình bày:https://youtu.be/b597krxAbtE?si=rqi_RDJkK3f0GkPE– tên video:CSE122-GK-SV07-Nguyễn Văn Công-SafeNeighborhood
- GitHub:https://github.com/nguyenvancong18032007-cmd/SafeNeighborhood.git
