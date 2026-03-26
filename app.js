const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const errorHandler  = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory API with JWT Authentication"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;