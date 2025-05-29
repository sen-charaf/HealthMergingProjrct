// controllers/PhoneAuthController.ts
import { Request, Response } from "express";
import TwilioService from "../services/TwilioService.js";
import authService from "../services/AuthService.js";
import UserService from "../services/UserService.js";

export const sendPhoneVerification = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Format phone number to E.164 format (e.g., +1234567890)
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber.replace(/\D/g, '')}`;

    const result = await TwilioService.sendVerificationCode(formattedPhone);

    res.status(200).json({
      message: "Verification code sent successfully",
      status: result.status
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error instanceof Error ? error.message : "Failed to send verification code"
    });
  }
};

export const verifyPhoneCode = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({ message: "Phone number and code are required" });
    }

    // Format phone number to E.164 format
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber.replace(/\D/g, '')}`;

    const verification = await TwilioService.verifyCode(formattedPhone, code);

    if (!verification.valid) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Check if user exists with this phone number
    const existingUser = await authService.getUserByPhone(formattedPhone);

    if (existingUser) {
      // User exists, log them in
      const token = authService.generateToken(existingUser.id);

      // Set cookies
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 6 * 60 * 60 * 1000,
        sameSite: "strict",
        path: "/",
      });

      res.cookie("user_type", existingUser.userType, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 6 * 60 * 60 * 1000,
        sameSite: "strict",
        path: "/",
      });

      res.cookie("user_id", existingUser.id, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 6 * 60 * 60 * 1000,
        sameSite: "strict",
        path: "/",
      });

      return res.status(200).json({
        message: "Login successful",
        token,
        user: existingUser,
        isNewUser: false
      });
    } else {
      // New user, return success but indicate registration needed
      return res.status(200).json({
        message: "Phone verified successfully",
        phoneNumber: formattedPhone,
        isNewUser: true,
        requiresRegistration: true
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error instanceof Error ? error.message : "Failed to verify code"
    });
  }
};

export const registerWithPhone = async (req: Request, res: Response) => {
  try {
    const userData = {
      phoneNumber: req.body.phoneNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      name: `${req.body.firstName} ${req.body.lastName}`,
      userType: req.body.userType,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      profileImage: req.body.profileImage ?? null,
      isVerified: true, // Phone is already verified
      isPhoneVerified: true
    };

    const result = await authService.registerWithPhone(userData);

    // Set cookies
    res.cookie("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    res.cookie("user_type", result.user.userType, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    res.cookie("user_id", result.user.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    res.status(201).json({
      message: "User registered successfully",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};
