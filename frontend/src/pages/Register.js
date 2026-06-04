import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "https://devatlas-pgqc.onrender.com";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API}/register`, {
        email,
        password,
      });

      alert("Registered successfully. Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join DevAtlas</p>

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

        <button style={styles.button} onClick={register} disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p style={{ marginTop: 10 }}>
          Already have an account? <Link to="/">Login</Link>
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
  title: { margin: 0 },
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