# 📁 MOD SKIN FREE FIRE CÓ TÂM - DANH SÁCH FILE

## ✅ FILE CHÍNH (Web User)

### HTML
- [x] `INDEX.HTML` - Trang redirect (có link Admin)
- [x] `TRANGCHU.HTML` - Trang chủ (Mobile only)
- [x] `HUONGDAN.HTML` - Hướng dẫn (Mobile only)
- [x] `YOUTUBE.HTML` - Youtube (Mobile only)
- [x] `BUYMOD.HTML` - Mod theo yêu cầu (Mobile only)

### CSS
- [x] `STYLE.CSS` - Giao diện chung (header, nav, cards, tabs, modal, etc.)
- [x] `PCBLOCK.CSS` - PC Block overlay styles

### JavaScript
- [x] `SCRIPT.JS` - Logic chính (load config, render products, tabs, modal)
- [x] `PCBLOCK.JS` - PC Block detector (mobile check)

### Data
- [x] `CONFIG.JSON` - Config chính (links, featured, products)

---

## ✅ FILE ADMIN

### HTML
- [x] `ADMIN/INDEX.HTML` - Admin Panel

### JavaScript
- [x] `ADMIN/ADMIN.JS` - Admin logic (CRUD products, export)

### Data
- [x] `ADMIN/DATA.JSON` - Data nguồn cho admin

---

## 📋 CẤU TRÚC CONFIG.JSON

```json
{
  "site": {
    "title": "MOD SKIN FREE FIRE CÓ TÂM",
    "header": "MOD SKIN FREE FIRE CÓ TÂM"
  },
  "links": {
    "youtube": "https://www.youtube.com/@MODSKINCOTAM/videos",
    "screenshot": "https://github.com/...",
    "android_video": "https://youtube.com/shorts/...",
    "ios_video": "https://youtube.com/shorts/..."
  },
  "featured": {
    "enabled": true,
    "image": "",
    "title": "",
    "description": "",
    "price": "",
    "buttons": {
      "v1ffth": { "enabled": false, "label": "V1FFTH", "link": "" },
      "v1ffmax": { "enabled": false, "label": "V1FFMAX", "link": "" }
    }
  },
  "categories": ["Trang Phục", "Nhân Vật", "Skin Súng", "Bom Keo", "Map"],
  "products": []
}
```

---

## 🔧 CẬP NHẬT

### Để thêm sản phẩm:
1. Mở `ADMIN/INDEX.HTML`
2. Thêm/sửa sản phẩm
3. Click "🌐 Tải CONFIG.JSON"
4. Upload `CONFIG.JSON` lên web
5. F5 trang web

### Để sửa links (YouTube, screenshot, videos):
1. Edit trực tiếp `CONFIG.JSON`
2. Upload lên web
3. F5 trang web

---

## 🎨 CSS CLASSES

### Chung (STYLE.CSS)
- `.ken-header` - Header chính
- `.main-nav` - Navigation bar
- `.nav-item` - Nav button
- `.featured` - Featured banner
- `.tab-bar`, `.tab` - Category tabs
- `.card`, `.thumb`, `.info` - Product card
- `.status-tag` - Status badge
- `.btn-version` - Action buttons
- `.price` - Price display
- `.modal-content`, `.modal-btn` - Modal
- `.instruction-section`, `.instruction-card` - Guide cards
- `.video-link` - Video button
- `.youtube-btn` - YouTube button
- `.screenshot-img` - Screenshot image
- `.content-section`, `.content-card` - Content cards

### PC Block (PCBLOCK.CSS)
- `.pc-block-overlay` - PC block overlay
- `.pc-block-content` - Block content
- `.pc-block-icon` - Block icon
- `.pc-block-title` - Block title
- `.pc-block-message` - Block message
- `.pc-block-btn` - Block button
- `.mobile-content` - Mobile content wrapper
- `.empty-state` - Empty state message

---

## 📞 HỖ TRỢ

- **Admin Panel:** `ADMIN/INDEX.HTML`
- **Web chính:** `TRANGCHU.HTML`
- **Config:** `CONFIG.JSON`
- **Styles:** `STYLE.CSS`, `PCBLOCK.CSS`
- **Scripts:** `SCRIPT.JS`, `PCBLOCK.JS`

**Tất cả file đã tách riêng - Dễ chỉnh sửa!** 🎯
