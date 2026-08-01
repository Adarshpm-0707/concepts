import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Kannur Office"
        title="Connect With Kannur's Best Digital Marketing Office"
        subtitle="Schedule an in-person strategy consultation at our Kannur office or connect with us online for your digital campaign proposal."
      />
      <Contact />
      <FAQ />
    </>
  );
}
