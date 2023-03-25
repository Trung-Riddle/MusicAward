import { Response, Request } from "express";
import Album from "../../models/album";

async function getAlbum(req: Request, res: Response, next: any) {
    try {
      const album = await Album.findById(req.params.id);
      if (album == null) {
        return res.status(404).json({ message: "Cannot find album" });
      }
      res.locals.album = album;
      next();
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
}
export default getAlbum