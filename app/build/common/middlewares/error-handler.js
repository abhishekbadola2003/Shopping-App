"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const __1 = require("../");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof __1.CustomError) {
        return res.status(err.statusCode).json({ errors: err.serialiseErrors() });
    }
    res.status(500).send({ errors: [{ message: 'something went wrong' }] });
};
exports.errorHandler = errorHandler;
