import { validateRequestCreateAlbum } from "../middleware/validation";
import uploadCloud from "../configs/cloudinary";
import { albumController } from "../controllers/album.controller";
import express from "express";
import { validatorDto } from "../middleware/validation/validation.dto";
const router = express.Router();

export default (): express.Router => {
  router.post(
    "/create",
    uploadCloud.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    validateRequestCreateAlbum(validatorDto.CreateAlbumDto),
    albumController.createAlbum
  );

  router.get("/", albumController.findAllAlbum);

  router.get("/song-by-album", albumController.findAllSongByAlbum);

  return router;
};
