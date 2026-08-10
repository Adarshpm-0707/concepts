import React from 'react';
import InfiniteBulgeGallery from '../components/sections/InfiniteBulgeGallery';
import PortfolioIntro from '../components/sections/PortfolioIntro';
import Testimonials from '../components/sections/Testimonials';
import WhyTrustUs from '../components/sections/WhyTrustUs';
import CTA from '../components/sections/CTA';

export default function PortfolioPage() {
  return (
    <>
      <InfiniteBulgeGallery />
      <PortfolioIntro />
      <Testimonials />
      <WhyTrustUs />
      <CTA />
    </>
  );
}
