package com.ai.ats.Controller;

import com.ai.ats.Entity.Job;
import com.ai.ats.Entity.User;
import com.ai.ats.Repository.JobRepository;
import com.ai.ats.Repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
// @CrossOrigin(origins = "http://localhost:5173")  // Uncomment if needed
public class JobController {

    private final JobRepository jobRepo;
    private final UserRepository userRepo;

    public JobController(JobRepository jobRepo, UserRepository userRepo) {
        this.jobRepo = jobRepo;
        this.userRepo = userRepo;
    }

    // HR creates job
    @PostMapping("/create")
    public ResponseEntity<?> createJob(@RequestBody Job job,
                                       @RequestParam Long hrId) {
        try {
            User hr = userRepo.findById(hrId)
                    .orElseThrow(() -> new RuntimeException("HR not found"));

            job.setHr(hr);
            Job savedJob = jobRepo.save(job);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Job created successfully");
            response.put("job", savedJob);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // Users view all jobs
    @GetMapping
    public ResponseEntity<?> getAllJobs() {
        try {
            List<Job> jobs = jobRepo.findAll();
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // HR dashboard
    @GetMapping("/hr/{hrId}")
    public ResponseEntity<?> getJobsByHr(@PathVariable Long hrId) {
        try {
            User hr = userRepo.findById(hrId)
                    .orElseThrow(() -> new RuntimeException("HR not found"));

            List<Job> jobs = jobRepo.findByHr(hr);
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // Optional: Get single job
    @GetMapping("/{id}")
    public ResponseEntity<?> getJob(@PathVariable Long id) {
        try {
            Job job = jobRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Job not found"));
            return ResponseEntity.ok(job);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // HR updates job (only if they own it)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable Long id,
                                       @RequestBody Job updatedJob,
                                       @RequestParam Long hrId) {
        try {
            // Find the HR user
            User currentHr = userRepo.findById(hrId)
                    .orElseThrow(() -> new RuntimeException("HR not found with id: " + hrId));

            // Find the existing job
            Job existingJob = jobRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));

            // Check if the job has an HR assigned
            if (existingJob.getHr() == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Job has no assigned HR");
                return ResponseEntity.status(400).body(error);
            }

            // Check if the current HR owns the job
            if (!existingJob.getHr().getId().equals(currentHr.getId())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized: You can only edit your own jobs");
                return ResponseEntity.status(403).body(error);
            }

            // Update fields (only non-null values to avoid overwriting with null)
            if (updatedJob.getTitle() != null) existingJob.setTitle(updatedJob.getTitle());
            if (updatedJob.getDescription() != null) existingJob.setDescription(updatedJob.getDescription());
            if (updatedJob.getSkills() != null) existingJob.setSkills(updatedJob.getSkills());
            if (updatedJob.getExperience() != null) existingJob.setExperience(updatedJob.getExperience());
            if (updatedJob.getLocation() != null) existingJob.setLocation(updatedJob.getLocation());
            if (updatedJob.getSalary() != null) existingJob.setSalary(updatedJob.getSalary());

            Job savedJob = jobRepo.save(existingJob);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Job updated successfully");
            response.put("job", savedJob);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log the full error for debugging
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Internal server error: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // HR deletes job (only if they own it)
    @DeleteMapping("/{id}")
    @Transactional // Ensures atomic operation, especially if cascading deletes are needed
    public ResponseEntity<?> deleteJob(@PathVariable Long id,
                                       @RequestParam Long hrId) {
        try {
            // Find the HR user
            User currentHr = userRepo.findById(hrId)
                    .orElseThrow(() -> new RuntimeException("HR not found with id: " + hrId));

            // Find the existing job
            Job existingJob = jobRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));

            // Check if the job has an HR assigned
            if (existingJob.getHr() == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Job has no assigned HR");
                return ResponseEntity.status(400).body(error);
            }

            // Check if the current HR owns the job
            if (!existingJob.getHr().getId().equals(currentHr.getId())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized: You can only delete your own jobs");
                return ResponseEntity.status(403).body(error);
            }

            // Delete the job (if you have cascading deletes configured in the entity, it will handle related records)
            jobRepo.delete(existingJob);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Job deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log the full error for debugging
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Internal server error: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}