import React from 'react';
import BorderGlow from '../ui/BorderGlow';

export default function Card({ children, className = '', hoverGlow = true, ...props }) {
  return (
    <BorderGlow
      className={className}
      glowColor="0 0% 100%"
      backgroundColor="#101010"
      borderRadius={24}
      glowRadius={30}
      glowIntensity={1.0}
      edgeSensitivity={30}
      colors={['#ffffff', '#e5e5e5', '#737373']}
      fillOpacity={0.25}
      {...props}
    >
      <div className="p-6 md:p-8 h-full">
        {children}
      </div>
    </BorderGlow>
  );
}
