import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=GoogleAuthFailed`,
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    const clientUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${clientUrl}/oauth-success?token=${token}`);
  }
);

export default router;