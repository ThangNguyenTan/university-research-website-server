import { Request, Response } from "express";
import MediaService from "../services/media";
import _ from "lodash";

const mediaService = new MediaService();

export default class RoleController {
  public async uploadFile(req: Request, res: Response) {
    const response = await mediaService.uploadFile(req.file!);
    return res.status(_.get(response, "status", 200)).json(response);
  }
}
