const express = require("express");
const app = express();

app.get("/expenses/test", (req, res) => res.send("Expense test works"));

app.listen(5000, () => console.log("Server running on port 5000"));
