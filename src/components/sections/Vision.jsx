import React from 'react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import IconBox from '../common/IconBox';
import { missionVisionData } from '../../data/content';

export default function Vision() {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Card className="glass-card p-10 sm:p-14 rounded-3xl border-white/20">
          <IconBox icon="Globe" variant="bw" size="lg" className="mb-6" />
          <SectionHeading
            eyebrow={missionVisionData.vision.eyebrow}
            title={missionVisionData.vision.title}
            centered={true}
          />
          <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-2xl mx-auto">
            {missionVisionData.vision.description}
          </p>
        </Card>
      </div>
    </section>
  );
}
