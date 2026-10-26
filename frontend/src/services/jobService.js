
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const getJobs = () => request("/jobs");

export const addJob = (job) =>
  request("/jobs", {
    method: "POST",
    body: JSON.stringify(job),
  });

export const updateJob = (id, job) =>
  request(`/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(job),
  });

export const deleteJob = (id) =>
  request(`/jobs/${id}`, {
    method: "DELETE",
  });
