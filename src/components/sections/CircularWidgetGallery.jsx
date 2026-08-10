import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Sparkles, MapPin, ArrowRight, ChevronLeft, ChevronRight, MousePointerClick } from 'lucide-react';
import '../../styles/circular-widgets.css';

const widgetsData = [
  {
    id: 1,
    name: "Royal Specialty Hospital",
    category: "Healthcare & Tech",
    location: "Kannur, Kerala",
    result: "+320% Inquiries",
    image: "/assets/WhatsApp Image 2026-08-06 at 2.59.53 PM.jpeg"
  },
  {
    id: 2,
    name: "Malabar Haven Villas",
    category: "Luxury Architecture",
    location: "Kannur & Dubai",
    result: "4.8x ROAS",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.00.40 PM.jpeg"
  },
  {
    id: 3,
    name: "North Malabar Gourmet",
    category: "Hospitality & Dining",
    location: "Kannur, Kerala",
    result: "1.8M Viral Views",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.00.49 PM.jpeg"
  },
  {
    id: 4,
    name: "Elite Apparel & Couture",
    category: "Retail & E-commerce",
    location: "Kerala & GCC",
    result: "+210% Sales",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.00.57 PM.jpeg"
  },
  {
    id: 5,
    name: "GCC Commercial Hub",
    category: "B2B Performance",
    location: "Dubai, UAE",
    result: "3.5x Conversions",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.01.18 PM.jpeg"
  },
  {
    id: 6,
    name: "Aleef Media Production",
    category: "Film & Reel Studio",
    location: "Kannur, Kerala",
    result: "2.4M Reach",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.02.05 PM.jpeg"
  },
  {
    id: 7,
    name: "Malabar Motors Hub",
    category: "Automotive Marketing",
    location: "Kannur, Kerala",
    result: "+180% Leads",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.02.11 PM.jpeg"
  },
  {
    id: 8,
    name: "Zenith EdTech Academy",
    category: "Educational Branding",
    location: "Calicut & Kannur",
    result: "98% Admissions",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.02.18 PM.jpeg"
  },
  {
    id: 9,
    name: "Sunset Eco Resort",
    category: "Tourism & Hotel",
    location: "Wayanad & Kannur",
    result: "4.2x Direct Bookings",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.02.56 PM.jpeg"
  },
  {
    id: 10,
    name: "Aleef Growth Engine",
    category: "Digital Transformation",
    location: "South India & GCC",
    result: "#1 Agency Growth",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.03.38 PM.jpeg"
  },
  {
    id: 11,
    name: "Kerala Tech Venture",
    category: "SaaS & Web Platform",
    location: "Kannur & Bangalore",
    result: "5x User Growth",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.04.15 PM.jpeg"
  },
  {
    id: 12,
    name: "Luxury Retail Studio",
    category: "Branding & Package",
    location: "Kerala & UAE",
    result: "+310% Orders",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.04.21 PM.jpeg"
  },
  {
    id: 13,
    name: "Urban Living Spaces",
    category: "Interior Architecture",
    location: "Kannur, Kerala",
    result: "2.9x Inquiries",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.04.52 PM.jpeg"
  }
];

const lerp = (a, b, t) => a + (b - a) * t;

export default function CircularWidgetGallery() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const indicatorRef = useRef(null);
  const previewImgRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Rotation state refs to preserve smooth RAF loop state
  const rotState = useRef({
    currentIndicator: 0,
    targetIndicator: 0,
    currentSpinner: 0,
    targetSpinner: 0,
    lastTime: performance.now(),
    lastSegmentIndex: -1,
    isDragging: false,
    dragLastX: 0,
    dragLastY: 0,
    centerX: 0,
    centerY: 0,
    outerRadius: 0,
    innerRadius: 0
  });

  useEffect(() => {
    let animFrameId = null;
    let isMounted = true;

    const container = containerRef.current;
    if (!container) return;

    const buildSpinner = () => {
      const svgEl = svgRef.current;
      if (!svgEl) return;

      // Clear existing content
      while (svgEl.firstChild) {
        svgEl.removeChild(svgEl.firstChild);
      }

      const rect = container.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const viewportSize = Math.min(width, height);

      const isMobile = width < 640;
      const outerR = isMobile ? viewportSize * 0.38 : viewportSize * 0.36;
      const innerR = isMobile ? outerR * 0.58 : outerR * 0.55;
      const cX = width / 2;
      const cY = height / 2;

      rotState.current.centerX = cX;
      rotState.current.centerY = cY;
      rotState.current.outerRadius = outerR;
      rotState.current.innerRadius = innerR;

      const createSVG = (type, attrs = {}) => {
        const el = document.createElementNS("http://www.w3.org/2000/svg", type);
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        return el;
      };

      const defs = createSVG("defs");
      svgEl.appendChild(defs);

      const anglePerSegment = (2 * Math.PI) / widgetsData.length;

      for (let i = 0; i < widgetsData.length; i++) {
        const startAngle = i * anglePerSegment - Math.PI / 2;
        const endAngle = (i + 1) * anglePerSegment - Math.PI / 2;
        const midAngle = (startAngle + endAngle) / 2;

        const clipPathId = `clip-widget-${i}`;
        const clipPath = createSVG("clipPath", { id: clipPathId });
        
        const pathStr = `M ${cX + outerR * Math.cos(startAngle)} ${
          cY + outerR * Math.sin(startAngle)
        } A ${outerR} ${outerR} 0 0 1 ${
          cX + outerR * Math.cos(endAngle)
        } ${cY + outerR * Math.sin(endAngle)} L ${
          cX + innerR * Math.cos(endAngle)
        } ${
          cY + innerR * Math.sin(endAngle)
        } A ${innerR} ${innerR} 0 0 0 ${
          cX + innerR * Math.cos(startAngle)
        } ${cY + innerR * Math.sin(startAngle)} Z`;

        clipPath.appendChild(createSVG("path", { d: pathStr }));
        defs.appendChild(clipPath);

        const g = createSVG("g", {
          "clip-path": `url(#${clipPathId})`,
          "data-segment": i,
          "class": "widget-segment-g"
        });

        const segmentRadius = (innerR + outerR) / 2;
        const segmentX = cX + Math.cos(midAngle) * segmentRadius;
        const segmentY = cY + Math.sin(midAngle) * segmentRadius;

        const arcLength = outerR * anglePerSegment;
        const imgWidth = arcLength * 1.35;
        const imgHeight = (outerR - innerR) * 1.35;
        const rotation = (midAngle * 180) / Math.PI + 90;

        const image = createSVG("image", {
          href: widgetsData[i].image,
          width: imgWidth,
          height: imgHeight,
          x: segmentX - imgWidth / 2,
          y: segmentY - imgHeight / 2,
          preserveAspectRatio: "xMidYMid slice",
          transform: `rotate(${rotation} ${segmentX} ${segmentY})`
        });

        g.appendChild(image);
        svgEl.appendChild(g);
      }

      // Add indicator line at top of circle
      const indicator = createSVG("line", {
        id: "widget-indicator",
        x1: cX,
        y1: cY - innerR * 0.9,
        x2: cX,
        y2: cY - outerR * 1.08
      });

      svgEl.appendChild(indicator);
      indicatorRef.current = indicator;
    };

    buildSpinner();

    // Responsive window resize
    const handleResize = () => {
      buildSpinner();
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const animate = () => {
      if (!isMounted) return;

      const currentTime = performance.now();
      let deltaTime = (currentTime - rotState.current.lastTime) / 1000;
      rotState.current.lastTime = currentTime;
      deltaTime = Math.min(deltaTime, 0.1);

      // Smooth idle rotation if not dragging
      if (!rotState.current.isDragging) {
        rotState.current.targetIndicator += 12 * deltaTime;
        rotState.current.targetSpinner -= 12 * 0.22 * deltaTime;
      }

      rotState.current.currentIndicator = lerp(
        rotState.current.currentIndicator,
        rotState.current.targetIndicator,
        0.1
      );
      rotState.current.currentSpinner = lerp(
        rotState.current.currentSpinner,
        rotState.current.targetSpinner,
        0.1
      );

      const cX = rotState.current.centerX;
      const cY = rotState.current.centerY;

      if (indicatorRef.current) {
        indicatorRef.current.setAttribute(
          "transform",
          `rotate(${rotState.current.currentIndicator % 360} ${cX} ${cY})`
        );
      }

      const svgEl = svgRef.current;
      if (svgEl) {
        svgEl.querySelectorAll("[data-segment]").forEach((seg) => {
          seg.setAttribute(
            "transform",
            `rotate(${rotState.current.currentSpinner % 360} ${cX} ${cY})`
          );
        });
      }

      // Calculate active segment index
      const relativeRotation =
        (((rotState.current.currentIndicator - rotState.current.currentSpinner) % 360) + 360) % 360;
      const anglePerSegmentDeg = 360 / widgetsData.length;
      const segmentIndex = Math.floor(relativeRotation / anglePerSegmentDeg) % widgetsData.length;

      if (segmentIndex !== rotState.current.lastSegmentIndex) {
        rotState.current.lastSegmentIndex = segmentIndex;
        setActiveIndex(segmentIndex);
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    // Scroll Wheel event handler
    const handleWheel = (e) => {
      const delta = e.deltaY * 0.08;
      rotState.current.targetIndicator += delta;
      rotState.current.targetSpinner -= delta;
    };

    const svgDom = svgRef.current;
    if (svgDom) {
      svgDom.addEventListener("wheel", handleWheel, { passive: true });
    }

    // Touch & Pointer Drag handlers
    const handlePointerDown = (e) => {
      rotState.current.isDragging = true;
      rotState.current.dragLastX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      rotState.current.dragLastY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    };

    const handlePointerMove = (e) => {
      if (!rotState.current.isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = clientX - rotState.current.dragLastX;
      const deltaY = clientY - rotState.current.dragLastY;
      const delta = (deltaX + deltaY) * 0.4;

      rotState.current.targetIndicator += delta;
      rotState.current.targetSpinner -= delta;

      rotState.current.dragLastX = clientX;
      rotState.current.dragLastY = clientY;
    };

    const handlePointerUp = () => {
      rotState.current.isDragging = false;
    };

    if (svgDom) {
      svgDom.addEventListener("mousedown", handlePointerDown);
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", handlePointerUp);

      svgDom.addEventListener("touchstart", handlePointerDown, { passive: true });
      window.addEventListener("touchmove", handlePointerMove, { passive: true });
      window.addEventListener("touchend", handlePointerUp);
    }

    return () => {
      isMounted = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);

      if (svgDom) {
        svgDom.removeEventListener("wheel", handleWheel);
        svgDom.removeEventListener("mousedown", handlePointerDown);
        svgDom.removeEventListener("touchstart", handlePointerDown);
      }
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, []);

  // Update background preview image smoothly on activeIndex change
  useEffect(() => {
    const previewContainer = previewImgRef.current;
    if (!previewContainer) return;

    const activeWidget = widgetsData[activeIndex];
    if (!activeWidget) return;

    const img = document.createElement("img");
    img.src = activeWidget.image;
    img.alt = activeWidget.name;

    gsap.set(img, { opacity: 0 });
    previewContainer.appendChild(img);
    gsap.to(img, { opacity: 1, duration: 0.35, ease: "power2.out" });

    const allImages = previewContainer.querySelectorAll("img");
    if (allImages.length > 2) {
      for (let i = 0; i < allImages.length - 2; i++) {
        previewContainer.removeChild(allImages[i]);
      }
    }
  }, [activeIndex]);

  const activeWidget = widgetsData[activeIndex] || widgetsData[0];

  const handlePrev = () => {
    const angleStep = 360 / widgetsData.length;
    rotState.current.targetIndicator -= angleStep;
    rotState.current.targetSpinner += angleStep;
  };

  const handleNext = () => {
    const angleStep = 360 / widgetsData.length;
    rotState.current.targetIndicator += angleStep;
    rotState.current.targetSpinner -= angleStep;
  };

  return (
    <section ref={containerRef} className="circular-widget-container">
      {/* Background Image Preview */}
      <div ref={previewImgRef} className="widget-preview-img" />

      {/* Overlay Filters */}
      <div className="widget-vignette" />
      <div className="widget-grid-overlay" />

      {/* Header Overlay */}
      <div className="widget-header-overlay">
        <div className="widget-badge">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Circular Showcase</span>
        </div>
        <h1 className="widget-main-title">Selected Client Works & Case Studies</h1>
      </div>

      {/* SVG Circular Spinner */}
      <svg ref={svgRef} id="widget-svg" />

      {/* Center Widget Title Badge */}
      <div className="widget-title">{activeWidget.name}</div>

      {/* Floating Controls Hint */}
      <div className="widget-controls-hint">
        <MousePointerClick className="w-4 h-4 text-white/80" />
        <span className="hidden sm:inline">Scroll or drag the wheel to rotate project widgets</span>
        <span className="sm:hidden">Drag wheel to spin</span>
      </div>

      {/* Navigation Buttons */}
      <div className="widget-nav-buttons">
        <button onClick={handlePrev} className="widget-nav-btn" aria-label="Previous Widget">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={handleNext} className="widget-nav-btn" aria-label="Next Widget">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
