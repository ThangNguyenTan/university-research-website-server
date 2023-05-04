import { Post, Route, Body, SuccessResponse, Response, Tags } from "tsoa";
import jwt from "jsonwebtoken";
import { generateResponse, DefaultReponseBody } from "../helpers";

type AuthRequestBody = {
  username: string;
  password: string;
};

interface AuthResponseBody extends DefaultReponseBody {
  token?: string;
}

@Route("api/auth")
@Tags("Auth")
@SuccessResponse(200, "Successfully logged in")
@Response<DefaultReponseBody>(400, "Validation Failed", {
  message: "Invalid username or password",
  status: 400,
})
@Response<DefaultReponseBody>(500, "Internal Server Error", {
  message: "Internal Server Error",
  status: 500,
})
export default class AuthService {
  @Post("/")
  public async login(
    @Body() bodyData: AuthRequestBody
  ): Promise<AuthResponseBody> {
    try {
      if (
        bodyData.username !== process.env.AUTH_USERNAME! ||
        bodyData.password !== process.env.AUTH_PASSWORD!
      ) {
        return generateResponse(400, "Invalid username or password");
      }

      const token = jwt.sign(bodyData, process.env.JWT_SECRET!);

      return generateResponse(200, "Successfully logged in", { token });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }
}
