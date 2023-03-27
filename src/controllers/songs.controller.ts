import { Request, Response, NextFunction } from "express";
import { songService } from "../services/songs/song.service";

export const songController = {
  async createSong(req: Request, res: Response, next: NextFunction) {
    const data = req.body.data;
    const files = req.files;

    const song = await songService.create(data, files);

    if (!song.data) return next(song);

    return res.status(song.status).json(song.data);
  },
};
