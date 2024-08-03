import dotenv from "dotenv";
dotenv.config();
export const {
  PORT,
  MONGO_URL,
  JWT_SECRET,
  EMAIL_USER_NAME,
  EMAIL_PASSOWRD,
  CLIENT_ID,
  CLIENT_SECRET,
} = process.env;
