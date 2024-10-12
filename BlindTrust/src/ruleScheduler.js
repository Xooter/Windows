import { db } from "./database.js";
import { RULE_TYPES, COMPARATORS } from "./utils.js";
import { setCurtain } from "./controllers/hardwareController.js";
import { getWeatherConditions } from "./controllers/weatherController.js";

let lastWeather;

export async function checkWeatherBasedRules() {
  await db.read();
  const { rules } = db.data;

  lastWeather = await getWeatherConditions();

  for (const rule of rules) {
    if (!rule.active) continue;

    const conditionMet = checkConditionRule(rule);

    if (conditionMet) {
      console.log(`Rule ${rule.id} applies`);

      if (db.data.curtain !== rule.curtain) {
        setCurtain(alarm.curtain);
      }

      if (db.data.blind !== rule.blind) {
        //// TODO:
        //sendCommand("blind", rule.blind);
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
    default:
      console.warn(`Rule type unknow: ${rule.type}`);
      return false;
  }
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
