import express from "express";
import { db, initDB } from "./database.js";
import "dotenv/config";
import alarmsRoutes from "./routes/alarmsRoutes.js";
import rulesRoutes from "./routes/rulesRoutes.js";

import cron from "node-cron";
import { checkTimeBasedAlarms } from "./alarmScheduler.js";
import { checkWeatherBasedRules } from "./ruleScheduler.js";

import { setCurtain } from "./controllers/hardwareController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/alarms", alarmsRoutes);
app.use("/rules", rulesRoutes);

app.get("/", (_req, res) => {
  res.send({ curtain: db.data.curtain, blind: db.data.blind });
});

app.use((err, _req, res) => {
  console.error(err.stack);
  res.status(500);
});

initDB().then(() => {
  app.listen(PORT, () => {
    setCurtain(1);
    console.log(`Server running... http://localhost:${PORT}`);
  });
});

cron.schedule("* * * * *", () => {
  console.log("Checking alamrs...");
  checkTimeBasedAlarms().catch((error) => {
    console.error("Error checkTimeBasedAlarms:", error);
  });
});

cron.schedule("*/2 * * * *", () => {
  console.log("Checking rules...");
  checkWeatherBasedRules().catch((error) => {
    console.error("Error checkWeatherBasedRules:", error);
  });
});
