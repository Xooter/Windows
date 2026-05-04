import { create } from "zustand";
import axios from "axios";
import { Toast } from "toastify-react-native";

export const FAN_DIRECTION = {
  VERTICAL: "VERTICAL",
  HORIZONTAL: "HORIZONTAL",
} as const;

export const AC_MODES = {
  COLD: "cold",
  HOT: "hot",
  FAN: "fan",
  HUMIDITY: "humidity",
} as const;

export type FanDirection = (typeof FAN_DIRECTION)[keyof typeof FAN_DIRECTION];
export type AcMode = (typeof AC_MODES)[keyof typeof AC_MODES];

interface AcState {
  on: boolean;
  mode: AcMode;
  temperature: number;
  fan_speed: number;
  super: boolean;
  economy: boolean;
  smart: boolean;
  quiet: boolean;
  sleep: boolean;
  direction: FanDirection;
}

interface AcStore {
  ac: AcState;
  loading: boolean;
  disabled: boolean;
  fetchStatus: () => Promise<void>;
  toggleOn: () => Promise<void>;
  toggleDirection: () => Promise<void>;
  setSmart: () => Promise<void>;
  setEconomy: (value: boolean) => Promise<void>;
  setQuiet: (value: boolean) => Promise<void>;
  setSuper: (value: boolean) => Promise<void>;
  setSleep: (value: boolean) => Promise<void>;
  setMode: (mode: AcMode) => Promise<void>;
  setTemperature: (temperature: number) => Promise<void>;
  setFanSpeed: (fan_speed: number) => Promise<void>;
}

const DEFAULT_AC: AcState = {
  on: false,
  mode: AC_MODES.COLD,
  temperature: 22,
  fan_speed: 1,
  super: false,
  economy: false,
  smart: false,
  quiet: false,
  sleep: false,
  direction: FAN_DIRECTION.VERTICAL,
};

const api = () =>
  axios.create({
    baseURL: `http://${process.env.EXPO_PUBLIC_BASE_BACK}.duckdns.org:4002/ac`,
    timeout: 3000,
  });

const request = async (path: string, params?: Record<string, any>) => {
  await api().get(path, { params });
};

const toState = (val: boolean) => (val ? "on" : "off");

const DELAY_MS = 2000;

// optimistic: aplica el cambio, dispara el request, si falla revierte
const optimistic = async (
  set: any,
  get: any,
  nextAc: Partial<AcState>,
  req: () => Promise<void>,
) => {
  if (get().disabled) return;

  const prev = get().ac;
  set((s: AcStore) => ({ ac: { ...s.ac, ...nextAc }, disabled: true }));

  const timeout = setTimeout(() => {
    set({ disabled: false });
  }, DELAY_MS);

  try {
    await req();
  } catch {
    clearTimeout(timeout);
    set({ ac: prev, disabled: false });
    Toast.error("Error calling server");
  }
};

export const useAcStore = create<AcStore>((set, get) => ({
  ac: DEFAULT_AC,
  loading: false,
  disabled: false,

  fetchStatus: async () => {
    try {
      set({ loading: true });
      const { data } = await api().get("/");
      set({ ac: data });
    } catch {
      Toast.error("Error calling server");
    } finally {
      set({ loading: false });
    }
  },

  toggleOn: async () => {
    const { ac } = get();
    await optimistic(set, get, { on: !ac.on }, () => request("/power"));
  },

  toggleDirection: async () => {
    const { ac } = get();
    const isVertical = ac.direction === FAN_DIRECTION.VERTICAL;
    const next = isVertical ? FAN_DIRECTION.HORIZONTAL : FAN_DIRECTION.VERTICAL;
    await optimistic(set, get, { direction: next }, () =>
      request("/direction", { direction: next }),
    );
  },

  setSmart: async () => {
    const { ac } = get();
    const next = !ac.smart;
    await optimistic(
      set,
      get,
      { smart: next, economy: false, quiet: false, super: false, sleep: false },
      () => request("/smart"),
    );
  },

  setEconomy: async (value) => {
    await optimistic(
      set,
      get,
      {
        economy: value,
        smart: false,
        quiet: false,
        super: false,
        sleep: false,
      },
      () => request("/economy", { state: toState(value) }),
    );
  },

  setQuiet: async (value) => {
    await optimistic(
      set,
      get,
      {
        quiet: value,
        smart: false,
        economy: false,
        super: false,
        sleep: false,
      },
      () => request("/quiet", { state: toState(value) }),
    );
  },

  setSuper: async (value) => {
    await optimistic(
      set,
      get,
      {
        super: value,
        smart: false,
        economy: false,
        quiet: false,
        sleep: false,
      },
      () => request("/super", { state: toState(value) }),
    );
  },

  setSleep: async (value) => {
    await optimistic(
      set,
      get,
      {
        sleep: value,
        smart: false,
        economy: false,
        quiet: false,
        super: false,
      },
      () => request("/sleep", { state: toState(value) }),
    );
  },

  setMode: async (mode) => {
    await optimistic(set, get, { mode }, () => request("/mode", { mode }));
  },

  setTemperature: async (temperature) => {
    await optimistic(set, get, { temperature }, () =>
      request("/temp", { value: temperature }),
    );
  },

  setFanSpeed: async (fan_speed) => {
    await optimistic(set, get, { fan_speed }, () =>
      request("/fan", { speed: fan_speed }),
    );
  },
}));
