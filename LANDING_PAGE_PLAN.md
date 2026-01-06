# DIY Kiosk Landing Page Plan

## Overview
Landing page for **diy-kiosk.store** - quảng bá hệ thống POS cho F&B.

- **Ngôn ngữ:** Tiếng Việt (chính)
- **Logo:** Text logo đơn giản "DIY Kiosk"

---

## 1. Site Tech Stack (Cách build trang)

**Recommendation: Static HTML + TailwindCSS (CDN)**

| Choice | Reason |
|--------|--------|
| HTML | Đơn giản, không cần build step |
| TailwindCSS (CDN) | Style nhanh, responsive sẵn |
| Vanilla JS | Chỉ cần cho mobile menu, scroll effects |
| GitHub Pages | Free hosting, custom domain support |

**File Structure:**
```
site/
├── index.html
├── css/
│   └── custom.css       # Custom styles nếu cần
├── js/
│   └── main.js          # Mobile menu, smooth scroll
├── assets/
│   └── images/          # Screenshots, logo
├── CNAME                # diy-kiosk.store
└── README.md
```

### Email Collection Service (cho Waitlist)

| Service | Free Tier | Pros | Cons |
|---------|-----------|------|------|
| **Formspree** | 50 submissions/tháng | Dễ nhất, chỉ cần HTML form | Giới hạn số lượng |
| **Tally.so** | Unlimited | Free, đẹp, export CSV | Cần embed iframe |
| **Google Forms** | Unlimited | Free, data vào Google Sheet | UI không đẹp lắm |
| **Supabase** | 50k rows | Own data, API free | Cần code JS thêm |
| **Mailchimp** | 500 contacts | Email marketing sẵn | Phức tạp hơn |

**Recommendation: Google Forms** (cho Android tester workflow)

### Tại sao Google Forms tốt nhất cho Play Console testers:
```
User submit email (Google Form)
       ↓
Email → Google Sheet (tự động)
       ↓
Add to Google Group (thủ công hoặc script)
       ↓
Link Google Group → Play Console Closed Testing
       ↓
Testers nhận invite tải app từ Play Store
```

**Setup steps:**
1. Tạo Google Form với field Email
2. Form responses tự động vào Google Sheet
3. Tạo Google Group (groups.google.com)
4. Add emails từ Sheet vào Group
5. Play Console → Testing → Closed → Add Google Group

**Embed Google Form:**
```html
<iframe
  src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
  width="100%"
  height="400"
  frameborder="0">
</iframe>
```

**Hoặc custom form gửi đến Google Sheet (đẹp hơn):**
- Dùng Google Apps Script làm API endpoint
- Style form theo ý muốn với TailwindCSS

---

## 2. Page Content (Business Features Only)

### Hero Section
```
DIY Kiosk
Phần mềm bán hàng đơn giản cho quán café, trà sữa, nhà hàng

Miễn phí • Hoạt động offline • Dễ sử dụng

[Xem Demo]  [Tải về]
```

### Tính năng chính (Features Grid)

| Icon | Feature | Mô tả |
|------|---------|-------|
| 📴 | Không cần internet | Bán hàng bình thường khi mất mạng, tự đồng bộ khi có wifi |
| 🧾 | Quản lý nhiều đơn | Xử lý nhiều bàn/khách cùng lúc, chuyển đổi nhanh |
| 📱 | Thanh toán QR | Khách quét mã VietQR, tiền về tài khoản ngay |
| 🖨️ | In hóa đơn | Xuất PDF hoặc in trực tiếp từ máy |
| 💰 | Miễn phí mãi mãi | Không phí hàng tháng, không phí ẩn, không giới hạn |
| ⚡ | Cài đặt nhanh | Tải APK về tablet, mở lên là dùng được ngay |

### Phù hợp với (Target Users)
```
✓ Quán café, trà sữa
✓ Quán ăn nhỏ, nhà hàng
✓ Tiệm bánh, đồ uống
✓ Food truck, gánh hàng rong
✓ Ai muốn tự quản lý, không thuê phần mềm đắt tiền
```

### Cách sử dụng (How It Works)
```
1. Tải về     → Tải APK hoặc mở trên trình duyệt
2. Cấu hình   → Thêm menu, giá, thông tin quán
3. Bán hàng   → Nhận đơn, thanh toán, in hóa đơn
```

### Demo Section
- Screenshot lớn của app
- Nút "Dùng thử ngay" → link demo

### Waitlist / Email Optin Section
```
🚀 Đăng ký dùng thử miễn phí

Nhận tài khoản tester sớm nhất khi có phiên bản mới

[Email của bạn...] [Đăng ký]

✓ Không spam • Chỉ gửi khi có update quan trọng
```

### Footer
```
DIY Kiosk - Phần mềm bán hàng miễn phí

GitHub | Báo lỗi | Liên hệ
```

---

## 3. Implementation Steps

### Phase 1: MVP
- [ ] Tạo index.html với TailwindCSS CDN
- [ ] Hero section + CTA buttons
- [ ] Features grid (6 tính năng)
- [ ] Waitlist form (Formspree hoặc Tally.so)
- [ ] Footer
- [ ] Deploy GitHub Pages
- [ ] Cấu hình domain diy-kiosk.store

### Phase 2: Polish
- [ ] Thêm screenshots app
- [ ] Mobile responsive
- [ ] SEO meta tags
- [ ] Favicon + OG image

---

## 4. Cần xác nhận

1. **Demo URL:** Link demo hiện tại là gì?
2. **APK URL:** Link tải APK từ GitHub releases?
3. **Email service:** Google Forms? (recommended cho Play Console testers)
   - Google Forms → Sheet → Google Group → Play Console
   - Hoặc custom form + Google Apps Script (đẹp hơn)
4. **Bắt đầu code?** Approve plan này thì mình làm luôn
