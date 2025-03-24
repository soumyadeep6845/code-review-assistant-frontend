import { useState, useEffect } from "react";
import CodeSubmissionForm from "../components/CodeSubmissionForm";

const CodeReview = () => {
  const fullText = "Submit your code below and receive valuable feedback from our next-gen AI.";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      width: "100vw", 
      backgroundColor: "#f4f4f4",
      fontFamily: "'Playfair Display', serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>
          AI Code Review
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "20px" }}>
          {text}
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "20px",
            backgroundColor: "#666",
            marginLeft: "5px",
            animation: "blink 1s infinite"
          }}></span>
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
        `}
      </style>
    </div>
  );
};

export default CodeReview;
