import AuthController from "../controllers/authentication";
import express from "express";

const controller = new AuthController();

export default (router: express.Router) => {
  router.post("/auth", controller.login);
};
