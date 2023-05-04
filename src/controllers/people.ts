import { Request, Response } from "express";
import PeopleService from "../services/people";
import _ from "lodash";

const peopleService = new PeopleService();

type PeopleQuery = {
  size: number;
  page: number;
};

export default class PeopleController {
  public async getPeople(req: Request<{}, {}, {}, PeopleQuery>, res: Response) {
    const { size, page } = req.query;

    const response = await peopleService.getPeople(size, page);
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

  public async getPerson(req: Request, res: Response) {
    const response = await peopleService.getPerson(req.params.name);
    return res.status(_.get(response, "status", 200)).json(response);
  }

  public async createPeople(req: Request, res: Response) {
    const response = await peopleService.createPeople(req.body);
    return res.status(_.get(response, "status", 200)).json(response);
  }

  public async updatePeople(req: Request, res: Response) {
    const response = await peopleService.updatePeople(
      req.params.name,
      req.body
    );
    return res.status(_.get(response, "status", 200)).json(response);
  }

  public async deletePeople(req: Request, res: Response) {
    const response = await peopleService.deletePeople(req.params.name);
    return res.status(_.get(response, "status", 200)).json(response);
  }
}
