import React from "react";
import NavBar from "../components/NavBar";

const About: React.FC = () => {
    return (
        <div style={styles.container}>
            <NavBar />
            <div style={styles.contentWrapper}>
                <h1 style={styles.heading}>About AI Code Review</h1>
                <p style={styles.paragraph}>
                    AI Code Review is your intelligent coding companion, designed to enhance code quality and promote better
                    programming practices through real-time feedback and smart suggestions.
                    Powered by advanced technologies such as Spring Boot, React, and OpenAI, this innovative platform analyzes
                    your code with precision and offers actionable insights within seconds.
                </p>
                <p style={styles.paragraph}>
                    Whether you’re writing Java, JavaScript, Python, or other popular languages, AI Code Review supports your
                    development process by identifying bugs, performance bottlenecks, redundant logic, security vulnerabilities,
                    and opportunities for optimization. It not only helps you fix problems but also explains the why behind each
                    suggestion — making it an excellent tool for learning and continuous improvement.
                </p>
                <h2 style={styles.heading}>Key Features</h2>
                <ul style={{ lineHeight: 1.3 }}>
                    <li>
                        <strong>Instant Code Analysis:</strong>
                        <p>Paste your code and receive instant, detailed feedback powered by AI.</p>
                    </li>
                    <li>
                        <strong>Multi-Language Support:</strong>
                        <p>Java, JavaScript, Python, and more to come.</p>
                    </li>
                    <li>
                        <strong>Best Practices Guide:</strong>
                        <p>Learn the reasoning behind each suggestion.</p>
                    </li>
                    <li>
                        <strong>Modern Stack Integration:</strong>
                        <p>Built with Spring Boot for performance and React for a smooth user experience.</p>
                    </li>
                    <li>
                        <strong>Secure & Private:</strong>
                        <p>Your code stays safe — no unwanted sharing or data retention.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #2c3e50, #34495e)",
        fontFamily: "'Playfair Display', serif",
        color: "#ecf0f1",
        paddingTop: "70px",
        boxSizing: "border-box" as const,
        overflowX: "hidden", // ✅ Prevent horizontal scroll
        position: "relative" as const,
    } as React.CSSProperties,

    contentWrapper: {
        maxWidth: "800px",
        width: "100%",
        padding: "0 20px",
    },

    heading: {
        fontSize: "36px",
        marginBottom: "20px",
        fontWeight: "700",
        textAlign: "center" as const,
    },

    paragraph: {
        fontSize: "18px",
        lineHeight: "1.6",
        marginBottom: "20px",
        textAlign: "justify" as const,
    },
};

export default About;
