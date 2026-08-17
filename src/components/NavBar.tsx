import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Review", path: "/review" },
    { label: "Contact Us", path: "/contact" },
    { label: "Logout", path: "/logout" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    window.location.href = "/login";
  };

  const handleClick = (label: string) => {
    if (label === "Logout") {
      setShowLogoutDialog(true);
    } else {
      const path = navLinks.find((link) => link.label === label)?.path;
      if (path) navigate(path);
    }
  };

  return (
    <>
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
              <motion.div
                key={link.label}
                whileTap={{ scale: 0.9 }}
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
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* LOGOUT DIALOG BOX */}
      <AnimatePresence>
        {showLogoutDialog && (
          <motion.div
            style={styles.dialogOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={styles.dialogBox}
            >
              <p style={styles.dialogText}>Are you sure you want to logout?</p>
              <div style={styles.dialogButtons}>
                <motion.button
                  onClick={handleLogout}
                  style={styles.confirmButton}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 12px rgba(231, 76, 60, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes, Logout
                </motion.button>
                <motion.button
                  onClick={() => setShowLogoutDialog(false)}
                  style={styles.cancelButton}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 12px rgba(26, 188, 156, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
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
  dialogOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  dialogBox: {
    background: "linear-gradient(135deg, #1f2937, #111827)",
    padding: "35px 25px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)",
    textAlign: "center" as const,
    minWidth: "340px",
    color: "white",
    fontFamily: "'Playfair Display', serif",
  },
  dialogText: {
    fontSize: "18px",
    marginBottom: "45px",
    color: "#ffffff",
  },
  dialogButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  confirmButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "12px 26px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 400,
    fontSize: "15px",
    marginRight: "10px",
    outline: "none",
  },
  cancelButton: {
    backgroundColor: "#1abc9c",
    color: "white",
    border: "none",
    padding: "12px 26px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 400,
    fontSize: "15px",
    outline: "none",
  },
};

export default NavBar;
