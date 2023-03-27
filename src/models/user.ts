import mongoose, { Schema, model, Document } from "mongoose";

export type IUser = {
  email: string;
  username: string;
  password: string;
};

export type UserTypeModel = IUser & Document;

/*******************************SCHEMA*****************************/

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

export const UserModel = model<UserTypeModel>("users", userSchema);



