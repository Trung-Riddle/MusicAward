import Joi from "joi";

export const validatorDto = {
  LoginUserDto: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  CreateUserDto: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),

  CreateAlbumDto: Joi.object({
    data: Joi.object().required(),
    image: Joi.object().required(),
  }),

  CreateSongDto: Joi.object({
    data: {
      album_id: Joi.array().required(),
      name: Joi.string().required(),
      artist: Joi.string().required(),
      genre: Joi.array().required(),
    },
    audio: Joi.object().required(),
    thumb_nail: Joi.object().required(),
  }),
};
