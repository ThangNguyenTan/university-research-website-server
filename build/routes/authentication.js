"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("../controllers/authentication"));
const controller = new authentication_1.default();
exports.default = (router) => {
    router.post("/auth", controller.login);
};
