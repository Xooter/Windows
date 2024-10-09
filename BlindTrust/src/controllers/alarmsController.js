import { db } from "../database.js";

export async function getAlarms(_req, res) {
  res.send(db.data.alarms);
}

export async function createAlarm(req, res) {
  const newAlarm = req.body;

  const maxId = db.data.alarms.reduce(
    (max, alarm) => Math.max(max, alarm.id),
    0,
  );

  newAlarm.id = maxId + 1;
  newAlarm.active = true;

  db.data.alarms.push(newAlarm);
  db.write();
  res.send(newAlarm);
}

export async function activeAlarm(req, res) {
  const { id } = req.params;

  const alarmExists = db.data.alarms.find((a) => a.id == id);

  if (!alarmExists) {
    return res.sendStatus(404);
  }

  const index = db.data.alarms.indexOf(alarmExists);
  if (index > -1) {
    db.data.alarms[index].active = !alarmExists.active;
    db.write();
  }

  res.send(id);
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
