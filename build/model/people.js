"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePeopleByName = exports.updatePeopleById = exports.deletePeopleByName = exports.deletePeopleById = exports.createPeople = exports.getPeopleById = exports.getPeopleByName = exports.countTotalPeople = exports.getAllPeoples = exports.getPeoples = exports.PeopleModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PeopleSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "roles",
    },
    job: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "jobs",
    },
    researchHighlights: {
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "publications",
            },
        ],
        default: [],
    },
});
exports.PeopleModel = mongoose_1.default.model("people", PeopleSchema);
const getPeoples = (size = 20, page = 1) => exports.PeopleModel.find()
    .limit(size)
    .skip((page - 1) * size)
    .populate("role")
    .populate("job")
    .sort({
    name: "asc",
});
exports.getPeoples = getPeoples;
const getAllPeoples = () => exports.PeopleModel.find().populate("role").populate("job");
exports.getAllPeoples = getAllPeoples;
const countTotalPeople = () => exports.PeopleModel.count();
exports.countTotalPeople = countTotalPeople;
const getPeopleByName = (name) => exports.PeopleModel.findOne({ name })
    .populate("role")
    .populate("job")
    .populate("researchHighlights");
exports.getPeopleByName = getPeopleByName;
const getPeopleById = (id) => exports.PeopleModel.findById(id)
    .populate("role")
    .populate("job")
    .populate("researchHighlights");
exports.getPeopleById = getPeopleById;
const createPeople = (values) => new exports.PeopleModel(values).save().then((people) => people.toObject());
exports.createPeople = createPeople;
const deletePeopleById = (id) => exports.PeopleModel.findByIdAndDelete(id);
exports.deletePeopleById = deletePeopleById;
const deletePeopleByName = (name) => exports.PeopleModel.findOneAndDelete({ name });
exports.deletePeopleByName = deletePeopleByName;
const updatePeopleById = (id, values) => exports.PeopleModel.findByIdAndUpdate(id, values, { new: true });
exports.updatePeopleById = updatePeopleById;
const updatePeopleByName = (name, values) => exports.PeopleModel.findOneAndUpdate({ name }, values, { new: true });
exports.updatePeopleByName = updatePeopleByName;
