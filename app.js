require('express-async-errors');
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require('./routes/auth');
const merchantRouter = require('./routes/merchant');
const errorMiddleware = require('./middlewares/errorMiddleware');
const jsonResponse = require("./utils/jsonResponse");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  message: "You are reach a limit, try again later."
}))
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com'],
      styleSrc: ["'self'", 'trusted-cdn.com']
    }
  },
  frameguard: {
    action: 'deny'
  },
  referrerPolicy: {
    policy: 'no-referrer'
  },
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// route
app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/merchant", merchantRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);
app.use((req, res) => {
  res.status(404).json(jsonResponse(404, null, "Endpoint not found."));
})

module.exports = app;
