import Joi from "joi";

export const validatorDto = {
  UserDto: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  createAlbumDto: Joi.object({
    data: Joi.object().required(),
    image: Joi.object().required(),
  }),
};
