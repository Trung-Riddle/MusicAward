import { Schema, model, Document } from "mongoose";

export type ISong = {
    name: string;
    artist: string;
    audio: string;
    thumbnail: string;
    genre: string;
    album_id: string;
};

export type SongTypeModel = ISong & Document;
/*******************************SCHEMA*****************************/

export const SongSchema = new Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    audio: { type: String, required: true },
    thumbnail: { type: String, required: true },
    genre: { type: String, required: true },
    album_id: { type: Array<Schema.Types.ObjectId>, ref: "albums", required: true },
});

const Song = model<SongTypeModel>("songs", SongSchema);

export default Song;
