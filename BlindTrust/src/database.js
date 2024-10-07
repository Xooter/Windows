import { JSONFilePreset } from "lowdb/node";

export let db;

export async function initDB() {
  const defaultData = { curtain: 0, blind: 0, alarms: [], rules: [] };
  db = await JSONFilePreset("./db.json", defaultData);
  await db.read();
  db.data ||= { curtain: 0, blind: 0, alarms: [], rules: [] };
  await db.write();
}
