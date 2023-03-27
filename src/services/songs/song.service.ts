import createError from "http-errors";
import { v2 as uploadCloud } from "cloudinary";
import AudioModel from "../../models/audio";
import SongsModel from "../../models/song";

export const songService = {
  async create(data: any, files: any) {
    try {
      const rootPuclicId = files["audio"][0].filename;
      const thumbnailPublicId = files["thumb_nail"][0].filename;
      const root = files["audio"][0].path;
      const thumbnail = files["thumb_nail"][0].path;

      const { album_id, name, artist, genre } = JSON.parse(data);

      const audio = await AudioModel.create({
        root,
        root_public_id: rootPuclicId,
        thumb_nail: thumbnail,
        thumbnail_public_id: thumbnailPublicId,
      });

      const song = await SongsModel.create({
        album_id: album_id,
        name,
        artist,
        audio: audio._id,
        genre,
      }).then(
        async (data) =>
          await SongsModel.findOne({ _id: data._id })
            .populate("album_id")
            .populate("audio")
      );

      return { status: 200, data: song };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
