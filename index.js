require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mainRoute = require("./server/routes/main");
const connectToDB = require("./server/config/db");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set('view engine', 'ejs');

app.use("/", mainRoute);

app.listen(PORT, () => {
    console.log(`Server is running on
    http://localhost:${PORT}`);
}
);