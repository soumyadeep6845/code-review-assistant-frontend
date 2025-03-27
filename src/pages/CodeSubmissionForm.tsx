import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../api/ApiClient";
import { CodeSubmission } from "../types";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { autocompletion } from "@codemirror/autocomplete";

const CodeSubmissionForm = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
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

  // Function to get the correct language mode
  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return javascript();
      case "java":
        return java();
      case "python":
        return python();
      case "cpp":
        return cpp();
      default:
        return java(); // Default fallback
    }
  };

  const handleSubmit = async () => {
    if (!code) {
      toast.error("Please enter some code before submitting.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token) {
        toast.error("You must be logged in to submit code.");
        return;
      }
      if (!userId) {
        toast.error("User ID is missing. Please log in again.");
        return;
      }

      const payload: CodeSubmission = { code, language, userId };

      const response = await apiClient.post("/submit", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        width: "50%",
        height: "70%",
        backgroundColor: "#333",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        animation: "fadeInUp 0.6s ease-out"
      }}>
        <h2 style={{
          fontSize: "24px",
          marginBottom: "15px",
          marginTop: "5px"
        }}>Submit Your Code
        </h2>

        <CodeMirror
          value={code}
          height="300px"
          extensions={[getLanguageExtension(), autocompletion()]}
          theme="dark"
          onChange={(value) => setCode(value)}
          style={{
            borderRadius: "5px",
            marginBottom: "10px",
            textAlign: "left",
            fontSize: "15px",
          }}
          basicSetup={{
            lineNumbers: true,
          }}
        />

        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
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
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "center"}}>
          <button
            style={{
              width: "40%",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "25px",
              marginTop: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#388E3C"; e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#4CAF50"; e.currentTarget.style.transform = "scale(1)"; }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Reviewing...
              </>
            ) : (
              "Submit Code"
            )}
          </button>
        </div>

        <style>
          {`
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid white;
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `}
        </style>

        {review && (
          <div ref={reviewRef} style={{
            marginTop: "30px",
            padding: "10px",
            backgroundColor: "#444",
            borderRadius: "5px",
            textAlign: "left"
          }}>
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
