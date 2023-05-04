import {
  Get,
  Post,
  Patch,
  Route,
  Body,
  SuccessResponse,
  Response,
  Tags,
  Path,
} from "tsoa";
import { generateResponse, DefaultReponseBody } from "../helpers";
import * as JobModel from "../model/jobs";

type CreateJobRequestBody = {
  name: string;
  description: string;
};

type UpdateJobRequestBody = {
  name: string;
  description: string;
  recruit: boolean;
};

type MutateJobResponseBody = {
  status: number;
  message: string;
  job?: JobModel.Job;
};

type FetchJobsResponseBody = {
  status: number;
  message: string;
  jobs?: JobModel.Job[];
};

@Route("api/job")
@Tags("Jobs")
@SuccessResponse(200, "Success")
@Response<DefaultReponseBody>(400, "Invalid Input", {
  message: "Invalid Input",
  status: 400,
})
@Response<DefaultReponseBody>(500, "Internal Server Error", {
  message: "Internal Server Error",
  status: 500,
})
export default class JobService {
  @Get("/")
  public async getJobs(): Promise<FetchJobsResponseBody> {
    try {
      const jobs: JobModel.Job[] = await JobModel.getJobs();

      return generateResponse(200, "Success", { jobs });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Post("/")
  public async createJob(
    @Body() bodyData: CreateJobRequestBody
  ): Promise<MutateJobResponseBody> {
    try {
      if (!bodyData.name) {
        return generateResponse(400, "Invalid Input");
      }

      const job = await JobModel.createJob(bodyData);

      return generateResponse(200, "Success", { job });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @SuccessResponse(200, "Successfully Updated")
  @Patch("/{id}")
  public async updateJob(
    @Path() jobName: string,
    @Body() bodyData: UpdateJobRequestBody
  ): Promise<MutateJobResponseBody> {
    try {
      const updatedJob = await JobModel.updateJobByName(jobName, bodyData);

      return generateResponse(200, "Successfully Updated", { job: updatedJob });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }
}
