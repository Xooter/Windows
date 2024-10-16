import { ModelBase } from "./ModelBase";

export enum RuleType {
  WIND,
  RAIN,
  TEMPERATURE,
  SUN_POSITION,
}

export enum RuleComparator {
  LESS,
  GREATER,
}

export type Rule = ModelBase & {
  type: RuleType;
  comparator: RuleComparator;
  value: number;
};

export type RuleCreateDTO = Omit<Rule, "id" | "active">;
