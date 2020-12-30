const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const indexRoute = require("./routes/index.js");
const userRoute = require("./routes/users.js");
// Set serving static file
const app = express();
app.use(express.static(__dirname + "/public/"));
console.log(__dirname + "\\public");

// Mongoose
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

// Set viewes Engine
app.set("views", "./dist/views");
app.set("view engine", "pug");

// Body parser
app.use(bodyParser.json());

// Routes
app.use("/", indexRoute);
app.use("/users", userRoute);

// app.get("/", (req, res) => {
//   res.render("login");
// });
// app.get("/dashboard", (req, res) => {
//   res.render("index");
// });

app.listen(3000, () =>
  console.log("server is starting, working on http://localhost:3000")
);
