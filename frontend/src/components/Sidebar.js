export default function Sidebar({ open, setOpen, setPage }) {
  return (
    <div style={{
      width: open ? "240px" : "70px",
      minHeight: "100vh",
      background: "#111827",
      padding: "15px"
    }}>
      
      <button onClick={() => setOpen(!open)}>
        ☰
      </button>

      <h3 style={{ color: "#3B82F6" }}>DevAtlas</h3>

      <p onClick={() => setPage("dashboard")} style={{ cursor: "pointer" }}>
        📊 Home
      </p>

      <p onClick={() => setPage("repos")} style={{ cursor: "pointer" }}>
        📦 Repositories
      </p>

      <p onClick={() => setPage("heatmap")} style={{ cursor: "pointer" }}>
        🔥 Heatmap
      </p>
    </div>
  );
}