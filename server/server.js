const express = require("express");
const cors = require("cors");
const emailRoutes = require("./routes/email");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // adjust origin if needed
app.use(express.json());

app.use("/api/email", emailRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
