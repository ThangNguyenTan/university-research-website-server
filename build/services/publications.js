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
const PublicationModel = __importStar(require("../model/publications"));
let PublicationService = class PublicationService {
    getPublications(type = "", size = 20, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publications = yield PublicationModel.getPublications(size, page, Object.assign({}, (type ? { type } : {})));
                const count = yield PublicationModel.countTotalPublications();
                return (0, helpers_1.generateResponse)(200, "Success", { publications, count });
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.generateResponse)();
            }
        });
    }
    getPublication(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publication = yield PublicationModel.getPublicationByName(title);
                if (!publication) {
                    return (0, helpers_1.generateResponse)(404, "Not Found");
                }
                return (0, helpers_1.generateResponse)(200, "Success", { publication });
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.generateResponse)();
            }
        });
    }
    createPublication(bodyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!bodyData.title) {
                    return (0, helpers_1.generateResponse)(400, "Invalid Input");
                }
                const publication = yield PublicationModel.createPublication(bodyData);
                return (0, helpers_1.generateResponse)(200, "Success", { publication });
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.generateResponse)();
            }
        });
    }
    updatePublication(title, bodyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!bodyData.title) {
                    return (0, helpers_1.generateResponse)(400, "Invalid Input");
                }
                const publication = yield PublicationModel.updatePublicationByTitle(title, bodyData);
                return (0, helpers_1.generateResponse)(200, "Success", { publication });
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.generateResponse)();
            }
        });
    }
    deletePublication(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publication = yield PublicationModel.deletePublicationByTitle(title);
                return (0, helpers_1.generateResponse)(200, "Success", { publication });
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
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PublicationService.prototype, "getPublications", null);
__decorate([
    (0, tsoa_1.Get)("/{title}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicationService.prototype, "getPublication", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicationService.prototype, "createPublication", null);
__decorate([
    (0, tsoa_1.Patch)("/{title}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PublicationService.prototype, "updatePublication", null);
__decorate([
    (0, tsoa_1.Delete)("/{title}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicationService.prototype, "deletePublication", null);
PublicationService = __decorate([
    (0, tsoa_1.Route)("api/publication"),
    (0, tsoa_1.Tags)("Publications"),
    (0, tsoa_1.SuccessResponse)(200, "Success"),
    (0, tsoa_1.Response)(400, "Invalid Input", {
        message: "Invalid Input",
        status: 400,
    }),
    (0, tsoa_1.Response)(500, "Internal Server Error", {
        message: "Internal Server Error",
        status: 500,
    })
], PublicationService);
exports.default = PublicationService;
