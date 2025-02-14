import "dotenv/config"
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    req.user = decoded;

    next(); 
  } catch (error) {
    return res.status(403).json({ success: false, message: "Forbidden: Invalid token" });
  }
};
