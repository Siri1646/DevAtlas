export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return (
      <div
        style={{
          marginTop: "20px",
          color: "#9CA3AF"
        }}
      >
        No repositories found.
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2
        style={{
          color: "#3B82F6",
          marginBottom: "20px"
        }}
      >
        🚀 Top Repositories
      </h2>

      {[...repos]
        .sort((a, b) => b.stargazerCount - a.stargazerCount)
        .map((repo) => (
          <div
            key={repo.name}
            style={{
              background: "#111827",
              padding: "18px",
              marginBottom: "15px",
              borderRadius: "12px",
              border: "1px solid #1F2937",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
            }}
          >
            {/* Repository Name */}
            <h3
              style={{
                color: "#60A5FA",
                marginBottom: "12px"
              }}
            >
              📦 {repo.name}
            </h3>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "10px"
              }}
            >
              <span>⭐ Stars: {repo.stargazerCount}</span>

              <span>🍴 Forks: {repo.forkCount}</span>

              {repo.primaryLanguage && (
                <span>
                  🧠 Language: {repo.primaryLanguage.name}
                </span>
              )}
            </div>

            {/* Quality Indicator */}
            <div
              style={{
                marginBottom: "10px",
                color: "#10B981"
              }}
            >
              Repository Quality:{" "}
              {Math.min(
                100,
                repo.stargazerCount * 8 +
repo.forkCount * 12
              )}
              /100
            </div>

            {/* Link */}
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer noopener"
              style={{
                color: "#60A5FA",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Open Repository →
            </a>
          </div>
        ))}
    </div>
  );
}