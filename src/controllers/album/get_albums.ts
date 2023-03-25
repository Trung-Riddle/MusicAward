import { Response, Request } from "express";
import Album, { IAlbum } from "../../models/album";

const getAllAlbum = async (req: Request, res: Response) => {
    try {
        const albums = await Album.find();
        return res.status(201).json(albums);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}
export default getAllAlbum