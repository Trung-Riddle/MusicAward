import { Request, Response, NextFunction } from "express";
import { CreateAlbum } from "../../services/album/types/create-album.type";
import { v2 as uploadCloud } from "cloudinary";
import { CreateSong } from "../../services/songs/types/create-song.type";

export const validateRequest = (payload: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = payload.validate(req.body);

    if (error) {
      return res
        .status(401)
        .json({ status: 401, message: error.details[0].message });
    }

    return next();
  };
};

export const validateRequestCreateAlbum = (payload: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.files["image"] && !req.body.data) {
      uploadCloud.uploader.destroy(req.files["image"][0].filename);
    }

    if (!req.files["image"] || !req.body.data)
      return res
        .status(401)
        .json({ status: 401, message: "Missing data field" });

    const data: CreateAlbum = {
      data: JSON.parse(req.body.data),
      image: req.files["image"][0],
    };

    const { error } = payload.validate(data);

    if (error) {
      return res
        .status(401)
        .json({ status: 401, message: error.details[0].message });
    }

    return next();
  };
};

export const validateRequestCreateSong = (payload: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.files["audio"] || (req.files["thumb_nail"] && !req.body.data)) {
      req.files["audio"] &&
        uploadCloud.uploader.destroy(req.files["audio"][0].filename);

      req.files["thumb_nail"] &&
        uploadCloud.uploader.destroy(req.files["thumb_nail"][0].filename);
    }

    if (!req.files["audio"] || !req.files["thumb_nail"] || !req.body.data)
      return res
        .status(401)
        .json({ status: 401, message: "Missing data field" });

    const data: CreateSong = {
      data: JSON.parse(req.body.data),
      audio: req.files["audio"][0],
      thumb_nail: req.files["audio"][0],
    };

    const { error } = payload.validate(data);

    if (error) {
      return res
        .status(401)
        .json({ status: 401, message: error.details[0].message });
    }
  };
};
