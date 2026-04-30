import { db } from "../database.js";
import { setBlind, setCurtain } from "./hardwareController.js";

export async function getInfo(_req, res) {
  await db.read();
  res.send({ curtain: db.data.curtain, blind: db.data.blind });
}

export async function getTemperature(_req, res) {
  await db.read();
  res.send({
    temperature: db.data.temperature ?? 0,
    humidity: db.data.humidity ?? 0,
  });
}

export async function sendInfo(req, res) {
  const info = req.body;

  setCurtain(info.curtain, () => {
    res.send(info);
  });

  setBlind(info.blind);
}
