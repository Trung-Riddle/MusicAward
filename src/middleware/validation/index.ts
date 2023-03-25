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
