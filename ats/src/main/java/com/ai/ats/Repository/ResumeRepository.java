package com.ai.ats.Repository;

import com.ai.ats.Entity.Resume;
import com.ai.ats.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume,Long> {
    List<Resume> findByUser(User user);
}
