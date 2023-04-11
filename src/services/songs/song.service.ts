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

  async update(data: any, files: any, songId: string) {
    try {
      const song = await SongsModel.findById(songId).populate("audio").exec();

      if (!song) throw createError.BadRequest(`Id song không tồn tại`);

      const audio = await AudioModel.findById(song.audio).exec();

      if (!audio) throw createError.BadRequest("Id audio không tồn tại");

      if (data) {
        const { album_id, name, artist, genre } = JSON.parse(data);

        if (album_id && album_id != song.album_id) song.album_id = album_id;
        if (name && name != song.name) song.name = name;
        if (artist && artist != song.artist) song.artist = artist;
        if (genre && genre != song.genre) song.genre = genre;
      }

      await song.save();

      if (files["audio"]) {
        const rootPuclicId = files["audio"][0].filename;
        const root = files["audio"][0].path;
        await uploadCloud.uploader.destroy(audio.root_public_id, {
          resource_type: "video",
        });
        audio.root = root;
        audio.root_public_id = rootPuclicId;
      }

      if (files["thumb_nail"]) {
        const thumbnailPublicId = files["thumb_nail"][0].filename;
        const thumbnail = files["thumb_nail"][0].path;
        await uploadCloud.uploader.destroy(audio.thumbnail_public_id);
        audio.thumb_nail = thumbnail;
        audio.thumbnail_public_id = thumbnailPublicId;
      }

      await audio.save();

      return { status: 200, data: song };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async delete(songId: string) {
    try {
      const deleteSong = await SongsModel.findByIdAndDelete(songId).exec();

      if (!deleteSong) throw createError.BadRequest(`Id song ko tồn tại`);

      const deleteAudio = await AudioModel.findByIdAndDelete(
        deleteSong.audio
      ).exec();

      await uploadCloud.uploader.destroy(deleteAudio.root_public_id, {
        resource_type: "video",
      });
      await uploadCloud.uploader.destroy(deleteAudio.thumbnail_public_id);

      return { status: 200, data: deleteSong };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
