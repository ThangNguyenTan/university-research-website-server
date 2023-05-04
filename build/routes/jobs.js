"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobs_1 = __importDefault(require("../controllers/jobs"));
const controller = new jobs_1.default();
exports.default = (router) => {
    router.get("/job", controller.getJobs);
    router.post("/job", controller.createJob);
    router.patch("/job/:jobName", controller.updateJob);
};
