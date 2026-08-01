import React from 'react';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import Industries from '../components/sections/Industries';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';

export default function ServicesPage() {
  return (
    <>
      <Services />
      <Process />
      <Industries />
      <FAQ />
      <CTA />
    </>
  );
}
