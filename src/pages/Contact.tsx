import React, { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [submitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "user_email") {
            if (!validateEmail(e.target.value)) {
                setEmailError("Please enter a valid email address.");
            } else {
                setEmailError("");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (formRef.current?.user_email?.value ?? "") as string;

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID!,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
                formRef.current!,
                {
                    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY!,
                }
            )
            .then(
                () => {
                    setSubmitted(true),
                        setLoading(false);
                },
                (error) => {
                    console.error("FAILED...", error.text);
                    alert("Something went wrong. Please try again later.");
                    setLoading(false);
                }
            );
    };

    const handleReset = () => {
        formRef.current?.reset();
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
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                            <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Your Name"
                                    style={styles.input}
                                    required
                                />
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Your Email"
                                    style={styles.input}
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
                                    required
                                />
                                <motion.button
                                    type="submit"
                                    style={{
                                        ...styles.button,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        opacity: loading ? 0.7 : 1,
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={loading}
                                >
                                    {loading ? "Sending" : "Send Message"}
                                    {loading && <span style={styles.spinner}></span>}
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
    spinner: {
        width: "16px",
        height: "16px",
        border: "2px solid #fff",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
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
