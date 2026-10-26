
import { useCallback, useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar.jsx";
import JobForm from "./components/JobForm.jsx";
import JobList from "./components/JobList.jsx";
import DashboardCards from "./components/DashboardCards.jsx";
import ApplicationChart from "./components/ApplicationChart.jsx";

import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} from "./services/jobService.js";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Fetch job applications from the backend
  const loadJobs = useCallback(async () => {
    setRefreshing(true);

    try {
      setError("");
      const data = await getJobs();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response from the server.");
      }

      setJobs(data);
    } catch (err) {
      setError(
        err.message || "Unable to load applications. Check your backend."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Add a new application
  async function handleAddJob(job) {
    try {
      setError("");
      await addJob(job);
      await loadJobs();
    } catch (err) {
      setError(err.message || "Failed to add application.");
      throw err;
    }
  }

  // Update application details or status
  async function handleUpdateJob(id, changes) {
    try {
      setError("");
      await updateJob(id, changes);
      await loadJobs();
    } catch (err) {
      setError(err.message || "Failed to update application.");
    }
  }

  // Delete an application
  async function handleDeleteJob(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteJob(id);
      await loadJobs();
    } catch (err) {
      setError(err.message || "Failed to delete application.");
    }
  }

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        {/* Hero banner */}
        <header className="hero-banner">
          <div className="hero-content">
            <span className="hero-eyebrow">
              YOUR CAREER, ORGANIZED
            </span>

            <h1>Keep track of your dream job.</h1>

            <p>
              Manage your applications, follow your progress,
              and stay ready for your next opportunity.
            </p>

            <a href="#applications" className="hero-button">
              View Applications →
            </a>

            <button
              type="button"
              className="refresh-button"
              onClick={loadJobs}
              disabled={refreshing}
            >
              {refreshing
                ? "Refreshing..."
                : "Refresh Applications"}
            </button>
          </div>

          <div className="hero-art" aria-hidden="true">
            <span className="art-shape shape-green"></span>
            <span className="art-shape shape-black"></span>
            <span className="art-shape shape-yellow"></span>
          </div>
        </header>

        {error && (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button type="button" onClick={loadJobs}>
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <p>Loading your applications...</p>
          </div>
        ) : (
          <>
            {/* Application statistics */}
            <section
              className="dashboard-section"
              aria-label="Application statistics"
            >
              <DashboardCards jobs={jobs} />
            </section>

            {/* Application status chart */}
            <section
              className="dashboard-section"
              aria-label="Application status chart"
            >
              <ApplicationChart jobs={jobs} />
            </section>

            {/* Add a job application */}
            <section
              id="add-job"
              className="dashboard-section"
              aria-label="Add a job application"
            >
              <JobForm onAddJob={handleAddJob} />
            </section>

            {/* All job applications */}
            <section
              id="applications"
              className="dashboard-section"
              aria-label="Your job applications"
            >
              <JobList
                jobs={jobs}
                onUpdate={handleUpdateJob}
                onDelete={handleDeleteJob}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

