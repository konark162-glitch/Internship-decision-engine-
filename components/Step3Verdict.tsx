
import React from 'react';
import { EngineResult, InternshipAnalysis } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface Props {
  result: EngineResult;
  onReset: () => void;
}

export const Step3Verdict: React.FC<Props> = ({ result, onReset }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
        <div>
          <h2 className="text-5xl font-black text-white mb-2">The Verdict</h2>
          <p className="text-slate-400 font-medium">Strict analysis completed.</p>
        </div>
        <button onClick={onReset} className="text-xs font-bold text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
          Run New Analysis
        </button>
      </div>

      <div className="space-y-16">
        {result.internships.map((analysis, idx) => (
          <VerdictCard key={idx} analysis={analysis} />
        ))}
      </div>
    </div>
  );
};

const VerdictCard: React.FC<{ analysis: InternshipAnalysis }> = ({ analysis }) => {
  const radarData = [
    { subject: 'Skill', A: analysis.skill_match },
    { subject: 'Cred', A: analysis.credibility },
    { subject: 'Accept', A: analysis.acceptance_probability },
    { subject: 'Impact', A: analysis.career_impact },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Strong Apply') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (status === 'Apply Only If Low Effort') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="bg-[#0B1121] border border-slate-800 rounded-lg overflow-hidden relative shadow-2xl">
      {/* Visual Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600/30"></div>

      <div className="p-10 border-b border-slate-800/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-3xl font-bold text-white flex items-center gap-4 uppercase tracking-tight">
            {analysis.company} {analysis.role}
            <i className="fa-solid fa-pen text-xs text-slate-700 cursor-pointer hover:text-slate-400"></i>
          </h3>
        </div>
        <div className="flex items-center gap-5">
          <span className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest border ${getStatusColor(analysis.classification)}`}>
            {analysis.classification}
          </span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mono">
            ROI: {Math.round(analysis.roi * 10)}/100
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-800/50">
        {/* Visualization & Metric Boxes */}
        <div className="lg:w-1/3 p-10 bg-[#070B14]/30">
          <div className="w-full h-56 mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }} />
                <Radar
                  name="Metrics"
                  dataKey="A"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MetricBox label="SKILL MATCH" score={analysis.skill_match} color="text-amber-500" />
            <MetricBox label="CREDIBILITY" score={analysis.credibility} color="text-emerald-500" />
            <MetricBox label="ACCEPTANCE" score={analysis.acceptance_probability} color="text-red-500" />
            <MetricBox label="IMPACT" score={analysis.career_impact} color="text-emerald-500" />
          </div>
        </div>

        {/* Tactical Content */}
        <div className="lg:w-2/3 p-10 space-y-12">
          <div>
            <h4 className="flex items-center gap-3 text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-6">
              <i className="fa-solid fa-chart-line"></i> Why This Matters
            </h4>
            <ul className="space-y-4">
              {analysis.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-slate-300 leading-relaxed font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-3 text-xs font-black text-amber-500 uppercase tracking-[0.2em] mb-6">
              <i className="fa-solid fa-triangle-exclamation"></i> Risks & Rejection Factors
            </h4>
            <div className="bg-[#020617] p-6 rounded-lg border border-amber-500/10 text-sm text-amber-500/60 leading-relaxed italic font-medium">
              {analysis.risks.join(" ")}
            </div>
          </div>

          <div className="pt-10 border-t border-slate-800/50">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] block mb-4">Hard Verdict</span>
            <p className="text-2xl font-bold text-amber-400 mono leading-relaxed tracking-tight">
              "{analysis.hard_verdict}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, score, color }: { label: string, score: number, color: string }) => (
  <div className="bg-[#020617] border border-slate-800 p-5 rounded-md text-center">
    <div className={`text-2xl font-black mb-1 mono ${color}`}>{score}/10</div>
    <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{label}</div>
  </div>
);
