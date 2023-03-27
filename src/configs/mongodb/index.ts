import mongoose from "mongoose";

export const mongodb = {
  connect() {
    mongoose.set("strictQuery", false);
    mongoose.Promise = Promise;
    mongoose
      .connect(process.env.MONGO_DB_URL)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => console.error(error));


  },
};
