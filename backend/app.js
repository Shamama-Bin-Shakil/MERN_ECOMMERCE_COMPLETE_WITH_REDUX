const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const app = express();
// Config
dotenv.config({ path: "backend/config/config.env" });

// Apply Middleware
app.use(express.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(fileUpload());

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
// Route Imports
const errorMiddleware = require("./middleware/error");

const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoute");

// app.get("/setcookie", (req, res) => {
//   // console.log('Cookies: ', req.cookies)
//   // console.log("=========================================================================")
//   // console.log('Signed Cookies: ', req.signedCookies)
//   res.cookie("name", "express")
//   console.log
//   res.json(req.cookies);
// });

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Use Middleware
app.use(errorMiddleware);

module.exports = app;
