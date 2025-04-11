import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Review", path: "/review" },
    { label: "Logout", path: "/logout" },
  ];

  const handleClick = (label: string) => {
    if (label === "Logout") {
      handleLogout();
    } else {
      const path = navLinks.find((link) => link.label === label)?.path;
      if (path) navigate(path);
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <span style={styles.logo} onClick={() => navigate("/")}>
          AI Code Review
        </span>
      </div>
      <div style={styles.right}>
        {navLinks.map((link) => (
          <span
            key={link.label}
            onClick={() => handleClick(link.label)}
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              ...styles.link,
              transform: hoveredLink === link.label ? "scale(0.9)" : "scale(1)",
              transition: "transform 0.15s ease, color 0.2s ease",
            }}
          >
            {link.label}
          </span>
        ))}
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    width: "100vw",
    height: "60px",
    backgroundColor: "#111827",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 25px",
    boxSizing: "border-box",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    position: "fixed",
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
  },
};

export default NavBar;
