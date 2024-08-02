require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mainRoute = require("./routes/mainRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set('view engine', 'ejs');

app.use("/", mainRoute);