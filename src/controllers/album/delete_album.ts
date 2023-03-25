import { Request, Response } from "express";
import Album from "../../models/album";

const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);

    if (!album) {
      return res.sendStatus(404);
    }

    await Album.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export default deleteAlbum;
