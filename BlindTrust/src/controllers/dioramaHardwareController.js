import { db } from "../database.js";
import axios from "axios";

const DIORAMA_URL = "http://192.168.3.124";

export async function fetchTemperature() {
  return axios.get(`${DIORAMA_URL}/get-temp`).then(async (resp) => {
    db.data.temperature = resp.data.temperature;
    db.data.humidity = resp.data.humidity;
    await db.write();
  });
}

export async function handleOn() {
  return axios.get(`${DIORAMA_URL}/diorama/fan/on`);
}
export async function handleOff() {
  return axios.get(`${DIORAMA_URL}/diorama/fan/off`);
}

export async function handlePower() {
  return axios.get(`${DIORAMA_URL}/ac/power`).then(async () => {
    db.data.ac.on = !db.data.ac.on;
    db.write();
  });
}
export async function handleSmart() {
  return axios.get(`${DIORAMA_URL}/ac/smart`).then(async () => {
    db.data.ac.smart = !db.data.ac.smart;
    db.write();
  });
}
export async function handleVertical() {
  return axios.get(`${DIORAMA_URL}/ac/vertical`).then(async () => {
    db.data.ac.direction = FAN_DIRECTION.VERTICAL;
    db.write();
  });
}
export async function handleHorizontal() {
  return axios.get(`${DIORAMA_URL}/ac/horizontal`).then(async () => {
    db.data.ac.direction = FAN_DIRECTION.HORIZONTAL;
    db.write();
  });
}

// @params
// status: "on" | "off"
export async function handleEconomy(status) {
  return axios
    .get(`${DIORAMA_URL}/ac/economy?status=${status}`)
    .then(async () => {
      db.data.ac.economy = status === "on";
      db.write();
    });
}

// @params
// status: "on" | "off"
export async function handleQuiet(status) {
  return axios
    .get(`${DIORAMA_URL}/ac/quiet?status=${status}`)
    .then(async () => {
      db.data.ac.quiet = status === "on";
      db.write();
    });
}

// @params
// status: "on" | "off"
export async function handleSleep(status) {
  return axios
    .get(`${DIORAMA_URL}/ac/sleep?status=${status}`)
    .then(async () => {
      db.data.ac.sleep = status === "on";
      db.write();
    });
}

// @params
// status: "on" | "off"
export async function handleSuper(status) {
  return axios
    .get(`${DIORAMA_URL}/ac/super?status=${status}`)
    .then(async () => {
      db.data.ac.super = status === "on";
      db.write();
    });
}

// @params
// mode: enum
export async function handleMode(mode) {
  return axios.get(`${DIORAMA_URL}/ac/mode?mode=${mode}`).then(async () => {
    db.data.ac.mode = mode;
    db.write();
  });
}

// between 16..30
export async function handleTemp(value) {
  return axios.get(`${DIORAMA_URL}/ac/temp?value=${value}`).then(async () => {
    db.data.ac.temperature = value;
    db.write();
  });
}

// between 1..4
export async function handleFan(value) {
  return axios.get(`${DIORAMA_URL}/ac/fan?speed=${value}`).then(async () => {
    db.data.ac.fan_speed = !db.data.ac.fan_speed;
    db.write();
  });
}
