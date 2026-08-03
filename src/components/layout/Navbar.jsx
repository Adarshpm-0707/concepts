import React from 'react';
import { useLocation } from 'react-router-dom';
import PillNav from '../ui/PillNav';
import { navLinks } from '../../data/content';
import logoImg from '../../assets/logo-black.png';

export default function Navbar() {
  const location = useLocation();

  const items = navLinks.map(link => ({
    label: link.label,
    href: link.path
  }));

  return (
    <PillNav
      logo={logoImg}
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