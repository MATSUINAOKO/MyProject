const express = require("express");
const path = require("path");
const app = express();
const database = require("./knex");
// const cors = require("cors");
// app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "dist")));

//確認用
app.get("/api", (req, res) => {
  res.json("Expressつながりました。サーバーからデータ取得");
  // res.json("Expressつながりました");
});

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

// app.get("/api/history", (req, res) => {
//   database("t_history")
//     .select("t_history.*", "m_user.user_name", "m_user.ikon")
//     .innerJoin("m_user", "t_history.user_id", "m_user.id")
//     .then((result) => {
//       res.header("Content-Type", "application/json");
//       res.send(result);
//     });
// });

//post処理
app.post("/api", async (req, res) => {
  const { text, sender } = req.body;
  res.json(req.body);
  // const user_id = await database("m_user").where("user_name", sender).first();
  // if (!user_id) {
  //   return res.status(400).json({ error: "userが見つかりません" });
  // }
  // const userID = user_id.id;
  // const result = await database("t_history").insert({
  //   user_id: userID,
  //   talk: text,
  // });
  // res.status(200).json({ id: result[0], user_id: userID, text: text });
});
module.exports = app;
