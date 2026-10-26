
import { useState } from "react";

const initialForm = {
  company: "",
  position: "",
  status: "Applied",
  jobLink: "",
  notes: "",
};

export default function JobForm({ onAddJob }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onAddJob(form);
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>Add Job Application</h2>

      <input
        name="company"
        placeholder="Company name"
        value={form.company}
        onChange={handleChange}
        required
      />

      <input
        name="position"
        placeholder="Job position"
        value={form.position}
        onChange={handleChange}
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <input
        name="jobLink"
        type="url"
        placeholder="Job link (optional)"
        value={form.jobLink}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
        rows="3"
      />

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Add Application"}
      </button>
    </form>
  );
}
