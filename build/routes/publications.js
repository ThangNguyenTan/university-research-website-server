"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publications_1 = __importDefault(require("../controllers/publications"));
const controller = new publications_1.default();
exports.default = (router) => {
    router.get("/publication", controller.getPublications);
    router.get("/publication/:title", controller.getPublication);
    router.post("/publication", controller.createPublication);
    router.patch("/publication/:title", controller.updatePublication);
    router.delete("/publication/:title", controller.deletePublication);
};
