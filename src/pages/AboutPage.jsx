import React from "react";
import PageHeader from "../components/common/PageHeader";

import About from "../components/sections/About";
import AboutMissionVision from "../components/sections/AboutMissionVision";
import WhyChooseUs from "../components/sections/WhyChooseUs";

export default function AboutPage() {
  return (
    <div className="bg-black text-white relative w-full overflow-x-hidden min-h-screen">
    
      <About />
      <AboutMissionVision />
      <WhyChooseUs />
    </div>
  );
}
