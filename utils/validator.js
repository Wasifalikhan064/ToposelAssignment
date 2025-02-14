import { body, validationResult } from "express-validator";

export const validateSignup = [
  body("fullname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long"),

  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be 'male', 'female', or 'other'"),

  body("dob")
    .isISO8601()
    .withMessage("Invalid date format (must be YYYY-MM-DD)")
    .toDate(),

  body("country").notEmpty().withMessage("Country is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors
          .array()
          .map((err) => ({ field: err.path, message: err.msg })),
      });
    }
    next();
  },
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors
          .array()
          .map((err) => ({ field: err.path, message: err.msg })),
      });
    }
    next();
  },
];
