import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../api/ApiClient";
import { CodeSubmission } from "../types";

const CodeSubmissionForm = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Java");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<string | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }, []);
  
  useEffect(() => {
    if (review) {
      setTimeout(() => {
        reviewRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  }, [review]);

  const handleSubmit = async () => {
    if (!code) {
      toast.error("Please enter some code before submitting.");
      return;
    }
    setLoading(true);
    try {
      const userId = "user123";
      const payload: CodeSubmission = { userId, code, language };
      const response = await apiClient.post<CodeSubmission>("/submit", payload);
      if (response.status === 200) {
        setReview(response.data.aiFeedback ?? "No feedback available.");
        toast.success("Code reviewed successfully!");
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      toast.error("Failed to get review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#1a1a1a",
      color: "white",
    }}>
      <div style={{
        width: "40%",
        height: "67%",
        backgroundColor: "#333",
        marginTop: "-65px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        animation: "fadeInUp 0.6s ease-out",
      }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px", marginTop: "-5px" }}>Submit Your Code</h2>
        <textarea
          style={{
            width: "100%",
            height: "310px",
            padding: "10px",
            backgroundColor: "#555",
            color: "#d1d5db",
            border: "none",
            borderRadius: "5px",
            marginBottom: "10px",
            boxSizing: "border-box",
            marginTop: "5px",
            resize: "none"
          }}
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "16px", fontWeight: "bold" }}>Select Language</label>
          <select
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#555",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginTop: "5px"
            }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="C++">C++</option>
          </select>
        </div>
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#6a0dad",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#5a0ca5";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#6a0dad";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Reviewing..." : "Submit Code"}
        </button>
        {review && (
          <div
            ref={reviewRef}
            style={{
              marginTop: "50px",
              padding: "10px",
              backgroundColor: "#444",
              borderRadius: "5px",
              textAlign: "left"
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>AI Review Feedback:</h3>
            <p>{review}</p>
          </div>
        )}
      </div>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default CodeSubmissionForm;
