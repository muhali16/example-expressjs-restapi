class ErrorHandler extends Error {
  constructor(status, name, message) {
    super();
    this.status = status;
    this.name = name;
    this.message = message;
  }
}

module.exports = ErrorHandler