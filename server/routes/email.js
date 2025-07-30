const express = require("express");
const router = express.Router();
const { sendEmail } = require("../resend");

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const result = await sendEmail({ firstName, lastName, email, message });

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;
