require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mainRoute = require("./server/routes/main");

const app = express();
const PORT = process.env.PORT || 3000;

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