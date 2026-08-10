import React from 'react';
import MotionCards from '../components/sections/MotionCards';
import PortfolioIntro from '../components/sections/PortfolioIntro';
import Testimonials from '../components/sections/Testimonials';
import WhyTrustUs from '../components/sections/WhyTrustUs';
import CTA from '../components/sections/CTA';

export default function PortfolioPage() {
  return (
    <>
      <MotionCards />
      <PortfolioIntro />
      <Testimonials />
      <WhyTrustUs />
      <CTA />
    </>
  );
}
