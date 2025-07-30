// server/server.js (CommonJS)
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const emailRoutes = require("./routes/email");

// App
const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

const allowlist = [
  "https://manpatel.com",
  "https://www.manpatel.com",
  "http://localhost:3000",
  "http://localhost:5173",
];
const railwayRegex = /\.railway\.app$/;

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowlist.includes(origin) || railwayRegex.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(helmet());

app.use("/api/email", emailRoutes);

app.get("/healthz", (req, res) => res.status(200).send("ok"));

const distPath = path.join(__dirname, "../client/dist");

app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
