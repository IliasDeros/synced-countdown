const Channels = require("pusher");

const {
  APP_ID: appId,
  KEY: key,
  SECRET: secret,
  CLUSTER: cluster
} = process.env;

const channels = new Channels({ appId, key, secret, cluster });

module.exports = (_, res) => {
  channels.trigger("countdown", "start", { message: "triggered from vercel" });
  res.status(200).end("sent event successfully");
};
