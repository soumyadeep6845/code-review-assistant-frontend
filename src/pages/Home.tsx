import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const name = localStorage.getItem("name") || "User";

  const handleGetStarted = () => {
    navigate("/review");
  };

  return (
    <div style={styles.container}>
      {/* Navigation Menu */}
      <NavBar />

      <div style={styles.headerContainer}>
        <h1 style={styles.heading}>
          <TypewriterText text={`Welcome, ${name}!`} />
        </h1>
        <p style={styles.subheading}>
          Enhance your coding skills with intelligent feedback powered by AI. Just submit your code and get detailed insights.
        </p>
      </div>

      {/* Get Started Button */}
      <button
        style={isHovered ? { ...styles.button, ...styles.buttonHovered } : styles.button}
        onClick={handleGetStarted}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? "Get Started >>" : "Get Started"}
      </button>

      {/* Copyright */}
      <div style={styles.footer}>
        <p style={styles.copyright}>© 2025 Soumyadeep Das</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to bottom right, #2c3e50, #34495e)",
    fontFamily: "'Playfair Display', serif",
    textAlign: "center",
    margin: 0,
    position: "relative",
    paddingTop: "70px",
    boxSizing: "border-box",
  } as React.CSSProperties,
  headerContainer: {
    marginBottom: "40px",
  },
  heading: {
    fontSize: "36px",
    color: "#fff",
    marginBottom: "10px",
    paddingBottom: "10px",
    fontWeight: "700",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  subheading: {
    fontSize: "18px",
    color: "#fff",
    lineHeight: "1.5",
    maxWidth: "500px",
    margin: "0 auto",
  },
  button: {
    backgroundColor: "#1abc9c",
    color: "#fff",
    fontSize: "18px",
    padding: "15px 30px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease",
    boxShadow: "0 0 10px rgba(26, 188, 156, 0.8)",
    marginBottom: "15px",
  },
  buttonHovered: {
    backgroundColor: "#16a085",
    transform: "scale(1.1)",
    boxShadow: "0 0 15px rgba(22, 160, 133, 1)",
  },
  logoutButton: {
    position: "absolute" as "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#E74C3C",
    color: "#fff",
    fontSize: "13px",
    padding: "12px 24px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease",
    boxShadow: "0 0 10px rgba(231, 76, 60, 0.8)",
  },
  logoutButtonHovered: {
    backgroundColor: "#C0392B",
    transform: "scale(1.1)",
    boxShadow: "0 0 15px rgba(192, 57, 43, 1)",
  },
  footer: {
    position: "absolute" as "absolute",
    bottom: "10px",
    width: "100%",
    textAlign: "center" as "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "10px 0",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(4px)",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
  },
  copyright: {
    fontSize: "14px",
    color: "#fff",
    margin: "0",
  },
};

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, 40);

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className="typewriter-js">
      {displayedText}
      <span className="cursor"><pre>  </pre></span>
    </span>
  );
};

export default Home;