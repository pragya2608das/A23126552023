require("dotenv").config();
const axios = require("axios");
const logger = require("../logging-middleware/logger");

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const TYPE_WEIGHT = {
  Placement: 100,
  Result: 80,
  Event: 60,
};

function calculateScore(notification) {
  const ageMinutes =
    (Date.now() -
      new Date(notification.Timestamp).getTime()) /
    (1000 * 60);

  const recencyScore = Math.max(0, 50 - ageMinutes);

  return (
    (TYPE_WEIGHT[notification.Type] || 40) +
    recencyScore
  );
}

async function getTopNotifications() {
  try {
    logger.info("Fetching notifications");

   const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const response = await axios.get(API_URL, {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json"
  }
});

    const notifications =
      response.data.notifications || [];

    logger.info(
      `Fetched ${notifications.length} notifications`
    );

    const rankedNotifications = notifications.map(
      (notification) => ({
        ...notification,
        priorityScore:
          calculateScore(notification),
      })
    );

    rankedNotifications.sort(
      (a, b) => b.priorityScore - a.priorityScore
    );

    return rankedNotifications.slice(0, 10);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

module.exports = {
  getTopNotifications,
};