const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "express_db",
});

app.get("/", (req, res) => {
  const sql = "select * from users";

  // 基礎課題01: 文字列
  const message = "こんにちは、Express.js！";

  // 基礎課題02: リスト
  const myList = ["りんご", "バナナ", "みかん"];

  // 基礎課題03: マップ
  const myMap = [
    { name: "s.chiba", email: "s.chiba@gmail.com" },
    { name: "t.kosuge", email: "t.kosuge@gmail.com" },
    { name: "m.chiba", email: "m.chiba@gmail.com" },
    { name: "t.suzuki", email: "t.suzuki@gmail.com" },
    { name: "t.hasegawa", email: "t.hasegawa@gmail.com" },
  ];

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", {
      users: result,
      message: message,
      list: myList,
      map: myMap,
    });
  });
});

app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render("edit", {
      user: result,
    });
  });
});

app.post("/update/:id", (req, res) => {
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
