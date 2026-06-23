const express = require("express");
const cors = require("cors");
const { getTopNotifications } = require("./notificationService");

const app = express();

app.use(cors());

app.get("/api/notifications", async (req, res) => {
  try {
    const data = await getTopNotifications();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});