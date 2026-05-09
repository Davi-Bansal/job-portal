package com.ai.ats.Service;

import org.springframework.stereotype.Service;

@Service
public class ResumeAIService {

    private final OllamaService ollama;

    public ResumeAIService(OllamaService ollama) {
        this.ollama = ollama;
    }

    public String analyze(String resumeText) {

        // ✅ LIMIT RESUME TEXT TO PREVENT TOKEN OVERFLOW
        String limitedText = resumeText.length() > 3000
                ? resumeText.substring(0, 3000) + "..."
                : resumeText;

        String prompt = """
You are an ATS (Applicant Tracking System).

Analyze this resume and provide feedback.

IMPORTANT: You MUST start your response with "ATS Score: X" where X is a number from 0-100.

Format your response EXACTLY like this:

ATS Score: 75

Strengths:
- Strong technical skills
- Clear work experience

Weaknesses:
- Missing specific achievements
- Could improve formatting

Decision: Hire

Resume Content:
%s
""".formatted(limitedText);

        try {
            String aiResponse = ollama.ask(prompt);

            // ✅ ENSURE RESPONSE HAS SCORE
            if (!aiResponse.toLowerCase().contains("ats score:") &&
                    !aiResponse.toLowerCase().contains("score:")) {
                return "ATS Score: 60\n\n" + aiResponse;
            }

            return aiResponse;

        } catch (Exception e) {
            System.err.println("AI Analysis failed: " + e.getMessage());

            // ✅ FALLBACK RESPONSE
            return """
ATS Score: 60

Strengths:
- Resume uploaded successfully

Weaknesses:
- AI analysis temporarily unavailable

Decision: Manual Review Required

Note: This is a fallback response due to AI service unavailability.
""";
        }
    }
}