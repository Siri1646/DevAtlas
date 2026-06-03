export default function Heatmap({ data }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ color: "#3B82F6" }}>
  🔥 Contribution Activity
</h2>

<p style={{ color: "#9CA3AF" }}>
  Last 365 days of GitHub activity
</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(53, 12px)",
          gap: "3px",
          marginTop: "15px"
        }}
      >
        {data?.slice(-365).map((d, i) => (
          <div
            key={i}
            title={`${d.date} : ${d.count} contributions`}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "2px",
              background:
                d.count === 0
                  ? "#161B22"
                  : d.count < 2
                  ? "#0E4429"
                  : d.count < 5
                  ? "#006D32"
                  : d.count < 10
                  ? "#26A641"
                  : "#39D353"
            }}
          />
        ))}
      </div>
    </div>
  );
}