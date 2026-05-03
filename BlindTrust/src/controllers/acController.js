import { db } from "../database.js";
import * as dioramaService from "../services/dioramaHardwareService.js";
import { FAN_DIRECTION } from "../database.js";

const status = (s) => {
  return s ? "on" : "off";
};

export async function handleStatus(_req, res) {
  db.read();
  return res.send({
    power: db.data.ac.power,
    smart: db.data.ac.smart,
    economy: db.data.ac.economy,
    quiet: db.data.ac.quiet,
    sleep: db.data.ac.sleep,
    super: db.data.ac.super,
    direction: db.data.ac.direction,
    mode: db.data.ac.mode,
    temp: db.data.ac.temp,
    fan: db.data.ac.fan,
  });
}

export async function handlePower(_req, res) {
  return dioramaService
    .dioramaACPower()
    .then(async (ac_status) => {
      if (ac_status) {
        await dioramaService.dioramaFanOn();
      } else {
        await dioramaService.dioramaFanOff();
      }
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
}

export async function handleSmart(_req, res) {
  return dioramaService
    .dioramaACSmart()
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
}

export async function handleEconomy(_req, res) {
  await db.read();
  const e = status(db.data.ac.economy);

  return dioramaService
    .dioramaACEconomy(e)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
}

export async function handleQuiet(_req, res) {
  await db.read();
  const q = status(db.data.ac.quiet);

  return dioramaService
    .dioramaACQuiet(q)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
}

export async function handleSleep(_req, res) {
  await db.read();
  const s = status(db.data.ac.sleep);

  return dioramaService
    .dioramaACSleep(s)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
}

export async function handleSuper(_req, res) {
  await db.read();
  const s = status(db.data.ac.super);

  return dioramaService
    .dioramaACSuper(s)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
}

export async function handleDirection(_req, res) {
  try {
    const direction = _req.query.direction;

    if (direction == FAN_DIRECTION.VERTICAL) {
      await dioramaService.dioramaACVertical();
    } else {
      await dioramaService.dioramaACHorizontal();
    }

    return res.sendStatus(200);
  } catch {
    return res.sendStatus(500);
  }
}

export async function handleMode(_req, res) {
  const mode = _req.query.mode;

  return dioramaService
    .dioramaACMode(mode)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
}

export async function handleTemp(_req, res) {
  const value = parseInt(_req.query.value);
  if (value < 16 || value > 30) {
    return res.sendStatus(400, "Temperature out of range");
  }

  return dioramaService
    .dioramaACTemp(value)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
}

export async function handleFan(_req, res) {
  const value = parseInt(_req.query.value);
  if (value < 1 || value > 4) {
    return res.sendStatus(400, "Speed out of range");
  }
  return dioramaService
    .dioramaACFan(value)
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(() => {
      return res.sendStatus(500);
    });
}
