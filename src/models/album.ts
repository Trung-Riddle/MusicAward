import { Schema, model, Document } from "mongoose";

export type IAlbum = {
  title: string;
  image: string;
  image_public_id: string;
  description?: string;
};

export type AlbumTypeModel = IAlbum & Document;
/*******************************SCHEMA*****************************/

export const albumSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    image_public_id: { type: String, required: true },
  },
  { timestamps: true }
);

const AlbumModel = model<AlbumTypeModel>("albums", albumSchema);

export default AlbumModel;
