import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Lenis from 'lenis';
import { vertexShader, fragmentShader } from '../shaders/spiralShaders';
import { motion } from 'framer-motion';
import { Sparkles, MoveHorizontal, ArrowUpRight, Compass } from 'lucide-react';

const DEFAULT_CONFIG = {
  totalImages: 10,
  tilesPerRevolution: 15,
  revolutions: 5,
  startRadius: 5,
  endRadius: 3.5,
  tileHeightRatio: 1.1,
  tileSegments: 16,
  spiralGap: 0.35,
  tileOverlap: 0.005,
  cameraZ: 12,
  cameraSmoothing: 0.075,
  baseRotationSpeed: 0.0012,
  scrollRotationMultiplier: 0.0035,
  rotationDecay: 0.92,
  scrollMultiplier: 1.25,
  cameraYMultiplier: 0.22,
  parallaxStrength: 0.12,
};

export default function SpiralGallery({ 
  title = "Somewhere between structure and disorder new forms quietly start to emerge",
  subtitle = "3D Interactive Case Study Showcase",
  imagesCount = 10,
  customImages = null
}) {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const projectsData = [
    { title: "Royal Specialty Hospital", category: "Healthcare & Medical Tech", location: "Kannur, Kerala", result: "+320% Inquiries", img: "/assets/img1.jpg" },
    { title: "Malabar Haven Villas", category: "Luxury Architecture & Real Estate", location: "Kannur & Dubai", result: "4.8x ROAS", img: "/assets/img2.jpg" },
    { title: "North Malabar Gourmet Cafe", category: "Hospitality & Brand Identity", location: "Kannur, Kerala", result: "1.8M Viral Views", img: "/assets/img3.jpg" },
    { title: "Elite Apparel & Couture", category: "Retail & E-commerce", location: "Kerala & GCC", result: "+210% Sales", img: "/assets/img4.jpg" },
    { title: "GCC Commercial Hub", category: "Performance Marketing", location: "Dubai, UAE", result: "3.5x Conversions", img: "/assets/img5.jpg" },
    { title: "Aleef Media Production", category: "Cinematic Reel Studio", location: "Kannur, Kerala", result: "2.4M Reach", img: "/assets/img6.jpg" },
    { title: "Malabar Motors Hub", category: "Automotive Marketing", location: "Kannur, Kerala", result: "+180% Leads", img: "/assets/img7.jpg" },
    { title: "Zenith EdTech Academy", category: "Education Branding", location: "Calicut & Kannur", result: "98% Admissions", img: "/assets/img8.jpg" },
    { title: "Sunset Eco Resort", category: "Tourism & Hotel Booking", location: "Wayanal & Kannur", result: "4.2x Direct Bookings", img: "/assets/img9.jpg" },
    { title: "Aleef Growth Engine", category: "Digital Transformation", location: "South India & GCC", result: "#1 Ranked Agency", img: "/assets/img10.jpg" }
  ];

  useEffect(() => {
    let animationFrameId;
    let cleanupFn = null;

    // Defer heavy 3D WebGL scene construction to next animation frame so page switch is 100% instantaneous!
    const timer = setTimeout(() => {
      const container = canvasContainerRef.current;
      if (!container) return;

      const getResponsiveConfig = () => {
        const w = window.innerWidth;
        if (w < 640) {
          return {
            ...DEFAULT_CONFIG,
            cameraZ: 15.5,
            startRadius: 3.8,
            endRadius: 2.5,
            tilesPerRevolution: 12,
            tileSegments: 10,
            parallaxStrength: 0.05
          };
        } else if (w < 1024) {
          return {
            ...DEFAULT_CONFIG,
            cameraZ: 13.5,
            startRadius: 4.4,
            endRadius: 3.0,
            tilesPerRevolution: 14,
            tileSegments: 12,
            parallaxStrength: 0.08
          };
        }
        return DEFAULT_CONFIG;
      };

      let CONFIG = getResponsiveConfig();
      const totalTiles = Math.floor(CONFIG.tilesPerRevolution * CONFIG.revolutions);
      const angleStep = (Math.PI * 2) / CONFIG.tilesPerRevolution;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = CONFIG.cameraZ;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);

      const textureLoader = new THREE.TextureLoader();
      const imageSources = customImages || Array.from({ length: CONFIG.totalImages }, (_, i) => `/assets/img${i + 1}.jpg`);

      const textures = imageSources.map((src, i) => {
        return textureLoader.load(src, (t) => {
          t.minFilter = THREE.LinearFilter;
          t.needsUpdate = true;
        });
      });

      const cameraPositionUniform = {
        value: new THREE.Vector3(0, 0, CONFIG.cameraZ),
      };

      const tileEdgesY = [0];
      for (let i = 0; i < totalTiles; i++) {
        const progress = i / totalTiles;
        const radius = CONFIG.startRadius + (CONFIG.endRadius - CONFIG.startRadius) * progress;
        const arcWidth = (2 * Math.PI * radius) / CONFIG.tilesPerRevolution;
        const tileHeight = arcWidth * CONFIG.tileHeightRatio;
        tileEdgesY.push(
          tileEdgesY[i] - (tileHeight + CONFIG.spiralGap) / CONFIG.tilesPerRevolution
        );
      }

      const spiral = new THREE.Group();
      scene.add(spiral);

      for (let i = 0; i < totalTiles; i++) {
        const progress = i / totalTiles;
        const radius = CONFIG.startRadius + (CONFIG.endRadius - CONFIG.startRadius) * progress;
        const arcWidth = (2 * Math.PI * radius) / CONFIG.tilesPerRevolution;
        const tileHeight = arcWidth * CONFIG.tileHeightRatio;
        const tileAngle = arcWidth / radius + CONFIG.tileOverlap;

        const centerY = (tileEdgesY[i] + tileEdgesY[i + 1]) / 2;
        const slope = tileEdgesY[i + 1] - tileEdgesY[i];

        const positions = [];
        const uvCoords = [];
        const indices = [];
        const segments = CONFIG.tileSegments;

        for (let row = 0; row <= 1; row++) {
          for (let col = 0; col <= segments; col++) {
            const angle = (col / segments - 0.5) * tileAngle;
            positions.push(
              Math.sin(angle) * radius,
              (row - 0.5) * tileHeight + (col / segments - 0.5) * slope,
              Math.cos(angle) * radius
            );
            uvCoords.push(col / segments, row);
          }
        }

        for (let col = 0; col < segments; col++) {
          const current = col;
          const below = current + segments + 1;
          indices.push(current, below, current + 1, below, below + 1, current + 1);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvCoords, 2));
        geometry.setIndex(indices);
        geometry.computeVertexNormals();

        const texture = textures[i % CONFIG.totalImages];

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uMap: { value: texture },
            uCameraPosition: cameraPositionUniform,
          },
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = centerY;

        const tile = new THREE.Group();
        tile.rotation.y = i * angleStep;
        tile.add(mesh);
        spiral.add(tile);
      }

      const spiralHeight = Math.abs(tileEdgesY[totalTiles]);

      let spinVelocity = 0;
      let scrollY = window.pageYOffset;

      const handleScroll = (e) => {
        const newY = window.pageYOffset;
        const diff = newY - scrollY;
        scrollY = newY;
        const vel = (e && typeof e.velocity === 'number') ? e.velocity : diff;
        spinVelocity = vel * CONFIG.scrollRotationMultiplier * 0.1;
      };

      if (window.lenis) {
        window.lenis.on('scroll', handleScroll);
      }
      window.addEventListener('scroll', handleScroll, { passive: true });

      let mouseX = 0, mouseY = 0, smoothX = 0, smoothY = 0;
      let isDragging = false;
      let previousPointerX = 0;

      const handlePointerMove = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        mouseX = (clientX / window.innerWidth - 0.5) * 2;
        mouseY = (clientY / window.innerHeight - 0.5) * 2;

        if (isDragging) {
          const deltaX = clientX - previousPointerX;
          spinVelocity += deltaX * 0.0008;
          previousPointerX = clientX;
        }
      };

      const handlePointerDown = (e) => {
        isDragging = true;
        previousPointerX = e.touches ? e.touches[0].clientX : e.clientX;
      };

      const handlePointerUp = () => {
        isDragging = false;
      };

      window.addEventListener("mousemove", handlePointerMove, { passive: true });
      window.addEventListener("touchmove", handlePointerMove, { passive: true });
      window.addEventListener("mousedown", handlePointerDown, { passive: true });
      window.addEventListener("touchstart", handlePointerDown, { passive: true });
      window.addEventListener("mouseup", handlePointerUp, { passive: true });
      window.addEventListener("touchend", handlePointerUp, { passive: true });

      let isMobile = window.innerWidth < 1000;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const sectionRect = container.getBoundingClientRect();
        const relativeScroll = window.innerHeight - sectionRect.top;
        const scrollProgress = Math.max(0, Math.min(relativeScroll / (window.innerHeight * CONFIG.scrollMultiplier), 1));

        camera.position.y += (-(scrollProgress * spiralHeight * CONFIG.cameraYMultiplier) - camera.position.y) * CONFIG.cameraSmoothing;

        if (!isMobile) {
          smoothX += (mouseX - smoothX) * 0.03;
          smoothY += (mouseY - smoothY) * 0.03;
          spiral.rotation.x = smoothY * CONFIG.parallaxStrength;
          spiral.rotation.z = -smoothX * CONFIG.parallaxStrength * 0.3;
        }

        cameraPositionUniform.value.copy(camera.position);

        spiral.rotation.y += CONFIG.baseRotationSpeed + spinVelocity;
        spinVelocity *= CONFIG.rotationDecay;

        const normalizedRot = ((spiral.rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const tileIndex = Math.floor((normalizedRot / (Math.PI * 2)) * CONFIG.totalImages) % CONFIG.totalImages;
        setActiveProjectIdx(tileIndex);

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!container) return;
        CONFIG = getResponsiveConfig();
        isMobile = window.innerWidth < 1000;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.position.z = CONFIG.cameraZ;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      window.addEventListener("resize", handleResize);

      cleanupFn = () => {
        cancelAnimationFrame(animationFrameId);
        if (window.lenis) {
          window.lenis.off("scroll", handleScroll);
        }
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("mousedown", handlePointerDown);
        window.removeEventListener("touchstart", handlePointerDown);
        window.removeEventListener("mouseup", handlePointerUp);
        window.removeEventListener("touchend", handlePointerUp);
        window.removeEventListener("resize", handleResize);

        scene.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }, 0);

    return () => {
      clearTimeout(timer);
      if (cleanupFn) cleanupFn();
    };
  }, [customImages]);

  const activeProj = projectsData[activeProjectIdx] || projectsData[0];

  return (
    <section ref={containerRef} className="relative w-full min-h-[140vh] sm:min-h-[160vh] bg-neutral-950 text-white overflow-hidden border-b border-white/10 select-none">
      
      {/* 3D WebGL Canvas Layer */}
      <div 
        ref={canvasContainerRef} 
        className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing"
      />

      {/* Ambient Lighting Gradients */}
      <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/40 to-neutral-950 pointer-events-none z-10" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none z-10" />

      {/* Floating Content Overlays */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 pointer-events-none flex flex-col justify-between min-h-[130vh]">
        
        {/* Header Title Section */}
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-slate-200 font-accent uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>{subtitle}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-white uppercase leading-[0.95] drop-shadow-lg"
          >
            {title}
          </motion.h1>
        </div>

        {/* Floating Interactive HUD / Active Card Preview */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 pointer-events-auto mt-auto">
          
          {/* Interaction Instruction Pill */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/15 text-xs sm:text-sm text-slate-300 shadow-2xl">
            <MoveHorizontal className="w-4 h-4 text-white animate-pulse" />
            <span>Drag horizontally or scroll to spin the 3D gallery</span>
          </div>

          {/* Active Case Study Spotlight Card */}
          <motion.div 
            key={activeProjectIdx}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full sm:w-80 md:w-96 p-5 sm:p-6 rounded-3xl bg-neutral-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Compass className="w-16 h-16 text-white" />
            </div>

            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-slate-400">
                {activeProj.category}
              </span>
              <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono">
                {activeProj.location}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2 flex items-center justify-between">
              <span>{activeProj.title}</span>
              <ArrowUpRight className="w-4 h-4 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-xs text-slate-400 font-medium">Growth Impact</span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                {activeProj.result}
              </span>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
