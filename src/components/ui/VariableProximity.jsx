import React, { forwardRef, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './VariableProximity.css';

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top, active: true };
      } else {
        positionRef.current = { x, y, active: true };
      }
    };

    const handleMouseMove = ev => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = ev => {
      if (ev.touches && ev.touches[0]) {
        const touch = ev.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };
    const handleMouseLeave = () => {
      positionRef.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label = '',
    children,
    fromFontVariationSettings = "'wght' 400, 'opsz' 9",
    toFontVariationSettings = "'wght' 900, 'opsz' 40",
    containerRef,
    radius = 140,
    falloff = 'smooth',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const localWrapperRef = useRef(null);
  const effectiveContainerRef = containerRef || localWrapperRef;

  const textContent = typeof children === 'string' ? children : (label || '');

  const letterRefs = useRef([]);
  const currentFalloffsRef = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useMousePositionRef(effectiveContainerRef);

  const parsedSettings = useMemo(() => {
    const parseSettings = settingsStr =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = distance => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  };

  useEffect(() => {
    let frameId;
    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      // Only perform letter calculations if mouse is active or lerping is in progress
      if (mousePositionRef.current.active && effectiveContainerRef?.current) {
        const containerRect = effectiveContainerRef.current.getBoundingClientRect();
        const { x, y } = mousePositionRef.current;

        letterRefs.current.forEach((letterRef, index) => {
          if (!letterRef) return;

          const rect = letterRef.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
          const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

          const distance = calculateDistance(x, y, letterCenterX, letterCenterY);

          let targetFalloff = 0;
          if (distance < radius) {
            targetFalloff = calculateFalloff(distance);
          }

          const prevFalloff = currentFalloffsRef.current[index] || 0;
          const lerpedFalloff = prevFalloff + (targetFalloff - prevFalloff) * 0.18;
          currentFalloffsRef.current[index] = lerpedFalloff;

          const newSettings = parsedSettings
            .map(({ axis, fromValue, toValue }) => {
              const interpolatedValue = fromValue + (toValue - fromValue) * lerpedFalloff;
              return `'${axis}' ${interpolatedValue.toFixed(1)}`;
            })
            .join(', ');

          if (interpolatedSettingsRef.current[index] !== newSettings) {
            interpolatedSettingsRef.current[index] = newSettings;
            letterRef.style.fontVariationSettings = newSettings;
          }
        });
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
    };
  }, [effectiveContainerRef, parsedSettings, radius, falloff]);

  const words = textContent.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={el => {
        localWrapperRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className={`variable-proximity ${className}`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                className="variable-proximity-letter"
                style={{
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex] || fromFontVariationSettings
                }}
                aria-hidden="true text-white"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{textContent}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
