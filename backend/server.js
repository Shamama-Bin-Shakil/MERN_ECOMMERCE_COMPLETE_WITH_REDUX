const app = require("./app");

const dotenv = require("dotenv");

const cloudinary = require("cloudinary");

const mongoDBConnect = require("./config/db");

// Handling Uncaught Exception =====> console.log(youtube)
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
mongoDBConnect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER IS LISTENING http://localhost:${process.env.PORT}`);
});

// UnHandled Promise Rejection ====> Server Crashing Suddenly (SERVER OFF)
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unHandle Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
