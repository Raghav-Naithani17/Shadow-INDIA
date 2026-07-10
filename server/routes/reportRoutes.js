
const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportControllers");
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

router.get("/", getReports);
router.get("/:id", getReportById);
router.post("/", upload.single("image"), createReport);

module.exports = router;