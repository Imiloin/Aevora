/*
    Reference: https://websim.ai/p/idlv9t1mcfkvn67ls8aj
*/

interface CuboidalQuantumConfig {
  numPoints: number;
  baseMaxDist: number;
  baseRadius: number;
  variance: number;
  twist: number;
  color1: string;
  color2: string;
  rotationSpeed: number;
  cameraSpeed: number;
}

interface Point2D {
  x: number;
  y: number;
}

class CuboidalQuantum {
  config: CuboidalQuantumConfig;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  cameraAngle: number;
  t: number;

  constructor(canvasId: string, config: Partial<CuboidalQuantumConfig> = {}) {
    // Default configuration
    this.config = {
      numPoints: 15,
      baseMaxDist: 200,
      baseRadius: 150,
      variance: 50,
      twist: 6,
      color1: '#393939',
      color2: '#a8a8a8',
      rotationSpeed: 0.005,
      cameraSpeed: 0.002,
      ...config, // Override defaults with provided config
    };

    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
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

  resizeCanvas(): void {
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;
  }

  drawManifold(t: number): void {
    const { numPoints, baseMaxDist, baseRadius, variance, twist, color1, color2 } = this.config;
    this.ctx.clearRect(0, 0, this.w, this.h);

    const radius: number = Math.min(baseRadius, this.w / 2 - variance, this.h / 2 - variance);
    const maxDist: number = (baseMaxDist * radius) / baseRadius;

    const points: Point2D[] = [];

    for (let i = 0; i < numPoints; i++) {
      const angle: number = (i / numPoints) * Math.PI * 2;
      const r: number = radius + variance * Math.sin(angle * twist + t);
      const x: number = r * Math.cos(angle);
      const y: number = r * Math.sin(angle);
      points.push({ x, y });
    }

    this.ctx.save();
    this.ctx.translate(this.w / 2, this.h / 2);
    this.ctx.rotate(this.cameraAngle);
    this.ctx.translate(-this.w / 2, -this.h / 2);

    for (let i = 0; i < numPoints; i++) {
      for (let j = 0; j < numPoints; j++) {
        const p1: Point2D = points[i];
        const p2: Point2D = points[j];

        const dist: number = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

        if (dist < maxDist) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.w / 2 + p1.x, this.h / 2 + p1.y);
          this.ctx.lineTo(this.w / 2 + p2.x, this.h / 2 + p2.y);

          const gradient: CanvasGradient = this.ctx.createLinearGradient(
            this.w / 2 + p1.x,
            this.h / 2 + p1.y,
            this.w / 2 + p2.x,
            this.h / 2 + p2.y
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

  loop(): void {
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
