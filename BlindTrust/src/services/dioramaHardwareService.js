import { db } from "../database.js";
import axios from "axios";
import { FAN_DIRECTION } from "../database.js";

const DIORAMA_URL = "http://192.168.3.124";

const ax = axios.create({
  baseURL: DIORAMA_URL,
  timeout: 3000,
});

export async function fetchTemperature() {
  return ax
    .get(`/get-temp`)
    .then(async (resp) => {
      db.data.temperature = resp.data.temperature;
      db.data.humidity = resp.data.humidity;
      await db.write();
    })
    .catch(() => {
      console.error("Error fetching temperature");
    });
}

export async function dioramaFanOn() {
  return ax.get(`/diorama/fan/on`);
}
export async function dioramaFanOff() {
  return ax.get(`/diorama/fan/off`);
}

export async function dioramaACPower() {
  await ax.get(`/ac/power`);

  db.data.ac.on = !db.data.ac.on;
  await db.write();

  return db.data.ac.on;
}

export async function dioramaACSmart() {
  return ax.get(`/ac/smart`).then(async () => {
    db.data.ac.smart = !db.data.ac.smart;
    db.write();
  });
}
export async function dioramaACVertical() {
  return ax.get(`/ac/vertical`).then(async () => {
    db.data.ac.direction = FAN_DIRECTION.VERTICAL;
    db.write();
  });
}
export async function dioramaACHorizontal() {
  return ax.get(`/ac/horizontal`).then(async () => {
    db.data.ac.direction = FAN_DIRECTION.HORIZONTAL;
    db.write();
  });
}

// @params
// status: "on" | "off"
export async function dioramaACEconomy(status) {
  return ax.get(`/ac/economy?state=${status}`).then(async () => {
    db.data.ac.economy = status === "on";
    db.write();
  });
}

// @params
// status: "on" | "off"
export async function dioramaACQuiet(status) {
  return ax.get(`/ac/quiet?state=${status}`).then(async () => {
    db.data.ac.quiet = status === "on";
    db.write();
  });
}

// @params
// status: "on" | "off"
export async function dioramaACSleep(status) {
  return ax.get(`/ac/sleep?state=${status}`).then(async () => {
    db.data.ac.sleep = status === "on";
    db.write();
  });
}

// @params
// status: "on" | "off"
export async function dioramaACSuper(status) {
  return ax.get(`/ac/super?state=${status}`).then(async () => {
    db.data.ac.super = status === "on";
    db.write();
  });
}

// @params
// mode: enum
export async function dioramaACMode(mode) {
  return ax.get(`/ac/mode?mode=${mode}`).then(async () => {
    db.data.ac.mode = mode;
    db.write();
  });
}

// between 16..30
export async function dioramaACTemp(value) {
  return ax.get(`/ac/temp?value=${value}`).then(async () => {
    db.data.ac.temperature = value;
    db.write();
  });
}

// between 1..4
export async function dioramaACFan(value) {
  return ax.get(`/ac/fan?speed=${value}`).then(async () => {
    db.data.ac.fan_speed = value;
    db.write();
  });
}
