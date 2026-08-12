import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';
import Industries from '../components/sections/Industries';
import FAQ from '../components/sections/FAQ';
import { servicesData } from '../data/content';

export default function ServicesPage() {
  return (
    <div className="bg-black text-white relative w-full overflow-x-hidden min-h-screen">
      <PageHeader
      
        title={servicesData.title}
        subtitle={servicesData.subtitle}
      />
      <Services showHeader={false} />
      <Process />
      <Industries />
      <FAQ />
    </div>
  );
}
