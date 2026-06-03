import LanguageChart from "../components/LanguageChart";
import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import RepoList from "../components/RepoList";
import Heatmap from "../components/Heatmap";

export default function Home() {
    function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center"
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState("dashboard");

  const analyze = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:5000/github/${username}`,
      { headers: { Authorization: token } }
    );

    setData(res.data);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0B0F19", color: "white" }}>
      
      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} setPage={setPage} />

      {/* MAIN */}
<div
  style={{
    flex: 1,
    padding: "30px",
    overflowX: "hidden"
  }}
>
        <h2 style={{ color: "#3B82F6" }}>
          DevAtlas Analytics
        </h2>

        {/* INPUT */}
        <div>
          <input
            placeholder="GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #333",
              background: "#111827",
              color: "white"
            }}
          />

          <button onClick={analyze} style={{ marginLeft: "10px" }}>
            Analyze
          </button>
        </div>

        {/* DASHBOARD */}
        {data && page === "dashboard" && (
  <div style={{ marginTop: "20px" }}>
<div
  style={{
    background: "#111827",
    padding: "20px",
    borderRadius: "14px",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: "20px"
  }}
>
    <LanguageChart
  languages={data.languages}
/>
  <img
    src={data.user.avatarUrl}
    alt=""
    style={{
      width: "90px",
      height: "90px",
      borderRadius: "50%"
    }}
  />

  <div>
    <h2>{data.user.login}</h2>
    <h3 style={{ color: "#60A5FA" }}>
      🏆 {data.badge}
    </h3>
  </div>
</div>
    <h2>
      🏆 {data.level}
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginTop: "20px"
      }}
    >
      <Card title="Profile Strength" value={`${data.profileStrength}/100`} />
      <Card title="Community Score" value={`${data.communityScore}/100`} />
      <Card title="Activity Score" value={`${data.activityScore}/100`} />
      <Card title="Quality Score" value={`${data.qualityScore}/100`} />
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginTop: "20px"
      }}
    >
      <Card title="Followers" value={data.user.followers.totalCount} />
      <Card title="Repositories" value={data.totalRepos} />
      <Card title="Stars" value={data.totalStars} />
      <Card title="Forks" value={data.totalForks} />
      <Card title="Contributions" value={data.totalContributions} />
      <Card title="Avg Stars / Repo" value={data.avgStars.toFixed(2)} />
      <Card
  title="Most Used Language"
  value={
    Object.keys(data.languages)[0] || "N/A"
  }
/>
    </div>

    <div
  style={{
    background: "#111827",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "12px"
  }}
>
  <h3>📈 GitHub Summary</h3>

  <p>
    Community Score: {data.communityScore}/100
  </p>

  <p>
    Activity Score: {data.activityScore}/100
  </p>

  <p>
    Quality Score: {data.qualityScore}/100
  </p>

  <p>
    Profile Strength: {data.profileStrength}/100
  </p>

  <p>
    Badge Level: {data.badge}
  </p>
</div>

  </div>
)}
        {/* REPOS PAGE */}
        {data && page === "repos" && (
          <RepoList repos={data.repos} />
        )}

        {/* HEATMAP PAGE */}
        {data && page === "heatmap" && (
          <Heatmap data={data.heatmap} />
        )}

      </div>
    </div>
  );
}