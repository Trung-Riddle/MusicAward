import { Request, Response } from "express";
import Album, { IAlbum } from "../../models/album";

const updateAlbum = async (req: Request, res: Response) => {
  try {
    // const id_user = getIdFromReq(req);
    const { id } = req.params;
    // const user = await User.findById(id_user);
    const { ...prop }: IAlbum = req.body;
    const album = await Album.findById(id);

    if (!album) return res.sendStatus(404);
    // if (!user) return res.sendStatus(403);

      const newAlbum: IAlbum = {
          ...album,
          ...prop,
        };

    await album.updateOne(newAlbum);
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export default updateAlbum;
