import { useState, useEffect } from "react";
import CodeSubmissionForm from "./CodeSubmissionForm";
import { useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";

const CodeReview = () => {
  const navigate = useNavigate();
  const fullText =
    "Submit your code below and gain insightful feedback from our next-gen AI! ✨";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the JWT token
    window.location.href = "/auth"; // Redirect to authentication page
  };

  const handleHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#333",
        fontFamily: "'Playfair Display', serif",
        position: "relative",
      }}
    >
      {/* Logout Icon */}
      <div className="icon-container" onClick={handleLogout}>
        <LogOut size={23} />
        <span className="tooltip">Logout</span>
      </div>

      {/* Home Icon */}
      <div className="icon-container" onClick={handleHome}>
        <Home size={23} />
        <span className="tooltip">Home</span>
      </div>

      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
          AI Code Review
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "20px" }}>
          {text}
          <span
            style={{
              display: "inline-block",
              width: "7px",
              height: "19px",
              backgroundColor: "#fff",
              marginLeft: "5px",
              animation: "blink 1s infinite",
            }}
          ></span>
        </p>
        <CodeSubmissionForm />
      </div>
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }

          .icon-container {
            position: absolute;
            top: 20px;
            cursor: pointer;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.2s;
          }

          .icon-container:nth-child(1) { right: 20px; } /* Logout */
          .icon-container:nth-child(2) { right: 60px; } /* Home */

          .icon-container:hover {
            transform: scale(0.9);
          }

          .tooltip {
            font-size: 0.9rem;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 5px 8px;
            border-radius: 5px;
            position: absolute;
            top: 30px;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
            white-space: nowrap;
          }

          .icon-container:hover .tooltip {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default CodeReview;
