const Report = require("../models/Report");

// Create Report
const createReport = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
    } = req.body;

    const report = await Report.create({
      title,
      description,
      category,
      location,

      image: req.file
        ? `/uploads/${req.file.filename}`
        : "",
    });

    res.status(201).json(report);

  } catch (error) {
  console.error("Create Report Error:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};
//const get all reports
const getReports = async (req, res) => {
     console.log("GET /api/reports route hit");
  try {
    const reports = await Report.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Dashboard Stats
const getStats = async (req, res) => {
  try {
    const total = await Report.countDocuments();

    const pending = await Report.countDocuments({
      status: "Pending",
    });

    const inProgress = await Report.countDocuments({
      status: "In Progress",
    });

    const resolved = await Report.countDocuments({
      status: "Resolved",
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        inProgress,
        resolved,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Get Single Report
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Report
const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Report
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createReport,
  getReports,
  getStats,
  getReportById,
  updateReport,
  deleteReport,
};