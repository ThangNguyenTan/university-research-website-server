"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication"));
const roles_1 = __importDefault(require("./roles"));
const jobs_1 = __importDefault(require("./jobs"));
const publications_1 = __importDefault(require("./publications"));
const people_1 = __importDefault(require("./people"));
const media_1 = __importDefault(require("./media"));
const router = express_1.default.Router();
exports.default = () => {
    (0, authentication_1.default)(router);
    (0, roles_1.default)(router);
    (0, jobs_1.default)(router);
    (0, publications_1.default)(router);
    (0, people_1.default)(router);
    (0, media_1.default)(router);
    return router;
};
