import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  publish: {
    type: Number,
    required: true,
  },
  coverImagePath: {
    type: String,
    required: true,
  },
  contentImagePath: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  hyperlink: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "publication",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export const PublicationModel = mongoose.model(
  "publications",
  PublicationSchema
);

export interface Publication {
  title: string;
  publish: number;
  coverImagePath: string;
  contentImagePath: string;
  description: string;
  content: string;
  hyperlink: string;
  type: string;
  createdDate: Date;
}

export const getPublications = (
  size: number = 20,
  page: number = 1,
  query: object = {}
) =>
  PublicationModel.find(query)
    .limit(size)
    .skip((page - 1) * size)
    .sort({
      publish: "desc",
    });
export const countTotalPublications = () => PublicationModel.count();
export const getPublicationByName = (title: string) =>
  PublicationModel.findOne({ title });
export const getPublicationById = (id: string) => PublicationModel.findById(id);
export const createPublication = (values: Record<string, any>) =>
  new PublicationModel(values)
    .save()
    .then((publication) => publication.toObject());
export const deletePublicationById = (id: string) =>
  PublicationModel.findByIdAndDelete(id);
export const deletePublicationByTitle = (title: string) =>
  PublicationModel.findOneAndDelete({ title });
export const updatePublicationById = (
  id: string,
  values: Record<string, any>
) => PublicationModel.findByIdAndUpdate(id, values, { new: true });
export const updatePublicationByTitle = (
  title: string,
  values: Record<string, any>
) => PublicationModel.findOneAndUpdate({ title }, values, { new: true });
