import User from "../models/User";
import path from "path";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface UploadResult {
  success: boolean;
  message: string;
  profileImage?: string;
  error?: any;
}

export const uploadProfileImage = async (
  userId: string,
  file: Express.Multer.File | undefined
): Promise<UploadResult> => {
  try {
    if (!file) {
      return { success: false, message: "No file uploaded" };
    }

    // Store only the relative path
    const relativePath = `/uploads/profile-images/${file.filename}`;

    // Update user profile with the relative path only
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, message: "User not found" };
 
    }

    if(user.profileImage){
      console.log(" profile exist",user.profileImage);
      
      const oldImagePath = path.join(__dirname, '../../', user.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    user.profileImage = relativePath;
    await user.save();

    // For the response, we'll still include the full URL
    const baseUrl =
      process.env.BASE_URL || `http://localhost:${process.env.PORT || 8000}`;
    const imageUrl = `${baseUrl}${relativePath}`;

    return {
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: imageUrl,
    };
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return {
      success: false,
      message: "Server error",
      error,
    };
  }
};
