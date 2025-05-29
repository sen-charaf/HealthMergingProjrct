import { Request, Response } from "express";
import authService from "../services/AuthService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import UserService from "../services/UserService.js";

export const register = async (req: Request, res: Response) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      name: `${req.body.firstName} ${req.body.lastName}`, // For compatibility with AuthService
      userType: req.body.userType,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      profileImage: req.body.profileImage ?? null,
    };

    const result = await authService.register(userData);

    // Set the authentication token as an HTTP-only cookie
    res.cookie("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000, // 6 hours
      sameSite: "strict",
      path: "/",
    });

    // Set user type and ID cookies
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

console.log("result ", result);

    // Set the authentication token as an HTTP-only cookie
    res.cookie("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      maxAge: 6 * 60 * 60 * 1000, // 6 hours in milliseconds (matching token expiry)
      sameSite: "strict",
      path: "/",
    });

    // Also set user type and ID as cookies for client access
    res.cookie("user_type", result.user.userType, {
      httpOnly: false, // Allow JavaScript to read this
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    res.cookie("user_id", result.user.id, {
      httpOnly: false, // Allow JavaScript to read this
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    // Still  the token and user in the response body for backward compatibility
    res.status(200).json({
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message: error instanceof Error ? error.message : "Login failed",
      });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      throw new Error("Invalid verification token");
    }
    const verifiedUser = await authService.verifyEmail(token);

    const authToken = authService.generateToken(verifiedUser.id);

    // Set the authentication token as an HTTP-only cookie
    res.cookie("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000, // 6 hours
      sameSite: "strict",
      path: "/",
    });

    // Set user type and ID cookies
    res.cookie("user_type", verifiedUser.userType, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    res.cookie("user_id", verifiedUser.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({
      token: authToken,
      user: verifiedUser,
      success: verifiedUser.isVerified,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message:
          error instanceof Error ? error.message : "Email verification failed",
      });
  }
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const result = await authService.resendVerificationEmail(email);

    res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message:
          error instanceof Error
            ? error.message
            : "Failed to resend verification email",
      });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await authService.forgotPassword(email);

    res.status(200).json({
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message:
          error instanceof Error
            ? error.message
            : "Failed to process forgot password request",
      });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { userId, token, newPassword } = req.body;

    await authService.resetPassword(userId, token, newPassword);

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message:
          error instanceof Error ? error.message : "Failed to reset password",
      });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const userProfile = await authService.getUserProfile(userId);

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message:
          error instanceof Error ? error.message : "Failed to get user profile",
      });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    await authService.changePassword(userId, currentPassword, newPassword);

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message:
          error instanceof Error ? error.message : "Failed to change password",
      });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await authService.getUserProfile(req.user.userId);
    res.status(200).json(UserService.addImageUrl(user));
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message:
          error instanceof Error ? error.message : "Failed to get user profile",
      });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear all auth cookies
    res.clearCookie("auth_token", { path: "/" });
    res.clearCookie("user_type", { path: "/" });
    res.clearCookie("user_id", { path: "/" });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Logout failed",
    });
  }
};
