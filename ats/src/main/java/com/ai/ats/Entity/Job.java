package com.ai.ats.Entity;

import com.ai.ats.Entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String skills;
    private String experience;
    private String location;
    private String salary;

    @ManyToOne
    @JoinColumn(name = "hr_id")
    private User hr;

    // Cascade relationship to JobApplication
    // orphanRemoval = true ensures that when a job is deleted, all its applications are also deleted
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevent infinite recursion when serializing to JSON
    private List<JobApplication> applications;

    // ===== CONSTRUCTORS =====

    public Job() {
    }

    public Job(String title, String description, String skills, String experience, String location, String salary) {
        this.title = title;
        this.description = description;
        this.skills = skills;
        this.experience = experience;
        this.location = location;
        this.salary = salary;
    }

    // ===== GETTERS =====

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getSkills() {
        return skills;
    }

    public String getExperience() {
        return experience;
    }

    public String getLocation() {
        return location;
    }

    public String getSalary() {
        return salary;
    }

    public User getHr() {
        return hr;
    }

    public List<JobApplication> getApplications() {
        return applications;
    }

    // ===== SETTERS =====

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public void setHr(User hr) {
        this.hr = hr;
    }

    public void setApplications(List<JobApplication> applications) {
        this.applications = applications;
    }
}