// Detect if it is a touch device
function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

interface CursorPoint {
  x: number;
  y: number;
  scale: number;
}

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  const elCursor: HTMLElement | null = document.querySelector('.cursor');

  // If it is a touch device, do not execute the subsequent code and completely hide the cursor
  if (isTouchDevice()) {
    if (elCursor) {
      elCursor.classList.add('hidden');
    }
    return;
  }

  if (!elCursor) return;

  const lerp = (curr: number, next: number, ratio: number = 0.1): number => {
    const delta: number = next - curr;
    if (Math.abs(delta) < 0.01) return next;
    return curr + (next - curr) * ratio;
  };

  const point: CursorPoint = { x: 0, y: 0, scale: 1 };
  const current: CursorPoint = { x: 0, y: 0, scale: 1 };

  const update = (): void => {
    current.x = lerp(current.x, point.x);
    current.y = lerp(current.y, point.y);
    current.scale = lerp(current.scale, point.scale, 0.1);

    elCursor.style.setProperty('--x', String(point.x));
    elCursor.style.setProperty('--y', String(point.y));
    elCursor.style.setProperty('--scale', String(point.scale));

    elCursor.style.setProperty('--lag-x', String(current.x));
    elCursor.style.setProperty('--lag-y', String(current.y));
    elCursor.style.setProperty('--lag-scale', String(current.scale));
    requestAnimationFrame(update);
  };

  update();

  const onMove = (e: MouseEvent): void => {
    // Show cursor on first move (hidden initially to prevent flash at top-left)
    if (!elCursor.classList.contains('visible')) {
      // Jump to mouse position immediately before showing
      current.x = e.clientX;
      current.y = e.clientY;
      elCursor.classList.add('visible');
    }

    point.x = e.clientX;
    point.y = e.clientY;

    const target: Element | null = (e.target as Element).closest('[data-shrink], [data-expand]');
    if (target) {
      let size: number = 0.5; // less than 1 to avoid blur
      if (target.hasAttribute('data-shrink')) {
        size = 0.3;
      } else if (target.hasAttribute('data-expand')) {
        size = 1;
      }
      point.scale = size;
    } else {
      point.scale = 0.5; // reset
    }
  };

  document.addEventListener('mousemove', onMove);
});
