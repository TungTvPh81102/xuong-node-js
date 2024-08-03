import mongoose from "mongoose";

const authAccessToken = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    accessToken: {
      type: String,
      unique: true,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
    user_type: {
      type: String,
      enum: ["User", "GoogleAuthentication"],
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("AuthAccessToken", authAccessToken);
