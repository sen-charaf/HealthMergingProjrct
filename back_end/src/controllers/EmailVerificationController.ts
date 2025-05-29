import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const resendCooldown = new Map<string, number>();
const COOLDOWN_MS = 30 * 1000;

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    const decoded: any = jwt.verify(token as string, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }
    if (user.isVerified) {
      res.status(400).json({ message: "User already verified" });
      return;
    }

    user.isVerified = true;
    await user.save();

    res
      .status(200)
      .json({ message: "Email verified successfully", user, token });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const reSendVerification = async (req: Request, res: Response) => {
  try {
    const emailParam = req.body.email;
    console.log(emailParam);

    if (!emailParam || typeof emailParam !== "string") {
      res
        .status(400)
        .json({ message: "The email is required and must be a string" });
      return;
    }
    const now = Date.now();
    const lastRequest = resendCooldown.get(emailParam) || 0;

    if (now - lastRequest < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastRequest)) / 1000);
      res
        .status(429)
        .json({ message: `Please wait ${secondsLeft}s before trying again.` });
      return;
    }

    resendCooldown.set(emailParam, now);

    const user = await User.findOne({ email: emailParam });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: "User already verified" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "10m",
    });

    await sendVerificationEmail(emailParam, token);

    res.status(200).json({ message: "Verification email resent successfully" });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ message: "Server error during email resend" });
  }
};
