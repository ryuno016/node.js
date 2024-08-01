const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // フォームデータの解析

const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "express_db",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render("index", { users: result, foundUser: null, message: null }); // 初期表示ではfoundUserとmessageはnull
  });
});

app.post("/", (req, res) => {
  const userId = req.body.userId; // フォームからIDを取得
  const sql = "SELECT * FROM users WHERE id = ?";

  con.query(sql, [userId], function (err, result) {
    if (err) throw err;

    if (result.length > 0) {
      // ユーザーが見つかった場合
      res.render("index", { users: null, foundUser: result[0], message: null });
    } else {
      // ユーザーが見つからなかった場合
      res.render("index", { users: null, foundUser: null, message: "該当するユーザーが見つかりません。" });
    }
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
