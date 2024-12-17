"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const __1 = require("../");
class RequestValidationError extends __1.CustomError {
    constructor(errors) {
        super('Invalid request');
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serialiseErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.param };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
