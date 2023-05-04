import { Request, Response } from "express";
import RoleService from "../services/roles";
import _ from "lodash";

const roleService = new RoleService();

export default class RoleController {
  public async getRoles(req: Request, res: Response) {
    const response = await roleService.getRoles();
    return res.status(_.get(response, "status", 200)).json(response);
  }

  public async createRole(req: Request, res: Response) {
    const response = await roleService.createRole(req.body);
    return res.status(_.get(response, "status", 200)).json(response);
  }
}
