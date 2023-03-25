import { Express } from "express";
import usersRoute from "./users.route";
import albumRoute from "./album.route";

export default (app: Express) => {
  app.use("/users", usersRoute());
  app.use("/albums", albumRoute());
};
