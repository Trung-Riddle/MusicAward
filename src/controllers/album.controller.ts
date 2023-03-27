import { Request, Response, NextFunction } from "express";
import { albumService } from "../services/album/album.service";

export const albumController = {
  async createAlbum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const dataAlbum = req.body.data;
    const filesAlbum = req.files;

    const album = await albumService.create(dataAlbum, filesAlbum);

    if (!album.data) return next(album);

    return res.status(album.status).json(album.data);
  },

  async findAllAlbum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const albums = await albumService.findAll();

    if (!albums.data) return next(albums);

    return res.status(albums.status).json(albums.data);
  },

  async findAllSongByAlbum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const result = await albumService.findAllSongByAlbum();

    if (!result.data) return next(result);

    return res.status(result.status).json(result.data);
  },
};
