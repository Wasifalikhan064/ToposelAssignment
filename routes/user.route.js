import express from "express";
import { searchUser } from "../controllers/auth.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router= express.Router()
router.get("/",getAllUsers);
router.get("/search",searchUser)

export default router;