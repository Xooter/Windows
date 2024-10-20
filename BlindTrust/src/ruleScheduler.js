import { db } from "./database.js";
import { RULE_TYPES, COMPARATORS } from "./utils.js";
import { setCurtain } from "./controllers/hardwareController.js";
import { getWeatherConditions } from "./controllers/weatherController.js";
import { convertTime } from "./utils.js";

let lastWeather;

export async function checkWeatherBasedRules() {
  await db.read();
  const { rules } = db.data;

  const weather = await getWeatherConditions().catch((err) => {
    console.error("Error getting weather data", err);
  });
  lastWeather = weather.data;

  for (const rule of rules) {
    if (!rule.active) continue;

    const conditionMet = checkConditionRule(rule);

    if (conditionMet) {
      console.log(`Rule ${rule.id} applies`);

      if (db.data.curtain !== rule.curtain) {
        setCurtain(alarm.curtain);
      }

      if (db.data.blind !== rule.blind) {
        setBlind(alarm.blind);
      }

      return;
    }
  }
}

export function checkConditionRule(rule) {
  if (!lastWeather) {
    console.warn("There is no weather data to check the rule");
    return false;
  }

  switch (rule.type) {
    case RULE_TYPES.WIND:
      return lastWeather.wind.speed > rule.value;
    case RULE_TYPES.TEMPERATURE:
      return evaluateCondition(
        lastWeather.main.temp,
        rule.comparator,
        rule.value,
      );
    case RULE_TYPES.RAIN:
      return lastWeather.rain;
    case RULE_TYPES.SUN_POSITION:
      return evaluateSunPosition(lastWeather.sys, lastWeather.timezone, rule);
    default:
      console.warn(`Rule type unknow: ${rule.type}`);
      return false;
  }
}

function evaluateSunPosition(data, timezone, rule) {
  // data: {
  //      "sunrise": 1726636384,
  //      "sunset": 1726680975
  //   }

  // ????
  const sunrise = data.sunrise * 1000;
  const sunset = data.sunset + timezone;

  const currentTime = new Date();
  const formattedTime = convertTime(currentTime);

  const timestamp = rule.comparator == COMPARATORS.LESS_THAN ? sunrise : sunset;

  const ruleTime = new Date(timestamp + rule.value * 60000); // added offset in minutes
  const ruleTimeFormatted = convertTime(ruleTime);

  return ruleTimeFormatted === formattedTime;
}

function evaluateCondition(actual, comparator, target) {
  switch (comparator) {
    case COMPARATORS.LESS_THAN:
      return actual < target;
    case COMPARATORS.GREATER_THAN:
      return actual > target;
    default:
      return false;
  }
}
