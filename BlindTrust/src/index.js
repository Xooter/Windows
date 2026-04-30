import express from "express";
import { initDB } from "./database.js";
import "dotenv/config";
import alarmsRoutes from "./routes/alarmsRoutes.js";
import rulesRoutes from "./routes/rulesRoutes.js";
import mainRoutes from "./routes/mainRoutes.js";
import cors from "cors";

import cron from "node-cron";
import { checkTimeBasedAlarms } from "./alarmScheduler.js";
import { checkWeatherBasedRules } from "./ruleScheduler.js";
import { fetchTemperature } from "./controllers/dioramaHardwareController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/alarms", alarmsRoutes);
app.use("/rules", rulesRoutes);
app.use("/", mainRoutes);

app.use((err, _req, res) => {
  console.error(err.stack);
});

initDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
  fetchTemperature();
});

cron.schedule("*/2 * * * *", () => {
  fetchTemperature().catch((error) => {
    console.error("Error fetchTemperature:", error);
  });
});

cron.schedule("* * * * *", () => {
  checkTimeBasedAlarms().catch((error) => {
    console.error("Error checkTimeBasedAlarms:", error);
  });
});

cron.schedule("*/2 * * * *", () => {
  checkWeatherBasedRules().catch((error) => {
    console.error("Error checkWeatherBasedRules:", error);
  });
});
