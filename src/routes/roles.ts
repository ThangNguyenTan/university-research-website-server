import RoleController from "../controllers/roles";
import express from "express";
import { isAuthenticated } from "../middlewares";

const controller = new RoleController();

export default (router: express.Router) => {
  router.get("/role", controller.getRoles);
  router.post("/role", isAuthenticated, controller.createRole);
};
