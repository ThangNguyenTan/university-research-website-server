"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roles_1 = __importDefault(require("../controllers/roles"));
const middlewares_1 = require("../middlewares");
const controller = new roles_1.default();
exports.default = (router) => {
    router.get("/role", controller.getRoles);
    router.post("/role", middlewares_1.isAuthenticated, controller.createRole);
};
