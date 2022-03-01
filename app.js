var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressLayouts = require("express-ejs-layouts");
var session = require('express-session')


const { sessionSecret } = require("./config/strings");

var dashBoardRouter = require("./routes/dashboard");
var indexRouter = require("./routes/index");
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');


// view engine setup
app.use(expressLayouts);
app.use(
  session({
    secret: sessionSecret,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
// app.set('layout','layouts/layout');
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// db.createLogConnection();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: 'melathilhardwares', cookie: { maxAge: 24 * 60 * 60 * 1000 } }))

app.use("/", indexRouter);
app.use('/admin', adminRouter);
app.use("/dashboard", dashBoardRouter);
app.use('/login', loginRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
