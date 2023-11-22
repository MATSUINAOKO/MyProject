const express = require("express");
const path = require("path");
const app = express();
const database = require("./knex");
// const cors = require("cors");
// app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "dist")));

//m_userの全データを返す
app.get("/api/user", (req, res) => {
  database("m_user")
    .select()
    .then((result) => {
      res.header("Content-Type", "application/json");
      res.send(result);
    });
});

//t＿historyの全データを返す（m_userとinnerjoin)
app.get("/api/history", (req, res) => {
  database("t_history")
    .select(
      "t_history.*",
      "m_user.id as user_id",
      "m_user.user_name",
      "m_user.ikon"
    )
    .innerJoin("m_user", "t_history.user_id", "m_user.id")
    // .orderBy("t_history.updated_at", "desc")
    // .limit(10)
    .then((result) => {
      res.header("Content-Type", "application/json");
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//post処理
app.post("/api", async (req, res) => {
  const { talk, user_name, user_id } = req.body;
  console.log("Received request body:", req.body);
  const result = await database("t_history").insert({
    user_id: user_id,
    talk: talk,
  });
  res.status(200).json({ id: result[0], user_id: user_id, talk: talk });
});
module.exports = app;
