"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
const generateResponse = (statusCode = 500, message = "Internal Server Error", addtionalData = {}) => {
    return Object.assign({ status: statusCode, message }, addtionalData);
};
exports.generateResponse = generateResponse;
