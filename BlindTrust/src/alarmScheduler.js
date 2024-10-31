import { db } from "./database.js";
import { evaluateSunPosition, checkConditionRule } from "./ruleScheduler.js";
import { setBlind, setCurtain } from "./controllers/hardwareController.js";
import { convertTime } from "./utils.js";
import { RULE_TYPES } from "./utils.js";

export async function checkTimeBasedAlarms() {
  await db.read();
  const { rules, alarms } = db.data;

  const { formattedTime, currentTime } = getFormattedCurrentTime();
  const currentDay = currentTime.getDay();

  for (const rule of rules) {
    if (!rule.active) continue;
    // Apply rule based on sun position each minute
    if (rule.type == RULE_TYPES.SUN_POSITION && evaluateSunPosition(rule)) {
      sendHardware(db, rule);
      return;
    }
    if (checkConditionRule(rule)) {
      return;
    }
  }

  for (const alarm of alarms) {
    if (!alarm.active) continue;
    if (!alarm.days || !alarm.days.includes(currentDay)) continue;

    const alarmDate = new Date(alarm.time);
    const alarmTimeFormatted = convertTime(alarmDate);

    if (alarmTimeFormatted === formattedTime) {
      sendHardware(db, alarm);

      console.log(`Alarm ${alarm.id} applies`);

      if (alarm.one_time) {
        alarm.active = false;
      }

      await db.write();
      return;
    }
  }
  await db.write();
}

export function getFormattedCurrentTime() {
  const currentTime = new Date();
  return {
    formattedTime: convertTime(currentTime),
    currentTime: currentTime,
  };
}

function sendHardware(db, item) {
  if (db.data.curtain !== item.curtain) {
    setCurtain(item.curtain);
  }

  if (db.data.blind !== item.blind) {
    setBlind(item.blind);
  }
}
