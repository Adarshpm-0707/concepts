import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Services from '../components/sections/Services';
import PortfolioIntro from '../components/sections/PortfolioIntro';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <Services />
      <PortfolioIntro />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
}
