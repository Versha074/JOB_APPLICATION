
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F87171"];

export default function ApplicationChart({ jobs }) {
  const statuses = ["Applied", "Interview", "Offer", "Rejected"];

  const chartData = statuses.map((status) => ({
    name: status,
    value: jobs.filter((job) => job.status === status).length,
  }));

  const hasApplications = chartData.some((item) => item.value > 0);

  return (
    <section className="application-chart">
      <div className="chart-heading">
        <p className="results-eyebrow">APPLICATION OVERVIEW</p>
        <h2>Application Status</h2>
        <p>See how your job applications are progressing.</p>
      </div>

      {hasApplications ? (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData.filter((item) => item.value > 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={4}
              >
                {chartData
                  .filter((item) => item.value > 0)
                  .map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[statuses.indexOf(entry.name)]}
                    />
                  ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#10251D",
                  border: "1px solid #34D399",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                }}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="chart-empty">
          Add a job application to see your status chart.
        </p>
      )}
    </section>
  );
}
