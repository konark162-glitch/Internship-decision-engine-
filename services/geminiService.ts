
import { GoogleGenAI, Type } from "@google/genai";
import { StudentProfile, InternshipListing, EngineResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are a deterministic internship decision engine.
Your job is NOT to brainstorm, speculate, or creatively judge.
Your job is to execute a fixed scoring rubric and return reproducible decisions.

CORE PRINCIPLE:
You do NOT "decide" freely. You apply rules.

INPUTS:
1. Student Profile
2. Internship Listings (may be raw text)

STEP 1: NORMALIZATION
- Normalized_GPA = (GPA / GPA_Scale) × 10 (Round to 1 decimal).

STEP 2: EXTRACTION
- If raw text is provided for an internship, extract the Role, Company, and Key Required Skills first.

STEP 3: FIXED SCORING RUBRIC
A. Skill Match Score (0–10): (|A ∩ B| / |A|) × 10. Round to 1 decimal. (If |A|=0 -> 5.0)
B. Credibility Score: Tier-1 (Big Tech/Labs): 9, Tier-2 (Established): 7, Tier-3 (Unknown/Startups): 5, Unverifiable: 3.
C. Acceptance Probability:
   - If Skill_Match >= 8 AND Normalized_GPA >= 7 -> 8
   - Else if Skill_Match >= 6 -> 6
   - Else if Skill_Match >= 4 -> 4
   - Else -> 2
D. Career Impact: Directly aligned: 9, Partially: 6, Weakly: 3, Not: 1.

STEP 4: ROI = (0.30 * Skill_Match) + (0.25 * Credibility) + (0.25 * Acceptance_Probability) + (0.20 * Career_Impact).

STEP 5: VERDICT
- Produce a "hard_verdict" string which is a blunt, realistic assessment. No corporate fluff.
`;

export const analyzeInternships = async (
  profile: StudentProfile,
  listings: InternshipListing[]
): Promise<EngineResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const prompt = `
  Analyze profile against listings.
  
  Profile:
  - Education: ${profile.education}
  - Goal: ${profile.primaryGoal}
  - Skills: ${profile.technicalSkills.join(", ")}
  - GPA: ${profile.gpa}/${profile.gpaScale}
  - Constraints: ${profile.geographicConstraints}
  - Projects: ${profile.experienceText}

  Listings:
  ${listings.map((l, i) => `
  Listing ${i + 1}:
  - Provided Role: ${l.role}
  - Provided Company: ${l.company}
  - Raw Text Data: ${l.rawText || l.description}
  `).join("\n")}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          profile_summary: { type: Type.STRING },
          internships: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                company: { type: Type.STRING },
                skill_match: { type: Type.NUMBER },
                credibility: { type: Type.NUMBER },
                acceptance_probability: { type: Type.NUMBER },
                career_impact: { type: Type.NUMBER },
                roi: { type: Type.NUMBER },
                classification: { type: Type.STRING },
                reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
                risks: { type: Type.ARRAY, items: { type: Type.STRING } },
                hard_verdict: { type: Type.STRING }
              },
              required: ["role", "company", "skill_match", "credibility", "acceptance_probability", "career_impact", "roi", "classification", "reasons", "risks", "hard_verdict"]
            }
          }
        }
      }
    },
  });

  return JSON.parse(response.text);
};
