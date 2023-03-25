import { Schema, model, Document } from "mongoose";

export type IAudio = {
  root: string;
  root_public_id: string;
  thumb_nail: string;
  thumbnail_public_id: string;
};

export type AudioTypeModel = IAudio & Document;

/*******************************SCHEMA*****************************/

export const audioSchema = new Schema(
  {
    root: {
      type: String,
      required: true,
    },
    root_public_id: { type: String, required: true },
    thumb_nail: { type: String },
    thumbnail_public_id: { type: String, require: true },
  },
  { timestamps: true }
);

const AudioModel = model<AudioTypeModel>("users", audioSchema);

export default AudioModel;
