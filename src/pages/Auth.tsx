import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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

        console.log("Raw Response:", response);

        const textData = await response.text(); // Get response text
        console.log("Response Text:", textData);

        try {
            const jsonData = JSON.parse(textData); // Parse JSON
            console.log("Parsed JSON:", jsonData);

            if (response.ok) {
                localStorage.setItem("token", jsonData.token); // Store JWT token
                console.log("Token stored, navigating...");
                navigate("/"); // Redirect to Home
            } else {
                setError(jsonData.error || "Something went wrong");
            }
        } catch (err) {
            console.log("JSON Parsing Error:", err);

            if (response.ok) {
                console.log("Response OK but no JSON, navigating...");
                navigate("/"); // Redirect on success
            } else {
                setError(textData || "Unknown error occurred");
            }
        }
    } catch (err) {
        console.error("Fetch error:", err);
        setError("Network error, please try again.");
    }      
};


  return (
    <div style={styles.container}>
      <div style={styles.authBox}>
        <h2 style={styles.heading}>{isLogin ? "Login" : "Register"}</h2>
        {error && <p style={styles.errorText}>{error}</p>}
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
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  authBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "350px",
    textAlign: "center" as "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
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
