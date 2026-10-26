

const Job = require("../../models/Job");

// Create a job application
exports.createJob = async (req, res) => {
  try {
    const { company, position, status, jobLink, notes } = req.body;

    if (!company || !position) {
      return res.status(400).json({
        message: "Company and position are required",
      });
    }

    const job = await Job.create({
      company,
      position,
      status,
      jobLink,
      notes,
    });

    return res.status(201).json(job);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all job applications
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get a single job application
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid job ID",
    });
  }
};

// Update a job application
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Delete a job application
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid job ID",
    });
  }
};
