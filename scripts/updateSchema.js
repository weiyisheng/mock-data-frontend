// require("babel-register")
// require("babel-polyfill")

require("dotenv").config();

var fs = require("fs");
var path = require("path");
var introspectionQuery = require("./introspectionQuery");

// TODO change superagent tot fetch, maybe
var request = require("superagent");

request
  .post(`${process.env.BACKEND_ENDPOINT}/graphql`)
  .send({ query: introspectionQuery })
  .end(function(err, response) {
    if (err) {
      console.error("Error occured: ", err);
    } else {
      var result = response.body;
      if (result.errors) {
        console.error(
          "ERROR introspecting schema: ",
          JSON.stringify(result.errors, null, 2)
        );
      } else {
        fs.writeFileSync(
          path.join(__dirname, "./schema.json"),
          JSON.stringify(result, null, 2)
        );
      }
    }
  });

// fetch(`${process.env.BACKEND_ENDPOINT}/graphql`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     query: introspectionQuery
//   })
// }).then(response => {
//   if (err) {
//     console.error("Error occured: ", err);
//   } else {
//     var result = response.body;
//     if (result.errors) {
//       console.error(
//         "ERROR introspecting schema: ",
//         JSON.stringify(result.errors, null, 2)
//       );
//     } else {
//       fs.writeFileSync(
//         path.join(__dirname, "../build/schema.json"),
//         JSON.stringify(result, null, 2)
//       );
//     }
//   }
// });
