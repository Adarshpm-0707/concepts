import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Sparkles, ArrowRight, Layers } from 'lucide-react';
import '../../styles/clay-sphere.css';

const projectsData = [
  {
    id: 1,
    title: "Royal Specialty Hospital",
    category: "Healthcare & Tech",
    location: "Kannur, Kerala",
    result: "+320% Inquiries",
    desc: "Full digital rebranding and high-converting patient inquiry funnels for North Malabar's multi-specialty medical center.",
    img: "/assets/WhatsApp Image 2026-08-06 at 2.59.53 PM.jpeg"
  },
  {
    id: 2,
    title: "Malabar Haven Villas",
    category: "Luxury Architecture",
    location: "Kannur & Dubai",
    result: "4.8x ROAS",
    desc: "Architectural showcase and multi-platform performance ad campaigns delivering high qualified leads for beachfront villa developments.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.00.40 PM.jpeg"
  },
  {
    id: 3,
    title: "North Malabar Gourmet",
    category: "Hospitality & Dining",
    location: "Kannur, Kerala",
    result: "1.8M Viral Views",
    desc: "Brand identity, interior signage, and viral social reel campaigns capturing authentic local culinary heritage.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.00.49 PM.jpeg"
  },
  {
    id: 4,
    title: "Elite Apparel & Couture",
    category: "Retail & E-commerce",
    location: "Kerala & GCC",
    result: "+210% Sales",
    desc: "Mobile-first e-commerce store with strategic copywriting and targeted lead generation driving record monthly orders.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.00.57 PM.jpeg"
  },
  {
    id: 5,
    title: "GCC Commercial Hub",
    category: "B2B Performance",
    location: "Dubai, UAE",
    result: "3.5x Conversions",
    desc: "Enterprise lead generation funnels and CRM automation for major logistics and commercial trade hubs across the Middle East.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.01.18 PM.jpeg"
  },
  {
    id: 6,
    title: "Aleef Media Production",
    category: "Film & Reel Studio",
    location: "Kannur, Kerala",
    result: "2.4M Reach",
    desc: "Cinematic brand films and high-impact short-form ad creatives shot and edited for maximum audience retention on mobile.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.02.05 PM.jpeg"
  },
  {
    id: 7,
    title: "Malabar Motors Hub",
    category: "Automotive Marketing",
    location: "Kannur, Kerala",
    result: "+180% Leads",
    desc: "Integrated digital strategy combining Google Ads, Meta campaigns, and automated WhatsApp lead follow-up pipelines.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.02.11 PM.jpeg"
  },
  {
    id: 8,
    title: "Zenith EdTech Academy",
    category: "Educational Branding",
    location: "Calicut & Kannur",
    result: "98% Admissions",
    desc: "Complete brand refresh, prospectus design, and student acquisition campaigns filling student capacity across multiple campuses.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.02.18 PM.jpeg"
  },
  {
    id: 9,
    title: "Sunset Eco Resort",
    category: "Tourism & Hotel",
    location: "Wayanad & Kannur",
    result: "4.2x Direct Bookings",
    desc: "Direct booking web engine and high-impact visual media driving 4.2x growth in direct website reservations.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.02.56 PM.jpeg"
  },
  {
    id: 10,
    title: "Aleef Growth Engine",
    category: "Digital Transformation",
    location: "South India & GCC",
    result: "#1 Agency Growth",
    desc: "Omnichannel strategy uniting brand identity, custom web software, and real-time sales pipeline analytics.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.03.38 PM.jpeg"
  },
  {
    id: 11,
    title: "Kerala Tech Venture",
    category: "SaaS & Web Platform",
    location: "Kannur & Bangalore",
    result: "5x User Growth",
    desc: "High-speed custom web application with interactive UI/UX built for rapid user onboarding and scale.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.04.15 PM.jpeg"
  },
  {
    id: 12,
    title: "Luxury Retail Studio",
    category: "Branding & Package",
    location: "Kerala & UAE",
    result: "+310% Orders",
    desc: "Bespoke brand guidelines, custom packaging design, and performance social ads driving exceptional customer loyalty.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.04.21 PM.jpeg"
  },
  {
    id: 13,
    title: "Urban Living Spaces",
    category: "Interior Architecture",
    location: "Kannur, Kerala",
    result: "2.9x Inquiries",
    desc: "Visual portfolio web experience and qualified lead capture pipeline connecting high-end clients with interior designers.",
    img: "/assets/WhatsApp Image 2026-08-06 at 3.04.52 PM.jpeg"
  }
];

// Duplicate to fill 26 cards for dense Fibonacci 3D sphere
const sphereItems = [...projectsData, ...projectsData];

export default function ClaySphereGallery() {
  const containerRef = useRef(null);
  const sphereRef = useRef(null);
  const cardsRef = useRef([]);
  const constellationRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    let ctx = null;

    const timer = setTimeout(() => {
      if (!containerRef.current || !sphereRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const w = window.innerWidth;
      const radius = w < 480 ? 110 : w < 640 ? 130 : w < 1024 ? 200 : 260;
      const totalItems = sphereItems.length;

      // 1. Position cards on Fibonacci Sphere
      sphereItems.forEach((_, i) => {
        const card = cardsRef.current[i];
        if (!card) return;

        const phi = Math.acos(1 - (2 * (i + 0.5)) / totalItems);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        const rotY = Math.atan2(x, z) * (180 / Math.PI);
        const rotX = Math.asin(-y / radius) * (180 / Math.PI);

        gsap.set(card, {
          x: x,
          y: y,
          z: z,
          rotateY: rotY,
          rotateX: rotX,
          transformOrigin: '50% 50%'
        });
      });

      ctx = gsap.context(() => {
        // 2. Animate sphere rotation on scroll
        gsap.to(sphereRef.current, {
          rotateY: 360 * 2.5,
          rotateX: 35,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            onUpdate: (self) => {
              const progress = self.progress;
              const currentProjIdx = Math.floor(progress * projectsData.length) % projectsData.length;
              setActiveIdx(currentProjIdx);

              // Highlight active card
              const focusCardIdx = Math.floor(progress * totalItems) % totalItems;
              sphereItems.forEach((_, idx) => {
                const card = cardsRef.current[idx];
                if (!card) return;
                const diff = Math.abs(idx - focusCardIdx);
                if (diff <= 1 || diff === totalItems - 1) {
                  card.classList.add('active-card');
                } else {
                  card.classList.remove('active-card');
                }
              });
            }
          }
        });

        // 3. Constellation card parallax
        if (constellationRef.current) {
          gsap.to('.constellation-card', {
            y: -80,
            rotate: '+=15',
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.clay-journey-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });
        }
      }, containerRef);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  const activeProject = projectsData[activeIdx] || projectsData[0];

  const isMobileView = typeof window !== 'undefined' && window.innerWidth < 640;

  const scatterPositions = isMobileView ? [
    { top: '10%', left: '4%' },
    { top: '15%', left: '68%' },
    { top: '68%', left: '5%' },
    { top: '72%', left: '68%' },
    { top: '82%', left: '20%' },
    { top: '12%', left: '36%' }
  ] : [
    { top: '12%', left: '8%' },
    { top: '18%', left: '82%' },
    { top: '65%', left: '10%' },
    { top: '72%', left: '84%' },
    { top: '80%', left: '28%' },
    { top: '15%', left: '48%' }
  ];

  return (
    <>
      <div ref={containerRef} className="clay-gallery-container">
        <div className="clay-grid-overlay" />

        {/* Sticky Scene */}
        <div className="clay-sticky-scene">
          <div className="clay-scene-grid">
            
            {/* Left Floating Info Box */}
            <div className="clay-floating-info">
              <div className="clay-badge">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Aleef Concepts Work Showcase</span>
              </div>

              <div className="clay-info-card">
                <div className="clay-meta-row">
                  <span className="clay-category-tag">{activeProject.category}</span>
                  <span className="clay-result-pill">{activeProject.result}</span>
                </div>

                <h2 className="clay-title">{activeProject.title}</h2>
                <p className="clay-desc">{activeProject.desc}</p>

                <div className="clay-location-tag">
                  <MapPin className="w-3.5 h-3.5 text-white/60" />
                  <span>{activeProject.location}</span>
                </div>
              </div>
            </div>

            {/* Right 3D Sphere Stage */}
            <div className="clay-stage-wrap">
              <div ref={sphereRef} className="clay-sphere">
                {sphereItems.map((item, i) => (
                  <div
                    key={i}
                    ref={el => (cardsRef.current[i] = el)}
                    className={`clay-card ${i % projectsData.length === activeIdx ? 'active-card' : ''}`}
                    onClick={() => setActiveIdx(i % projectsData.length)}
                  >
                    <img src={item.img} alt={item.title} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SVG Background Lines */}
          <svg className="clay-network-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="rgba(255,255,255,0.04)" strokeWidth="0.25" fill="none" />
            <path d="M20,0 L80,100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.25" fill="none" />
          </svg>
        </div>
      </div>

      {/* Journey & Constellation Section */}
      <section className="clay-journey-section">
        <div ref={constellationRef} className="clay-constellation">
          {scatterPositions.map((pos, i) => (
            <div
              key={i}
              className="clay-card constellation-card"
              style={{
                top: pos.top,
                left: pos.left,
                transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (12 + i * 5)}deg)`
              }}
            >
              <img src={projectsData[i % projectsData.length].img} alt="Constellation project" />
            </div>
          ))}
        </div>

        <div className="clay-journey-content">
          <div className="clay-badge">
            <Layers className="w-3.5 h-3.5" />
            <span>Ready to Elevate Your Brand?</span>
          </div>
          <h2>Start Your Journey</h2>
          <p>We would like to start a project with you. Let’s create something extraordinary together.</p>
          <Link to="/contact" className="clay-chunky-btn">
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
