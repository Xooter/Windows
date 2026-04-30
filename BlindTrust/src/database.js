import { JSONFilePreset } from "lowdb/node";

export let db;

const FAN_DIRECTION = {
  VERTICAL: "VERTICAL",
  HORIZONTAL: "HORIZONTAL",
};

const AC_MODES = {
  COLD: "cold",
  HOT: "hot",
  FAN: "fan",
  HUMIDITY: "humidity",
};

export async function initDB() {
  const defaultData = {
    curtain: 0,
    blind: 0,
    humidity: 0,
    temperature: 0,

    ac: {
      on: false,
      mode: AC_MODES.COLD,
      temperature: 0,
      fan_speed: 0,
      super: false,
      economy: false,
      smart: false,
      quiet: false,
      direction: FAN_DIRECTION.VERTICAL,
    },

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
