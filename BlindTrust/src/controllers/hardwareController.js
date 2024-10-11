import { db } from "../database.js";

const API_URL = "http://192.168.1.123";

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

const percentageToTime = {
  1: 24.5, // 100% closed
  0.75: 20.39,
  0.5: 17.87,
  0.25: 7.85,
  0: 0.0, // 0% open
};
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

export async function setCurtain(value) {
  await db.read();
  const { curtain } = db.data;
  const steps = value - curtain;

  if (steps === 0) return;

  const movementTime = getCurtainMovementTime(curtain * 100, value * 100);
  console.log(`Moving curtain ${steps} steps in ${movementTime} seconds`);

  if (steps > 0) {
    await openCurtain(movementTime);
  } else {
    await closeCurtain(movementTime);
  }

  setTimeout(() => stopCurtain(), movementTime * 1000 + connectionDelayMs);

  db.data.curtain = value;
  await db.write();
}

async function openCurtain(value) {
  return axios.get(`${API_URL}/open`).then(async (response) => {
    db.data.curtain = value;
    await db.write();
  });
}

async function closeCurtain(value) {
  return axios.get(`${API_URL}/open`).then(async (response) => {
    db.data.curtain = value;
    await db.write();
  });
}

async function stopCurtain() {
  return axios.get(`${API_URL}/stop-all`);
}

export async function setBlind(value) {
  await db.read();
  const { blind } = db.data;

  db.data.blind = value;
  await db.write();
}
