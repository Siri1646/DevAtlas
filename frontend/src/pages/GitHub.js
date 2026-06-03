import { useState } from "react";
import axios from "axios";

export default function GitHub() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/github/${username}`,
        {
          headers: {
            Authorization: token,
          }
        }
      );

      setData(res.data);
    } catch (err) {
      alert("User not found or unauthorized");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>GitHub Analyzer 🐙</h1>

      <input
        placeholder="GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={fetchUser}>Analyze</button>

      {loading && <p>Loading...</p>}

      {data && (
        <div>
          <h2>{data.user.login}</h2>
          <p>Followers: {data.user.followers.totalCount}</p>
          <p>Score: {data.score}</p>

          <h3>Repositories</h3>
          {data.repos.map((r) => (
            <div key={r.name}>
              {r.name} ⭐ {r.stargazerCount}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}