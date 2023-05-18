import dotenv from "dotenv";
dotenv.config();
import colors from 'colors'

import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.mongoDB_URL);
    console.log(`Database Connected ${conn.connection.host}`.bgCyan.white);
  } catch (err) {
    console.log(err);
  }
};

export default connectionDB;
