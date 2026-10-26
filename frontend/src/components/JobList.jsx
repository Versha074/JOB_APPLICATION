
import { useMemo, useState } from "react";

export default function JobList({ jobs, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredJobs = useMemo(() => {
    const result = jobs.filter((job) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        job.company?.toLowerCase().includes(query) ||
        job.position?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.applicationDate).getTime();
      const dateB = new Date(b.applicationDate).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [jobs, search, statusFilter, sortOrder]);

  const statusClass = (status) =>
    `job-status status-${status.toLowerCase()}`;

  return (
    <section className="job-browser">
      <aside className="job-filters">
        <div className="filter-heading">
          <h2>Filters</h2>
          <button
            type="button"
            className="clear-filters"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setSortOrder("newest");
            }}
          >
            Clear all
          </button>
        </div>

        <label className="filter-label" htmlFor="job-search">
          Search applications
        </label>
        <input
          id="job-search"
          type="search"
          placeholder="Company or job title"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <label className="filter-label" htmlFor="status-filter">
          Application status
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <label className="filter-label" htmlFor="sort-order">
          Date applied
        </label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>

        <p className="filter-count">
          {filteredJobs.length} of {jobs.length} applications
        </p>
      </aside>

      <div className="job-results">
        <div className="job-results-heading">
          <div>
            <p className="results-eyebrow">YOUR CAREER JOURNEY</p>
            <h2>Your Applications</h2>
          </div>
          <span className="results-count">{filteredJobs.length} results</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="empty-jobs">
            <div className="empty-jobs-icon">↗</div>
            <h3>
              {jobs.length === 0
                ? "No applications yet"
                : "No matching applications"}
            </h3>
            <p>
              {jobs.length === 0
                ? "Add your first job application to start tracking your progress."
                : "Try another search or clear your filters."}
            </p>
          </div>
        ) : (
          <div className="job-grid">
            {filteredJobs.map((job) => (
              <article className="job-card" key={job._id}>
                <div className="job-card-top">
                  <div className="company-logo" aria-hidden="true">
                    {job.company?.charAt(0)?.toUpperCase() || "J"}
                  </div>

                  <div className="job-title-group">
                    <h3>{job.position}</h3>
                    <p className="job-company">{job.company}</p>
                  </div>

                  <span className={statusClass(job.status)}>
                    {job.status}
                  </span>
                </div>

                <div className="job-card-details">
                  <p>
                    <span className="detail-icon">▦</span>
                    Applied on{" "}
                    {job.applicationDate
                      ? new Date(job.applicationDate).toLocaleDateString()
                      : "Date unavailable"}
                  </p>

                  {job.notes && (
                    <p className="job-notes">{job.notes}</p>
                  )}
                </div>

                <div className="job-card-actions">
                  {job.jobLink && (
                    <a
                      className="view-job-link"
                      href={job.jobLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View job ↗
                    </a>
                  )}

                  <label className="status-control">
                    <span>Update status</span>
                    <select
                      aria-label={`Update status for ${job.position} at ${job.company}`}
                      value={job.status}
                      onChange={(event) =>
                        onUpdate(job._id, {
                          status: event.target.value,
                        })
                      }
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </label>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete(job._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
