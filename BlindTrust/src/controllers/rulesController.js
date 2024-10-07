import { db } from "../database.js";

export async function getRules(_req, res) {
  res.send(db.data.rules);
}

export async function createRule(req, res) {
  const newRule = req.body;

  db.data.rules.push(newRule);
  db.write();
  res.send(newRule);
}

export async function deleteRule(req, res) {
  const { id } = req.params;

  const alarmExists = db.data.rules.find((a) => a.id == id);

  if (!alarmExists) {
    return res.sendStatus(404);
  }

  const index = db.data.rules.indexOf(alarmExists);
  if (index > -1) {
    db.data.rules.splice(index, 1);
    db.write();
  }

  res.send(id);
}
