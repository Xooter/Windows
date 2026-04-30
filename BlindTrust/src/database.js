import { JSONFilePreset } from "lowdb/node";

export let db;

export async function initDB() {
  const defaultData = {
    curtain: 0,
    blind: 0,
    humidity: 0,
    temperature: 0,
    alarms: [],
    rules: [],
  };

  db = await JSONFilePreset("./db.json", defaultData);
  await db.read();

  db.data = {
    ...defaultData,
    ...db.data,
  };

  await db.write();
}
