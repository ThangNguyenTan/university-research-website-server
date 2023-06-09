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
import _ from "lodash";
import { generateResponse, DefaultReponseBody } from "../helpers";
import * as PublicationModel from "../model/publications";
import * as PeopleModel from "../model/people";

type CreatePublicationRequestBody = {
  title: string;
  publish: number;
  coverImagePath: string;
  contentImagePath: string;
  description: string;
  content: string;
  hyperlink: string;
  type: string;
};

type UpdatePublicationRequestBody = {
  title?: string;
  publish?: number;
  coverImagePath?: string;
  contentImagePath?: string;
  description?: string;
  content?: string;
  hyperlink?: string;
  type?: string;
};

type CreatePublicationResponseBody = {
  status: number;
  message: string;
  publication?: PublicationModel.Publication;
};

type FetchPublicationsResponseBody = {
  status: number;
  message: string;
  publications?: PublicationModel.Publication[];
};

type FetchPublicationResponseBody = {
  status: number;
  message: string;
  publication?: PublicationModel.Publication;
};

@Route("api/publication")
@Tags("Publications")
@SuccessResponse(200, "Success")
@Response<DefaultReponseBody>(400, "Invalid Input", {
  message: "Invalid Input",
  status: 400,
})
@Response<DefaultReponseBody>(500, "Internal Server Error", {
  message: "Internal Server Error",
  status: 500,
})
export default class PublicationService {
  @Get("/")
  public async getPublications(
    @Query() type: string = "",
    @Query() size: number = 20,
    @Query() page: number = 1
  ): Promise<FetchPublicationsResponseBody> {
    try {
      const publications: PublicationModel.Publication[] =
        await PublicationModel.getPublications(size, page, {
          ...(type ? { type } : {}),
        });
      const count = await PublicationModel.countTotalPublications();

      return generateResponse(200, "Success", { publications, count });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Get("/{title}")
  public async getPublication(
    @Path() title: string
  ): Promise<FetchPublicationResponseBody> {
    try {
      const publication: PublicationModel.Publication | null =
        await PublicationModel.getPublicationByName(title);

      if (!publication) {
        return generateResponse(404, "Not Found");
      }

      return generateResponse(200, "Success", { publication });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Post("/")
  public async createPublication(
    @Body() bodyData: CreatePublicationRequestBody,
    @Header("X-Access-Token") _token: string = ""
  ): Promise<CreatePublicationResponseBody> {
    try {
      if (!bodyData.title) {
        return generateResponse(400, "Invalid Input");
      }

      const publication = await PublicationModel.createPublication(bodyData);

      return generateResponse(200, "Success", { publication });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Patch("/{title}/participants/{personId}")
  public async assignParticipantToPublication(
    @Path() title: string,
    @Path() personId: string,
    @Header("X-Access-Token") _token: string = ""
  ): Promise<CreatePublicationResponseBody> {
    try {
      let publication = await PublicationModel.getPublicationByName(title);
      await PublicationModel.updatePublicationByTitle(title, {
        participants: [..._.get(publication, "participants", []), personId],
      });

      const person = await PeopleModel.getPeopleById(personId);
      await PeopleModel.updatePeopleById(personId, {
        researchHighlights: [
          ..._.get(person, "researchHighlights", []),
          _.get(publication, "_id", null),
        ],
      });

      publication = await PublicationModel.getPublicationByName(title);

      return generateResponse(200, "Success", {
        publication,
      });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Patch("/{title}")
  public async updatePublication(
    @Path() title: string,
    @Body() bodyData: UpdatePublicationRequestBody,
    @Header("X-Access-Token") _token: string = ""
  ): Promise<CreatePublicationResponseBody> {
    try {
      if (!bodyData.title) {
        return generateResponse(400, "Invalid Input");
      }

      const publication = await PublicationModel.updatePublicationByTitle(
        title,
        bodyData
      );

      return generateResponse(200, "Success", { publication });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Delete("/{title}")
  public async deletePublication(
    @Path() title: string,
    @Header("X-Access-Token") _token: string = ""
  ): Promise<CreatePublicationResponseBody> {
    try {
      const publication = await PublicationModel.deletePublicationByTitle(
        title
      );

      return generateResponse(200, "Success", { publication });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }

  @Delete("/{title}/participants/{personId}")
  public async removeParticipantFromPublication(
    @Path() title: string,
    @Path() personId: string,
    @Header("X-Access-Token") _token: string = ""
  ): Promise<CreatePublicationResponseBody> {
    try {
      let publication = await PublicationModel.getPublicationByName(title);
      await PublicationModel.updatePublicationByTitle(title, {
        participants: [
          ..._.get(publication, "participants", []).filter(
            (participant) => String(participant._id) != personId
          ),
        ],
      });

      const person = await PeopleModel.getPeopleById(personId);
      await PeopleModel.updatePeopleById(personId, {
        researchHighlights: [
          ..._.get(person, "researchHighlights", []).filter(
            (researchHighlight) =>
              String(researchHighlight._id) != _.get(publication, "_id", "")
          ),
        ],
      });

      publication = await PublicationModel.getPublicationByName(title);

      return generateResponse(200, "Success", {
        publication,
      });
    } catch (error) {
      console.log(error);
      return generateResponse();
    }
  }
}
