import { Express } from "express";
import usersRoute from "./users.route";
import albumRoute from "./album.route";
import songsRoute from "./songs.route";

export default (app: Express) => {
  app.use("/users", usersRoute());
  app.use("/albums", albumRoute());
  app.use("/songs", songsRoute());
};
