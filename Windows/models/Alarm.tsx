import { ModelBase } from "./ModelBase";

export type Alarm = ModelBase & {
  time: number;
  days: number[];

  one_time: boolean;
};
