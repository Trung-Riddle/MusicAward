import { Request, Response } from "express";
import User, { IUser } from "../../models/user";

const createUser = async (req: Request, res: Response) => {
  try {
    const { ...prop }: IUser = req.body;
    const user = await User.create({ ...prop });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export default createUser;
