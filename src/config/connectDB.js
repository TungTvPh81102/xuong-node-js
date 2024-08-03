import { connect } from "mongoose";
import { MONGO_URL } from "./env.js";

const connectDB = async () => {
  try {
    await connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect DB successfully!");
  } catch (error) {
    console.log(`Connect DB error: ${error}`);
  }
};

export default connectDB;
