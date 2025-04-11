import React from "react";
import NavBar from "../components/NavBar";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
    BrainCircuit,
    Settings,
    GitBranch,
    Users,
    Languages,
    ShieldPlus,
} from "lucide-react";
import { useInView } from "framer-motion";

const About: React.FC = () => {
    const navigate = useNavigate();
    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

    const handleTryNow = () => {
        navigate("/review");
    };

    const faqs = [
        {
            question: "How does AI Code Review work?",
            answer: "It uses a combination of static code analysis, best practices, and AI models to review and provide suggestions on the code you paste into the platform."
        },
        {
            question: "What languages are supported?",
            answer: "Currently, it supports Java, JavaScript, Python and C++. More languages will be added soon based on community feedback."
        },
        {
            question: "Is my code shared?",
            answer: "No. Your code is analyzed securely and is never shared."
        },
        {
            question: "Is this suitable for beginners?",
            answer: "Absolutely! The assistant provides reasoning behind each code suggestion, helping beginners learn and improve over time."
        },
    ];

    const featuresRef = React.useRef(null);
    const featuresInView = useInView(featuresRef, { once: true });

    const previewRef = React.useRef(null);
    const previewInView = useInView(previewRef, { once: true });

    const faqRef = React.useRef(null);
    const faqInView = useInView(faqRef, { once: true });

    const comingSoonRef = React.useRef(null);
    const comingSoonInView = useInView(comingSoonRef, { once: true });

    const tryRef = React.useRef(null);
    const tryInView = useInView(tryRef, { once: true });


    return (
        <div style={styles.container}>
            <NavBar />
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={styles.contentWrapper}
            >
                <h1 style={styles.heading}>About AI Code Review</h1>
                <p style={styles.paragraph}>
                    AI Code Review is your intelligent coding companion, designed to enhance code quality and promote better
                    programming practices through real-time feedback and smart suggestions.
                    Powered by advanced technologies such as{" "}
                    <span data-tooltip-id="spring-tooltip"
                        style={{ color: "#1abc9c", fontWeight: "bold", cursor: "pointer" }}>
                        Spring Boot
                    </span>,{" "}
                    <span data-tooltip-id="react-tooltip"
                        style={{ color: "#1abc9c", fontWeight: "bold", cursor: "pointer" }}>
                        React
                    </span>, and AI, this innovative platform analyzes your code with precision and offers actionable insights within seconds.
                </p>

                <ReactTooltip
                    id="spring-tooltip"
                    place="top"
                    style={{ backgroundColor: "#1abc9c", color: "#fff" }}
                >
                    Spring Boot is a Java-based framework for building production-ready apps quickly.
                </ReactTooltip>

                <ReactTooltip
                    id="react-tooltip"
                    place="top"
                    style={{ backgroundColor: "#1abc9c", color: "#fff" }}
                >
                    React is a JavaScript library for building fast, interactive user interfaces.
                </ReactTooltip>

                {/* -----------------HORIZONTAL DIVIDER----------------- */}
                <hr className="my-8 border-gray-400" />

                {/* KEY FEATURES */}
                <h2 style={styles.heading}>Key Features</h2>
                <motion.div
                    ref={featuresRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div style={styles.featuresCard}>
                        <ul style={styles.featuresList}>
                            <li>
                                <strong style={{ color: "#1abc9c" }}>Instant Code Analysis:</strong>
                                <p>Paste your code and receive instant, detailed feedback powered by AI.</p>
                            </li>
                            <li>
                                <strong style={{ color: "#1abc9c" }}>Multi-Language Support:</strong>
                                <p>Java, JavaScript, Python, and more to come.</p>
                            </li>
                            <li>
                                <strong style={{ color: "#1abc9c" }}>Best Practices Guide:</strong>
                                <p>Learn the reasoning behind each suggestion.</p>
                            </li>
                            <li>
                                <strong style={{ color: "#1abc9c" }}>Modern Stack Integration:</strong>
                                <p>Built with Spring Boot for performance and React for a smooth user experience.</p>
                            </li>
                            <li>
                                <strong style={{ color: "#1abc9c" }}>Secure & Private:</strong>
                                <p>Your code stays safe — no unwanted sharing or data retention.</p>
                            </li>
                        </ul>
                    </div>
                </motion.div>


                {/* -----------------HORIZONTAL DIVIDER----------------- */}
                <hr className="my-8 border-gray-400" />

                {/* APP PREVIEWS CAROUSEL*/}
                <h2 style={styles.heading}>App Previews</h2>
                <motion.div
                    ref={previewRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={previewInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div style={styles.carouselWrapper}>
                        <Carousel
                            showThumbs={false}
                            swipeable={true}
                            autoPlay
                            infiniteLoop
                            interval={2000}
                            dynamicHeight={false}
                            emulateTouch
                        >
                            <div>
                                <img src="/screenshots/homescreen.png" alt="Home Page" />
                                <p className="legend">Home Page</p>
                            </div>
                            <div>
                                <img src="/screenshots/codereview.png" alt="Code Review Page" />
                                <p className="legend">Code Review</p>
                            </div>
                            <div>
                                <img src="/screenshots/codefeedback.png" alt="Feedback Example" />
                                <p className="legend">AI Feedback</p>
                            </div>
                        </Carousel>
                    </div>
                </motion.div>

                {/* FAQs */}
                <h2 style={styles.heading}>FAQs</h2>
                <motion.div
                    ref={faqRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={faqInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div style={styles.accordionWrapper}>
                        {faqs.map((item, index) => (
                            <div key={index} style={styles.accordionItem}>
                                <div
                                    style={styles.accordionTitle}
                                    onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
                                >
                                    <span>{item.question}</span>
                                    <span>{expandedIndex === index ? "−" : "+"}</span>
                                </div>
                                <AnimatePresence initial={false}>
                                    {expandedIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            style={styles.accordionContent}
                                        >
                                            <p>{item.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* COMING SOON */}
                <h2 style={styles.heading}>Coming Soon</h2>
                <motion.div
                    ref={comingSoonRef}
                    style={styles.comingSoonGrid}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={comingSoonInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div style={styles.featureCard}>
                        <Languages size={30} style={styles.cardIcon} />
                        <h3 style={styles.cardTitle}>More Languages</h3>
                        <p style={styles.cardText}>Support for Go, Rust, TypeScript, and Kotlin based on user demand.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <GitBranch size={30} style={styles.cardIcon} />
                        <h3 style={styles.cardTitle}>CI/CD Integration</h3>
                        <p style={styles.cardText}>Auto-review pull requests directly from GitHub or GitLab pipelines.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <Users size={30} style={styles.cardIcon} />
                        <h3 style={styles.cardTitle}>Team Collaboration</h3>
                        <p style={styles.cardText}>Invite your team and collaborate on code reviews in real-time.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <BrainCircuit size={30} style={styles.cardIcon} />
                        <h3 style={styles.cardTitle}>Code Generation</h3>
                        <p style={styles.cardText}>Generate boilerplate or test cases directly from your existing code.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <Settings size={30} style={styles.cardIcon} />
                        <h3 style={styles.cardTitle}>Custom Rules</h3>
                        <p style={styles.cardText}>Define your own code quality rules to match your standards.</p>
                    </div>
                    <div style={styles.featureCard}>
                        <ShieldPlus size={30} style={styles.cardIcon} />
                        <h3 style={styles.cardTitle}>Security Insights</h3>
                        <p style={styles.cardText}>Automatically detect common security issues like SQL injection, XSS, and unsafe deserialization.</p>
                    </div>

                </motion.div>

                {/* TRY IT NOW */}
                <motion.div
                    ref={tryRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={tryInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div style={styles.buttonWrapper}>
                        <motion.button
                            style={styles.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                boxShadow: [
                                    "0 0 0px #1abc9c",
                                    "0 0 8px #1abc9c",
                                    "0 0 0px #1abc9c",
                                ],
                            }}
                            transition={{
                                duration: 1,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                            onClick={handleTryNow}
                        >
                            Try It Now
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
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
        overflowX: "hidden",
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
        color: "#1abc9c",
    },

    paragraph: {
        fontSize: "17px",
        lineHeight: "1.6",
        marginBottom: "20px",
        textAlign: "justify" as const,
    },

    comingSoonGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        width: "100%",
        marginBottom: "60px",
    } as React.CSSProperties,

    featureCard: {
        backgroundColor: "#2f3640",
        padding: "20px",
        borderRadius: "1rem",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
        textAlign: "center" as const,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    } as React.CSSProperties,

    cardIcon: {
        color: "#f39c12",
        marginBottom: "12px",
    } as React.CSSProperties,

    cardTitle: {
        color: "#f39c12",
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "8px",
    } as React.CSSProperties,

    cardText: {
        fontSize: "15px",
        color: "#ecf0f1",
        lineHeight: 1.5,
    } as React.CSSProperties,


    comingSoonItem: {
        display: "flex",
        flexDirection: "column" as const,
        marginBottom: "16px",
    },

    icon: {
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: "4px",
    },

    comingSoonText: {
        marginTop: "6px",
        marginLeft: "26px",
        fontSize: "15px",
        color: "#ecf0f1",
        lineHeight: 1.5,
    },


    comingSoonCard: {
        backgroundColor: "#2f3640",
        padding: "24px",
        borderRadius: "1rem",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        marginBottom: "40px",
    } as React.CSSProperties,

    comingSoonList: {
        lineHeight: 1.6,
        fontSize: "16px",
        listStyleType: "disc",
        paddingLeft: "20px",
        color: "#ecf0f1",
    } as React.CSSProperties,


    carouselWrapper: {
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto 40px auto",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    },


    accordionWrapper: {
        width: "100%",
        marginBottom: "40px",
    },

    accordionItem: {
        backgroundColor: "#2f3640",
        color: "#ecf0f1",
        borderRadius: "8px",
        marginBottom: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    },

    accordionTitle: {
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        color: "#1abc9c",
        fontSize: "16px",
    },

    accordionContent: {
        padding: "0 16px 16px 16px",
        fontSize: "15px",
        lineHeight: "1.5",
        color: "#ecf0f1",
    },


    featuresCard: {
        backgroundColor: "#2f3640",
        padding: "24px",
        borderRadius: "1rem",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        marginBottom: "40px",
    } as React.CSSProperties,

    featuresList: {
        lineHeight: 1.6,
        fontSize: "16px",
        listStyleType: "disc",
        paddingLeft: "20px",
    } as React.CSSProperties,


    buttonWrapper: {
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        marginBottom: "80px",
    },

    button: {
        backgroundColor: "#1abc9c",
        border: "none",
        borderRadius: "8px",
        padding: "12px 24px",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    } as React.CSSProperties,
};

export default About;
