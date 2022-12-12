import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { URL } = process.env;

mongoose.set("strictQuery", true);

mongoose.connect(URL, (err) => {
  if (err) console.log(err);
  console.log("Connect to database");
});
