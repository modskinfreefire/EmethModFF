# 📦 MOD SKIN FREE FIRE CÓ TÂM - HƯỚNG DẪN SỬ DỤNG

## 📁 Cấu trúc file

```
WEB SHARE MOD/
├── INDEX.HTML              # Redirect page
├── TRANGCHU.HTML           # Home (Mobile only)
├── HUONGDAN.HTML           # Guide (Mobile only)
├── YOUTUBE.HTML            # YouTube (Mobile only)
├── BUYMOD.HTML             # Order (Mobile only)
├── STYLE.CSS               # Shared styles
├── SCRIPT.JS               # Shared logic
├── PCBLOCK.JS              # PC Blocker
├── CONFIG.JSON             # ← CẬP NHẬT FILE NÀY
└── ADMIN/                  # Admin Panel
    ├── INDEX.HTML
    ├── ADMIN.JS
    └── DATA.JSON
```

---

## 🔄 CẬP NHẬT SẢN PHẨM

### **Cách 1: Dùng Admin Panel (Khuyến nghị)**

1. **Mở ADMIN/INDEX.HTML**
2. **Thêm/Sửa sản phẩm**
   - Click "➕ Thêm Mới" để thêm
   - Click "✏️" để sửa
   - Click "🗑️" để xóa
3. **Export CONFIG.JSON**
   - Click "🌐 Tải CONFIG.JSON"
   - File sẽ tải về máy
4. **Upload lên web**
   - Copy file CONFIG.JSON vào thư mục gốc
   - Upload lên GitHub/Hosting
   - F5 trang web để xem thay đổi

### **Cách 2: Edit trực tiếp CONFIG.JSON**

1. Mở file `CONFIG.JSON`
2. Chỉnh sửa phần `"products": [...]`
3. Lưu file
4. Upload lên web

---

## 📋 CẤU HÌNH CONFIG.JSON

### **Format đầy đủ:**
```json
{
  "site": {
    "title": "MOD SKIN FREE FIRE CÓ TÂM",
    "header": "MOD SKIN FREE FIRE CÓ TÂM"
  },
  "links": {
    "youtube": "https://www.youtube.com/@MODSKINCOTAM/videos",
    "screenshot": "https://...",
    "android_video": "https://youtube.com/shorts/...",
    "ios_video": "https://youtube.com/shorts/..."
  },
  "featured": {
    "enabled": true,
    "image": "https://...",
    "title": "Tên banner",
    "description": "Mô tả",
    "price": "350K",
    "buttons": {
      "v1ffth": { "enabled": true, "label": "V1FFTH", "link": "..." },
      "v1ffmax": { "enabled": false, "label": "V1FFMAX", "link": "" }
    }
  },
  "categories": ["Trang Phục", "Nhân Vật", "Skin Súng", "Bom Keo", "Map"],
  "products": [
    {
      "id": "#2001",
      "title": "Tên sản phẩm",
      "price": "250K",
      "category": "Trang Phục",
      "status": "VIP",
      "image": "https://...",
      "buttons": {
        "v1ffth": { "enabled": true, "label": "V1FFTH", "link": "..." },
        "v1ffmax": { "enabled": true, "label": "V1FFMAX", "link": "..." }
      }
    }
  ]
}
```

### **Links (Liên kết cố định):**
- `youtube`: Link kênh YouTube
- `screenshot`: Ảnh banner từ GitHub
- `android_video`: Video hướng dẫn Android
- `ios_video`: Video hướng dẫn iOS

### **Categories (Danh mục):**
- `Trang Phục`
- `Nhân Vật`
- `Skin Súng`
- `Bom Keo`
- `Map`

### **Status (Trạng thái):**
- `VIP` → Badge tím
- `HOT` → Badge đỏ
- `NEW` → Badge xanh
- `""` → Không badge

---

## 🎨 CLASS CSS

### **Product Card:**
```html
<div class="card">
    <div class="thumb">
        <img src="..." alt="">
        <div class="status-tag">VIP</div>
    </div>
    <div class="info">
        <div class="title">Tên SP</div>
        <div class="sub-info">ID: #2001</div>
        <div class="action-row">
            <div class="price">250K</div>
            <div class="buttons-group">
                <button class="btn-version">V1FFTH</button>
            </div>
        </div>
    </div>
</div>
```

### **Status Badges:**
- `.status-tag` - Badge trong card
- `.status-badge.vip` - Badge tím
- `.status-badge.hot` - Badge đỏ
- `.status-badge.new` - Badge xanh

### **Tabs:**
```html
<div class="tab-bar">
    <div class="tab active">Trang Phục</div>
    <div class="tab">Nhân Vật</div>
</div>
```

### **Buttons:**
- `.btn-version` - Nút V1FFTH/V1FFMAX
- `.modal-btn` - Nút trong modal
- `.youtube-btn` - Nút YouTube

---

## ⚠️ LƯU Ý QUAN TRỌNG

1. **CONFIG.JSON phải ở cùng thư mục** với TRANGCHU.HTML
2. **Category trong product phải khớp** với mảng categories
3. **Link không được để YOUR_...** hoặc rỗng khi enabled: true
4. **ID phải duy nhất** để tránh trùng
5. **Featured enabled: false** → Ẩn banner

---

## 🚀 DEPLOY

### **GitHub Pages:**
1. Tạo repository
2. Upload tất cả file
3. Settings → Pages → Branch: main
4. Đợi 1-2 phút → Web online!

### **Mỗi lần update:**
1. Admin → Export CONFIG.JSON
2. Upload CONFIG.JSON lên GitHub
3. Đợi 30 giây → Web tự cập nhật

---

## 📞 HỖ TRỢ

- **Admin Panel:** `ADMIN/INDEX.HTML`
- **Web chính:** `TRANGCHU.HTML`
- **Config:** `CONFIG.JSON`

**Chỉ cần 1 file CONFIG.JSON để quản lý toàn bộ!** 🎯
