/* ==================== MOD SKIN FREE FIRE CÓ TÂM - SHARED SCRIPT ==================== */
/* Version: 2.0 - Auto Load CONFIG.JSON with Links */

let CONFIG = {};
let currentCategory = "Tất cả";
let currentLinkType = '';
let currentLink = '';
let currentPage = 1;
const ITEMS_PER_PAGE = 10;
let searchQuery = '';

// Load config - Đọc trực tiếp từ CONFIG.JS (window.CONFIG_DATA) và BANNER.JS
// Load config - Đọc từ CONFIG.JSON (ưu tiên) hoặc CONFIG.JS (fallback)
async function loadConfig() {
    let loadedConfig = null;

    // 1. Thử tải CONFIG.JSON trước (Modern solution)
    try {
        const response = await fetch('CONFIG.JSON?t=' + Date.now());
        if (response.ok) {
            loadedConfig = await response.json();
            console.log('%c✅ Đã tải CONFIG.JSON', 'color:#10b981;font-size:14px;font-weight:bold');
        }
    } catch (e) {
        console.warn('⚠️ Không thể tải CONFIG.JSON (có thể do mở file://). Đang thử CONFIG.JS...');
    }

    // 2. Nếu JSON thất bại, kiểm tra CONFIG.JS (window.CONFIG_DATA)
    if (!loadedConfig && window.CONFIG_DATA) {
        loadedConfig = window.CONFIG_DATA;
        console.log('%c✅ Đã dùng CONFIG.JS (Fallback)', 'color:#10b981;font-size:14px;font-weight:bold');
    }

    // 3. Xử lý kết quả
    if (loadedConfig) {
        CONFIG = { ...getFallbackConfig(), ...loadedConfig };
    } else {
        console.error('❌ LỖI: Không tìm thấy dữ liệu cấu hình (JSON hoặc JS)');
        alert('⚠️ LỖI DỮ LIỆU: Không thể tải danh sách sản phẩm!\n\nHãy đảm bảo file CONFIG.JSON hoặc CONFIG.JS tồn tại trong thư mục website/ và đúng định dạng.');
        CONFIG = getFallbackConfig();
    }

    // 4. Load BANNER.JS (nếu có)
    if (window.BANNER_DATA && window.BANNER_DATA.featured) {
        CONFIG.featured = window.BANNER_DATA.featured;
        console.log('%c✅ Đã load BANNER.JS', 'color:#10b981;font-size:14px;font-weight:bold');
    }

    return true;
}

function getFallbackConfig() {
    return {
        site: { title: "MOD SKIN FREE FIRE CÓ TÂM", header: "MOD SKIN FREE FIRE CÓ TÂM" },
        links: {
            youtube: "https://www.youtube.com/@MODSKINCOTAM/videos",
            screenshot: "https://github.com/modskinff/MOD-SKIN-C-T-M-/blob/main/Desktop%20Screenshot%202026.03.17%20-%2020.52.09.26.png?raw=true",
            android_video: "https://youtube.com/shorts/07pWCQqTWsQ?si=uJ9TDgPha1uAXRSE",
            ios_video: "https://youtube.com/shorts/lKkbqB5B-To?si=yuBjN5w9Ttd6wccD"
        },
        featured: {
            enabled: true,
            image: "",
            title: "",
            description: "",
            price: "",
            buttons: {
                v1ffth: { enabled: false, label: "V1FFTH", link: "" },
                v1ffmax: { enabled: false, label: "V1FFMAX", link: "" }
            }
        },
        categories: ["Trang Phục", "Nhân Vật", "Skin Súng", "Bom Keo", "Map"],
        products: []
    };
}

// Show confirm modal
function showConfirmModal(type, link) {
    currentLinkType = type;
    currentLink = link;

    if (!currentLink || currentLink.includes('YOUR_') || currentLink === '' || currentLink === 'https://example.com') {
        alert('⚠️ Link chưa được cập nhật!');
        return;
    }

    const modalType = document.getElementById('modal-type');
    const modal = document.getElementById('confirm-modal');

    if (modalType) modalType.textContent = type;
    if (modal) modal.style.display = 'flex';
}

// Hide modal
function hideModal() {
    const modal = document.getElementById('confirm-modal');
    if (modal) modal.style.display = 'none';
}

// Open confirmed link
function openConfirmedLink() {
    if (currentLink) {
        window.open(currentLink, '_blank');
    }
    hideModal();
}

// Create category dropdown
function createTabs() {
    const tabBar = document.getElementById('tab-bar');
    if (!tabBar || !CONFIG.categories) return;

    // Add "Tất cả" option at the beginning
    const allCategories = ["Tất cả", ...CONFIG.categories];

    tabBar.innerHTML = `
        <div class="category-select-wrapper">
            <button class="category-select-btn" id="categorySelectBtn">
                <span id="categorySelectText">${currentCategory}</span>
            </button>
            <div class="category-dropdown" id="categoryDropdown"></div>
        </div>
    `;

    const selectBtn = document.getElementById('categorySelectBtn');
    const dropdown = document.getElementById('categoryDropdown');
    const selectText = document.getElementById('categorySelectText');

    // Toggle dropdown
    selectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
        selectBtn.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdown.classList.remove('show');
        selectBtn.classList.remove('active');
    });

    // Prevent dropdown close when clicking inside
    dropdown.addEventListener('click', (e) => e.stopPropagation());

    // Render category options
    dropdown.innerHTML = '';
    allCategories.forEach(cat => {
        const option = document.createElement('div');
        option.className = `category-option ${cat === currentCategory ? 'active' : ''}`;
        option.textContent = cat;
        option.addEventListener('click', () => {
            currentCategory = cat;
            currentPage = 1; // Reset to page 1 when changing category
            selectText.textContent = cat;
            dropdown.classList.remove('show');
            selectBtn.classList.remove('active');
            renderProducts();
        });
        dropdown.appendChild(option);
    });

    // Setup search
    setupSearch();
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        currentPage = 1; // Reset to page 1 when searching
        renderProducts();
    });
}

// Render products grid with pagination
function renderProducts() {
    const container = document.getElementById('shop-items');
    if (!container || !CONFIG.products) return;

    container.innerHTML = '';

    // Filter by category
    let filtered = [...(CONFIG.products || [])].reverse(); // Newest first
    if (currentCategory !== "Tất cả") {
        filtered = filtered.filter(item => item.category === currentCategory);
    }

    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter(item => {
            const searchText = `${item.id} ${item.title} ${item.category} ${item.status}`.toLowerCase();
            return searchText.includes(searchQuery);
        });
    }

    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state">📭 Không tìm thấy sản phẩm nào</div>';
        renderPagination(0);
        return;
    }

    // Pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedItems = filtered.slice(startIndex, endIndex);

    paginatedItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        // Build buttons based on enabled status
        let buttonsHtml = '';
        if (item.buttons?.v1ffth?.enabled) {
            buttonsHtml += `<button class="btn-version" onclick="showConfirmModal('${item.buttons.v1ffth.label}', '${item.buttons.v1ffth.link || ''}')">${item.buttons.v1ffth.label}</button>`;
        }
        if (item.buttons?.v1ffmax?.enabled) {
            buttonsHtml += `<button class="btn-version" onclick="showConfirmModal('${item.buttons.v1ffmax.label}', '${item.buttons.v1ffmax.link || ''}')">${item.buttons.v1ffmax.label}</button>`;
        }

        // Status badge
        const statusTag = item.status ? `<div class="status-tag">${item.status}</div>` : '';

        // Item number
        const itemNumber = startIndex + index + 1;

        card.innerHTML = `
            <div class="thumb">
                <img src="${item.image || ''}" alt="${item.title}" loading="lazy">
                ${statusTag}
                <div class="item-number">${itemNumber}</div>
            </div>
            <div class="info">
                <div class="title">${item.title}</div>
                <div class="sub-info">ID: ${item.id}</div>
                <div class="action-row">
                    <div class="price">${item.price}</div>
                    <div class="buttons-group">
                        ${buttonsHtml}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    renderPagination(totalPages);
}

// Render pagination
function renderPagination(totalPages) {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    if (totalPages <= 1) {
        paginationEl.innerHTML = '';
        return;
    }

    let paginationHtml = '';

    // Previous button
    paginationHtml += `<button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(${currentPage - 1})">‹ Prev</button>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHtml += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHtml += `<span class="pagination-ellipsis">...</span>`;
        }
    }

    // Next button
    paginationHtml += `<button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(${currentPage + 1})">Next ›</button>`;

    paginationEl.innerHTML = paginationHtml;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(getFilteredProducts().length / ITEMS_PER_PAGE);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderProducts();
    // Scroll to top of shop container
    const shopContainer = document.getElementById('shop-items');
    if (shopContainer) shopContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Get filtered products (for pagination calculation)
function getFilteredProducts() {
    if (!CONFIG.products) return [];

    let filtered = CONFIG.products;
    if (currentCategory !== "Tất cả") {
        filtered = filtered.filter(item => item.category === currentCategory);
    }
    if (searchQuery) {
        filtered = filtered.filter(item => {
            const searchText = `${item.id} ${item.title} ${item.category} ${item.status}`.toLowerCase();
            return searchText.includes(searchQuery);
        });
    }
    return filtered;
}

// Render featured banner
function renderFeatured() {
    const featuredEl = document.querySelector('.featured');
    if (!featuredEl) return;

    if (!CONFIG.featured?.enabled) {
        featuredEl.style.display = 'none';
        return;
    }

    const f = CONFIG.featured;

    // Update image
    const bannerImg = featuredEl.querySelector('.featured-banner img');
    if (bannerImg && f.image) bannerImg.src = f.image;

    // Update text
    const titleEl = featuredEl.querySelector('.featured-info h1');
    if (titleEl) titleEl.textContent = f.title || '';

    const descEl = featuredEl.querySelector('.desc');
    if (descEl) descEl.textContent = f.description || '';

    const priceEl = featuredEl.querySelector('.featured-price');
    if (priceEl) priceEl.textContent = f.price || '';

    // Update buttons
    const btnGroup = featuredEl.querySelector('.featured-info .buttons-group');
    if (btnGroup) {
        let btnHtml = '';
        // Support download button for featured banner
        if (f.buttons?.download?.enabled) {
            btnHtml += `<button class="btn-version" onclick="showConfirmModal('${f.buttons.download.label}', '${f.buttons.download.link || ''}')">${f.buttons.download.label}</button>`;
        }
        // Support v1ffth and v1ffmax buttons
        if (f.buttons?.v1ffth?.enabled) {
            btnHtml += `<button class="btn-version" onclick="showConfirmModal('${f.buttons.v1ffth.label}', '${f.buttons.v1ffth.link || ''}')">${f.buttons.v1ffth.label}</button>`;
        }
        if (f.buttons?.v1ffmax?.enabled) {
            btnHtml += `<button class="btn-version" onclick="showConfirmModal('${f.buttons.v1ffmax.label}', '${f.buttons.v1ffmax.link || ''}')">${f.buttons.v1ffmax.label}</button>`;
        }
        btnGroup.innerHTML = btnHtml;
    }
}

// Initialize shop
async function initShop() {
    await loadConfig();

    // Update site info
    if (CONFIG.site?.title) document.title = CONFIG.site.title;
    if (CONFIG.site?.header) {
        document.querySelectorAll('.ken-header').forEach(h => h.textContent = CONFIG.site.header);
    }

    renderFeatured();
    createTabs();
    renderProducts();
    updateNavCount();

    console.log('%c✅ MOD SKIN FREE FIRE CÓ TÂM - ĐÃ KHỞI ĐỘNG', 'color:#c026d3;font-size:16px;font-weight:900');
    console.log('%c📦 Sản phẩm:', 'color:#10b981;font-size:14px', CONFIG.products?.length || 0);
}

// Update nav count
function updateNavCount() {
    const navCountEl = document.getElementById('navCount');
    if (!navCountEl || !CONFIG.products) return;

    const totalProducts = CONFIG.products.length;
    navCountEl.textContent = `(${totalProducts})`;
}

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShop);
} else {
    initShop();
}
