/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from "express";
import { env } from "~/config/environment";

import { CONNECT_DB, GET_DB } from "~/config/mongodb";

const START_SERVER = () => {
  const app = express();
  app.get("/", async (req, res) => {
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(
      `Hello ${env.AUTHOR}, Back-end server is running at at http://${env.APP_HOST}:${env.APP_PORT}/`
    );
  });
  // Do something when app is closing
  process.stdin.resume(); // so the program will not close instantly
  function exitHandler(options, exitCode) {
    if (options.cleanup) console.log("clean");
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) console.log("Server is shutting down...Bye Bye...");
    process.exit();
  }

  // do something when app is closing
  process.on("exit", exitHandler.bind(null, { cleanup: true }));

  // catches ctrl+c event
  process.on("SIGINT", function () {
    exitHandler({ exit: true });
  });
  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
  // catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

  // Do something when app is closing
};
(async () => {
  try {
    console.log("Connecting to MongoDB...");
    await CONNECT_DB();
    console.log("Connected");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

// console.log("Connecting to MongoDB...");

// CONNECT_DB()
//   .then(() => {
//     console.log("Connected");
//   })
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error);
//     process.exit(0);
//   });
