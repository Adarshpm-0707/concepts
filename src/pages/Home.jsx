import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Services from "../components/sections/Services";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <div className="bg-black text-white relative w-full overflow-x-hidden">
      <Hero />
      <About isHomePage={true} />
      <WhyChooseUs />
      <Services />
      <FAQ />
      <Contact />
    </div>
  );
}
