"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobs_1 = __importDefault(require("../services/jobs"));
const lodash_1 = __importDefault(require("lodash"));
const jobService = new jobs_1.default();
class JobController {
    getJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield jobService.getJobs();
            return res.status(lodash_1.default.get(response, "status", 200)).json(response);
        });
    }
    createJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield jobService.createJob(req.body);
            return res.status(lodash_1.default.get(response, "status", 200)).json(response);
        });
    }
    updateJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield jobService.updateJob(req.params.jobName, req.body);
            return res.status(lodash_1.default.get(response, "status", 200)).json(response);
        });
    }
}
exports.default = JobController;
