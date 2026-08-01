import React from 'react';
import PageHeader from '../components/common/PageHeader';
import About from '../components/sections/About';
import Mission from '../components/sections/Mission';
import Vision from '../components/sections/Vision';
import CoreValues from '../components/sections/CoreValues';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import WhyTrustUs from '../components/sections/WhyTrustUs';
import CTA from '../components/sections/CTA';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Aleef Concepts"
        title="Kannur's Premier Digital Marketing & Branding Agency"
        subtitle="Learn how Aleef Concepts became Kannur's #1 digital marketing office, empowering local and international businesses with data-driven strategy and creative excellence."
      />
      <About />
      <Mission />
      <Vision />
      <CoreValues />
      <WhyChooseUs />
      <WhyTrustUs />
      <CTA />
    </>
  );
}
