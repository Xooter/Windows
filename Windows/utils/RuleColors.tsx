import { RuleType } from "@/models/Rule";

export const typeColor = (type: RuleType) => {
  switch (type) {
    case RuleType.TEMPERATURE:
      return "#f7b733";
    case RuleType.WIND:
      return "#7881ff";
    case RuleType.RAIN:
      return "#87A2FF";
  }
};
