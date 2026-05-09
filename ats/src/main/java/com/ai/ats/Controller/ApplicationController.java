package com.ai.ats.Controller;

import com.ai.ats.Entity.*;
import com.ai.ats.Repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final JobRepository jobRepo;
    private final UserRepository userRepo;
    private final ResumeRepository resumeRepo;
    private final JobApplicationRepository appRepo;

    public ApplicationController(JobRepository jobRepo,
                                 UserRepository userRepo,
                                 ResumeRepository resumeRepo,
                                 JobApplicationRepository appRepo) {
        this.jobRepo = jobRepo;
        this.userRepo = userRepo;
        this.resumeRepo = resumeRepo;
        this.appRepo = appRepo;
    }

    // =======================
    // Candidate applies job
    // =======================
    @PostMapping("/apply")
    public ResponseEntity<?> applyJob(@RequestParam Long jobId,
                                      @RequestParam Long userId,
                                      @RequestParam Long resumeId) {
        try {
            // ✅ CHECK IF ALREADY APPLIED
            if (appRepo.existsByJobIdAndUserId(jobId, userId)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Already applied to this job");
                return ResponseEntity.badRequest().body(error);
            }

            // ✅ FETCH ENTITIES WITH PROPER ERROR HANDLING
            Job job = jobRepo.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));

            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

            Resume resume = resumeRepo.findById(resumeId)
                    .orElseThrow(() -> new RuntimeException("Resume not found with id: " + resumeId));

            // ✅ CREATE APPLICATION
            JobApplication app = new JobApplication();
            app.setJob(job);
            app.setUser(user);
            app.setResume(resume);
            app.setAiScore(resume.getAiScore());
            app.setStatus("APPLIED");

            JobApplication savedApp = appRepo.save(app);

            // ✅ RETURN SUCCESS RESPONSE
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Application submitted successfully");
            response.put("applicationId", savedApp.getId());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace(); // ✅ LOG THE ERROR

            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // =======================
    // HR: View applicants per job
    // =======================
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicants(@PathVariable Long jobId) {
        try {
            List<JobApplication> applications = appRepo.findByJobId(jobId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // =======================
    // Candidate: View applied jobs
    // =======================
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getAppliedJobs(@PathVariable Long userId) {
        try {
            List<JobApplication> applications = appRepo.findByUserId(userId);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // =======================
    // HR: Update application status
    // =======================
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
                                          @RequestParam String status) {
        try {
            JobApplication app = appRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            app.setStatus(status);
            JobApplication updatedApp = appRepo.save(app);

            return ResponseEntity.ok(updatedApp);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // =======================
    // HR: Get dashboard stats
    // =======================
    @GetMapping("/hr/{hrId}/stats")
    public ResponseEntity<?> getHrStats(@PathVariable Long hrId) {
        try {
            // Find HR
            User hr = userRepo.findById(hrId)
                    .orElseThrow(() -> new RuntimeException("HR not found"));

            // Jobs posted: Count jobs by HR
            long jobsPosted = jobRepo.countByHr(hr);

            // Total applicants: Count applications for HR's jobs
            List<Job> hrJobs = jobRepo.findByHr(hr);
            long totalApplicants = hrJobs.stream()
                    .mapToLong(job -> appRepo.countByJobId(job.getId()))
                    .sum();

            // Hired: Count applications with status "HIRED" for HR's jobs
            long hired = hrJobs.stream()
                    .mapToLong(job -> appRepo.countByJobIdAndStatus(job.getId(), "HIRED"))
                    .sum();

            Map<String, Long> stats = new HashMap<>();
            stats.put("jobsPosted", jobsPosted);
            stats.put("totalApplicants", totalApplicants);
            stats.put("hired", hired);

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // =======================
    // HR: Get recent notifications
    // =======================
    @GetMapping("/hr/{hrId}/notifications")
    public ResponseEntity<?> getHrNotifications(@PathVariable Long hrId) {
        try {
            // Find HR
            User hr = userRepo.findById(hrId)
                    .orElseThrow(() -> new RuntimeException("HR not found"));

            // Get HR's jobs
            List<Job> hrJobs = jobRepo.findByHr(hr);

            // Fetch recent applications (last 10, ordered by date descending)
            List<JobApplication> recentApps = hrJobs.stream()
                    .flatMap(job -> appRepo.findTop10ByJobOrderByIdDesc(job).stream())
                    .limit(10)
                    .collect(Collectors.toList());

            // Format as notifications
            List<Map<String, Object>> notifications = recentApps.stream()
                    .map(app -> {
                        Map<String, Object> notif = new HashMap<>();
                        notif.put("id", app.getId());
                        notif.put("message", "New applicant for " + app.getJob().getTitle());
                        notif.put("read", false); // Assume unread for simplicity
                        return notif;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}