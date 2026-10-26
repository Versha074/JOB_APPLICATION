
export default function DashboardCards({ jobs }) {
  const totalApplications = jobs.length;

  const appliedCount = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewCount = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offerCount = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejectedCount = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const successRate =
    totalApplications === 0
      ? 0
      : Math.round((offerCount / totalApplications) * 100);

  const cards = [
    {
      label: "Total Applications",
      value: totalApplications,
    },
    {
      label: "Applied",
      value: appliedCount,
    },
    {
      label: "Interviews",
      value: interviewCount,
    },
    {
      label: "Offers",
      value: offerCount,
    },
    {
      label: "Rejected",
      value: rejectedCount,
    },
    {
      label: "Success Rate",
      value: `${successRate}%`,
    },
  ];

  return (
    <section className="dashboard-cards">
      {cards.map((card) => (
        <article className="stat-card" key={card.label}>
          <p>{card.label}</p>
          <h2>{card.value}</h2>
        </article>
      ))}
    </section>
  );
}
