var express = require("express");
var path = require("path");
const logger = require("morgan");
const cors = require("cors");
const port = 5000;

const indexRouter = require("./routes/index");

const app = express();

// Pick and choose which middleware you want
// You will definitely add to and subtract from this list

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
// app.use("/contracts", indexRouter);
// app.use("/providers", indexRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
