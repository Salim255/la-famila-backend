//Catching Uncaught Exception Errors
process.on("uncaughtException", err => {
  console.log("UNHANDLED EXCEPTION! 💥 Shutting down...");

  console.log(err.name, err.message);

  process.exit(1);
});

const app = require("./src/app");

require("dotenv").config();

const appConfig = require("./src/config/app");

const dbConfig = require("./src/config/db");

const pool = require("./src/config/pool");

const { default: migrate } = require("node-pg-migrate");

const port = appConfig.appPort || 6001;

let server;

const autoMigration = async () => {
  try {
    // Run our migration programmatically in the new schema
    await migrate({
      schema: "public",

      direction: "up",

      log: () => {}, //By passing empty function to log, there will be no logs to the console

      noLock: true, //By default we should run one migration at the time, we ride that by passing noLock =true, so we can run as many migration we want

      dir: "migrations", //File where our migrations files stored

      /*  databaseUrl: {
        host: dbTestConfig.dbHost,
        port: dbTestConfig.dbPort,
        database: dbTestConfig.dbDatabase,
        user: roleName,
        password: roleName,
      }, */
      databaseUrl: {
        host: "user-photos-db-srv",
        port: dbConfig.dbPort,
        database: "postgres",
        user: "postgres",
        password: "postgres",
      },

      /*  databaseUrl: {
        host: "localhost",
        port: dbConfig.dbPort,
        database: "photos-services",
        user: "salimhassanmohamed",
        password: "",
      }, */
    });
  } catch (error) {
    console.log("====================================");
    console.log(error, "Hello connection error🧶🧶🧶");
    console.log("====================================");
  }
};

autoMigration();

const connectionOptions1 = {
  host: "user-photos-db-srv",
  port: dbConfig.dbPort,
  database: "postgres",
  user: "postgres",
  password: "postgres",
};
const connectionOptions2 = {
  host: "localhost",
  port: dbConfig.dbPort,
  database: "photos-services",
  user: "salimhassanmohamed",
  password: "",
};
pool
  .connect({
    host: "user-photos-db-srv",
    port: dbConfig.dbPort,
    database: "postgres",
    user: "postgres",
    password: "postgres",
  })
  .then(() => {
    server = app().listen(6001, () => {
      console.log("====================================");
      console.log(`Server running on porttttttttttttttt  6001!!!!!!!!!!,`);

      console.log("====================================");
    });
  })
  .catch(err => {
    console.error(err);
  });

//Centralized method to handle all unhandledRejections  in the application, by listing to unhandledRejections events
process.on("unhandledRejection", err => {
  console.log(err.name, err.message);

  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  //Now we exit the application after unhandledRejections nicely be close the server then exit the application
  server.close(() => {
    //By running server close, we the server a time to finish all request that still pending or being handled at the time.
    process.exit(1);
  });
});
