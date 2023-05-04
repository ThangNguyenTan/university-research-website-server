import Multer from "multer";
import fbAdmin from "firebase-admin";
const FirebaseStorage = require("multer-firebase-storage");
import _ from "lodash";
import express from "express";

import MediaController from "../controllers/media";

const credentials = require("../key.json");

const fbInstance = fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(credentials),
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
