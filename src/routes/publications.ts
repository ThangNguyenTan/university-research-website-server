import PublicationController from "../controllers/publications";
import express from "express";
import { isAuthenticated } from "../middlewares";

const controller = new PublicationController();

export default (router: express.Router) => {
  router.get("/publication", controller.getPublications);
  router.get("/publication/:title", controller.getPublication);
  router.post("/publication", isAuthenticated, controller.createPublication);
  router.patch(
    "/publication/:title",
    isAuthenticated,
    controller.updatePublication
  );
  router.patch(
    "/publication/:title/participants/:personId",
    isAuthenticated,
    controller.assignParticipantToPublication
  );
  router.delete(
    "/publication/:title",
    isAuthenticated,
    controller.deletePublication
  );
  router.delete(
    "/publication/:title/participants/:personId",
    isAuthenticated,
    controller.removeParticipantToPublication
  );
};
