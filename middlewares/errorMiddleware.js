const jsonResponse = require("../utils/jsonResponse");

const errorMiddleware = (err, req, res, next) => {
  if (err.code === 11000) {
    err.message = 'Username ' + err.message.match(/(["'])(\\?.)*?\1/)[0] + ' already exist'
  }
  const { status = 500, message = "Internal server error", name = "InternalServer"} = err;
  res.status(status).json(jsonResponse(status, null, {name, message, stack: err.errors || err.stack}));
  console.log(err)
}

module.exports = errorMiddleware;