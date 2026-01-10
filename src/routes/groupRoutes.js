const express = require("express");
const router = express.Router();
const { createGroup, listGroups, testGroup } = require("../controllers/groupController");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/test", testGroup);
router.post("/create", authMiddleware, createGroup);
router.get("/list", listGroups);

module.exports = router;
