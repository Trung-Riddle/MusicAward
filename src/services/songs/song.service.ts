import createError from "http-errors";
import { v2 as uploadCloud } from "cloudinary";
import AudioModel from "../../models/audio";
import SongsModel from "../../models/song";

export const songService = {
  async create(data: any, files: any) {
    const rootPuclicId = files["audio"][0].filename;
    const thumbnailPublicId = files["thumb_nail"][0].filename;

    if (!rootPuclicId || !thumbnailPublicId)
      throw createError.BadRequest(`Missing data files`);

    const root = files["audio"][0].path;
    const thumbnail = files["thumb_nail"][0].path;

    const { album_id, name, artist, genre } = JSON.parse(data);

    if (!album_id || !name || !artist || !genre) {
      await uploadCloud.uploader.destroy(rootPuclicId, {
        resource_type: "audio",
      });
      await uploadCloud.uploader.destroy(thumbnailPublicId);
      throw createError.BadRequest(`Missing data fields`);
    }

    const audio = await AudioModel.create({
      root,
      root_public_id: rootPuclicId,
      thumb_nail: thumbnail,
      thumbnail_public_id: thumbnailPublicId,
    });

    const song = await SongsModel.create({
      album_id: album_id.map((item: string) => ({ _id: item })),
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
  },
};
