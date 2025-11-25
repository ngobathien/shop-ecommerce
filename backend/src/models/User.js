import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    // image: {
    //   publicId: { type: String },
    //   url: {
    //     type: String,
    //   },
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
