
const Job = require("../models/Job");

// Create a job application
exports.createJob = async (req, res) => {
  try {
    const { company, position, status, jobLink, notes } = req.body;

    if (!company || !position) {
      return res.status(400).json({
        message: "Company and position are required"
      });
    }

    const job = await Job.create({
      company,
      position,
      status,
      jobLink,
      notes
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applications
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one application
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(400).json({ message: "Invalid job ID" });
  }
};

// Update an application
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an application
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid job ID" });
  }
};
