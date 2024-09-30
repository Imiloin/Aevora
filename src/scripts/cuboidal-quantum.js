/*
    Reference: https://websim.ai/p/idlv9t1mcfkvn67ls8aj
*/

const canvas = document.getElementById('cuboidal-quantum-canvas');
const ctx = canvas.getContext('2d');

let w, h;
let cameraAngle = 0;

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

function drawManifold(t) {
    ctx.clearRect(0, 0, w, h);

    const numPoints = 20;
    const maxDist = 200;
    const radius = 150;
    const variance = 50;
    const twist = 5;
    const color1 = "#393939";
    const color2 = "#a8a8a8";

    const points = [];

    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const r = radius + variance * Math.sin(angle * twist + t);
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        points.push({ x, y });
    }

    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(cameraAngle);
    ctx.translate(-w / 2, -h / 2);

    for (let i = 0; i < numPoints; i++) {
        for (let j = 0; j < numPoints; j++) {
            const p1 = points[i];
            const p2 = points[j];

            const dist = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

            if (dist < maxDist) {
                ctx.beginPath();
                ctx.moveTo(w / 2 + p1.x, h / 2 + p1.y);
                ctx.lineTo(w / 2 + p2.x, h / 2 + p2.y);

                const gradient = ctx.createLinearGradient(w / 2 + p1.x, h / 2 + p1.y, w / 2 + p2.x, h / 2 + p2.y);
                gradient.addColorStop(0, color1);
                gradient.addColorStop(1, color2);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = (1 - dist / maxDist) * 5;
                ctx.stroke();
            }
        }
    }

    ctx.restore();
}

let t = 0;
function loop() {
    const rotationSpeed = 0.005;
    const cameraSpeed = 0.002;

    drawManifold(t);

    t += rotationSpeed;
    cameraAngle += cameraSpeed;
    requestAnimationFrame(loop);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
loop();
