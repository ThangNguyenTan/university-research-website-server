import mongoose from "mongoose";

const PeopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  coverImagePath: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "roles",
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "jobs",
  },
});

export const PeopleModel = mongoose.model("people", PeopleSchema);

export interface People {
  name: string;
  email: string;
  coverImagePath: string;
  description: string;
  createdDate: Date;
}

export const getPeoples = (size: number = 20, page: number = 1) =>
  PeopleModel.find()
    .limit(size)
    .skip((page - 1) * size)
    .populate("role")
    .populate("job")
    .sort({
      name: "asc",
    });
export const getAllPeoples = () =>
  PeopleModel.find().populate("role").populate("job");
export const countTotalPeople = () => PeopleModel.count();
export const getPeopleByName = (name: string) =>
  PeopleModel.findOne({ name }).populate("role").populate("job");
export const getPeopleById = (id: string) =>
  PeopleModel.findById(id).populate("role").populate("job");
export const createPeople = (values: Record<string, any>) =>
  new PeopleModel(values).save().then((people) => people.toObject());
export const deletePeopleById = (id: string) =>
  PeopleModel.findByIdAndDelete(id);
export const deletePeopleByName = (name: string) =>
  PeopleModel.findOneAndDelete({ name });
export const updatePeopleById = (id: string, values: Record<string, any>) =>
  PeopleModel.findByIdAndUpdate(id, values, { new: true });
export const updatePeopleByName = (name: string, values: Record<string, any>) =>
  PeopleModel.findOneAndUpdate({ name }, values, { new: true });
