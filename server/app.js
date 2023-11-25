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
    .orderBy("t_history.updated_at", "desc")
    .limit(4)
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
  //リクエストデータを変数へ代入
  const { talk, user_name, user_id } = req.body;
  //knexからchatDBへinsert
  //returningメソッドを利用して、t_historyのidを返す
  const [newRecord] = await database("t_history").returning(["id"]).insert({
    user_id: user_id,
    talk: talk,
  });
  console.log("newRecord.id :", newRecord.id);
  res.status(200).json({ user_id: user_id, talk: talk, id: newRecord.id });
});

//delete処理
app.delete("/api/:delId", async (req, res) => {
  const delId = req.params.delId;
  console.log("delId :", delId);
  await database("t_history").where("id", delId).del();
  res.status(200).json({ delId: delId });
});

// app.post(
//   "/api/:sendingTalk/:sendingUserName/:sendingUserId",
//   async (req, res) => {
//     const sendingTalk = req.params.sendingTalk;
//     const sendingUserName = req.params.sendingUserName;
//     const sendingUserId = req.params.sendingUserId;

//     console.log("sendingData-------" + sendingTalk);
//     // const { talk, user_name, user_id } = sendingData;
//     const result = await database("t_history").insert({
//       user_id: sendingUserId,
//       talk: sendingTalk,
//     });
//     res.status(200).json({
//       user_id: sendingUserId,
//       talk: sendingTalk,
//     });
//   }
// );
module.exports = app;
