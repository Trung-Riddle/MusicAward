import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./routes/users";
import  CreateHttpError  from "http-errors";
// import albumRouter from "./routes/album";

const app = express();
config();

const port = process.env.PORT || 3001;

/** Connect to Mongo */
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_URL || "", { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.error(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/test", (req, res, next) => {
  try {
    throw CreateHttpError.BadRequest()
  } catch (error) {
    next(error)
  }
})

app.use("/users", userRouter);
// app.use("/albums", albumRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.json({
    status: err.status,
    message: err.message
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});