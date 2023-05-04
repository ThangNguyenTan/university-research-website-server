import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

export const RoleModel = mongoose.model("roles", RoleSchema);

export interface Role {
  name: string;
  description?: string;
}

export const getRoles = () => RoleModel.find();
export const getRoleByName = (name: string) => RoleModel.findOne({ name });
export const getRoleById = (id: string) => RoleModel.findById(id);
export const createRole = (values: Record<string, any>) =>
  new RoleModel(values).save().then((role) => role.toObject());
export const deleteRoleById = (id: string) => RoleModel.findByIdAndDelete(id);
export const updateRoleById = (id: string, values: Record<string, any>) =>
  RoleModel.findByIdAndUpdate(id, values, { new: true });
