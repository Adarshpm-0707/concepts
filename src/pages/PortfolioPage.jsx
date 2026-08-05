import React from 'react';
import PageHeader from '../components/common/PageHeader';
import SpiralGallery from '../components/sections/SpiralGallery';
import PortfolioIntro from '../components/sections/PortfolioIntro';
import Testimonials from '../components/sections/Testimonials';
import WhyTrustUs from '../components/sections/WhyTrustUs';
import CTA from '../components/sections/CTA';

export default function PortfolioPage() {
  return (
    <>
   
      <SpiralGallery
        title="Somewhere between structure and disorder new forms quietly start to emerge"
        subtitle="Interactive 3D Spiral Image Gallery"
      />
      <PortfolioIntro />
      <Testimonials />
      <WhyTrustUs />
      <CTA />
    </>
  );
}
