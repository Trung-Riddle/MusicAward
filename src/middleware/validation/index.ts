import { Request, Response, NextFunction } from "express";
import { CreateAlbum } from "../../services/album/types/create-album.type";
import { v2 as uploadCloud } from "cloudinary";

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
    const removeFiles = (audio?: any[], thumb_nail?: any[]): void => {
      audio &&
        uploadCloud.uploader.destroy(audio[0].filename, {
          resource_type: "video",
        });

      thumb_nail && uploadCloud.uploader.destroy(thumb_nail[0].filename);
    };

    const audio = req.files["audio"];
    const thumb_nail = req.files["thumb_nail"];

    if (!audio || !thumb_nail) {
      removeFiles(audio, thumb_nail);

      return res
        .status(401)
        .json({ status: 401, message: "Missing data files" });
    }

    if (!req.body.data) {
      removeFiles(audio, thumb_nail);

      return res
        .status(401)
        .json({ status: 401, message: "Missing data fields" });
    }

    const { album_id, name, artist, genre } = JSON.parse(req.body.data);

    if (!album_id || !name || !artist || !genre) {
      removeFiles(audio, thumb_nail);

      return res
        .status(401)
        .json({ status: 401, message: "Missing data fields" });
    }

    if (typeof album_id != typeof [] || typeof genre != typeof []) {
      removeFiles(audio, thumb_nail);

      return res
        .status(401)
        .json({ status: 401, message: "Missing data fields" });
    }

    const data = {
      data: JSON.parse(req.body.data),
      audio: audio[0],
      thumb_nail: thumb_nail[0],
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
