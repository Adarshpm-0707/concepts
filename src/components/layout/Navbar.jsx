import React from 'react';
import { useLocation } from 'react-router-dom';
import PillNav from '../ui/PillNav';
import { navLinks } from '../../data/content';

export default function Navbar() {
  const location = useLocation();

  const logoNode = (
    <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-heading font-black text-black text-base uppercase">
      A
    </div>
  );

  const items = navLinks.map(link => ({
    label: link.label,
    href: link.path
  }));

  return (
    <PillNav
      logo={logoNode}
      logoAlt="Aleef Concepts"
      items={items}
      activeHref={location.pathname}
      baseColor="#ffffff"
      pillColor="#000000"
      hoveredPillTextColor="#000000"
      pillTextColor="#ffffff"
      initialLoadAnimation={true}
    />
  );
}