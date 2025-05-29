import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import EmailVerification from "../models/EmailVerification.js";
import userService from "./UserService.js";
import doctorService from "./DoctorService.js";
import patientService from "./PatientService.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN: string;
  private readonly EMAIL_VERIFICATION_EXPIRES: number; // in hours

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
    this.EMAIL_VERIFICATION_EXPIRES = 24; // 24 hours
  }

  async register(userData: any): Promise<any> {
    try {
      // Check if user already exists
      const existingUser = await userService.findByEmail(userData.email);
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Create new user
      const newUser = await userService.create({
        ...userData,
        password: hashedPassword,
        isVerified: false,
      });

      // Create profile based on user type
      if (userData.userType === "doctor") {
        await doctorService.create({
          user: newUser._id,
        });
      } else if (userData.userType === "patient") {
        await patientService.create({
          user: newUser._id,
        });
      }

      // Generate verification token and create verification record
      await this.createVerificationRecord(newUser._id, userData.email);

      // Generate JWT token
      const token = this.generateToken(newUser._id);

      return {
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          userType: newUser.userType,
          isVerified: newUser.isVerified,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<any> {
    try {
      // Find verification record with this token
      const verification = await EmailVerification.findOne({
        token,
        expires: { $gt: new Date() },
      });
      console.log(token);

      if (!verification) {
        throw new Error("Invalid or expired verification token");
      }

      // Update user to verified
      const user = await User.findById(verification.userId);
      if (!user) {
        throw new Error("User not found");
      }

      user.isVerified = true;
      await user.save();

      // Delete the verification record
      await EmailVerification.deleteOne({ _id: verification._id });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async resendVerificationEmail(email: string): Promise<any> {
    try {
      // Find user by email
      const user = await userService.findByEmail(email);
      if (!user) {
        throw new Error("User not found with this email");
      }

      // Check if already verified
      if (user.isVerified) {
        throw new Error("Email is already verified");
      }

      // Delete any existing verification records for this user
      await EmailVerification.deleteMany({ userId: user._id });

      // Create new verification record
      await this.createVerificationRecord(user._id, email);

      return {
        message: "Verification email sent",
      };
    } catch (error) {
      throw error;
    }
  }

  private async createVerificationRecord(
    userId: string,
    email: string
  ): Promise<void> {
    // Generate verification token
    const token = this.generateVerificationToken();

    // Set expiration date
    const expires = new Date();
    expires.setHours(expires.getHours() + this.EMAIL_VERIFICATION_EXPIRES);

    // Create verification record
    const verification = new EmailVerification({
      userId,
      email,
      token,
      expires,
    });

    await verification.save();

    // Send verification email
    await sendVerificationEmail(email, token);
  }

  async login(email: string, password: string): Promise<any> {
    try {
      // Find user by email
      const user = await userService.findByEmail(email);
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      // Generate token
      const token = this.generateToken(user._id);

      return {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          isVerified: user.isVerified,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserProfile(userId: string): Promise<any> {
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw new Error("User not found");
      }

      let profile = null;
      if (user.userType === "doctor") {
        profile = await doctorService.findByUserId(userId);
      } else if (user.userType === "patient") {
        profile = await patientService.findByUserId(userId);
      }

      profile = profile.toObject();
      delete profile.user;

      return {
        ...user._doc,
        profile,
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      // Find user
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        throw new Error("Current password is incorrect");
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await userService.updatePassword(userId, hashedPassword);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<boolean> {
    try {
      // Find user by email
      const user = await userService.findByEmail(email);
      if (!user) {
        throw new Error("User not found with this email");
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { id: user._id },
        this.JWT_SECRET + user.password,
        { expiresIn: "15m" }
      );

      // Send password reset email
      await sendVerificationEmail(email, resetToken);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(
    userId: string,
    token: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      // Find user
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Verify token
      try {
        jwt.verify(token, this.JWT_SECRET + user.password);
      } catch (error) {
        throw new Error("Invalid or expired token");
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      await userService.updatePassword(userId, hashedPassword);

      return true;
    } catch (error) {
      throw error;
    }
  }

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId: userId }, this.JWT_SECRET, { expiresIn: "6h" });
  }

  private generateVerificationToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }
}

export default new AuthService();

export const getUserByPhone = async (phoneNumber: string) => {
  // Implementation depends on your database structure
  // Example with MongoDB/Mongoose:
  const user = await User.findOne({ phoneNumber });
  return user;
};

export const registerWithPhone = async (userData: any) => {
  // Implementation similar to your existing register method
  // but for phone-based registration
  const hashedPassword = userData.password ? await hashPassword(userData.password) : null;
  
  const user = new User({
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  await user.save();
  
  const token = generateToken(user.id);
  
  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      isVerified: user.isVerified,
      isPhoneVerified: user.isPhoneVerified
    }
  };
};