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
const people_1 = __importDefault(require("../services/people"));
const lodash_1 = __importDefault(require("lodash"));
const peopleService = new people_1.default();
class PeopleController {
    getPeople(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { size, page } = req.query;
            const response = yield peopleService.getPeople(size, page);
            const count = lodash_1.default.get(response, "count", 0);
            const meta = {
                "x-total-items": count,
                "x-page": page,
                "x-last_page": Math.floor(count / size) + 1,
                "x-page-size": size,
            };
            return res
                .status(lodash_1.default.get(response, "status", 200))
                .json(Object.assign(Object.assign({}, response), { meta }));
        });
    }
    getPerson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield peopleService.getPerson(req.params.name);
            return res.status(lodash_1.default.get(response, "status", 200)).json(response);
        });
    }
    createPeople(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield peopleService.createPeople(req.body);
            return res.status(lodash_1.default.get(response, "status", 200)).json(response);
        });
    }
    updatePeople(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield peopleService.updatePeople(req.params.name, req.body);
            return res.status(lodash_1.default.get(response, "status", 200)).json(response);
        });
    }
    deletePeople(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield peopleService.deletePeople(req.params.name);
            return res.status(lodash_1.default.get(response, "status", 200)).json(response);
        });
    }
}
exports.default = PeopleController;
