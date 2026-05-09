package com.ai.ats.Repository;

import com.ai.ats.Entity.Job;
import com.ai.ats.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Find all jobs created by a specific HR
    List<Job> findByHr(User hr);

    // Count total jobs created by a specific HR
    long countByHr(User hr);
}