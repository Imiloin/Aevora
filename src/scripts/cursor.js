console.clear();

// 检测是否为触屏设备
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// 等待 DOM 内容加载完成后再执行脚本
document.addEventListener('DOMContentLoaded', () => {
    const elCursor = document.querySelector(".cursor");

    // 如果是触屏设备，则不执行后续代码并完全隐藏光标
    if (isTouchDevice()) {
        if (elCursor) {
            elCursor.classList.add('hidden');
        }
        return;
    }

    const lerp = (curr, next, ratio = 0.1) => {
        const delta = next - curr;
        if (Math.abs(delta) < 0.01) return next;
        return curr + (next - curr) * ratio;
    };

    const point = { x: 0, y: 0, scale: 1 };
    const current = { x: 0, y: 0, scale: 1 };

    function update() {
        current.x = lerp(current.x, point.x);
        current.y = lerp(current.y, point.y);
        current.scale = lerp(current.scale, point.scale, 0.1);

        elCursor.style.setProperty("--x", point.x);
        elCursor.style.setProperty("--y", point.y);
        elCursor.style.setProperty("--scale", point.scale);

        elCursor.style.setProperty("--lag-x", current.x);
        elCursor.style.setProperty("--lag-y", current.y);
        elCursor.style.setProperty("--lag-scale", current.scale);
        requestAnimationFrame(update);
    }

    update();

    function onMove(e) {
        point.x = e.clientX;
        point.y = e.clientY;

        let target = e.target.closest("[data-shrink], [data-expand]");
        if (target) {
            let size = 0.5;  // less than 1 to avoid blur
            if (target.hasAttribute("data-shrink")) {
                size = 0.3;
            } else if (target.hasAttribute("data-expand")) {
                size = 1;
            }
            point.scale = size;
        } else {
            point.scale = 0.5;  // reset
        }
    }

    document.addEventListener("mousemove", onMove);
});
