import { Schema, model, Document } from "mongoose";

export type IAlbum = {
    title: string;
    description: string;
    image: string;
};

export type AlbumTypeModel = IAlbum & Document;
/*******************************SCHEMA*****************************/

export const albumSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});

const Album = model<AlbumTypeModel>("albums", albumSchema);

export default Album;
