import mongoose from "mongoose";

const googleAuthSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    // email: {
    //   type: String,
    //   unique: true,
    // },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("GoogleAuthentication", googleAuthSchema);
