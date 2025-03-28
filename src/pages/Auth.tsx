import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import CodeImage from "../assets/CODE.png";
import "./Auth.css";
import { jwtDecode } from "jwt-decode";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  
      const jsonData = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", jsonData.token);
        localStorage.setItem("userId", jsonData.userId);
        
  
        // Decode JWT to get user info if needed
        const decoded: any = jwtDecode(jsonData.token);
        console.log("Logged in user ID:", decoded.userId);
        window.location.href = "/"; // Redirect to home page
      } else {
        setError(jsonData.error || "Something went wrong");
        setShakeEffect(true);
        setTimeout(() => setShakeEffect(false), 300);
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
            style={{ ...styles.input, ...(email ? inputFocusStyle : {}) }}
            onFocus={(e) => (e.target.style.boxShadow = inputFocusStyle.boxShadow)}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ ...styles.passwordInput, ...(password ? inputFocusStyle : {}) }}
              onFocus={(e) => (e.target.style.boxShadow = inputFocusStyle.boxShadow)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? <EyeOff size={17} color="#fff" /> : <Eye size={17} color="#fff" />}
            </button>
          </div>
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

const inputFocusStyle = {
  boxShadow: "0 0 8px rgba(0, 123, 255, 0.7)",
  borderColor: "#007BFF",
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
    width: "94%",
    transition: "box-shadow 0.3s ease",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative" as "relative",
  },
  passwordInput: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    background: "#555",
    borderRadius: "5px",
    outline: "none",
    width: "100%",
    paddingRight: "40px",
    transition: "box-shadow 0.3s ease",
  },
  eyeButton: {
    position: "absolute" as "absolute",
    right: "-5px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
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
