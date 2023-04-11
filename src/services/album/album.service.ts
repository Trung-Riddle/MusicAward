import AlbumModel from "../../models/album";
import createError from "http-errors";
import { v2 as uploadCloud } from "cloudinary";
import SongsModel from "../../models/song";

export const albumService = {
  async create(data: string, files: any) {
    try {
      console.log(data);

      const albumPublicId = files["image"][0].filename;

      if (!albumPublicId) throw createError.BadRequest(`Data file is missing`);

      const albumPath = files["image"][0].path;

      const { title, description } = JSON.parse(data);

      if (!title || !description) {
        await uploadCloud.uploader.destroy(albumPublicId);
        throw createError.BadRequest(`Missing data field`);
      }

      const payload = {
        title,
        image: albumPath,
        image_public_id: albumPublicId,
        description,
      };

      const album = await AlbumModel.create(payload).then((data) =>
        data.toObject()
      );

      return { status: 200, data: album };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async findAll() {
    try {
      const albums = await AlbumModel.find().select("title image");

      return { status: 200, data: albums };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async findAllSongByAllAlbum() {
    try {
      const albums = await AlbumModel.find();

      // const result = await SongsModel.find().populate("album_id");

      const payload = albums.map(async (album) => {
        const songs = await SongsModel.find({ album_id: album.id }).populate(
          "audio",
          "root thumb_nail"
        );

        return {
          _id: album._id,
          title: album.title,
          image: album.image,
          songs,
        };
      });

      const result = await Promise.all(payload).then((value) => value);

      return { status: 200, data: result };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async findAllSongByOneAlbum(id: string) {
    try {
      const songs = await SongsModel.find({ album_id: id }).populate(
        "audio",
        "root thumb_nail"
      );

      if (!songs) throw createError.BadRequest();

      return { status: 200, data: songs };
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async update(data: string, files: any, albumId: string) {
    try {
      const album = await AlbumModel.findById(albumId).exec();

      if (!album) throw createError.BadRequest(`Id của album không tồn tại`);

      if (files["image"]) {
        const albumPublicId = files["image"][0].filename;
        const albumPath = files["image"][0].path;

        await uploadCloud.uploader.destroy(album.image_public_id);

        album.image_public_id = albumPublicId;
        album.image = albumPath;
      }

      if (data) {
        const { title, description } = JSON.parse(data);

        if (title && title != album.title) album.title = title;

        if (description && description != album.description)
          album.description = description;
      }

      await album.save();

      return { status: 200, data: album };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
