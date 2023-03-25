import { Express } from "express";
import usersRoute from "./users.route";
import albumRoute from "./album.route";

export default (app: Express) => {
  app.use("/user", usersRoute());
  app.use("/album", albumRoute());
};
