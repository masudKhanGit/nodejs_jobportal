import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Schema, model } from "mongoose";
dotenv.config()

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      minlength: [3, "Minimum length 3"],
    },
    username: {
      type: String,
      required: true,
      minlength: [3, "Minimum length 3"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [6, "Minimum password 6 character"],
    },
    location: {
      type: String,
      default: "Bangladesh",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

// generate hash password middleware
userSchema.pre('save', async function() {
  if(!this.isModified) return;
  const salt = await bcrypt.genSaltSync(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// compare password
userSchema.methods.comparePassword = async function(userPassword) {
  const isMatch = await bcrypt.compare(this.password, userPassword)
  return isMatch
}

// create jwt token
userSchema.methods.createJWT = function() {
  return jwt.sign({ userId: this._id }, process.env.SECRET_KEY_JWT, { expiresIn: '1d' })
}

export default model("User", userSchema);
