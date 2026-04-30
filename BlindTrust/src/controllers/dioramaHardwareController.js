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
