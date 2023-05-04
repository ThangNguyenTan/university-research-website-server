"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleById = exports.deleteRoleById = exports.createRole = exports.getRoleById = exports.getRoleByName = exports.getRoles = exports.RoleModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RoleSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
});
exports.RoleModel = mongoose_1.default.model("roles", RoleSchema);
const getRoles = () => exports.RoleModel.find();
exports.getRoles = getRoles;
const getRoleByName = (name) => exports.RoleModel.findOne({ name });
exports.getRoleByName = getRoleByName;
const getRoleById = (id) => exports.RoleModel.findById(id);
exports.getRoleById = getRoleById;
const createRole = (values) => new exports.RoleModel(values).save().then((role) => role.toObject());
exports.createRole = createRole;
const deleteRoleById = (id) => exports.RoleModel.findByIdAndDelete(id);
exports.deleteRoleById = deleteRoleById;
const updateRoleById = (id, values) => exports.RoleModel.findByIdAndUpdate(id, values, { new: true });
exports.updateRoleById = updateRoleById;
