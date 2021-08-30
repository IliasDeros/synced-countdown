import Pusher from "pusher-js";
import { animateCountdown } from "./clock";

const appKey = process.env.KEY;
const cluster = process.env.CLUSTER;

const showError = (message: string) => {
  document.querySelector("#js-app")!.innerHTML = `
    <span class="text-error">Uh oh! ${message}</span>
  `;
};

const showAppKeyError = () => {
  showError("Missing environment variable KEY or CLUSTER");
};

const showApiError = () => {
  showError("Failed to send message to api");
};

const startCountdown = async () => {
  const res = await fetch("/api/start-countdown");
  if (!res.ok) {
    showApiError();
  }
};

const subscribeTimer = () => {
  if (!appKey || !cluster) {
    return showAppKeyError();
  }
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  const pusher = new Pusher(appKey!, { cluster });

  const channel = pusher.subscribe("countdown");
  channel.bind("start", animateCountdown);
};

document.querySelector("#js-start")!.addEventListener("click", startCountdown);
subscribeTimer();
