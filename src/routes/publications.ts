import PublicationController from "../controllers/publications";
import express from "express";

const controller = new PublicationController();

export default (router: express.Router) => {
  router.get("/publication", controller.getPublications);
  router.get("/publication/:title", controller.getPublication);
  router.post("/publication", controller.createPublication);
  router.patch("/publication/:title", controller.updatePublication);
  router.delete("/publication/:title", controller.deletePublication);
};
