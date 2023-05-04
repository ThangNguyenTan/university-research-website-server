import RoleController from "../controllers/roles";
import express from "express";

const controller = new RoleController();

export default (router: express.Router) => {
  router.get("/role", controller.getRoles);
  router.post("/role", controller.createRole);
};
