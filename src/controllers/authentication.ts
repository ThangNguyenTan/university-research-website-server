import { Request, Response } from "express";
import AuthService from "../services/authentication";
import _ from "lodash";

const authService = new AuthService();

export default class AuthController {
  public async login(req: Request, res: Response) {
    const response = await authService.login(req.body);
    return res.status(_.get(response, "status", 200)).json(response);
  }
}
