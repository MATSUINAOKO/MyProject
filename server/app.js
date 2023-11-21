const express = require("express");
const app = express();
const database = require("./knex");

app.use(express.json());

//確認用
app.get("/api", (req, res) => {
  res.json("Expressつながりました");
});

//m_userの全データを返す
app.get("/api/user", (req, res) => {
  database("m_user")
    .select()
    .then((result) => {
      res.send(result);
    });
});
module.exports = app;
