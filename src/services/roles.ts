import {
  Get,
  Post,
  Route,
  Body,
  SuccessResponse,
  Response,
  Tags,
  Header,
} from "tsoa";
import { generateResponse, DefaultReponseBody } from "../helpers";
import * as RoleModel from "../model/roles";

type CreateRoleRequestBody = {
  name: string;
  description: string;
};

type CreateRoleResponseBody = {
  status: number;
  message: string;
  role?: RoleModel.Role;
};

type FetchRolesResponseBody = {
  status: number;
  message: string;
  roles?: RoleModel.Role[];
};

@Route("api/role")
@Tags("Roles")
@SuccessResponse(200, "Success")
@Response<DefaultReponseBody>(400, "Invalid Input", {
  message: "Invalid Input",
  status: 400,
})
@Response<DefaultReponseBody>(500, "Internal Server Error", {
  message: "Internal Server Error",
  status: 500,
})
export default class RoleService {
  @Get("/")
  public async getRoles(): Promise<FetchRolesResponseBody> {
    try {
      const roles: RoleModel.Role[] = await RoleModel.getRoles();

      return generateResponse(200, "Success", { roles });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Post("/")
  public async createRole(
    @Body() bodyData: CreateRoleRequestBody,
    @Header("X-Access-Token") _token: string = ""
  ): Promise<CreateRoleResponseBody> {
    try {
      if (!bodyData.name) {
        return generateResponse(400, "Invalid Input");
      }

      const role = await RoleModel.createRole(bodyData);

      return generateResponse(200, "Success", { role });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }
}
