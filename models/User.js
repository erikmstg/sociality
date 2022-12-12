import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      minLength: 3,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
