import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function LanguageChart({ languages }) {
  const data = Object.entries(languages || {}).map(
    ([name, value]) => ({
      name,
      value
    })
  );

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899"
  ];

  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px"
      }}
    >
      <h3>🧠 Language Distribution</h3>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}