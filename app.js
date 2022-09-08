const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookiesparser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
// connect to mongodb database
require("./DB/dataconnection");

app.use(cookiesparser());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routrs
app.use("/user", require("./routes/rounting"));
app.use("/api", require("./routes/upload"));

// app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
  res.send(`<h1 style="text-algin:center">🙋WelCome To BlueRocket🙋</h1>`);
});

app.listen(PORT, () => {
  console.log("Running server on PORT ", PORT);
});
