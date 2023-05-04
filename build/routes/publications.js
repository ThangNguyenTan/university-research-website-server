"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publications_1 = __importDefault(require("../controllers/publications"));
const middlewares_1 = require("../middlewares");
const controller = new publications_1.default();
exports.default = (router) => {
    router.get("/publication", controller.getPublications);
    router.get("/publication/:title", controller.getPublication);
    router.post("/publication", middlewares_1.isAuthenticated, controller.createPublication);
    router.patch("/publication/:title", middlewares_1.isAuthenticated, controller.updatePublication);
    router.patch("/publication/:title/participants/:personId", middlewares_1.isAuthenticated, controller.assignParticipantToPublication);
    router.delete("/publication/:title", middlewares_1.isAuthenticated, controller.deletePublication);
    router.delete("/publication/:title/participants/:personId", middlewares_1.isAuthenticated, controller.removeParticipantToPublication);
};
