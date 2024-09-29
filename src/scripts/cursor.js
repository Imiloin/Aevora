console.clear();

const elCursor = document.querySelector(".cursor");

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

    let target = e.target;
    if (target && target.dataset) {
        let size = 1;
        if ("shrink" in target.dataset) {
            size = 0.5;
        } else if ("expand" in target.dataset) {
            size = 2;
        }
        point.scale = size;
    }
}

document.addEventListener("mousemove", onMove);
