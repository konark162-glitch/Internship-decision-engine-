
import React, { useState } from 'react';
import { StudentProfile, InternshipListing, EngineResult } from './types';
import { Step1Audit } from './components/Step1Audit';
import { Step2Targets } from './components/Step2Targets';
import { Step3Verdict } from './components/Step3Verdict';
import { analyzeInternships } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<StudentProfile>({
    education: '',
    primaryGoal: '',
    geographicConstraints: '',
    technicalSkills: [],
    gpa: 0.01,
    gpaScale: 10.0,
    experienceText: ''
  });

  const [listings, setListings] = useState<InternshipListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EngineResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRunAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeInternships(profile, listings);
      setResult(data);
      setStep(3);
    } catch (err: any) {
      console.error(err);
      setError("Analysis protocol interrupted. Verify input data integrity.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#E2E8F0]">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-900 bg-[#020617]/95 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="text-slate-500 hover:text-white transition-colors mr-2"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            )}
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <i className="fa-solid fa-terminal text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest uppercase">INTERNSHIP DECISION COPILOT</h1>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold mono">
                <span>V1.0.0</span>
                <span>//</span>
                <span>STRICT MODE: ACTIVE</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mono">
            STEP {step}/3
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {step === 1 && (
          <Step1Audit 
            profile={profile} 
            setProfile={setProfile} 
            onNext={() => setStep(2)} 
          />
        )}

        {step === 2 && (
          <Step2Targets 
            listings={listings} 
            setListings={setListings} 
            onBack={() => setStep(1)}
            onRun={handleRunAnalysis}
            loading={loading}
          />
        )}

        {step === 3 && result && (
          <Step3Verdict 
            result={result} 
            onReset={reset} 
          />
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-950/20 border border-red-900/30 text-red-400 rounded-lg text-center text-xs font-mono">
            {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
