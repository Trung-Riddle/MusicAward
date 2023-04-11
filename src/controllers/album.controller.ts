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

  async updateAlbum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const albumId: string = req.params.albumId;
    const dataAlbum: string = req.body.data;
    const filesAlbum = req.files;

    const album = await albumService.update(dataAlbum, filesAlbum, albumId);

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

  async findAllSongByAllAlbum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const result = await albumService.findAllSongByAllAlbum();

    if (!result.data) return next(result);

    return res.status(result.status).json(result.data);
  },

  async findAllSongByOneAlbum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const id = req.params.id;

    const result = await albumService.findAllSongByOneAlbum(id);

    if (!result.data) return next(result);

    return res.status(result.status).json(result.data);
  },
};
