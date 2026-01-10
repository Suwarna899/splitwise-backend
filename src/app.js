const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://s_suwarna:Suwarna%40123@cluster0.auai9tn.mongodb.net/?appName=Cluster0"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const app = express(); // must be before any app.use()

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const balanceRoutes = require("./routes/balanceRoutes");

app.use("/auth", authRoutes);
app.use("/groups", groupRoutes);
app.use("/expenses", expenseRoutes);
app.use("/balances", balanceRoutes);

// Test root
app.get("/", (req, res) => res.send("Splitwise API is running"));

// Test expense route
app.get("/expenses/test", (req, res) => res.send("Expense test works"));

module.exports = app;
