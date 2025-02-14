import express from "express";
import { validateLogin, validateSignup } from "../utils/validator.js";
import { login, resetPassword, signup } from "../controllers/auth.controller.js";

const router= express.Router()

router.post("/signup",validateSignup,signup)
router.post("/login",validateLogin,login)
router.post("/reset-password",resetPassword); 

export default router;