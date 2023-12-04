const express = require("express");
const app = express();
const hostname = "localhost";
const port = 2307;

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.listen(port, hostname, () => {
  console.log(`Hello, running server ${hostname}:${port}`);
});
