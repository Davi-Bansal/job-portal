import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import "../styles/CandidateProfile.css";
import "../styles/DarkMode.css";

export default function CandidateProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    bio: "",
    education: [],
    experience: [],
    skills: [],
    resumeUrl: "",
    jobPreferences: {
      desiredRole: "",
      desiredSalary: "",
      jobType: "",
      preferredLocations: [],
      willingToRelocate: false,
      noticePeriod: ""
    }
  });

  useEffect(() => {
    loadProfile();
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, [user?.id]);

  // Load profile from localStorage
  const loadProfile = () => {
    try {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData({...profileData, ...parsedProfile});
      }
    } catch (err) {
      console.error("Error loading profile from localStorage:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleNestedChange = (section, field, value) => {
    setProfileData({
      ...profileData,
      [section]: {
        ...profileData[section],
        [field]: value
      }
    });
  };

  // Save to localStorage instead of database
  const handleSaveProfile = () => {
    try {
      setIsSaving(true);
      
      // Simulate saving delay
      setTimeout(() => {
        // Save to localStorage
        localStorage.setItem(`profile_${user.id}`, JSON.stringify(profileData));
        
        setIsSaving(false);
        setIsEditing(false);
        
        // Show success alert
        setShowSuccessAlert(true);
        
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
      }, 500);
      
    } catch (err) {
      console.error("Error saving profile:", err);
      setIsSaving(false);
      alert("Failed to save profile. Please try again.");
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local URL for the file
      const fileUrl = URL.createObjectURL(file);
      
      setProfileData({ ...profileData, resumeUrl: fileUrl, resumeName: file.name });
      
      // Show success message
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  };

  const addEducation = () => {
    setProfileData({
      ...profileData,
      education: [
        ...profileData.education,
        { degree: "", institution: "", field: "", startDate: "", endDate: "", grade: "", description: "" }
      ]
    });
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...profileData.education];
    updatedEducation[index][field] = value;
    setProfileData({ ...profileData, education: updatedEducation });
  };

  const removeEducation = (index) => {
    setProfileData({
      ...profileData,
      education: profileData.education.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    setProfileData({
      ...profileData,
      experience: [
        ...profileData.experience,
        { title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" }
      ]
    });
  };

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...profileData.experience];
    updatedExperience[index][field] = value;
    setProfileData({ ...profileData, experience: updatedExperience });
  };

  const removeExperience = (index) => {
    setProfileData({
      ...profileData,
      experience: profileData.experience.filter((_, i) => i !== index)
    });
  };

  const addSkill = (skillName) => {
    if (skillName && !profileData.skills.includes(skillName)) {
      setProfileData({ ...profileData, skills: [...profileData.skills, skillName] });
    }
  };

  const removeSkill = (skillName) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(s => s !== skillName)
    });
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 0;

    const personalFields = ['name', 'email', 'phone', 'address', 'city', 'bio'];
    personalFields.forEach(field => {
      total++;
      if (profileData[field]) completed++;
    });

    total++;
    if (profileData.education && profileData.education.length > 0) completed++;

    total++;
    if (profileData.experience && profileData.experience.length > 0) completed++;

    total++;
    if (profileData.skills && profileData.skills.length >= 3) completed++;

    total++;
    if (profileData.resumeUrl) completed++;

    return Math.round((completed / total) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className={`profile-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        {/* SUCCESS ALERT */}
        {showSuccessAlert && (
          <div className="success-alert">
            <div className="alert-content">
              <span className="alert-icon">✅</span>
              <span className="alert-message">Profile saved successfully!</span>
            </div>
          </div>
        )}

        <div className="profile-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate('/candidate/dashboard')}>
              ← Back to Dashboard
            </button>
            <h1>My Profile</h1>
          </div>
          <div className="header-actions">
            <button className="icon-btn" onClick={toggleDarkMode}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <LogoutButton />
          </div>
        </div>

        <div className="profile-completion-card">
          <div className="completion-header">
            <h3>Profile Completion</h3>
            <span className="completion-percentage">{profileCompletion}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${profileCompletion}%`,
                backgroundColor: profileCompletion >= 80 ? '#10b981' : profileCompletion >= 50 ? '#f59e0b' : '#ef4444'
              }}
            ></div>
          </div>
          <p className="completion-message">
            {profileCompletion === 100 
              ? "🎉 Your profile is complete!" 
              : profileCompletion >= 80 
              ? "Almost there! Complete your profile to get better job matches."
              : "Complete your profile to stand out to employers."}
          </p>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            👤 Personal Info
          </button>
          <button 
            className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            🎓 Education
          </button>
          <button 
            className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            💼 Experience
          </button>
          <button 
            className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            🛠️ Skills
          </button>
          <button 
            className={`tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            📄 Resume
          </button>
          <button 
            className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            ⚙️ Preferences
          </button>
        </div>

        <div className="action-bar">
          {!isEditing ? (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "💾 Save Changes"}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setIsEditing(false);
                  loadProfile();
                }}
              >
                ❌ Cancel
              </button>
            </div>
          )}
        </div>

        <div className="tab-content">
          {activeTab === 'personal' && (
            <div className="personal-info-section">
              <h2>Personal Information</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" value={profileData.name} onChange={handleInputChange} disabled={!isEditing} placeholder="John Doe" />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={profileData.email} onChange={handleInputChange} disabled={!isEditing} placeholder="john.doe@example.com" />
                </div>

                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} disabled={!isEditing} placeholder="+1 (555) 123-4567" />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleInputChange} disabled={!isEditing} />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={profileData.gender} onChange={handleInputChange} disabled={!isEditing}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <input type="text" name="address" value={profileData.address} onChange={handleInputChange} disabled={!isEditing} placeholder="123 Main St, Apt 4B" />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" value={profileData.city} onChange={handleInputChange} disabled={!isEditing} placeholder="New York" />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" value={profileData.state} onChange={handleInputChange} disabled={!isEditing} placeholder="NY" />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <input type="text" name="country" value={profileData.country} onChange={handleInputChange} disabled={!isEditing} placeholder="United States" />
                </div>

                <div className="form-group">
                  <label>Zip Code</label>
                  <input type="text" name="zipCode" value={profileData.zipCode} onChange={handleInputChange} disabled={!isEditing} placeholder="10001" />
                </div>

                <div className="form-group">
                  <label>LinkedIn Profile</label>
                  <input type="url" name="linkedIn" value={profileData.linkedIn} onChange={handleInputChange} disabled={!isEditing} placeholder="https://linkedin.com/in/johndoe" />
                </div>

                <div className="form-group">
                  <label>GitHub Profile</label>
                  <input type="url" name="github" value={profileData.github} onChange={handleInputChange} disabled={!isEditing} placeholder="https://github.com/johndoe" />
                </div>

                <div className="form-group full-width">
                  <label>Portfolio Website</label>
                  <input type="url" name="portfolio" value={profileData.portfolio} onChange={handleInputChange} disabled={!isEditing} placeholder="https://johndoe.com" />
                </div>

                <div className="form-group full-width">
                  <label>Professional Bio</label>
                  <textarea name="bio" value={profileData.bio} onChange={handleInputChange} disabled={!isEditing} rows="4" placeholder="Tell us about yourself..."></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="education-section">
              <div className="section-header">
                <h2>Education</h2>
                {isEditing && <button className="btn btn-sm btn-primary" onClick={addEducation}>+ Add Education</button>}
              </div>

              {profileData.education && profileData.education.length > 0 ? (
                <div className="education-list">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="education-card">
                      {isEditing && <button className="remove-btn" onClick={() => removeEducation(index)}>✕</button>}
                      
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Degree *</label>
                          <input type="text" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} disabled={!isEditing} placeholder="Bachelor of Science" />
                        </div>

                        <div className="form-group">
                          <label>Institution *</label>
                          <input type="text" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} disabled={!isEditing} placeholder="University of Example" />
                        </div>

                        <div className="form-group">
                          <label>Field of Study</label>
                          <input type="text" value={edu.field} onChange={(e) => updateEducation(index, 'field', e.target.value)} disabled={!isEditing} placeholder="Computer Science" />
                        </div>

                        <div className="form-group">
                          <label>Grade/GPA</label>
                          <input type="text" value={edu.grade} onChange={(e) => updateEducation(index, 'grade', e.target.value)} disabled={!isEditing} placeholder="3.8/4.0" />
                        </div>

                        <div className="form-group">
                          <label>Start Date</label>
                          <input type="month" value={edu.startDate} onChange={(e) => updateEducation(index, 'startDate', e.target.value)} disabled={!isEditing} />
                        </div>

                        <div className="form-group">
                          <label>End Date</label>
                          <input type="month" value={edu.endDate} onChange={(e) => updateEducation(index, 'endDate', e.target.value)} disabled={!isEditing} />
                        </div>

                        <div className="form-group full-width">
                          <label>Description</label>
                          <textarea value={edu.description} onChange={(e) => updateEducation(index, 'description', e.target.value)} disabled={!isEditing} rows="2" placeholder="Relevant coursework, achievements..."></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No education added yet.</p>
                  {isEditing && <button className="btn btn-primary" onClick={addEducation}>+ Add Your First Education</button>}
                </div>
              )}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="experience-section">
              <div className="section-header">
                <h2>Work Experience</h2>
                {isEditing && <button className="btn btn-sm btn-primary" onClick={addExperience}>+ Add Experience</button>}
              </div>

              {profileData.experience && profileData.experience.length > 0 ? (
                <div className="experience-list">
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="experience-card">
                      {isEditing && <button className="remove-btn" onClick={() => removeExperience(index)}>✕</button>}
                      
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Job Title *</label>
                          <input type="text" value={exp.title} onChange={(e) => updateExperience(index, 'title', e.target.value)} disabled={!isEditing} placeholder="Senior Software Engineer" />
                        </div>

                        <div className="form-group">
                          <label>Company *</label>
                          <input type="text" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} disabled={!isEditing} placeholder="Tech Corp" />
                        </div>

                        <div className="form-group">
                          <label>Location</label>
                          <input type="text" value={exp.location} onChange={(e) => updateExperience(index, 'location', e.target.value)} disabled={!isEditing} placeholder="New York, NY" />
                        </div>

                        <div className="form-group">
                          <label>
                            <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(index, 'current', e.target.checked)} disabled={!isEditing} />
                            {' '}Currently working here
                          </label>
                        </div>

                        <div className="form-group">
                          <label>Start Date</label>
                          <input type="month" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} disabled={!isEditing} />
                        </div>

                        <div className="form-group">
                          <label>End Date</label>
                          <input type="month" value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} disabled={!isEditing || exp.current} />
                        </div>

                        <div className="form-group full-width">
                          <label>Description</label>
                          <textarea value={exp.description} onChange={(e) => updateExperience(index, 'description', e.target.value)} disabled={!isEditing} rows="4" placeholder="Describe your responsibilities..."></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No experience added yet.</p>
                  {isEditing && <button className="btn btn-primary" onClick={addExperience}>+ Add Your First Experience</button>}
                </div>
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="skills-section">
              <h2>Skills</h2>
              
              {isEditing && (
                <div className="skill-input-section">
                  <input
                    type="text"
                    id="skillInput"
                    placeholder="Type a skill and press Enter..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill(e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      const input = document.getElementById('skillInput');
                      addSkill(input.value.trim());
                      input.value = '';
                    }}
                  >
                    + Add Skill
                  </button>
                </div>
              )}

              {profileData.skills && profileData.skills.length > 0 ? (
                <div className="skills-grid">
                  {profileData.skills.map((skill, index) => (
                    <div key={index} className="skill-badge">
                      {skill}
                      {isEditing && <button className="skill-remove-btn" onClick={() => removeSkill(skill)}>✕</button>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No skills added yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="resume-section">
              <h2>Resume</h2>
              
              {profileData.resumeUrl ? (
                <div className="resume-preview">
                  <div className="resume-info">
                    <span className="resume-icon">📄</span>
                    <div className="resume-details">
                      <h4>Resume Uploaded</h4>
                      <p>{profileData.resumeName || 'resume.pdf'}</p>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="resume-actions">
                      <label className="btn btn-secondary">
                        📤 Upload New Resume
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} style={{ display: 'none' }} />
                      </label>
                    </div>
                  )}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="upload-icon">📄</div>
                  <p>No resume uploaded</p>
                  {isEditing && (
                    <label className="btn btn-primary">
                      📤 Upload Resume
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>
              )}

              <div className="resume-tips">
                <h4>💡 Tips for a great resume:</h4>
                <ul>
                  <li>Keep it concise (1-2 pages)</li>
                  <li>Use PDF format for best compatibility</li>
                  <li>Include relevant keywords from job descriptions</li>
                  <li>Highlight quantifiable achievements</li>
                  <li>Proofread for spelling and grammar</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="preferences-section">
              <h2>Job Preferences</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Desired Role</label>
                  <input type="text" value={profileData.jobPreferences.desiredRole} onChange={(e) => handleNestedChange('jobPreferences', 'desiredRole', e.target.value)} disabled={!isEditing} placeholder="Software Engineer" />
                </div>

                <div className="form-group">
                  <label>Desired Salary</label>
                  <input type="text" value={profileData.jobPreferences.desiredSalary} onChange={(e) => handleNestedChange('jobPreferences', 'desiredSalary', e.target.value)} disabled={!isEditing} placeholder="$80,000 - $100,000" />
                </div>

                <div className="form-group">
                  <label>Job Type</label>
                  <select value={profileData.jobPreferences.jobType} onChange={(e) => handleNestedChange('jobPreferences', 'jobType', e.target.value)} disabled={!isEditing}>
                    <option value="">Select</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Notice Period</label>
                  <input type="text" value={profileData.jobPreferences.noticePeriod} onChange={(e) => handleNestedChange('jobPreferences', 'noticePeriod', e.target.value)} disabled={!isEditing} placeholder="2 weeks" />
                </div>

                <div className="form-group full-width">
                  <label>
                    <input type="checkbox" checked={profileData.jobPreferences.willingToRelocate} onChange={(e) => handleNestedChange('jobPreferences', 'willingToRelocate', e.target.checked)} disabled={!isEditing} />
                    {' '}Willing to Relocate
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}