import { JSONFilePreset } from "lowdb/node";

export let db;

export async function initDB() {
  const defaultData = { alarms: [], rules: [] };
  db = await JSONFilePreset("./db.json", defaultData);
  await db.read();
  db.data ||= { alarms: [], rules: [] };
  await db.write();
}
