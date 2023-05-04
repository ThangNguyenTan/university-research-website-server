"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobByName = exports.updateJobById = exports.deleteJobById = exports.createJob = exports.getJobById = exports.getJobByName = exports.getJobs = exports.JobModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
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
exports.JobModel = mongoose_1.default.model("jobs", JobSchema);
const getJobs = () => exports.JobModel.find();
exports.getJobs = getJobs;
const getJobByName = (name) => exports.JobModel.findOne({ name });
exports.getJobByName = getJobByName;
const getJobById = (id) => exports.JobModel.findById(id);
exports.getJobById = getJobById;
const createJob = (values) => new exports.JobModel(values).save().then((job) => job.toObject());
exports.createJob = createJob;
const deleteJobById = (id) => exports.JobModel.findByIdAndDelete(id);
exports.deleteJobById = deleteJobById;
const updateJobById = (id, values) => exports.JobModel.findByIdAndUpdate(id, values, { new: true });
exports.updateJobById = updateJobById;
const updateJobByName = (name, values) => exports.JobModel.findOneAndUpdate({ name }, values, { new: true });
exports.updateJobByName = updateJobByName;
