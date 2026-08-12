import React from 'react';
import MotionCards from '../components/sections/MotionCards';
import PortfolioIntro from '../components/sections/PortfolioIntro';
import Testimonials from '../components/sections/Testimonials';
import WhyTrustUs from '../components/sections/WhyTrustUs';

export default function PortfolioPage() {
  return (
    <>
      <MotionCards />
      <PortfolioIntro />
      <Testimonials />
      <WhyTrustUs />
    </>
  );
}
