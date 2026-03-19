/* ==================== PC BLOCKER - CHỈ MOBILE MỚI XEM ĐƯỢC ==================== */

(function () {
    function isMobile() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        return width <= 768 || hasTouch;
    }

    function checkDevice() {
        const pcBlock = document.getElementById('pcBlock');
        const mobileContent = document.getElementById('mobileContent');

        if (isMobile()) {
            if (pcBlock) pcBlock.style.display = 'none';
            if (mobileContent) mobileContent.classList.add('visible');
            document.body.style.overflow = 'auto';
        } else {
            if (pcBlock) pcBlock.style.display = 'flex';
            if (mobileContent) mobileContent.classList.remove('visible');
            document.body.style.overflow = 'hidden';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            checkDevice();
            window.addEventListener('resize', checkDevice);
        });
    } else {
        checkDevice();
        window.addEventListener('resize', checkDevice);
    }
})();
