
export interface StudentProfile {
  education: string;
  primaryGoal: string;
  geographicConstraints: string;
  technicalSkills: string[];
  gpa: number;
  gpaScale: number;
  experienceText: string;
}

export interface InternshipListing {
  id: string;
  role: string;
  company: string;
  requiredSkills: string[];
  description: string;
  rawText?: string;
}

export interface InternshipAnalysis {
  role: string;
  company: string;
  skill_match: number;
  credibility: number;
  acceptance_probability: number;
  career_impact: number;
  roi: number;
  classification: "Strong Apply" | "Apply Only If Low Effort" | "Not Worth Your Time";
  reasons: string[];
  risks: string[];
  hard_verdict: string;
}

export interface EngineResult {
  profile_summary: string;
  internships: InternshipAnalysis[];
}
