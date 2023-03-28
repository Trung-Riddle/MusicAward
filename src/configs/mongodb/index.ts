import mongoose from "mongoose";

export const mongodb = {
  connect() {
    mongoose.set("strictQuery", false);
    mongoose.Promise = Promise;
    mongoose
      .connect(process.env.MONGO_DB_URL_TEST)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => console.error(error));


  },
};
