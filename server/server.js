// server/server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const emailRoutes = require("./routes/email");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

const corsOptions = {
  origin: [
    "https://manpatel.com",
    "https://www.manpatel.com",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

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
