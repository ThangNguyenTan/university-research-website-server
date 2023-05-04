"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const helpers_1 = require("../helpers");
const PeopleModel = __importStar(require("../model/people"));
let PeopleService = class PeopleService {
    getPeople(size = 20, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let people = [];
                if (page == 0) {
                    people = yield PeopleModel.getAllPeoples();
                }
                else {
                    people = yield PeopleModel.getPeoples(size, page);
                }
                const count = yield PeopleModel.countTotalPeople();
                return (0, helpers_1.generateResponse)(200, "Success", { people, count });
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.generateResponse)();
            }
        });
    }
    getPerson(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const person = yield PeopleModel.getPeopleByName(name);
                if (!person) {
                    return (0, helpers_1.generateResponse)(404, "Not Found");
                }
                return (0, helpers_1.generateResponse)(200, "Success", { person });
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.generateResponse)();
            }
        });
    }
    createPeople(bodyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!bodyData.name) {
                    return (0, helpers_1.generateResponse)(400, "Invalid Input");
                }
                const people = yield PeopleModel.createPeople(bodyData);
                return (0, helpers_1.generateResponse)(200, "Success", { people });
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.generateResponse)();
            }
        });
    }
    updatePeople(name, bodyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!bodyData.name) {
                    return (0, helpers_1.generateResponse)(400, "Invalid Input");
                }
                const people = yield PeopleModel.updatePeopleByName(name, bodyData);
                return (0, helpers_1.generateResponse)(200, "Success", { people });
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.generateResponse)();
            }
        });
    }
    deletePeople(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const people = yield PeopleModel.deletePeopleByName(name);
                return (0, helpers_1.generateResponse)(200, "Success", { people });
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.generateResponse)();
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PeopleService.prototype, "getPeople", null);
__decorate([
    (0, tsoa_1.Get)("/{name}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PeopleService.prototype, "getPerson", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PeopleService.prototype, "createPeople", null);
__decorate([
    (0, tsoa_1.Patch)("/{name}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PeopleService.prototype, "updatePeople", null);
__decorate([
    (0, tsoa_1.Delete)("/{name}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PeopleService.prototype, "deletePeople", null);
PeopleService = __decorate([
    (0, tsoa_1.Route)("api/people"),
    (0, tsoa_1.Tags)("Peoples"),
    (0, tsoa_1.SuccessResponse)(200, "Success"),
    (0, tsoa_1.Response)(400, "Invalid Input", {
        message: "Invalid Input",
        status: 400,
    }),
    (0, tsoa_1.Response)(500, "Internal Server Error", {
        message: "Internal Server Error",
        status: 500,
    })
], PeopleService);
exports.default = PeopleService;
