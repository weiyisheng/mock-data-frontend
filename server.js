require("dotenv").config();

import express from "express";
import proxy from "express-http-proxy";

import Bundler from "parcel-bundler";

import path from "path";
import compression from "compression";

import config from "config";
import bundleOptions from "./bundleOptions";

const app = express();
if (process.env.NODE_ENV === "production") {
  app.use(compression());
}
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.resolve("public")));

//graphql proxy
app.use(
  "/graphql",
  proxy(config.BACKEND_ENDPOINT, {
    limit: "10mb",
    proxyReqPathResolver: function(req, res) {
      return require("url").parse(req.originalUrl).path;
    }
  })
);

// 打包
const bundler = new Bundler("./views/index.html", bundleOptions);
bundler.bundle();
function respond(res) {
  function resolveRes() {
    res.render(path.join(__dirname, "public", "dist", "index.html"), {
      API_SERVER_HOST: config.API_SERVER_HOST
    });
  }
  if (bundler.pending) {
    bundler.once("bundled", resolveRes);
    // res.send("正在构建...");
  } else {
    resolveRes();
  }
}

app.use("*", (req, res) => {
  respond(res);
});

app.listen(config.PORT, () => {
  //console.log("GraphQL Server is now running on http://localhost:4000");
});
