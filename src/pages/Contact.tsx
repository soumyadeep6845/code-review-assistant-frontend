import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setEmailError("");
    setSubmitted(false);
  };

  return (
    <>
      <NavBar />
      <div style={styles.pageWrapper}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.container}
        >
          <div style={styles.card}>
            <h2 style={styles.heading}>Contact Us</h2>
            <p style={styles.subHeading}>
              Have a question or feedback? We’d love to hear from you.
            </p>
            {submitted ? (
              <div style={styles.successContainer}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  style={styles.tickBounce}
                >
                  ✔
                </motion.div>
                <p style={styles.successText}>
                  Thank you! We'll get back to you soon.
                </p>
                <motion.button
                  onClick={handleReset}
                  style={styles.button}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit another feedback
                </motion.button>
              </div>
            ) : (
              <form style={styles.form} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  style={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  style={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {emailError && (
                  <p style={{ color: "tomato", fontSize: "13px" }}>
                    {emailError}
                  </p>
                )}
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  style={styles.textarea}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <motion.button
                  type="submit"
                  style={styles.button}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    paddingTop: "80px",
    background: "linear-gradient(to bottom right, #2c3e50, #34495e)",
    minHeight: "100vh",
    minWidth: "100vw",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
  },
  card: {
    background: "#2b3333",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    color: "#fff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    marginTop: "50px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
    fontFamily: "'Playfair Display', serif",
    marginTop: "10px",
    color: "#1abc9c",
  },
  subHeading: {
    fontSize: "15px",
    color: "#ccc",
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "'Playfair Display', serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #555",
    background: "#444",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    fontFamily: "'Playfair Display', serif",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #555",
    background: "#444",
    color: "#fff",
    fontSize: "15px",
    resize: "none",
    outline: "none",
    fontFamily: "'Playfair Display', serif",
  },
  button: {
    background: "#1abc9c",
    color: "#fff",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    fontFamily: "'Playfair Display', serif",
    width: "50%",
    margin: "0 auto",
    marginTop: "12px",
  },
  successText: {
    color: "#4BB543",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },
  successContainer: {
    textAlign: "center",
  },
  tickBounce: {
    fontSize: "50px",
    color: "#4BB543",
    marginTop: "10px",
  },
};

export default Contact;
