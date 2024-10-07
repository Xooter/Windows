import { ModelBase } from "./ModelBase";

export type Alarm = ModelBase & {
  time: Date;
  days: number[];

  one_time: boolean;
};
