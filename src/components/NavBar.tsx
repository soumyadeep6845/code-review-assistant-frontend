import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <span style={styles.logo} onClick={() => navigate("/")}>
          AI Code Review
        </span>
      </div>
      <div style={styles.right}>
        <span style={styles.link} onClick={() => navigate("/")}>
          Home
        </span>
        <span style={styles.link} onClick={() => navigate("/about")}>
          About
        </span>
        <span style={styles.link} onClick={() => navigate("/review")}>
          Review
        </span>
        <span style={styles.link} onClick={handleLogout}>
          Logout
        </span>
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    width: "100vw",
    height: "60px",
    backgroundColor: "#111827", // Dark background
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 25px",
    boxSizing: "border-box",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    position: "fixed", // Stays at the top
    top: 0,
    zIndex: 1000,
  },
  left: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
  },
  logo: {
    fontWeight: 600,
    fontSize: "22px",
    color: "white",
    fontFamily: "'Playfair Display', serif",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    margin: "5px",
    transition: "color 0.2s ease",
  },
};

export default NavBar;
