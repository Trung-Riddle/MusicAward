import { Request, Response, NextFunction } from "express";
import { userService } from "../services/users/users.service";

export const usersController = {
  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const user: any = await userService.create(req.body);

    if (!user.data) return next(user);

    return res.status(user.status).json(user.data);
  },

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const user = await userService.login(req.body);

    if (!user.data) return next(user);

    return res.status(user.status).json(user.data);
  },
};
