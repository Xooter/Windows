import { db } from "./database.js";

export function getMaxId(type) {
  return db.data[type].reduce((max, rule) => Math.max(max, rule.id), 0);
}

export function getItemById(type, id) {
  return db.data[type].find((a) => a.id == id);
}
