import { db } from "./database.js";

export const RULE_TYPES = {
  WIND: 1,
  TEMPERATURE: 2,
  RAIN: 3,
};

export const COMPARATORS = {
  LESS_THAN: 0,
  GREATER_THAN: 1,
};

export function getMaxId(type) {
  return db.data[type].reduce((max, rule) => Math.max(max, rule.id), 0);
}

export function getItemById(type, id) {
  return db.data[type].find((a) => a.id == id);
}
