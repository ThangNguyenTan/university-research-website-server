import {
  Get,
  Post,
  Route,
  Body,
  SuccessResponse,
  Response,
  Tags,
  Path,
  Delete,
  Patch,
  Query,
  Header,
} from "tsoa";
import { generateResponse, DefaultReponseBody } from "../helpers";
import * as PeopleModel from "../model/people";

type CreatePeopleRequestBody = {
  name: string;
  email: string;
  coverImagePath: string;
  description: string;
  role: string;
  job: string;
};

type UpdatePeopleRequestBody = {
  name?: string;
  email?: string;
  coverImagePath?: string;
  description?: string;
  role?: string;
  job?: string;
};

type MutatePeopleResponseBody = {
  status: number;
  message: string;
  people?: PeopleModel.People;
};

type FetchPeopleResponseBody = {
  status: number;
  message: string;
  people?: PeopleModel.People[];
};

type FetchPersonResponseBody = {
  status: number;
  message: string;
  person?: PeopleModel.People;
};

@Route("api/people")
@Tags("Peoples")
@SuccessResponse(200, "Success")
@Response<DefaultReponseBody>(400, "Invalid Input", {
  message: "Invalid Input",
  status: 400,
})
@Response<DefaultReponseBody>(500, "Internal Server Error", {
  message: "Internal Server Error",
  status: 500,
})
export default class PeopleService {
  @Get("/")
  public async getPeople(
    @Query() size: number = 20,
    @Query() page: number = 1
  ): Promise<FetchPeopleResponseBody> {
    try {
      let people: PeopleModel.People[] = [];
      if (page == 0) {
        people = await PeopleModel.getAllPeoples();
      } else {
        people = await PeopleModel.getPeoples(size, page);
      }
      const count = await PeopleModel.countTotalPeople();

      return generateResponse(200, "Success", { people, count });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Get("/{name}")
  public async getPerson(
    @Path() name: string
  ): Promise<FetchPersonResponseBody> {
    try {
      const person: PeopleModel.People | null =
        await PeopleModel.getPeopleByName(name);

      if (!person) {
        return generateResponse(404, "Not Found");
      }

      return generateResponse(200, "Success", { person });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Post("/")
  public async createPeople(
    @Body() bodyData: CreatePeopleRequestBody,
    @Header("X-Access-Token") _token: string = ""
  ): Promise<MutatePeopleResponseBody> {
    try {
      if (!bodyData.name) {
        return generateResponse(400, "Invalid Input");
      }

      const people = await PeopleModel.createPeople(bodyData);

      return generateResponse(200, "Success", { people });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Patch("/{name}")
  public async updatePeople(
    @Path() name: string,
    @Body() bodyData: UpdatePeopleRequestBody,
    @Header("X-Access-Token") _token: string = ""
  ): Promise<MutatePeopleResponseBody> {
    try {
      if (!bodyData.name) {
        return generateResponse(400, "Invalid Input");
      }

      const people = await PeopleModel.updatePeopleByName(name, bodyData);

      return generateResponse(200, "Success", { people });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Delete("/{name}")
  public async deletePeople(
    @Path() name: string,
    @Header("X-Access-Token") _token: string = ""
  ): Promise<MutatePeopleResponseBody> {
    try {
      const people = await PeopleModel.deletePeopleByName(name);

      return generateResponse(200, "Success", { people });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }
}
