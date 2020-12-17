const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cardRoute = require("./routes/cards");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./public/views"));

app.use(bodyParser.json());

app.use("/cards", cardRoute);

app.get("/", (req, res) => {
  res.render("index", { templates: templates });
});

mongoose.connect(
  `mongodb+srv://admin:admin1234@cluster0.dclwf.mongodb.net/flashCard_app?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection
  .on("connecting", () => console.log("connected"))
  .on("error", (err) => console.log(err));

app.listen(3000, () =>
  console.log("server is starting, working on http://localhost:3000")
);
