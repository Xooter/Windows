import { db } from "../database.js";
import { setCurtain } from "./hardwareController.js";

export async function getInfo(_req, res) {
  await db.read();
  res.send({ curtain: db.data.curtain, blind: db.data.blind });
}

export async function sendInfo(req, res) {
  const info = req.body;

  setCurtain(info.curtain, () => {
    res.send(info);
  });
}
