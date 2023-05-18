import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
dotenv.config();

const autheticate = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
  return res.status(400).json({ success: false, message: "Invalid Token" });
  try {
    token = token.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const user = await User.findById(decode.userId).select("-password");
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

export default autheticate;