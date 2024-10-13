import { db } from "../database.js";
import axios from "axios";

// [HARDWARE API]
// {API_URL}/cortina POST {"steps": number}
// {API_URL}/open
// {API_URL}/close
// {API_URL}/stop-all
//
// [TIMES CURTAIN]
// 100%     24.5s
// 75%      20.39s
// 50%      17.87s
// 25%      07.85s
// 0%       00.00s
//
const API_URL = "http://192.168.3.123";

const percentageToTime = {
  1: 24.5, // 100% closed
  0.75: 20.39,
  0.5: 17.87,
  0.25: 7.85,
  0: 0.0, // 0% open
};

const BLIND_MAX_STEPS = 10000; // blind 100% closed

const connectionDelayMs = 100;

function calculateTimeForPercentage(percentage) {
  if (percentage > 1 || percentage < 0)
    throw new Error("The percentage must be between 0 and 1");

  return percentageToTime[percentage] ?? 0;
}

function getCurtainMovementTime(currentPercentage, targetPercentage) {
  const currentTime = calculateTimeForPercentage(currentPercentage);
  const targetTime = calculateTimeForPercentage(targetPercentage);

  return Math.abs(currentTime - targetTime).toFixed(3);
}

export async function setCurtain(value, callback = () => {}) {
  await db.read();
  const { curtain } = db.data;
  const steps = value - curtain;

  if (steps === 0) return;

  const movementTime = getCurtainMovementTime(curtain, value);
  console.log(`Moving curtain ${steps * 100}% in ${movementTime} seconds`);

  try {
    if (steps > 0) {
      await openCurtain(movementTime);
    } else {
      await closeCurtain(movementTime);
    }

    setTimeout(
      () => stopCurtain(callback),
      movementTime * 1000 + connectionDelayMs,
    );

    db.data.curtain = value;
    await db.write();
  } catch (error) {
    console.error("Failed to move blind:", error);
  }
}

async function openCurtain(value) {
  return axios.get(`${API_URL}/open`).then(async () => {
    db.data.curtain = value;
    await db.write();
  });
}

async function closeCurtain(value) {
  return axios.get(`${API_URL}/close`).then(async () => {
    db.data.curtain = value;
    await db.write();
  });
}

async function stopCurtain(callback = () => {}) {
  return axios.get(`${API_URL}/stop-all`).then(callback);
}

export async function setBlind(value, callback = () => {}) {
  await db.read();
  const { blind } = db.data;

  const steps = getBlindMovementSteps(blind, value);

  if (steps === 0) return;

  console.log(`Moving blind ${steps} steps`);

  try {
    await axios.post(`${API_URL}/cortina`, { steps: steps }).then(() => {
      db.data.blind = value;
      callback();
    });
    await db.write();
  } catch (error) {
    console.error("Failed to move blind:", error);
  }
}

function getBlindMovementSteps(currentPercentage, targetPercentage) {
  const currentSteps = calculateStepsForPercentage(currentPercentage);
  const targetSteps = calculateStepsForPercentage(targetPercentage);
  return targetSteps - currentSteps;
}

function calculateStepsForPercentage(percentage) {
  if (percentage > 1 || percentage < 0) {
    throw new Error("The percentage must be between 0 and 1");
  }

  return Math.round(percentage * BLIND_MAX_STEPS);
}
