
export default function DashboardCards({ jobs }) {
  const cards = [
    { label: "Total Applications", value: jobs.length },
    {
      label: "Applied",
      value: jobs.filter((job) => job.status === "Applied").length,
    },
    {
      label: "Interviews",
      value: jobs.filter((job) => job.status === "Interview").length,
    },
    {
      label: "Offers",
      value: jobs.filter((job) => job.status === "Offer").length,
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
