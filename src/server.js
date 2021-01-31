const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRoute = require("./routes/index.js");
const userRoute = require("./routes/user.js");
const apiRoute = require("./routes/api.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("../src/config/passport")(passport);

// Set serving static file
const app = express();
app.use(express.static(__dirname + "/public/"));

// Mongoose
mongoose.connect(
  `mongodb+srv://admin:admin1234@cluster0.dclwf.mongodb.net/flashCard_app?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
mongoose.connection
  .on("connecting", () => console.log("connected"))
  .on("error", (err) => console.log(err));

// Set viewes Engine
app.set("views", "./dist/views");
app.set("view engine", "pug");

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express session
app.use(
  session({
    secret: "secret",
    cookie: { _expires: 60000000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// flash Messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", indexRoute);
app.use("/user", userRoute);
app.use("/api", apiRoute);

app.listen(3000, () =>
  console.log("server is starting, working on http://localhost:3000")
);
