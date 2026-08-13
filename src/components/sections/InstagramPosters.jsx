import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, ExternalLink, ChevronDown, Grid } from 'lucide-react';

// All 26 unique Instagram post IDs from request
const INSTAGRAM_POSTS = [
  { id: 'DbIhEwBCXdy', category: 'Branding' },
  { id: 'DbH5l6ZCazb', category: 'Campaigns' },
  { id: 'DZhGOWyie6m', category: 'Branding' },
  { id: 'DUAPAzuD7y4', category: 'Promotions' },
  { id: 'DbF4P5uCXUQ', category: 'Campaigns' },
  { id: 'DZhjJvCCf6T', category: 'Branding' },
  { id: 'DZfHQtHiXm3', category: 'Promotions' },
  { id: 'DaP7FNEibek', category: 'Branding' },
  { id: 'DZMYYJ9iaG8', category: 'Campaigns' },
  { id: 'DYBqWAyiYaw', category: 'Promotions' },
  { id: 'DZ1QKKdjHg5', category: 'Branding' },
  { id: 'DaAJ169CaUo', category: 'Campaigns' },
  { id: 'DadUjWVnOh4', category: 'Branding' },
  { id: 'DaSU68fj2No', category: 'Promotions' },
  { id: 'DaKWPuXCWLl', category: 'Campaigns' },
  { id: 'DKL-xSkPU-u', category: 'Promotions' },
  { id: 'DKRXLq6vlbm', category: 'Branding' },
  { id: 'DZkHnG-j9b7', category: 'Campaigns' },
  { id: 'DZg7PkBjxHx', category: 'Promotions' },
  { id: 'DCsnWDNzCYg', category: 'Branding' },
  { id: 'DIB4dDFMXV6', category: 'Campaigns' },
  { id: 'DHwQ4Asqhj4', category: 'Promotions' },
  { id: 'DHulkTeqwx9', category: 'Branding' },
  { id: 'DQtlftNkk50', category: 'Campaigns' },
  { id: 'DTpLsJkgDZ1', category: 'Branding' },
  { id: 'DKEbW0nTO_O', category: 'Promotions' },
];

const CATEGORIES = ['All', 'Branding', 'Campaigns', 'Promotions'];

export default function InstagramPosters() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredPosts = activeCategory === 'All'
    ? INSTAGRAM_POSTS
    : INSTAGRAM_POSTS.filter((post) => post.category === activeCategory);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, filteredPosts.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredPosts.length);
  };

  return (
    <section id="instagram-posters" className="py-10 sm:py-16 lg:py-24 bg-black relative overflow-hidden border-t border-white/10">
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-gradient-to-tr from-pink-600/15 via-purple-600/15 to-orange-500/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title & Badge Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-accent font-bold tracking-wider uppercase bg-neutral-900/90 text-slate-200 border border-white/15 mb-3 sm:mb-4 shadow-md">
            <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400" />
            <span>Instagram Posters</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-snug">
            INSTAGRAM POSTERS
          </h2>
        </div>

        {/* Category Filters - Fully Mobile Responsive */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12 max-w-full px-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(9);
                }}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-lg scale-105'
                    : 'bg-neutral-900/90 text-slate-300 hover:text-white hover:bg-neutral-800 border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Poster Image Grid - Fully Responsive Layout (Mobile: 1 Col, Tablet: 2 Col, Laptop/Desktop: 3 Col) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {displayedPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: (idx % 9) * 0.04 }}
                className="relative w-full h-[400px] xs:h-[440px] sm:h-[470px] md:h-[500px] lg:h-[520px] bg-neutral-950 border border-white/10 hover:border-pink-500/50 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group hover:shadow-pink-500/20 hover:-translate-y-1.5"
              >
                {/* Skeleton Background while loading */}
                <div className="absolute inset-0 bg-neutral-900/60 animate-pulse pointer-events-none" />

                {/* Embedded Instagram Poster Frame */}
                <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
                  <iframe
                    src={`https://www.instagram.com/p/${post.id}/embed`}
                    title={`Instagram Poster ${idx + 1}`}
                    className="w-full h-[620px] -mt-[56px] border-0 overflow-hidden pointer-events-auto"
                    scrolling="no"
                    allowTransparency={true}
                    loading="lazy"
                  />
                </div>

                {/* Mobile & Laptop Interactive Overlay */}
                <a
                  href={`https://www.instagram.com/p/${post.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center pointer-events-auto"
                  title="View on Instagram"
                >
                  <span className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                  </span>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Controls - Mobile & Laptop Optimized */}
        {filteredPosts.length > 9 && (
          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            {hasMore && (
              <button
                type="button"
                onClick={handleLoadMore}
                className="w-full sm:w-auto px-7 py-3 sm:py-3.5 rounded-full bg-white text-black hover:bg-slate-200 active:scale-95 font-heading font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Load More Posters ({filteredPosts.length - visibleCount} left)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            )}

            {visibleCount < filteredPosts.length && (
              <button
                type="button"
                onClick={handleShowAll}
                className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-full border border-white/30 bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 font-heading font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Grid className="w-4 h-4 text-pink-400" />
                <span>Show All ({filteredPosts.length})</span>
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
