const express = require("express");
const app = express();
const router = require("./route");
const expressLayouts = require("express-ejs-layouts");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./assets"));

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", router);

app.set("view engine", "ejs");
app.set("views", "./views");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Connected to server: http://localhost:${PORT}`);
});
