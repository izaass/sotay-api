/* eslint-disable no-console */

import express from "express";
import cors from "cors";
import { corsOptions } from "~/config/cors";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
import { CONNECT_DB, GET_DB } from "~/config/mongodb";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";
const START_SERVER = () => {
  const app = express();
  //xu ly CORS
  app.use(cors(corsOptions));
  //enable req.bodu as json data
  app.use(express.json());
  //use APIs v1
  app.use("/v1", APIs_V1);
  //middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware);

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
