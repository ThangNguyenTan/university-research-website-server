import { Request, Response } from "express";
import JobService from "../services/jobs";
import _ from "lodash";

const jobService = new JobService();

export default class JobController {
  public async getJobs(req: Request, res: Response) {
    const response = await jobService.getJobs();
    return res.status(_.get(response, "status", 200)).json(response);
  }

  public async createJob(req: Request, res: Response) {
    const response = await jobService.createJob(req.body);
    return res.status(_.get(response, "status", 200)).json(response);
  }

  public async updateJob(req: Request, res: Response) {
    const response = await jobService.updateJob(req.params.jobName, req.body);
    return res.status(_.get(response, "status", 200)).json(response);
  }
}
