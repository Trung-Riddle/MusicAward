import { Schema, model, Document } from "mongoose";

export type IUser = {
  email: string;
  password: string;
};

export type UserTypeModel = IUser & Document;

/*******************************SCHEMA*****************************/

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String },
});

const User = model<UserTypeModel>("users", userSchema);

export default User;
