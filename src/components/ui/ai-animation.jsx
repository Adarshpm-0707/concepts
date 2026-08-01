import React from 'react';

/**
 * Classic subtle ambient glow replacing canvas AI animation
 */
export function AIAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px]" />
    </div>
  );
}

export default AIAnimation;
