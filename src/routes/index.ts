import express from "express";
import authentication from "./authentication";
import roles from "./roles";
import jobs from "./jobs";
import publications from "./publications";
import people from "./people";
import media from "./media";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  roles(router);
  jobs(router);
  publications(router);
  people(router);
  media(router);

  return router;
};
