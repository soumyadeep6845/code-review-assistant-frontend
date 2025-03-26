import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CodeImage from "../assets/CODE.png";
import "./Auth.css"; 

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    const body = isLogin 
      ? { email, password }
      : { username: email.split("@")[0], email, password };

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const textData = await response.text();
      try {
        const jsonData = JSON.parse(textData);

        if (response.ok) {
          localStorage.setItem("token", jsonData.token);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate("/");
        } else {
          setError(jsonData.error || "Something went wrong");
          setShakeEffect(true);
          setTimeout(() => setShakeEffect(false), 300);
        }
      } catch {
        if (response.ok) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate("/");
        } else {
          setError(textData || "Unknown error occurred");
          setShakeEffect(true);
          setTimeout(() => setShakeEffect(false), 300);
        }
      }
    } catch {
      setError("Network error, please try again.");
      setShakeEffect(true);
      setTimeout(() => setShakeEffect(false), 300);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={styles.authBox}
      >
        <img src={CodeImage} alt="Code Logo" style={styles.logo} />
        <h2 style={styles.heading}>Code Review AI</h2>
        {error && <p style={styles.errorText} className={shakeEffect ? "shake" : ""}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? <div className="loader"></div> : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to bottom right, #2c3e50, #34495e)",
  },
  authBox: {
    background: "rgb(43, 51, 51)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "350px",
    textAlign: "center" as "center",
  },
  logo: {
    width: "100px",
    height: "auto",
    marginBottom: "-30px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "23px",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    background: "#555",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    background: "#007BFF",
    color: "#fff",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
  },
  toggleText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#666",
  },
  toggleLink: {
    color: "#007BFF",
    cursor: "pointer",
    marginLeft: "5px",
  },
};

export default Auth;
