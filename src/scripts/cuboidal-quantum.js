/*
    Reference: https://websim.ai/p/idlv9t1mcfkvn67ls8aj
*/

class CuboidalQuantum {
    constructor(canvasId, config = {}) {
        // Default configuration
        this.config = {
            numPoints: 15,
            baseMaxDist: 200,
            baseRadius: 150,
            variance: 50,
            twist: 6,
            color1: "#393939",
            color2: "#a8a8a8",
            rotationSpeed: 0.005,
            cameraSpeed: 0.002,
            ...config // Override defaults with provided config
        };

        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.w = 0;
        this.h = 0;
        this.cameraAngle = 0;
        this.t = 0;

        // Bind methods
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.drawManifold = this.drawManifold.bind(this);
        this.loop = this.loop.bind(this);

        // Initialize
        window.addEventListener('resize', this.resizeCanvas);
        this.resizeCanvas();
        this.loop();
    }

    resizeCanvas() {
        this.w = this.canvas.width = window.innerWidth;
        this.h = this.canvas.height = window.innerHeight;
    }

    drawManifold(t) {
        const { numPoints, baseMaxDist, baseRadius, variance, twist, color1, color2 } = this.config;
        this.ctx.clearRect(0, 0, this.w, this.h);

        const radius = Math.min(baseRadius, this.w / 2 - variance, this.h / 2 - variance);
        const maxDist = baseMaxDist * radius / baseRadius;

        const points = [];

        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const r = radius + variance * Math.sin(angle * twist + t);
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            points.push({ x, y });
        }

        this.ctx.save();
        this.ctx.translate(this.w / 2, this.h / 2);
        this.ctx.rotate(this.cameraAngle);
        this.ctx.translate(-this.w / 2, -this.h / 2);

        for (let i = 0; i < numPoints; i++) {
            for (let j = 0; j < numPoints; j++) {
                const p1 = points[i];
                const p2 = points[j];

                const dist = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

                if (dist < maxDist) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.w / 2 + p1.x, this.h / 2 + p1.y);
                    this.ctx.lineTo(this.w / 2 + p2.x, this.h / 2 + p2.y);

                    const gradient = this.ctx.createLinearGradient(
                        this.w / 2 + p1.x, this.h / 2 + p1.y,
                        this.w / 2 + p2.x, this.h / 2 + p2.y
                    );
                    gradient.addColorStop(0, color1);
                    gradient.addColorStop(1, color2);

                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = (1 - dist / maxDist) * 5;
                    this.ctx.stroke();
                }
            }
        }

        this.ctx.restore();
    }

    loop() {
        const { rotationSpeed, cameraSpeed } = this.config;

        this.drawManifold(this.t);

        this.t += rotationSpeed;
        this.cameraAngle += cameraSpeed;
        requestAnimationFrame(this.loop);
    }
}

export default CuboidalQuantum;

// Example of custom config:
/*
new CuboidalQuantum('cuboidal-quantum-canvas', {
    numPoints: 20,
    baseMaxDist: 250,
    baseRadius: 200,
    variance: 60,
    twist: 8,
    color1: "#000000",
    color2: "#ffffff",
    rotationSpeed: 0.003,
    cameraSpeed: 0.001
});
*/