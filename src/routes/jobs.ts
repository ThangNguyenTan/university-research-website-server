import JobController from "../controllers/jobs";
import express from "express";
import { isAuthenticated } from "../middlewares";

const controller = new JobController();

export default (router: express.Router) => {
  router.get("/job", controller.getJobs);
  router.post("/job", controller.createJob);
  router.patch("/job/:jobName", controller.updateJob);
};
