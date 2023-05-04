"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const people_1 = __importDefault(require("../controllers/people"));
const controller = new people_1.default();
exports.default = (router) => {
    router.get("/people", controller.getPeople);
    router.get("/people/:name", controller.getPerson);
    router.post("/people", controller.createPeople);
    router.patch("/people/:name", controller.updatePeople);
    router.delete("/people/:name", controller.deletePeople);
};
