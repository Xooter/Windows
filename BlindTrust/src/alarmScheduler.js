import { db } from "./database.js";
import { checkConditionRule } from "./ruleScheduler.js";

export async function checkTimeBasedAlarms() {
  await db.read();
  const { rules, alarms } = db.data;

  const currentTime = new Date();
  const formattedTime = convertTime(currentTime);
  const currentDay = currentTime.getDay();

  for (const rule of rules) {
    if (!rule.active) continue;
    if (checkConditionRule(rule)) {
      return;
    }
  }

  for (const alarm of alarms) {
    if (!alarm.active) continue;
    if (!alarm.time) continue;
    if (!alarm.one_time && (!alarm.days || !alarm.days.includes(currentDay)))
      continue;

    const alarmDate = new Date(alarm.time);
    const alarmTimeFormatted = convertTime(alarmDate);
    console.log(`Comparing ${alarmTimeFormatted} - ${formattedTime}`);

    if (alarmTimeFormatted === formattedTime) {
      if (db.data.curtain !== alarm.curtain) {
        //sendCommand("curtain", alarm.curtain);
        db.data.curtain = alarm.curtain;
      }

      if (db.data.blind !== alarm.blind) {
        //sendCommand("blind", alarm.blind);
        db.data.blind = alarm.blind;
      }

      console.log(`Alarm ${alarm.id} applies`);
      alarm.lastExecuted = formattedTime;

      if (alarm.one_time) {
        alarm.active = false;
      }
    }
  }
  await db.write();
}

function convertTime(time) {
  return `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`;
}
