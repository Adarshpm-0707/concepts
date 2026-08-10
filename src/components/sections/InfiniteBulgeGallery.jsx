import React, { useEffect, useRef, useState } from 'react';
import { Maximize, Minimize, Move, Sparkles } from 'lucide-react';
import '../../styles/infinite-bulge.css';

const MES_IMAGES = [
  "/assets/WhatsApp Image 2026-08-06 at 2.59.53 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.00.40 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.00.49 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.00.57 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.01.18 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.02.05 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.02.11 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.02.18 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.02.56 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.03.38 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.04.15 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.04.21 PM.jpeg",
  "/assets/WhatsApp Image 2026-08-06 at 3.04.52 PM.jpeg"
];

export default function InfiniteBulgeGallery() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false
    });

    if (!gl) {
      console.warn('WebGL not supported');
      setIsLoading(false);
      return;
    }

    let isComponentMounted = true;
    let animFrameId = null;

    const state = {
      images: [],
      textures: [],
      imageWidth: window.innerWidth < 640 ? 130 : 180,
      imageHeight: window.innerWidth < 640 ? 130 : 180,
      gap: window.innerWidth < 640 ? 18 : 25,
      viewOffset: { x: 0, y: 0 },
      drag: {
        isDragging: false,
        lastX: 0,
        lastY: 0,
        velocityX: 0,
        velocityY: 0
      },
      inertia: 0.95,
      bulgeStrength: 0.4,
      bulgeRadius: 1.5,
      adjustedBulgeRadius: 1.5,
      program: null,
      positionBuffer: null,
      texCoordBuffer: null,
      indexBuffer: null,
      indexCount: 0
    };

    function resizeCanvas() {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;

      state.imageWidth = window.innerWidth < 640 ? 130 : 180;
      state.imageHeight = window.innerWidth < 640 ? 130 : 180;
      state.gap = window.innerWidth < 640 ? 18 : 25;

      const diagonal = Math.sqrt(
        Math.pow(canvas.width / Math.min(canvas.width, canvas.height), 2) +
        Math.pow(canvas.height / Math.min(canvas.width, canvas.height), 2)
      );
      state.adjustedBulgeRadius = Math.max(state.bulgeRadius, diagonal * 0.6 * 1.2);
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resizeCanvas();

    const handleWindowResize = () => resizeCanvas();
    window.addEventListener('resize', handleWindowResize);

    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(vsSource, fsSource) {
      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(prog));
        return null;
      }
      return prog;
    }

    function initGL() {
      const vsSource = `
        attribute vec2 aPosition;
        attribute vec2 aTexCoord;
        varying vec2 vTexCoord;
        uniform vec2 uResolution;
        uniform vec2 uOffset;
        uniform float uRotation;
        uniform vec2 uImagePosition;
        uniform float uBulgeStrength;
        uniform float uBulgeRadius;

        vec2 applyBulgeEffect(vec2 pos){
            vec2 normalizedPos = pos / uResolution;
            vec2 center = vec2(0.5, 0.5);
            vec2 delta = normalizedPos - center;

            float aspect = uResolution.x / uResolution.y;
            delta.x *= aspect;

            float dist = length(delta);

            if(dist < uBulgeRadius){
                float t = dist / uBulgeRadius;
                float z = sqrt(0.5 - t * t);
                delta *= 0.35 + uBulgeStrength / z;
                delta.x /= aspect;

                normalizedPos = center + delta;
                pos = normalizedPos * uResolution;
            }
            return pos;
        }

        void main(){
            vec2 pos = aPosition * vec2(${state.imageWidth}.0, ${state.imageHeight}.0);
            pos += uImagePosition;
            pos -= uOffset;

            vec2 center = uImagePosition + vec2(${state.imageWidth / 2.0}, ${state.imageHeight / 2.0}) - uOffset;
            pos -= center;
            float cosR = cos(uRotation);
            float sinR = sin(uRotation);
            pos = vec2(pos.x*cosR - pos.y*sinR, pos.x*sinR + pos.y*cosR);
            pos += center;

            pos = applyBulgeEffect(pos);

            vec2 clip = pos / uResolution * 2.0 - 1.0;
            gl_Position = vec4(clip, 0.0, 1.0);
            vTexCoord = aTexCoord;
        }
      `;

      const fsSource = `
        precision mediump float;
        varying vec2 vTexCoord;
        uniform sampler2D uSampler;
        void main(){
            vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
            vec4 color = texture2D(uSampler, uv);
            if(color.a < 0.01) discard;
            gl_FragColor = color;
        }
      `;

      state.program = createProgram(vsSource, fsSource);
      if (!state.program) return;

      const SUBDIV = 32;
      const positions = [];
      const texCoords = [];
      const indices = [];

      for (let y = 0; y <= SUBDIV; y++) {
        for (let x = 0; x <= SUBDIV; x++) {
          positions.push(x / SUBDIV, y / SUBDIV);
          texCoords.push(x / SUBDIV, y / SUBDIV);
        }
      }

      for (let y = 0; y < SUBDIV; y++) {
        for (let x = 0; x < SUBDIV; x++) {
          const i = y * (SUBDIV + 1) + x;
          indices.push(i, i + 1, i + SUBDIV + 1);
          indices.push(i + 1, i + SUBDIV + 2, i + SUBDIV + 1);
        }
      }

      state.indexCount = indices.length;
      state.positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, state.positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

      state.texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, state.texCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

      state.indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, state.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    function createTexture(img) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return tex;
    }

    async function loadImages() {
      const total = MES_IMAGES.length * 2; // load double set to fill infinite canvas
      const imageSources = [...MES_IMAGES, ...MES_IMAGES];

      let loadedCount = 0;
      for (let i = 0; i < imageSources.length; i++) {
        if (!isComponentMounted) return;
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageSources[i];

        await new Promise(resolve => {
          img.onload = () => {
            state.images.push(img);
            state.textures.push(createTexture(img));
            resolve();
          };
          img.onerror = () => {
            // fallback image
            img.src = `https://picsum.photos/id/${(i % 50) + 10}/${state.imageWidth}/${state.imageHeight}`;
            img.onload = () => {
              state.images.push(img);
              state.textures.push(createTexture(img));
              resolve();
            };
            img.onerror = resolve;
          };
        });

        loadedCount++;
        if (isComponentMounted) {
          setLoadingProgress(Math.round((loadedCount / total) * 100));
        }
      }

      if (isComponentMounted) {
        setIsLoading(false);
      }
    }

    function getVisibleTiles() {
      if (state.images.length === 0) return [];
      const tiles = [];
      const tileW = state.imageWidth + state.gap;
      const tileH = state.imageHeight + state.gap;
      const visibleLeft = state.viewOffset.x - canvas.width;
      const visibleRight = state.viewOffset.x + canvas.width * 2;
      const visibleTop = state.viewOffset.y - canvas.height;
      const visibleBottom = state.viewOffset.y + canvas.height * 2;

      for (let y = Math.floor(visibleTop / tileH) - 1; y <= Math.ceil(visibleBottom / tileH) + 1; y++) {
        for (let x = Math.floor(visibleLeft / tileW) - 1; x <= Math.ceil(visibleRight / tileW) + 1; x++) {
          const hash = (x * 7919 + y * 7307) % state.images.length;
          const idx = Math.abs(hash);
          tiles.push({
            x: x * tileW,
            y: y * tileH,
            imageIndex: idx
          });
        }
      }
      return tiles;
    }

    function render() {
      if (!state.program || state.images.length === 0 || !gl) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(state.program);

      const posLoc = gl.getAttribLocation(state.program, 'aPosition');
      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, state.positionBuffer);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const texLoc = gl.getAttribLocation(state.program, 'aTexCoord');
      gl.enableVertexAttribArray(texLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, state.texCoordBuffer);
      gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, state.indexBuffer);

      const resLoc = gl.getUniformLocation(state.program, 'uResolution');
      gl.uniform2f(resLoc, canvas.width, canvas.height);

      const offsetLoc = gl.getUniformLocation(state.program, 'uOffset');
      const imgPosLoc = gl.getUniformLocation(state.program, 'uImagePosition');
      const samplerLoc = gl.getUniformLocation(state.program, 'uSampler');
      const bulgeStrengthLoc = gl.getUniformLocation(state.program, 'uBulgeStrength');
      const bulgeRadiusLoc = gl.getUniformLocation(state.program, 'uBulgeRadius');

      gl.uniform1f(bulgeStrengthLoc, state.bulgeStrength);
      gl.uniform1f(bulgeRadiusLoc, state.adjustedBulgeRadius);

      const visibleTiles = getVisibleTiles();
      for (const t of visibleTiles) {
        gl.uniform2f(offsetLoc, state.viewOffset.x, state.viewOffset.y);
        gl.uniform2f(imgPosLoc, t.x, t.y);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, state.textures[t.imageIndex]);
        gl.uniform1i(samplerLoc, 0);
        gl.drawElements(gl.TRIANGLES, state.indexCount, gl.UNSIGNED_SHORT, 0);
      }
    }

    function animate() {
      if (!isComponentMounted) return;
      if (!state.drag.isDragging) {
        state.viewOffset.x -= state.drag.velocityX;
        state.viewOffset.y -= state.drag.velocityY;
        state.drag.velocityX *= state.inertia;
        state.drag.velocityY *= state.inertia;
        if (Math.abs(state.drag.velocityX) < 0.01) state.drag.velocityX = 0;
        if (Math.abs(state.drag.velocityY) < 0.01) state.drag.velocityY = 0;
      }
      render();
      animFrameId = requestAnimationFrame(animate);
    }

    initGL();
    loadImages();
    animFrameId = requestAnimationFrame(animate);

    // Mouse & Touch events
    const handleMouseDown = (e) => {
      e.preventDefault();
      state.drag.isDragging = true;
      state.drag.lastX = e.clientX;
      state.drag.lastY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!state.drag.isDragging) return;
      e.preventDefault();
      const dx = e.clientX - state.drag.lastX;
      const dy = e.clientY - state.drag.lastY;
      state.drag.velocityX = dx * 0.35 + state.drag.velocityX * 0.65;
      state.drag.velocityY = dy * 0.35 + state.drag.velocityY * 0.65;
      state.viewOffset.x -= state.drag.velocityX;
      state.viewOffset.y -= state.drag.velocityY;
      state.drag.lastX = e.clientX;
      state.drag.lastY = e.clientY;
    };

    const handleMouseUp = () => {
      state.drag.isDragging = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        state.drag.isDragging = true;
        state.drag.lastX = e.touches[0].clientX;
        state.drag.lastY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!state.drag.isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - state.drag.lastX;
      const dy = e.touches[0].clientY - state.drag.lastY;
      state.drag.velocityX = dx * 0.35 + state.drag.velocityX * 0.65;
      state.drag.velocityY = dy * 0.35 + state.drag.velocityY * 0.65;
      state.viewOffset.x -= state.drag.velocityX;
      state.viewOffset.y -= state.drag.velocityY;
      state.drag.lastX = e.touches[0].clientX;
      state.drag.lastY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      state.drag.isDragging = false;
    };

    const handleWheel = (e) => {
      state.drag.velocityX += e.deltaX * 0.3;
      state.drag.velocityY += e.deltaY * 0.3;
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case '+':
        case '=':
          state.bulgeStrength = Math.min(1.5, state.bulgeStrength + 0.05);
          break;
        case '-':
        case '_':
          state.bulgeStrength = Math.max(0, state.bulgeStrength - 0.05);
          break;
        case '[':
          state.bulgeRadius = Math.max(0.5, state.bulgeRadius - 0.05);
          resizeCanvas();
          break;
        case ']':
          state.bulgeRadius = Math.min(3, state.bulgeRadius + 0.05);
          resizeCanvas();
          break;
        case 'r':
        case 'R':
          state.bulgeStrength = 0.4;
          state.bulgeRadius = 1.5;
          resizeCanvas();
          break;
        default:
          break;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    canvas.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isComponentMounted = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleWindowResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <section ref={containerRef} className="infinite-bulge-container">
      <div className="bulge-grid-overlay" />

      {/* Header Overlay */}
      <div className="bulge-header-overlay">
        <div className="bulge-badge">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive WebGL Lens Showcase</span>
        </div>
        <h1 className="bulge-title">Infinite Work Canvas</h1>
        <p className="bulge-subtitle">Drag, scroll & explore our portfolio assets with real-time WebGL fisheye distortion.</p>
      </div>

      {/* WebGL Canvas */}
      <canvas ref={canvasRef} className="infinite-bulge-canvas" />

      {/* Loader */}
      {isLoading && (
        <div className="bulge-loader">
          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          <span>Loading Assets... {loadingProgress}%</span>
        </div>
      )}

      {/* Controls Hint */}
      <div className="bulge-controls-hint">
        <Move className="w-4 h-4 text-white/70 flex-shrink-0" />
        <span className="hidden sm:inline">Drag / Scroll to explore || Use <b>+</b> / <b>-</b> to adjust lens bulge</span>
        <span className="sm:hidden">Swipe or drag to explore</span>
      </div>

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        className="bulge-fullscreen-btn"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
      </button>
    </section>
  );
}
