const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getGroupSummary,getBalances } = require("../controllers/balanceController");

router.get("/all",authMiddleware,getBalances);
router.get("/summary/:groupId", authMiddleware, getGroupSummary);

module.exports = router;
