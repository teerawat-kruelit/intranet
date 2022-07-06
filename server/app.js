const express = require("express");
const router = require("./src/routes");
const app = express();
const databaseConfig = require("./config/database.config");
const mssql = require("mssql");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    name: "app.sid",
    secret: "022222222222",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false, // dont let browser javascript access cookie ever
      secure: false, // only use cookie over https
      SameSite: false, // only use cookie over https
      maxAge: 30 * 24 * 60 * 60 * 1000 //1 month before expireผ
    },
  })
);

app.use(router);

app.listen(4000, () => {
  console.log("server is running on port " + 4000);
});

app.use("/check", (req, res) => {
  console.log(req.session);
  return res.send("1");
});

mssql.connect(databaseConfig, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("database connected");
});
