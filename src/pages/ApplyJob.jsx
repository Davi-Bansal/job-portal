import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please upload resume");
      return;
    }

    try {
      setLoading(true);
      setMessage("Uploading and analyzing resume... ⏳");
      setAtsScore(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);

      // ✅ STEP 1: UPLOAD & ANALYZE RESUME
      const resumeRes = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Resume Response:", resumeRes.data);

      const resumeId = resumeRes.data.id;
      const score = resumeRes.data.atsScore;

      if (!resumeId) {
        throw new Error("Resume ID not returned from server");
      }

      // ✅ SHOW ATS SCORE
      setAtsScore(score);
      setMessage(`Resume analyzed! ATS Score: ${score}/100 ⏳ Submitting application...`);

      // ✅ STEP 2: APPLY TO JOB
      await api.post("/applications/apply", null, {
        params: {
          jobId: jobId,
          userId: user.id,
          resumeId: resumeId
        }
      });

      setMessage(`✅ Application submitted successfully! Your ATS Score: ${score}/100`);

      setTimeout(() => {
        navigate("/my-applications");
      }, 2000);

    } catch (err) {
      console.error("APPLICATION ERROR:", err);

      let errorMsg = "Application failed";

      if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err.response?.data) {
        errorMsg = typeof err.response.data === 'string' 
          ? err.response.data 
          : JSON.stringify(err.response.data);
      } else if (err.message) {
        errorMsg = err.message;
      }

      setMessage(`❌ ${errorMsg}`);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Apply for Job</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button className="btn" disabled={loading}>
          {loading ? "Processing..." : "Apply Job"}
        </button>

        {message && (
          <div style={{ marginTop: 15 }}>
            <p>{message}</p>
            
            {atsScore !== null && (
              <div style={{
                marginTop: 10,
                padding: 15,
                backgroundColor: atsScore >= 70 ? '#d4edda' : atsScore >= 50 ? '#fff3cd' : '#f8d7da',
                borderRadius: 8,
                border: `2px solid ${atsScore >= 70 ? '#28a745' : atsScore >= 50 ? '#ffc107' : '#dc3545'}`
              }}>
                <h3 style={{ margin: 0, color: atsScore >= 70 ? '#155724' : atsScore >= 50 ? '#856404' : '#721c24' }}>
                  ATS Score: {atsScore}/100
                </h3>
                <p style={{ margin: '5px 0 0 0', fontSize: 14 }}>
                  {atsScore >= 70 ? '🎉 Excellent match!' : atsScore >= 50 ? '👍 Good match' : '💡 Room for improvement'}
                </p>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}