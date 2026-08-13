import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '../../data/content';
import logoBlack from '../../assets/logo-black.png';

// --- PARTICLE LOGO (Reads dark pixels from logo-black.png) ---
// PERF: Optimized with IntersectionObserver (pauses off-screen), batched draw calls,
//       step=6 (fewer particles), and 45fps cap via delta check.
const ParticleLogo = ({ src }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null });
  const animationFrameId = useRef(null);
  const isVisible = useRef(false);
  const lastFrameTime = useRef(0);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      const W = img.naturalWidth;
      const H = img.naturalHeight;
      canvas.width = W;
      canvas.height = H;

      ctx.drawImage(img, 0, 0, W, H);
      const data = ctx.getImageData(0, 0, W, H).data;
      ctx.clearRect(0, 0, W, H);

      particles.current = [];

      // PERF: step=6 instead of 4 → ~55% fewer particles
      const step = 6;

      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const idx = (y * W + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          const brightness = (r + g + b) / 3;
          if (a > 128 && brightness < 80) {
            particles.current.push({
              x: Math.random() * W,
              y: Math.random() * H,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
              size: 1.4,
            });
          }
        }
      }

      const MOUSE_RADIUS = 130;
      const REPULSION_FORCE = 7;
      const EASE = 0.18;
      const FRICTION = 0.82;
      const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
      // PERF: ~45fps cap — skip frame if < 22ms since last draw
      const MIN_FRAME_MS = 22;

      const animate = (timestamp) => {
        animationFrameId.current = requestAnimationFrame(animate);

        // PERF: Pause when scrolled out of view
        if (!isVisible.current) return;

        // PERF: Throttle to ~45fps
        const delta = timestamp - lastFrameTime.current;
        if (delta < MIN_FRAME_MS) return;
        lastFrameTime.current = timestamp;

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = 'white';

        const mx = mouse.current.x;
        const my = mouse.current.y;
        const hasMousec = mx !== null && my !== null;

        // PERF: Single beginPath for all circles — one fill() at the end
        ctx.beginPath();

        for (let i = 0; i < particles.current.length; i++) {
          const p = particles.current[i];

          let ax = (p.baseX - p.x) * EASE;
          let ay = (p.baseY - p.y) * EASE;

          if (hasMousec) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const distSq = dx * dx + dy * dy;
            if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * REPULSION_FORCE;
              ax += (dx / dist) * force;
              ay += (dy / dist) * force;
            }
          }

          p.vx = (p.vx + ax) * FRICTION;
          p.vy = (p.vy + ay) * FRICTION;
          p.x += p.vx;
          p.y += p.vy;

          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }

        // PERF: Single fill call instead of one per particle
        ctx.fill();
      };

      animationFrameId.current = requestAnimationFrame(animate);

      // PERF: IntersectionObserver — stop rAF when out of viewport
      const observer = new IntersectionObserver(
        ([entry]) => { isVisible.current = entry.isIntersecting; },
        { threshold: 0.05 }
      );
      observer.observe(canvas);

      // Store observer for cleanup
      canvas._particleObserver = observer;
    };

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      const canvas = canvasRef.current;
      if (canvas && canvas._particleObserver) {
        canvas._particleObserver.disconnect();
      }
    };
  }, [src]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mouse.current.x = (e.clientX - rect.left) * scaleX;
    mouse.current.y = (e.clientY - rect.top) * scaleY;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouse.current.x = null; mouse.current.y = null; }}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
};

// --- MAIN ABOUT PAGE ---
export default function About({ isHomePage = false }) {
  return (
    <section id="about" className="bg-black text-white selection:bg-white/20 relative overflow-hidden">
      
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }} 
      />

      <div className={`max-w-7xl mx-auto px-6 ${isHomePage ? 'pt-4 sm:pt-6 lg:pt-10 pb-16 lg:pb-24' : 'pt-24 sm:pt-28 lg:pt-32 pb-10 lg:pb-16'} relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Typography & Story ── */}
          <div className="order-2 lg:order-1">
          
            
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-black leading-tight tracking-tight mb-5 sm:whitespace-nowrap"
              style={{ fontFamily: '"Satoshi", "Outfit", "PP Neue Montreal", sans-serif' }}
            >
              About <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">Aleef.</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-6 max-w-lg"
            >
              <p className="text-xl md:text-1xl text-neutral-200 font-light leading-snug tracking-tight">
                {aboutData.descriptionParagraph1}
              </p>
              <div className="h-px w-20 bg-neutral-800 my-5" />
            
            </motion.div>
          </div>

          {/* ── RIGHT: Logo Image (Particle System) ── */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center">
            {/* Background Circle Detail — pure CSS pulse, zero JS cost */}
            <div className="absolute w-[120%] aspect-square border border-white/[0.05] rounded-full animate-pulse pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="w-full relative z-10"
            >
              <ParticleLogo src={logoBlack} />
            </motion.div>
          </div>

        </div>
      </div>

   
    </section>
  );
}