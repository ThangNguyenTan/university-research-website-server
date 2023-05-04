import { Request, Response } from "express";
import PublicationService from "../services/publications";
import _ from "lodash";

const publicationService = new PublicationService();

type PublicationQuery = {
  size: number;
  page: number;
  type: string;
};

export default class PublicationController {
  public async getPublications(
    req: Request<{}, {}, {}, PublicationQuery>,
    res: Response
  ) {
    const { size, page, type } = req.query;

    const response = await publicationService.getPublications(type, size, page);
    const count = _.get(response, "count", 0);
    const meta = {
      "x-total-items": count,
      "x-page": page,
      "x-last_page": Math.floor(count / size) + 1,
      "x-page-size": size,
    };

    return res
      .status(_.get(response, "status", 200))
      .json({ ...response, meta });
  }

  public async getPublication(req: Request, res: Response) {
    const response = await publicationService.getPublication(req.params.title);
    return res.status(_.get(response, "status", 200)).json(response);
  }

  public async createPublication(req: Request, res: Response) {
    const response = await publicationService.createPublication(req.body);
    return res.status(_.get(response, "status", 200)).json(response);
  }

  public async updatePublication(req: Request, res: Response) {
    const response = await publicationService.updatePublication(
      req.params.title,
      req.body
    );
    return res.status(_.get(response, "status", 200)).json(response);
  }

  public async deletePublication(req: Request, res: Response) {
    const response = await publicationService.deletePublication(
      req.params.title
    );
    return res.status(_.get(response, "status", 200)).json(response);
  }
}
