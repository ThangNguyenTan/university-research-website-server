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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = exports.isAuthenticated = void 0;
const lodash_1 = require("lodash");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.cookies["Authorization"];
        if (!sessionToken) {
            return res.sendStatus(401);
        }
        const existingUser = true;
        if (!existingUser) {
            return res.sendStatus(403);
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
exports.isAuthenticated = isAuthenticated;
const isOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, "identity._id", "");
        if (!currentUserId || currentUserId.toString() != id) {
            return res.sendStatus(403);
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
exports.isOwner = isOwner;
