import { db } from "../database.js";

export async function getAlarms(_req, res) {
  res.send(db.data.alarms);
}

export async function createAlarm(req, res) {
  const newAlarm = req.body;

  db.data.alarms.push(newAlarm);
  db.write();
  res.send(newAlarm);
}

export async function deleteAlarm(req, res) {
  const { id } = req.params;

  const alarmExists = db.data.alarms.find((a) => a.id == id);

  if (!alarmExists) {
    return res.sendStatus(404);
  }

  const index = db.data.alarms.indexOf(alarmExists);
  if (index > -1) {
    db.data.alarms.splice(index, 1);
    db.write();
  }

  res.send(id);
}
