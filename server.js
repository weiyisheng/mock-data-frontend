require("dotenv").config();

import express from "express";
import proxy from "express-http-proxy";

import Bundler from "parcel-bundler";

import path from 'path';
import compression from 'compression';

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
if(process.env.NODE_ENV === 'development') {
  app.use(new Bundler("./src/index.html").middleware());
} else {
  app.use(compression())
  app.use(express.static(path.resolve('public')))
  app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
  });
}

app.listen(process.env.PORT, () => {
  //console.log("GraphQL Server is now running on http://localhost:4000");
});
