/* eslint-disable no-undef */
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser')
const createError = require("http-errors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({origin: true}));

/**
 * Cloud firestore configuration
 */
const serviceAccount = require("./key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
db = admin.firestore();

// Routers import
const adminRouter = require("./routes/admin");
const usersRouter = require("./routes/users");

app.get("/test", (req,res) => {
  res.send("Inframinds")
})

app.use((req, res, next) => {
  console.log(req.method);
  next();
});

app.use("/admin", adminRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = {};

  // render the error page
  res.status(err.status || 500);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
module.exports = app;
