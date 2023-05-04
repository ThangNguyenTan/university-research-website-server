"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const people_1 = __importDefault(require("../controllers/people"));
const middlewares_1 = require("../middlewares");
const controller = new people_1.default();
exports.default = (router) => {
    router.get("/people", controller.getPeople);
    router.get("/people/:name", controller.getPerson);
    router.post("/people", middlewares_1.isAuthenticated, controller.createPeople);
    router.patch("/people/:name", middlewares_1.isAuthenticated, controller.updatePeople);
    router.delete("/people/:name", middlewares_1.isAuthenticated, controller.deletePeople);
};
