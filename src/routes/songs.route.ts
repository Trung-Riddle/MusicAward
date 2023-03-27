import { validateRequestCreateSong } from "../middleware/validation";
import { songController } from "../controllers/songs.controller";
import express from "express";
import { validatorDto } from "../middleware/validation/validation.dto";
import uploadCloud from "../configs/cloudinary";
const router = express.Router();

export default (): express.Router => {
  router.post(
    "/create",
    uploadCloud.fields([
      {
        name: "thumb_nail",
        maxCount: 1,
      },
      {
        name: "audio",
        maxCount: 1,
      },
    ]),
    validateRequestCreateSong(validatorDto.CreateSongDto),
    songController.createSong
  );

  return router;
};
