import PeopleController from "../controllers/people";
import express from "express";
import { isAuthenticated } from "../middlewares";

const controller = new PeopleController();

export default (router: express.Router) => {
  router.get("/people", controller.getPeople);
  router.get("/people/:name", controller.getPerson);
  router.post("/people", isAuthenticated, controller.createPeople);
  router.patch("/people/:name", isAuthenticated, controller.updatePeople);
  router.delete("/people/:name", isAuthenticated, controller.deletePeople);
};
