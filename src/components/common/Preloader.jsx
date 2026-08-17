import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo-black.png';
import textLogoImg from '../../assets/text aleef.png';
import './Preloader.css';

/**
 * Preloader component displayed on initial website load.
 * Features an animated logo, progress bar, counter, and smooth exit transition.
 */
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is visible
    document.body.style.overflow = 'hidden';

    const duration = 1800; // 1.8 seconds smooth progress build-up
    const intervalTime = 16; // ~60fps
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(100, Math.floor((step / totalSteps) * 100));
      setProgress(currentProgress);

      if (step >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            document.body.style.overflow = '';
            if (onComplete) {
              onComplete();
            }
          }, 850); // match exit transition animation duration
        }, 200);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isDone && (
        <motion.div
          key="preloader"
          className="preloader-overlay"
          initial={{ opacity: 1, y: '0%' }}
          exit={{ 
            y: '-100%',
            transition: { 
              duration: 0.85, 
              ease: [0.76, 0, 0.24, 1] 
            } 
          }}
        >
          {/* Ambient Glow & Grid Background */}
          <div className="preloader-ambient-glow" />
          <div className="preloader-grid-bg" />

          <div className="preloader-content">
            {/* Logo Container with Ambient Glow Ring */}
            <motion.div 
              className="preloader-logo-wrapper"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="preloader-logo-glow" />
              <img 
                src={logoImg} 
                alt="Aleef Concepts Logo" 
                className="preloader-logo-img" 
              />
              <img 
                src={textLogoImg} 
                alt="Aleef Concepts Text" 
                className="preloader-text-logo-img" 
              />
            </motion.div>

            {/* Tagline */}
            <motion.p 
              className="preloader-tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              CREATIVE AGENCY & GROWTH STUDIO
            </motion.p>

            {/* Progress Bar Track & Fill */}
            <div className="preloader-progress-track">
              <div 
                className="preloader-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage Counter */}
            <div className="preloader-counter-container">
              <span className="preloader-counter-number">{progress}</span>
              <span className="preloader-counter-symbol">%</span>
            </div>
          </div>

          {/* Footer Subtext */}
          <div className="preloader-footer-text">
            <span>KANNUR • KERALA</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
