import express from "express";
import { initDB } from "./database.js";
import "dotenv/config";
import alarmsRoutes from "./routes/alarmsRoutes.js";
import rulesRoutes from "./routes/rulesRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/alarms", alarmsRoutes);
app.use("/rules", rulesRoutes);

app.get("/", (_req, res) => {
  res.send("It's working!");
});

app.use((err, _req, res) => {
  console.error(err.stack);
  res.status(500);
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running... http://localhost:${PORT}`);
  });
});
