import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const register = async () => {
    try {
      await axios.post("https://devatlas-pgqc.onrender.com/register", {
        email,
        password
      });

      nav("/");
    } catch {
      alert("Register failed");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Register</h1>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={register}>Create Account</button>
    </div>
  );
}