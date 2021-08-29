import Pusher from "pusher-js";

const appKey = process.env.KEY;

const startCountdown = () => {
  alert("start countdown");
};

const subscribeTimer = () => {
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  const pusher = new Pusher(appKey!, {
    cluster: "mt1"
  });

  const channel = pusher.subscribe("countdown");
  channel.bind("start", startCountdown);
};

const showAppKeyError = () => {
  document.querySelector("#js-app")!.innerHTML = `
    <span class="text-error">Fatal Error: Missing PUSHER_APP_KEY</span>
  `;
};

if (appKey) {
  subscribeTimer();
} else {
  showAppKeyError();
}
