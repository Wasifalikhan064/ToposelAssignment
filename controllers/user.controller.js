import { User } from "../models/user.model.js";


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