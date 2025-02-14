import express from "express";
import { searchUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router= express.Router()
router.get("/search",verifyToken,searchUser)

export default router;