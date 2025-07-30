// server/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const emailRoutes = require("./routes/email");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/email", emailRoutes);

app.get("/healthz", (req, res) => res.status(200).send("ok"));

const distPath = path.join(__dirname, "public");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
