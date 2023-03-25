import AlbumModel, { IAlbum } from "../../models/album";
import createError from "http-errors";
import { v2 as uploadCloud } from "cloudinary";

export const albumService = {
  async create(data: string, files: any) {
    try {
      const albumPublicId = files["image"][0].filename;

      if (!albumPublicId) throw createError.BadRequest(`Data file is missing`);

      const albumPath = files["image"][0].path;

      const { title, description } = JSON.parse(data);

      if (!title || !description) {
        uploadCloud.uploader.destroy(albumPublicId);
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
};
