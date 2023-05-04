import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  recruit: {
    type: Boolean,
    default: false,
  },
});

export const JobModel = mongoose.model("jobs", JobSchema);

export interface Job {
  name: string;
  description?: string;
  recruit: boolean;
}

export const getJobs = () => JobModel.find();
export const getJobByName = (name: string) => JobModel.findOne({ name });
export const getJobById = (id: string) => JobModel.findById(id);
export const createJob = (values: Record<string, any>) =>
  new JobModel(values).save().then((job) => job.toObject());
export const deleteJobById = (id: string) => JobModel.findByIdAndDelete(id);
export const updateJobById = (id: string, values: Record<string, any>) =>
  JobModel.findByIdAndUpdate(id, values, { new: true });
export const updateJobByName = (name: string, values: Record<string, any>) =>
  JobModel.findOneAndUpdate({ name }, values, { new: true });
