import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Review", path: "/review" },
    { label: "Contact Us", path: "/contact" },
    { label: "Logout", path: "/logout" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

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
          AI Code Review Assistant
        </span>
      </div>
      <div style={styles.right}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <div
              key={link.label}
              onClick={() => handleClick(link.label)}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                position: "relative",
                margin: "0 12px",
                cursor: "pointer",
                fontSize: "16px",
                color:
                  hoveredLink === link.label
                    ? link.label === "Logout"
                      ? "rgb(249, 38, 38)"
                      : "#1abc9c"
                    : "white",
              }}
            >
              <span style={{ paddingBottom: "4px" }}>{link.label}</span>
              {isActive && (
                <motion.div
                  layoutId="underline"
                  style={{
                    position: "absolute",
                    bottom: -17,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "#1abc9c",
                    borderRadius: "2px",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          );
        })}
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
    fontFamily: "'Playfair Display', serif",
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
    gap: "10px",
  },
};

export default NavBar;
