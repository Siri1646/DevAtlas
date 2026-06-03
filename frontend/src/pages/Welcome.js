import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>🚀 Welcome to DevAtlas</h1>

      <button onClick={() => navigate("/login")}>
        Login
      </button>

      <button onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
}