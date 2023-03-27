import { Schema, model, Document } from "mongoose";

export type ISong = {
  album_id: Array<Schema.Types.ObjectId>;
  name: string;
  artist: string;
  audio: Schema.Types.ObjectId;
  thumbnail: string;
  genre: Array<String>;
};

export type SongTypeModel = ISong & Document;
/*******************************SCHEMA*****************************/

export const SongSchema = new Schema(
  {
    album_id: {
      type: Array<Schema.Types.ObjectId>,
      ref: "albums",
      required: true,
    },
    name: { type: String, required: true },
    artist: { type: String, required: true },
    audio: { type: Schema.Types.ObjectId, required: true },
    genre: { type: Array<String>, required: true },
  },
  { timestamps: true }
);

const SongsModel = model<SongTypeModel>("songs", SongSchema);

export default SongsModel;
