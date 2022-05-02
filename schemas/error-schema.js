class ErrorRes {
  constructor(message, status = 400) {
    this.status = status;
    this.message = message;
  }
}

class NotFoundErrorRes extends ErrorRes {
  constructor(message) {
    super(message, 404);
  }
}

class InvalidFieldErrorRes extends ErrorRes {
  constructor(message, fieldErrors, status = 422) {
    super(message, status);
    this.fieldErrors = fieldErrors;
  }
}
module.exports = {
  ErrorRes,
  NotFoundErrorRes,
  InvalidFieldErrorRes,
};
