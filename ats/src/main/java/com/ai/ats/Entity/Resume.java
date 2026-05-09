package com.ai.ats.Entity;

import jakarta.persistence.*;

@Entity
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    // 🔥 IMPORTANT: can store large AI feedback
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String feedback;

    private int aiScore;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 🔥 IMPORTANT: can store PDF bytes
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] fileData;

    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public int getAiScore() {
        return aiScore;
    }

    public void setAiScore(int aiScore) {
        this.aiScore = aiScore;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }
}
