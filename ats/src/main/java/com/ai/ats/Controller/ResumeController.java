package com.ai.ats.Controller;

import com.ai.ats.Entity.Resume;
import com.ai.ats.Entity.User;
import com.ai.ats.Repository.ResumeRepository;
import com.ai.ats.Repository.UserRepository;
import com.ai.ats.Service.PdfService;
import com.ai.ats.Service.ResumeAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private ResumeAIService aiService;

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId
    ) {
        try {
            System.out.println("=== RESUME UPLOAD STARTED ===");

            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            // ✅ GET USER
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // ✅ EXTRACT TEXT FROM PDF
            System.out.println("Extracting text from PDF...");
            String resumeText = pdfService.extractText(file);
            System.out.println("Extracted text length: " + resumeText.length());

            // ✅ ANALYZE WITH AI
            System.out.println("Calling AI service...");
            String aiResponse = aiService.analyze(resumeText);
            System.out.println("AI Response: " + aiResponse);

            // ✅ EXTRACT ATS SCORE FROM AI RESPONSE
            int atsScore = extractScore(aiResponse);
            System.out.println("Extracted ATS Score: " + atsScore);

            // ✅ CREATE RESUME ENTITY
            Resume resume = new Resume();
            resume.setFileName(file.getOriginalFilename());
            resume.setFileData(file.getBytes());
            resume.setUser(user);
            resume.setAiScore(atsScore);
            resume.setFeedback(aiResponse);

            Resume savedResume = resumeRepository.save(resume);
            System.out.println("Resume saved with ID: " + savedResume.getId());

            // ✅ RETURN RESPONSE
            return ResponseEntity.ok(new ResumeUploadResponse(
                    savedResume.getId(),
                    "Resume uploaded and analyzed successfully",
                    atsScore
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ErrorResponse(
                    "Upload failed: " + e.getMessage()
            ));
        }
    }

    // ✅ EXTRACT SCORE FROM AI RESPONSE
    private int extractScore(String aiResponse) {
        try {
            // Look for patterns like "ATS Score: 75" or "Score: 75"
            Pattern pattern = Pattern.compile("(?:ATS\\s+)?Score:\\s*(\\d+)", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(aiResponse);

            if (matcher.find()) {
                int score = Integer.parseInt(matcher.group(1));
                // Ensure score is between 0-100
                return Math.min(100, Math.max(0, score));
            }

            // If no score found, return default
            System.out.println("WARNING: Could not extract score from AI response");
            return 50; // Default score

        } catch (Exception e) {
            System.err.println("Error extracting score: " + e.getMessage());
            return 50;
        }
    }

    // ✅ DOWNLOAD ENDPOINT
    @GetMapping("/download/{resumeId}")
    public ResponseEntity<byte[]> downloadResume(@PathVariable Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resume.getFileName() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resume.getFileData());
    }

    // ✅ RESPONSE CLASSES
    static class ResumeUploadResponse {
        private Long id;
        private String message;
        private int atsScore;

        public ResumeUploadResponse(Long id, String message, int atsScore) {
            this.id = id;
            this.message = message;
            this.atsScore = atsScore;
        }

        public Long getId() {
            return id;
        }

        public String getMessage() {
            return message;
        }

        public int getAtsScore() {
            return atsScore;
        }
    }

    static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }
    }
}