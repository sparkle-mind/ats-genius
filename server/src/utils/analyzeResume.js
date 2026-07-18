// // utils/analyzeResume.js

// import ai from "../config/gemini.js";

// export const analyzeResumeATS = async (resumeText) => {
//   const prompt = `
// You are an ATS Resume Expert.

// Analyze this resume and return ONLY valid JSON.

// {
//   "score": number,
//   "strengths": [],
//   "weaknesses": [],
//   "missingKeywords": [],
//   "suggestions": []
// }

// Resume:

// ${resumeText}
// `;

//   const response = await ai.models.generateContent({
//     // model: "gemini-2.5-flash",
//      model: "gemini-2.0-flash",
//     contents: prompt,
//   });

//   return response.text;
// };

import openrouter from "../config/openrouter.js";

export const analyzeResumeATS = async (resumeText) => {
  const prompt = `
You are an ATS Resume Expert and Career Matchmaker.

TASK:
Analyze the resume and return a strict ATS evaluation.

OUTPUT RULE:
You MUST return ONLY a valid JSON object.
Do NOT include any text before or after JSON.
Do NOT use markdown.
Do NOT write explanations.
Do NOT write "Here is..." or any prefix.

STRICT JSON SCHEMA:
{
  "score": 0,
  "scoringStatus": "",
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "suggestions": [],
"inDemandSkills": [
  {
    "skill": "",
    "demandPercentage": 0
  }
],
  "topCompanies": [],
  "interviewPrep": {
    "guide": [],
    "developerProTip": "",
    "resources": [
      {
        "technology": "",
        "title": "",
        "platform": "",
        "url": "",
        "type": ""
      }
    ]
  },
   "aiMockInterview": {
    "sessionUrl": "",
  }
}

SCORING RULES:
- 0–20: very poor ATS match (missing structure, skills, keywords)
- 21–40: weak match (few relevant keywords, poor formatting)
- 41–60: average match (some relevant skills, moderate optimization)
- 61–80: strong match (good keyword coverage, relevant experience)
- 81–100: excellent ATS optimization (highly relevant + well structured)

RULES:
- score must be an integer between 0 and 100
- scoringStatus must be exactly one of:
  ["very poor", "weak", "average", "strong", "excellent"]

INTERVIEW PREP RULES:

Generate interview preparation based ONLY on the uploaded resume.

interviewPrep.guide:
- 5-8 practical interview preparation steps.
- Mention important technical concepts to revise.
- Mention behavioral interview preparation.
- Mention project discussion preparation.

developerProTip:
- One concise professional tip that can improve interview performance.


RESOURCES RULES:

Analyze ONLY the uploaded resume.

Extract all  skills mentioned in the resume.
  
Based on those extracted skills, generate 5-10 interview preparation resources that are directly relevant to the candidate.

Resources should focus on interview preparation rather than general tutorials whenever possible.

Examples of good resource titles:
- React Deep Dive Interview Questions
- Node.js Backend Interview Preparation
- JavaScript Coding Interview Practice
- Mock Frontend Developer Interview
- Behavioural Interview Mastery
- System Design for Backend Developers
- SQL Interview Questions
- REST API Interview Guide
- Live Coding Practice for React Developers
- Project Discussion Preparation for E-commerce Application

Each resource must include:

{
  "technology": "",
  "title": "",
  "platform": "",
  "url": "",
  "type": ""
}

Rules:
- Resources MUST be related to the uploaded resume.
- If the resume contains React and Node.js, recommend React/Node interview resources.
- If the resume contains Java + Spring Boot, recommend Spring Boot interview resources.
- If the resume contains Data Science, recommend Python, ML and SQL interview resources.
- If projects are mentioned, include resources on explaining projects during interviews.
- Include at least one behavioural interview resource.
- Include at least one mock interview or live coding practice resource.
- Prefer high-quality resources from YouTube, freeCodeCamp, Coursera, GeeksforGeeks, InterviewBit, NeetCode, Roadmap.sh, Microsoft Learn, AWS Skill Builder, or official documentation.
- Return real, working URLs whenever possible.

AI MOCK INTERVIEW RULES:

Generate an AI mock interview section for the candidate.

aiMockInterview:
- sessionUrl should contain the URL where the user starts the AI interview.

If an interview platform URL is not available, return:
"sessionUrl": "/ai-interview/start"

inDemandSkills RULES:
- Generate 5 to 10 currently in-demand skills based on the candidate's profile and current job market trends.
- Each skill must include an estimated market demand percentage.
- demandPercentage must be an integer between 0 and 100.
- The percentage represents how frequently this skill is requested in relevant job postings.
- Sort skills from highest demand percentage to lowest.
- Do not include random skills unrelated to the resume.

EXTRA REQUIREMENTS:
- inDemandSkills: 5 to 10 items based on current job market trends
- topCompanies: exactly 5 companies based on skill fit (NOT extracted from resume)
- suggestions: actionable improvements for ATS optimization
- missingKeywords: important missing industry keywords

IMPORTANT:
- You MUST NOT include any text outside JSON
- You MUST ensure JSON is always valid
- If unsure, still return best possible JSON

Resume:
${resumeText}
`;
  const completion = await openrouter.chat.completions.create({
    //   model: "meta-llama/llama-3.3-70b-instruct:free",
    model: "meta-llama/llama-3.1-8b-instruct",
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let content = completion.choices[0].message.content;

  content = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(content);
};
