require("dotenv").config();

import express from "express";
import proxy from "express-http-proxy";

import startApp from "./startApp";

import Bundler from "parcel-bundler";

const app = express();

//graphql proxy
app.use(
  "/graphql",
  proxy(process.env.BACKEND_ENDPOINT, {
    limit: "10mb",
    proxyReqPathResolver: function(req, res) {
      return require("url").parse(req.originalUrl).path;
    }
  })
);

// 使用parcel bundler 调试
app.use(new Bundler("./src/index.html").middleware());

startApp(app);
