package com.ai.ats.Repository;

import com.ai.ats.Entity.Job;
import com.ai.ats.Entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    // Find all applications for a specific job
    List<JobApplication> findByJobId(Long jobId);

    // Check if user already applied to a job
    boolean existsByJobIdAndUserId(Long jobId, Long userId);

    // Find all applications by a specific user
    List<JobApplication> findByUserId(Long userId);

    // Count total applications for a specific job
    long countByJobId(Long jobId);

    // Count applications for a specific job with a specific status (e.g., "HIRED")
    long countByJobIdAndStatus(Long jobId, String status);

    // Find top 10 most recent applications for a specific job (ordered by ID descending)
    List<JobApplication> findTop10ByJobOrderByIdDesc(Job job);
}