"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const FirebaseStorage = require("multer-firebase-storage");
const media_1 = __importDefault(require("../controllers/media"));
const credentials = require("../key.json");
const fbInstance = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(credentials),
    storageBucket: "gs://university-research-33c63.appspot.com",
});
const multer = (0, multer_1.default)({
    storage: FirebaseStorage({
        bucketName: "gs://university-research-33c63.appspot.com",
        public: true,
    }, fbInstance),
});
const controller = new media_1.default();
exports.default = (router) => {
    router.post("/media/upload", multer.single("file"), controller.uploadFile);
};
