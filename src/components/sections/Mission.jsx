import React from 'react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import IconBox from '../common/IconBox';
import { missionVisionData } from '../../data/content';

export default function Mission() {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Card className="glass-card-bw p-10 sm:p-14 rounded-3xl">
          <IconBox icon="Target" variant="bw" size="lg" className="mb-6" />
          <SectionHeading
            eyebrow={missionVisionData.mission.eyebrow}
            title={missionVisionData.mission.title}
            centered={true}
          />
          <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-2xl mx-auto">
            {missionVisionData.mission.description}
          </p>
        </Card>
      </div>
    </section>
  );
}
