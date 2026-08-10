import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ArrowUpRight, X, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import '../../styles/motion-cards.css';

gsap.registerPlugin(ScrollTrigger);

const allProjectsData = [
  {
    id: 1,
    title: "Royal Specialty Hospital",
    category: "Healthcare",
    location: "Kannur, Kerala",
    result: "+320% Inquiries",
    image: "/assets/WhatsApp Image 2026-08-06 at 2.59.53 PM.jpeg"
  },
  {
    id: 2,
    title: "Malabar Haven Villas",
    category: "Architecture",
    location: "Kannur & Dubai",
    result: "4.8x ROAS",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.00.40 PM.jpeg"
  },
  {
    id: 3,
    title: "North Malabar Gourmet",
    category: "Hospitality",
    location: "Kannur, Kerala",
    result: "1.8M Views",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.00.49 PM.jpeg"
  },
  {
    id: 4,
    title: "Elite Apparel & Couture",
    category: "Retail",
    location: "Kerala & GCC",
    result: "+210% Sales",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.00.57 PM.jpeg"
  },
  {
    id: 5,
    title: "GCC Commercial Hub",
    category: "B2B",
    location: "Dubai, UAE",
    result: "3.5x Conversions",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.01.18 PM.jpeg"
  },
  {
    id: 6,
    title: "Aleef Media Production",
    category: "Media",
    location: "Kannur, Kerala",
    result: "2.4M Reach",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.02.05 PM.jpeg"
  },
  {
    id: 7,
    title: "Malabar Motors Hub",
    category: "Automotive",
    location: "Kannur, Kerala",
    result: "+180% Leads",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.02.11 PM.jpeg"
  },
  {
    id: 8,
    title: "Zenith EdTech Academy",
    category: "Education",
    location: "Calicut & Kannur",
    result: "98% Admissions",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.02.18 PM.jpeg"
  },
  {
    id: 9,
    title: "Sunset Eco Resort",
    category: "Hospitality",
    location: "Wayanad & Kannur",
    result: "4.2x Bookings",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.02.56 PM.jpeg"
  },
  {
    id: 10,
    title: "Aleef Growth Engine",
    category: "Digital",
    location: "South India & GCC",
    result: "#1 Growth",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.03.38 PM.jpeg"
  },
  {
    id: 11,
    title: "Kerala Tech Venture",
    category: "Digital",
    location: "Kannur & Bangalore",
    result: "5x Growth",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.04.15 PM.jpeg"
  },
  {
    id: 12,
    title: "Luxury Retail Studio",
    category: "Retail",
    location: "Kerala & UAE",
    result: "+310% Orders",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.04.21 PM.jpeg"
  },
  {
    id: 13,
    title: "Urban Living Spaces",
    category: "Architecture",
    location: "Kannur, Kerala",
    result: "2.9x Inquiries",
    image: "/assets/WhatsApp Image 2026-08-06 at 3.04.52 PM.jpeg"
  }
];

const categories = ["All", "Healthcare", "Architecture", "Hospitality", "Retail", "Digital", "Media"];

export default function MotionCards() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxProject, setLightboxProject] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen || lightboxProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, lightboxProject]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxProject) {
          setLightboxProject(null);
        } else if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, lightboxProject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Inertia spring effect on cards
      const cards = sectionRef.current.querySelectorAll('.motion-card__card');
      cards.forEach((card) => {
        let lastX = 0;
        let lastY = 0;
        let speedX = 0;
        let speedY = 0;

        const startRotation = gsap.getProperty(card, 'rotation') || 0;
        const startX = gsap.getProperty(card, 'x') || 0;
        const startY = gsap.getProperty(card, 'y') || 0;

        const onMove = (e) => {
          speedX = e.clientX - lastX;
          speedY = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;

          gsap.to(card, {
            x: startX + Math.min(30, Math.max(-30, speedX * 0.8)),
            y: startY + Math.min(30, Math.max(-30, speedY * 0.8)),
            rotation: startRotation + Math.min(12, Math.max(-12, speedX * 0.25)),
            duration: 0.15,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        };

        const onEnter = (e) => {
          speedX = 0;
          speedY = 0;
          lastX = e.clientX;
          lastY = e.clientY;
        };

        const onLeave = () => {
          gsap.to(card, {
            x: startX,
            y: startY,
            rotation: startRotation,
            duration: 0.9,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto'
          });
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });

      // 2. Inertia spring effect on floating labels
      const labels = sectionRef.current.querySelectorAll('.motion-card__floating-label');
      labels.forEach((label) => {
        let lastX = 0;
        let lastY = 0;
        let speedX = 0;
        let speedY = 0;

        const startRotation = gsap.getProperty(label, 'rotation') || 0;
        const startX = gsap.getProperty(label, 'x') || 0;
        const startY = gsap.getProperty(label, 'y') || 0;

        const onMove = (e) => {
          speedX = e.clientX - lastX;
          speedY = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;

          gsap.to(label, {
            x: startX + Math.min(35, Math.max(-35, speedX * 1.2)),
            y: startY + Math.min(35, Math.max(-35, speedY * 1.2)),
            rotation: startRotation + Math.min(15, Math.max(-15, speedX * 0.35)),
            duration: 0.15,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        };

        const onEnter = (e) => {
          speedX = 0;
          speedY = 0;
          lastX = e.clientX;
          lastY = e.clientY;
        };

        const onLeave = () => {
          gsap.to(label, {
            x: startX,
            y: startY,
            rotation: startRotation,
            duration: 0.9,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto'
          });
        };

        label.addEventListener('mousemove', onMove);
        label.addEventListener('mouseenter', onEnter);
        label.addEventListener('mouseleave', onLeave);
      });

      // 3. Entry Animations: Sticker Pop & Underline Draw
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      const topSticker = sectionRef.current.querySelector('.motion-card__sticker--top');
      if (topSticker) {
        gsap.set(topSticker, { scale: 0, opacity: 0, rotation: -30 });
        tl.to(topSticker, { scale: 1, opacity: 1, rotation: 0, duration: 1.4, ease: 'elastic.out(1, 0.4)' }, 0);
      }

      const underlinePath = sectionRef.current.querySelector('.motion-card__underline-path');
      if (underlinePath) {
        const pathLen = underlinePath.getTotalLength ? underlinePath.getTotalLength() : 600;
        gsap.set(underlinePath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
        tl.to(underlinePath, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out' }, 0.2);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects = activeCategory === "All" 
    ? allProjectsData 
    : allProjectsData.filter((p) => p.category === activeCategory);

  return (
    <>
      <section ref={sectionRef} className="motion-card-section" id="motion-card-section">
        {/* ─── Part 1: Bold Heading Text with Sticker ─── */}
        <div className="motion-card__heading">
          <h2 className="motion-card__title">
            OUR RECENT 
            <br />
            Creative Designs
          </h2>
          <p className="motion-card__subtitle">
            <span className="motion-card__sticker motion-card__sticker--top">
              <span className="motion-card__sticker-icon">
                <Heart className="w-5 h-5 fill-black text-black" />
              </span>
            </span>
          </p>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="motion-card__underline-svg">
            <path className="motion-card__underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* ─── Part 2: Cards with Radial Ambient Glow ─── */}
        <div className="motion-card__cards-area">
          {/* Soft Radial Ambient Blob */}
          <div className="motion-card__blob" />

          {/* 4 Motion Photo Cards */}
          <div ref={containerRef} className="motion-card__cards">
            <div className="motion-card__card motion-card__card--1">
              <div className="motion-card__card-image">
                <img
                  src="/assets/WhatsApp Image 2026-08-06 at 2.59.53 PM.jpeg"
                  loading="lazy"
                  alt="Royal Specialty Hospital"
                  className="cover-image"
                />
              </div>
            </div>

            <div className="motion-card__card motion-card__card--2">
              <div className="motion-card__card-image">
                <img
                  src="/assets/WhatsApp Image 2026-08-06 at 3.00.40 PM.jpeg"
                  loading="lazy"
                  alt="Malabar Haven Villas"
                  className="cover-image"
                />
              </div>
            </div>

            <div className="motion-card__card motion-card__card--3">
              <div className="motion-card__card-image">
                <img
                  src="/assets/WhatsApp Image 2026-08-06 at 3.00.49 PM.jpeg"
                  loading="lazy"
                  alt="North Malabar Gourmet"
                  className="cover-image"
                />
              </div>
            </div>

            <div className="motion-card__card motion-card__card--4">
              <div className="motion-card__card-image">
                <img
                  src="/assets/WhatsApp Image 2026-08-06 at 3.01.18 PM.jpeg"
                  loading="lazy"
                  alt="GCC Commercial Hub"
                  className="cover-image"
                />
              </div>
            </div>
          </div>

          {/* Floating Capsule Labels */}
          <div className="motion-card__floating-labels">
            <div className="motion-card__floating-label motion-card__floating-label--pink">
              <p className="motion-card__floating-text">creative impact = real revenue</p>
            </div>

            {/* Interactive "View All Projects" Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="motion-card__floating-label motion-card__floating-label--orange motion-card__floating-btn"
              aria-label="View all portfolio projects"
            >
              <span className="motion-card__floating-text inline-flex items-center gap-1.5 font-bold">
                View All Projects <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>

            <div className="motion-card__floating-label motion-card__floating-label--red">
              <p className="motion-card__floating-text">strategy over templates</p>
            </div>
          </div>
        </div>

        {/* ─── Part 3: Footer Text ─── */}
        <div className="motion-card__footer-text">
          <p className="motion-card__description">
            To reach the new generation of consumers across Kerala and the GCC, you need to know where
            their attention lives. We are a true 360° creative agency scaling brands across social content,
            performance ads, and digital brand platforms.
          </p>
        </div>
      </section>

      {/* ─── ALL PROJECTS GALLERY MODAL ─── */}
      {isModalOpen && (
        <div className="motion-projects-modal-backdrop" data-lenis-prevent onClick={() => setIsModalOpen(false)}>
          <div 
            className="motion-projects-modal-container"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="motion-modal-header">
              <div className="motion-modal-title-wrap">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Aleef Concepts Gallery</span>
                </div>
                <h3 className="motion-modal-title">All Featured Creative Works</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="motion-modal-close-btn"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="motion-modal-body" data-lenis-prevent>
              {/* Category Filters */}
              <div className="motion-modal-filter-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`motion-modal-filter-btn${activeCategory === cat ? ' is-active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="motion-modal-grid">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="motion-project-grid-card"
                    onClick={() => setLightboxProject(project)}
                  >
                    <div className="motion-project-img-wrapper">
                      <img src={project.image} alt={project.title} loading="lazy" />
                      <span className="motion-project-badge">{project.result}</span>
                    </div>
                    <div className="motion-project-info">
                      <span className="motion-project-category">{project.category}</span>
                      <h4 className="motion-project-title">{project.title}</h4>
                      <div className="flex items-center gap-1 text-[0.7rem] text-slate-400 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── FULLSCREEN LIGHTBOX PREVIEW MODAL ─── */}
      {lightboxProject && (
        <div className="motion-lightbox-backdrop" onClick={() => setLightboxProject(null)}>
          <div className="motion-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxProject(null)}
              className="motion-lightbox-close"
              aria-label="Close lightbox preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxProject.image}
              alt={lightboxProject.title}
              className="motion-lightbox-img"
            />
            <div className="motion-lightbox-caption">
              <h3>{lightboxProject.title}</h3>
              <p>{lightboxProject.category} • {lightboxProject.location} • {lightboxProject.result}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

