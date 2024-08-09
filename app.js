const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET"],
    exposedHeaders: process.env.ACCESS_TOKEN,
    credentials: true,
  })
);

app.get("/set-cookie", (req, res) => {
  try {
    const message = "Setting cookie";
    console.log(message);
    const token = "verysimpletoken";
    return res
      .cookie(process.env.ACCESS_TOKEN, `${token}`, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .setHeader(process.env.ACCESS_TOKEN, `${token}`)
      .status(200)
      .send({ message: message });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/verify-cookie", (req, res) => {
  try {
    const message = "Veryfying cookie";
    console.log(message);
    console.log("All cookies -", req.cookies);
    console.log("Access token -", req.cookies[process.env.ACCESS_TOKEN]);
    return res.status(200).send({ message: message });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/clear-cookie", (req, res) => {
  try {
    const message = "Clearing cookie";
    console.log(message);
    return res
      .clearCookie(process.env.ACCESS_TOKEN)
      .status(200)
      .send({ message: message });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
