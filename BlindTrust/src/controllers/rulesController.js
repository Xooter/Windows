import { db } from "../database.js";
import { getItemById, getMaxId } from "../utils.js";

export async function getRules(_req, res) {
  res.send(db.data.rules);
}

export async function createRule(req, res) {
  const newRule = req.body;

  const maxId = getMaxId("rules");
  newRule.id = maxId + 1;
  newRule.active = true;

  db.data.rules.push(newRule);
  db.write();
  res.send(newRule);
}

export async function activeRule(req, res) {
  const { id } = req.params;

  const ruleExists = getItemById("rules", id);

  if (!ruleExists) {
    return res.sendStatus(404);
  }

  const index = db.data.rules.indexOf(ruleExists);
  if (index > -1) {
    db.data.rules[index].active = !ruleExists.active;
    db.write();
  }

  res.send(id);
}

export async function deleteRule(req, res) {
  const { id } = req.params;

  const ruleExists = getItemById("rules", id);

  if (!ruleExists) {
    return res.sendStatus(404);
  }

  const index = db.data.rules.indexOf(ruleExists);
  if (index > -1) {
    db.data.rules.splice(index, 1);
    db.write();
  }

  res.send(id);
}
