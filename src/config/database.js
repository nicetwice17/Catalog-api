import mongoose from "mongoose";

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Database connected");
      })
      .catch((error) => {
        console.log(`Database connect error: ${error}`);
        process.exit(1);
      });
}