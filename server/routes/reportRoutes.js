
const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");
const {
  createReport,
  getReports,
  getStats,
  getReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportControllers");
router.put("/:id", protect, updateReport);
router.delete("/:id", protect, deleteReport);
router.get("/stats", getStats);
router.get("/", getReports);
router.get("/:id", getReportById);
router.post("/", upload.single("image"), createReport);

module.exports = router;