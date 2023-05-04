import PeopleController from "../controllers/people";
import express from "express";

const controller = new PeopleController();

export default (router: express.Router) => {
  router.get("/people", controller.getPeople);
  router.get("/people/:name", controller.getPerson);
  router.post("/people", controller.createPeople);
  router.patch("/people/:name", controller.updatePeople);
  router.delete("/people/:name", controller.deletePeople);
};
