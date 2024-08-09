const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

// Works in local using browser and also in Postman
// Does not sets cookie in browser when using http client module in angular running on localhost

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL_PROD,
    methods: ["GET"],
    exposedHeaders: process.env.ACCESS_TOKEN,
    credentials: true,
  })
);

app.get("/api", (req, res) => {
  try {
    const message = "Hello";
    console.log(message);
    res.status(200).send({ message: message });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

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
    const message = "Verifying cookie";
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
    const token = "";
    console.log(message);
    return (
      res
        //.clearCookie(process.env.ACCESS_TOKEN)
        .cookie(process.env.ACCESS_TOKEN, `${token}`, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .setHeader(process.env.ACCESS_TOKEN, `${token}`)
        .status(200)
        .send({ message: message })
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  const deploymentMarker = 1;
  console.log(
    `Build # ${deploymentMarker}\nServer is running on ${process.env.PORT}`
  );
});
