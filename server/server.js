const express = require("express");
const cors = require("cors");
const emailRoutes = require("./routes/email");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5000;


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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
