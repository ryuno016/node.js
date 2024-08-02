const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

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
    res.render("index", { users: result, foundUser: null, message: null });
  });
});

app.post("/", (req, res) => {
  const userId = req.body.userId;
  const sql = "SELECT * FROM users WHERE id = ?";

  con.query(sql, [userId], function (err, result) {
    if (err) throw err;

    if (result.length > 0) {
      res.render("index", { users: null, foundUser: result[0], message: null });
    } else {
      res.render("index", {
        users: null,
        foundUser: null,
        message: "該当するユーザーが見つかりません。",
      });
    }
  });
});

app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result) {
    if (err) throw err;
    res.render("edit", { user: result[0] });
  });
});

app.post("/update/:id", (req, res) => {
  const sql = "UPDATE users SET ? WHERE id = ?";
  con.query(sql, [req.body, req.params.id], function (err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO users SET ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/create", (req, res) => {
  res.render("form");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
