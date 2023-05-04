"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePublicationByTitle = exports.updatePublicationById = exports.deletePublicationByTitle = exports.deletePublicationById = exports.createPublication = exports.getPublicationById = exports.getPublicationByName = exports.countTotalPublications = exports.getPublications = exports.PublicationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PublicationSchema = new mongoose_1.default.Schema({
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
exports.PublicationModel = mongoose_1.default.model("publications", PublicationSchema);
const getPublications = (size = 20, page = 1, query = {}) => exports.PublicationModel.find(query)
    .limit(size)
    .skip((page - 1) * size)
    .sort({
    publish: "desc",
});
exports.getPublications = getPublications;
const countTotalPublications = () => exports.PublicationModel.count();
exports.countTotalPublications = countTotalPublications;
const getPublicationByName = (title) => exports.PublicationModel.findOne({ title });
exports.getPublicationByName = getPublicationByName;
const getPublicationById = (id) => exports.PublicationModel.findById(id);
exports.getPublicationById = getPublicationById;
const createPublication = (values) => new exports.PublicationModel(values)
    .save()
    .then((publication) => publication.toObject());
exports.createPublication = createPublication;
const deletePublicationById = (id) => exports.PublicationModel.findByIdAndDelete(id);
exports.deletePublicationById = deletePublicationById;
const deletePublicationByTitle = (title) => exports.PublicationModel.findOneAndDelete({ title });
exports.deletePublicationByTitle = deletePublicationByTitle;
const updatePublicationById = (id, values) => exports.PublicationModel.findByIdAndUpdate(id, values, { new: true });
exports.updatePublicationById = updatePublicationById;
const updatePublicationByTitle = (title, values) => exports.PublicationModel.findOneAndUpdate({ title }, values, { new: true });
exports.updatePublicationByTitle = updatePublicationByTitle;
