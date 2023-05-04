import {
  Post,
  Route,
  UploadedFile,
  SuccessResponse,
  Response,
  Tags,
  Header,
} from "tsoa";

import { generateResponse, DefaultReponseBody } from "../helpers";

@Route("api/media")
@Tags("Media")
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
  @Post("/upload")
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Header("X-Access-Token") _token: string = ""
  ) {
    try {
      return generateResponse(200, "Success", { file });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }
}
