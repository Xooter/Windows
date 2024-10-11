import { db } from "./database.js";
import { RULE_TYPES, COMPARATORS } from "./utils.js";
import { setCurtain } from "./controllers/hardwareController.js";

let lastWeather;

export async function checkWeatherBasedRules() {
  await db.read();
  const { rules } = db.data;

  const weather = {
    temperature: 25,
    rain: false,
  }; //await getWeatherConditions();

  lastWeather = weather;

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
      return lastWeather.windSpeed > rule.value;
    case RULE_TYPES.TEMPERATURE:
      return evaluateCondition(
        lastWeather.temperature,
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
