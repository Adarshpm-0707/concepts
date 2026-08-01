import React, { useEffect, useRef } from 'react';

const gap = 36;
const radiusVmin = 25;
const speedIn = 0.5;
const speedOut = 0.6;
const restScale = 0.08;
const minHoverScale = 1;
const maxHoverScale = 2.8;
const waveSpeed = 1000;
const waveWidth = 160;

// Monochrome palette (black and white theme only)
const PALETTE = [
  { type: 'solid', value: '#ffffff' },
  { type: 'solid', value: '#f1f5f9' },
  { type: 'solid', value: '#e2e8f0' },
  { type: 'solid', value: '#cbd5e1' },
  { type: 'solid', value: '#94a3b8' },
  { type: 'solid', value: '#64748b' },
  { type: 'solid', value: '#475569' },
  { type: 'solid', value: '#334155' },
  { type: 'solid', value: '#d4d4d8' },
  { type: 'solid', value: '#a3a3a3' },
  { type: 'gradient', stops: ['#ffffff', '#64748b'] },
  { type: 'gradient', stops: ['#e2e8f0', '#334155'] },
  { type: 'gradient', stops: ['#ffffff', '#94a3b8'] },
  { type: 'gradient', stops: ['#d4d4d8', '#404040'] },
];

const SHAPE_TYPES = ['circle', 'pill', 'star', 'star'];

function rnd(min, max) { return Math.random() * (max - min) + min; }
function rndInt(min, max) { return Math.floor(rnd(min, max + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function smoothstep(t) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function durationToFactor(seconds) {
  if (seconds <= 0) return 1;
  return 1 - Math.pow(0.05, 1 / (60 * seconds));
}

function drawCircle(ctx, size) {
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, Math.PI * 2);
  ctx.fill();
}

function drawPill(ctx, size) {
  const w = size * 0.48;
  const h = size;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(-w, -h, w * 2, h * 2, w);
  } else {
    ctx.rect(-w, -h, w * 2, h * 2);
  }
  ctx.fill();
}

function drawStar(ctx, size, points, innerRatio) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? size : size * innerRatio;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawShape(ctx, shape) {
  switch (shape.type) {
    case 'circle': return drawCircle(ctx, shape.size / 1.5);
    case 'pill':   return drawPill(ctx, shape.size / 1.4);
    case 'star':   return drawStar(ctx, shape.size, shape.points, shape.innerRatio);
    default:       return drawCircle(ctx, shape.size / 1.5);
  }
}

function resolveFill(ctx, colorDef, size) {
  if (colorDef.type === 'solid') return colorDef.value;
  const grad = ctx.createRadialGradient(0, -size * 0.3, 0, 0, size * 0.3, size * 1.5);
  grad.addColorStop(0, colorDef.stops[0]);
  grad.addColorStop(1, colorDef.stops[1]);
  return grad;
}

function randomStarProps() {
  return {
    points: rndInt(4, 10),
    innerRatio: rnd(0.1, 0.5),
  };
}

export default function ShapeGridCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let grid = null;
    let rafId = null;
    let pointer = null;
    let activity = 0;
    let waves = [];
    let isVisible = false;

    function buildGrid(W, H) {
      const cols = Math.floor(W / gap);
      const rows = Math.floor(H / gap);
      const offsetX = (W - (cols - 1) * gap) / 2;
      const offsetY = (H - (rows - 1) * gap) / 2;
      const shapes = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const type = pick(SHAPE_TYPES);
          const shape = {
            x: offsetX + col * gap,
            y: offsetY + row * gap,
            type: type,
            color: pick(PALETTE),
            angle: rnd(0, Math.PI * 2),
            size: gap * 0.38,
            scale: restScale,
            maxScale: rnd(minHoverScale, maxHoverScale),
            hovered: false,
          };
          if (type === 'star') Object.assign(shape, randomStarProps());
          shapes.push(shape);
        }
      }

      return { shapes, width: W, height: H };
    }

    function init() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      grid = buildGrid(W, H);
    }

    function triggerWave(x, y) {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      const waveX = x !== undefined ? x : rect.width / 2;
      const waveY = y !== undefined ? y : rect.height / 2;
      waves.push({ x: waveX, y: waveY, startTime: performance.now() });
    }

    function tick() {
      if (!isVisible || !grid) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const { shapes, width, height } = grid;
      const radius = Math.min(width, height) * (radiusVmin / 100);
      const now = performance.now();

      ctx.clearRect(0, 0, width, height);

      activity *= 0.93;

      const maxDist = Math.sqrt(width * width + height * height);
      waves = waves.filter(w => ((now - w.startTime) / 1000) * waveSpeed < maxDist + waveWidth);

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        let pointerInfluence = 0;
        if (pointer && activity > 0.001) {
          const dx = shape.x - pointer.x;
          const dy = shape.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          pointerInfluence = smoothstep(1 - dist / radius) * activity;

          if (pointerInfluence > 0.05 && !shape.hovered) {
            shape.hovered = true;
            shape.maxScale = rnd(minHoverScale, maxHoverScale);
            shape.angle = rnd(0, Math.PI * 2);
            if (shape.type === 'star') Object.assign(shape, randomStarProps());
          } else if (pointerInfluence <= 0.05) {
            shape.hovered = false;
          }
        } else {
          shape.hovered = false;
        }

        let waveInfluence = 0;
        for (let j = 0; j < waves.length; j++) {
          const wave = waves[j];
          const waveRadius = ((now - wave.startTime) / 1000) * waveSpeed;
          const wdx = shape.x - wave.x;
          const wdy = shape.y - wave.y;
          const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
          const t = 1 - Math.abs(wdist - waveRadius) / waveWidth;
          if (t > 0) waveInfluence = Math.max(waveInfluence, Math.sin(Math.PI * t));
        }

        const pointerTarget = restScale + pointerInfluence * (shape.maxScale - restScale);
        const waveTarget = restScale + waveInfluence * (shape.maxScale - restScale);
        const target = Math.max(pointerTarget, waveTarget);

        const factor = target > shape.scale ? durationToFactor(speedIn) : durationToFactor(speedOut);
        shape.scale += (target - shape.scale) * factor;

        if (shape.scale < restScale * 0.15) continue;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.angle);
        ctx.scale(shape.scale, shape.scale);
        ctx.fillStyle = resolveFill(ctx, shape.color, shape.size);
        drawShape(ctx, shape);
        ctx.restore();
      }

      rafId = requestAnimationFrame(tick);
    }

    function onMove(e) {
      if (!isVisible) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= -100 && x <= rect.width + 100 && y >= -100 && y <= rect.height + 100) {
        pointer = { x, y };
        activity = 1;
      }
    }

    function onClick(e) {
      if (!isVisible) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        triggerWave(x, y);
      }
    }

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });

    observer.observe(canvas);

    init();
    rafId = requestAnimationFrame(tick);

    window.addEventListener('resize', init);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', init);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-40"
    />
  );
}
