import Multer from "multer";
import fbAdmin from "firebase-admin";
const FirebaseStorage = require("multer-firebase-storage");
import _ from "lodash";
import express from "express";
var nodeBase64 = require("nodejs-base64-converter");
import "dotenv/config";

import MediaController from "../controllers/media";
import { isAuthenticated } from "../middlewares";

const credentials = nodeBase64.decode(process.env.FIREBASE_BASE64_FILE);

const parsedCredential = JSON.parse(credentials);
const { private_key: privateKey } = JSON.parse(
  process.env.FIREBASE_PRIVATE_KEY!
);

parsedCredential.private_key = privateKey
  ? privateKey.replace(/\\n/gm, "\n")
  : undefined;

const fbInstance = fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(parsedCredential),
  storageBucket: "gs://university-research-33c63.appspot.com",
});

const multer = Multer({
  storage: FirebaseStorage(
    {
      bucketName: "gs://university-research-33c63.appspot.com",
      public: true,
    },
    fbInstance
  ),
});

const controller = new MediaController();

export default (router: express.Router) => {
  router.post("/media/upload", multer.single("file"), controller.uploadFile);
};
