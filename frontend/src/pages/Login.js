import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await axios.post("https://devatlas-pgqc.onrender.com/login", {
        email,
        password,
      });

      // store token
      localStorage.setItem("token", res.data.token);

      // go to HOME (important)
      navigate("/home");

    } catch (err) {
      console.log(err);
      alert("Login failed. Check credentials or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>DevAtlas 🚀</h1>
        <p style={styles.subtitle}>Welcome back</p>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: 10 }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0b0f1a",
    color: "white",
  },

  card: {
    width: 320,
    padding: 25,
    borderRadius: 12,
    background: "#111827",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  title: {
    margin: 0,
  },

  subtitle: {
    marginTop: -10,
    fontSize: 14,
    opacity: 0.7,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    outline: "none",
  },

  button: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },
};