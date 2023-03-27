import { songController } from "../controllers/songs.controller";
import express from "express";
const router = express.Router();

export default (): express.Router => {
  router.post("/create", songController.createSong);

  return router;
};
