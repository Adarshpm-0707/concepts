import React from 'react';
import PageHeader from '../components/common/PageHeader';
import AboutStats from '../components/sections/AboutStats';
import About from '../components/sections/About';
import AboutMissionVision from '../components/sections/AboutMissionVision';
import CoreValues from '../components/sections/CoreValues';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import WhyTrustUs from '../components/sections/WhyTrustUs';

export default function AboutPage() {
  return (
    <div className="bg-black text-white relative w-full overflow-x-hidden min-h-screen">
      <PageHeader
        eyebrow="About Aleef Concepts"
        title="Kannur's Creative Digital Marketing & Branding Agency"
      
      />
   
      <About />
      <AboutMissionVision />
      <CoreValues />
      <WhyChooseUs />
      <WhyTrustUs />
 
    </div>
  );
}

