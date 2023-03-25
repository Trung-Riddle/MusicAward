import createError from "http-errors";
import { CreateUser } from "./types/create-user.type";
import UserModel from "../../models/user";
import bcrypt from "bcrypt";
import { LoginUser } from "./types/login-user.type";

export const userService = {
  async create(data: CreateUser) {
    try {
      const { email, username, password } = data;

      if (!email || !username || !password)
        throw createError.BadRequest(`Missing data field`);

      const isEmail = await UserModel.findOne({ email });

      if (isEmail) throw createError.Conflict(`${email} already exists`);

      const salt = bcrypt.genSaltSync();

      const hash = bcrypt.hashSync(password, salt);

      const user = await UserModel.create({
        email,
        username,
        password: hash,
      }).then((data) => data.toObject());

      return { status: 200, data: user };
    } catch (error) {
      return error;
    }
  },

  async login(data: LoginUser) {
    try {
      const { email, password } = data;

      if (!email || !password)
        throw createError.BadRequest("Missing data field");

      const isEmail = await UserModel.findOne({ email });

      if (!isEmail) throw createError.BadRequest(`${email} is not exists`);

      const isMath = bcrypt.compareSync(password, isEmail.password);

      if (!isMath) throw createError.BadRequest(`Password is not correct`);

      return { status: 200, data: isEmail.toObject() };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
