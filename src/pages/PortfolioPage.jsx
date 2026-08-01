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
      <PageHeader
        eyebrow="3D Interactive Experience & Case Studies"
        title="Proven Growth Campaigns for Kannur & GCC Brands"
        subtitle="Explore real-world results achieved by Aleef Concepts through our 3D interactive spiral showcase."
      />
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
