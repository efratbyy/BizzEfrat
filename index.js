const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const login = require("./routes/login");
const register = require("./routes/register");
const profile = require("./routes/profile");
const cards = require("./routes/cards");
const users = require("./routes/users");


const app = express();
const PORT = process.env.PORT || 8000;

// For json requests
app.use(express.json());

// For browser requests
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/profile", profile);
app.use("/api/cards", cards);
app.use("/api/users", users);
app.use(cors());

mongoose
  .connect(process.env.dbString, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("home", { layout: "main" });
});

app.get("/", (req, res) => {
  res.render("home", { layout: "main2" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/pnf", (req, res) => {
  res.render("pnf");
});

app.get("/thanks", (req, res) => {
  res.render("thanks");
});

app.listen(PORT, () => console.log("Server started on port", PORT));
