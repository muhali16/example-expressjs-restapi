const ErrorHandler = require('../utils/ErrorHandler');
const authService = require('../services/authService');
const jsonResponse = require('../utils/jsonResponse');

const authMiddleware = async (req, res, next) => {
  const status = 401;
  const name = 'AuthError';
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(status).json(jsonResponse(status, null, {name, message: 'Unauthenticated.'}));
  }

  const token = await authService.tokenCheck(authHeader);
  if (!token) {
    throw new ErrorHandler(401, "AuthError", 'Unauthenticated person, token invalid.');
  }
  next();
}

module.exports = authMiddleware;