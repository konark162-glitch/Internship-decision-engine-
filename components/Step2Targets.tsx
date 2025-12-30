
import React, { useState } from 'react';
import { InternshipListing } from '../types';

interface Props {
  listings: InternshipListing[];
  setListings: (l: InternshipListing[]) => void;
  onBack: () => void;
  onRun: () => void;
  loading: boolean;
}

export const Step2Targets: React.FC<Props> = ({ listings, setListings, onBack, onRun, loading }) => {
  const [pasteBuffer, setPasteBuffer] = useState('');

  const handleAdd = () => {
    if (!pasteBuffer.trim()) return;
    const newListing: InternshipListing = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'Extracting...',
      company: 'Wait...',
      requiredSkills: [],
      description: 'Pending analysis...',
      rawText: pasteBuffer
    };
    setListings([...listings, newListing]);
    setPasteBuffer('');
  };

  const removeListing = (id: string) => {
    setListings(listings.filter(l => l.id !== id));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-6 mb-16">
        <div className="w-1 h-14 bg-amber-500 rounded-full mt-1"></div>
        <div>
          <h2 className="text-4xl font-black text-white mb-2">Step 2: The Targets</h2>
          <p className="text-slate-400 font-medium leading-relaxed">Paste the job description in full text. We'll extract the role, requirements, and description automatically.</p>
        </div>
      </div>

      <div className="bg-[#0B1121] border border-slate-800 rounded-lg p-8 mb-12">
        <label className="block text-xs font-bold text-slate-200 mb-4 uppercase tracking-widest">Paste Internship Description</label>
        <div className="border border-amber-600/30 rounded-lg overflow-hidden focus-within:border-amber-500 transition-colors">
          <textarea
            value={pasteBuffer}
            onChange={(e) => setPasteBuffer(e.target.value)}
            placeholder="Paste the full text of the JD here..."
            className="w-full bg-[#020617] text-slate-200 px-6 py-6 outline-none text-sm mono leading-relaxed h-48 resize-none placeholder:text-slate-800"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-[#1e293b]/50 hover:bg-[#1e293b] text-slate-400 py-4 text-xs font-black uppercase tracking-widest border-t border-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-plus text-[10px]"></i> Add to List
          </button>
        </div>
      </div>

      {listings.length > 0 && (
        <div className="space-y-4 mb-16">
          <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">Queue ({listings.length})</h4>
          {listings.map((l, i) => (
            <div key={l.id} className="bg-slate-900/30 border border-slate-800 p-6 rounded-lg flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <span className="text-slate-700 font-black mono text-xs">{i + 1}</span>
                <div>
                  <div className="text-white font-bold">{l.company === 'Wait...' ? 'Target Locked' : l.company}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{l.role === 'Extracting...' ? 'Pending Extraction' : l.role}</div>
                </div>
              </div>
              <button onClick={() => removeListing(l.id)} className="text-slate-800 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onRun}
        disabled={loading || listings.length === 0}
        className={`w-full py-7 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 font-black uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 text-sm ${
          !loading && listings.length > 0 ? 'hover:bg-blue-600 hover:border-blue-500 hover:text-white text-slate-400' : 'opacity-40 pointer-events-none'
        }`}
      >
        {loading ? (
          <>
            <i className="fa-solid fa-dna fa-spin text-blue-500"></i>
            ANALYZING...
          </>
        ) : (
          <>
            <i className="fa-solid fa-play text-xs"></i>
            RUN ANALYSIS
          </>
        )}
      </button>
    </div>
  );
};
