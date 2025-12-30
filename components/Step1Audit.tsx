
import React from 'react';
import { StudentProfile } from '../types';

interface Props {
  profile: StudentProfile;
  setProfile: (p: StudentProfile) => void;
  onNext: () => void;
}

export const Step1Audit: React.FC<Props> = ({ profile, setProfile, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <div className="flex items-start gap-6 mb-16">
        <div className="w-1 h-14 bg-blue-600 rounded-full mt-1"></div>
        <div>
          <h2 className="text-4xl font-black text-white mb-2">Step 1: The Audit</h2>
          <p className="text-slate-400 font-medium">Be honest. If you lie here, the analysis is worthless.</p>
        </div>
      </div>

      <div className="space-y-10">
        <section>
          <label className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">
            <i className="fa-solid fa-book-open text-[10px]"></i> Education Level & Field
          </label>
          <input
            name="education"
            value={profile.education}
            onChange={handleChange}
            placeholder="e.g. Junior CS Major at Tier-2 State University"
            className="w-full bg-[#0F172A] border border-slate-800 rounded px-5 py-4 text-slate-200 focus:border-blue-500 transition-all placeholder:text-slate-700"
          />
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <label className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">
              <i className="fa-solid fa-graduation-cap text-[10px]"></i> GPA
            </label>
            <input
              type="number"
              name="gpa"
              step="0.01"
              value={profile.gpa}
              onChange={handleChange}
              className="w-full bg-[#0F172A] border border-slate-800 rounded px-5 py-4 text-slate-200 focus:border-blue-500 transition-all mono"
            />
          </section>
          <section>
            <label className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">
              Scale
            </label>
            <div className="relative">
              <select
                name="gpaScale"
                value={profile.gpaScale}
                onChange={handleChange}
                className="w-full bg-[#0F172A] border border-slate-800 rounded px-5 py-4 text-slate-200 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="4.0">4.0 Scale</option>
                <option value="5.0">5.0 Scale</option>
                <option value="10.0">10.0 Scale</option>
                <option value="100.0">Percentage (100)</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none text-xs"></i>
            </div>
          </section>
        </div>

        <section>
          <label className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">
            <i className="fa-solid fa-code text-[10px]"></i> Technical Stack
          </label>
          <input
            name="technicalSkills"
            value={profile.technicalSkills.join(', ')}
            onChange={(e) => setProfile({...profile, technicalSkills: e.target.value.split(',').map(s => s.trim())})}
            placeholder="e.g. Python (pandas, pytorch), React, TypeScript"
            className="w-full bg-[#0F172A] border border-slate-800 rounded px-5 py-4 text-slate-200 focus:border-blue-500 transition-all placeholder:text-slate-700"
          />
        </section>

        <section>
          <label className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">
            <i className="fa-solid fa-user-gear text-[10px]"></i> Key Projects & Research
          </label>
          <textarea
            name="experienceText"
            value={profile.experienceText}
            onChange={handleChange}
            rows={6}
            placeholder="Describe your 1-2 most impressive outputs. 'Built a todo app' receives 0 points."
            className="w-full bg-[#0F172A] border border-slate-800 rounded px-5 py-4 text-slate-200 focus:border-blue-500 transition-all resize-none leading-relaxed placeholder:text-slate-700"
          />
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <label className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">
              <i className="fa-solid fa-crosshairs text-[10px]"></i> Primary Career Goal
            </label>
            <input
              name="primaryGoal"
              value={profile.primaryGoal}
              onChange={handleChange}
              placeholder="e.g. Quant Analyst, ML Engineer"
              className="w-full bg-[#0F172A] border border-slate-800 rounded px-5 py-4 text-slate-200 focus:border-blue-500 transition-all placeholder:text-slate-700"
            />
            <p className="mt-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest">Specify your main target role/discipline.</p>
          </section>
          <section>
            <label className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">
              <i className="fa-solid fa-location-dot text-[10px]"></i> Geographic Constraints
            </label>
            <input
              name="geographicConstraints"
              value={profile.geographicConstraints}
              onChange={handleChange}
              placeholder="e.g. Remote only, NYC, Bay Area"
              className="w-full bg-[#0F172A] border border-slate-800 rounded px-5 py-4 text-slate-100 focus:border-blue-500 transition-all placeholder:text-slate-700"
            />
          </section>
        </div>

        <button
          onClick={onNext}
          className="w-full py-5 mt-8 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.4em] rounded transition-all active:scale-[0.98] text-[13px]"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};
