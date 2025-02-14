import express from "express";
import { searchUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router= express.Router()
router.get("/",getAllUsers);
router.get("/search",verifyToken,searchUser)

export default router;