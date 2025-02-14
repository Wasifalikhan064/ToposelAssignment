import "dotenv/config";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { fullname, email, password, gender, dob, country } = req.body;
  try {
    if (!fullname || !email || !password || !dob || !country) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      gender,
      dob,
      country,
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "user created successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User is not registered" });
  }
  const isMatch = await bcryptjs.compareSync(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "17d",
  });
  const { password:pass,...rest } = user._doc;
  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .json(rest);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
};

export const searchUser = async (req, res) => {
  try {
    const { fullname } = req.query; 

    if (!fullname) {
      return res.status(400).json({ success: false, message: "Fullname is required" });
    }

    const users = await User.find({ fullname: { $regex: fullname, $options: "i" } });

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

  
    const isMatch = bcryptjs.compareSync(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect old password" });
    }

   
    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

    
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
