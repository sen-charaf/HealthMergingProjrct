import User from '../models/User.js';
import mongoose from 'mongoose';
import { BaseService } from './BaseService.js';

export class UserService extends BaseService<any> {
  constructor() {
    super(User);
  }
  
  // Helper method to add full URL to profile image path
   addImageUrl(user: any): any {
    if (user && user.profileImage) {
      const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 8000}`;
      
      // If user is a Mongoose document, convert to plain object
      const userObj = user.toObject ? user.toObject() : { ...user };
      userObj.profileImage = `${baseUrl}${userObj.profileImage}`;
      return userObj;
    }
    return user;
  }
  
  // Override findById from BaseService to include image URL
  async findById(id: string): Promise<any | null> {
    try {
      const user = await User.findById(id).exec();
      return this.addImageUrl(user);
    } catch (error) {
      throw error;
    }
  }
  
  // Override findAll from BaseService to include image URL
  async findAll(): Promise<any[]> {
    try {
      const users = await User.find().exec();
      return users.map(user => this.addImageUrl(user));
    } catch (error) {
      throw error;
    }
  }
  
  async findByEmail(email: string): Promise<any | null> {
    try {
      const user = await User.findOne({ email }).exec();
      return this.addImageUrl(user);
    } catch (error) {
      throw error;
    }
  }
  
  async updatePassword(userId: string, hashedPassword: string): Promise<any | null> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true }
      ).exec();
      return this.addImageUrl(user);
    } catch (error) {
      throw error;
    }
  }
  
  async updateUserInfo(userId: string, updateData: Partial<any>): Promise<any | null> {
    try {
      // Ensure sensitive fields cannot be updated through this method
      const safeUpdateData = { ...updateData };
      delete safeUpdateData.password;
      delete safeUpdateData.userType;
      delete safeUpdateData.isVerified;
      
      const user = await User.findByIdAndUpdate(
        userId,
        safeUpdateData,
        { new: true }
      ).select('-password').exec();
      
      return this.addImageUrl(user);
    } catch (error) {
      throw error;
    }
  }
  
  async updateEmail(userId: string, newEmail: string): Promise<any | null> {
    try {
      // Check if email is already in use
      const existingUser = await this.findByEmail(newEmail);
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error('Email is already in use');
      }
      
      // Update email and set isVerified to false
      const user = await User.findByIdAndUpdate(
        userId,
        { 
          email: newEmail,
          isVerified: false 
        },
        { new: true }
      ).select('-password').exec();
      
      return this.addImageUrl(user);
    } catch (error) {
      throw error;
    }
  }
  
  async updateUserStatus(userId: string, isActive: boolean): Promise<any | null> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true }
      ).select('-password').exec();
      
      return this.addImageUrl(user);
    } catch (error) {
      throw error;
    }
  }
  
  async getUserWithProfile(userId: string): Promise<any> {
    try {
      const user = await User.findById(userId).select('-password').exec();
      if (!user) {
        throw new Error('User not found');
      }
      
      let profile = null;
      if (user.userType === 'doctor') {
        profile = await mongoose.model('Doctor').findOne({ user: userId }).exec();
      } else if (user.userType === 'patient') {
        profile = await mongoose.model('Patient').findOne({ user: userId }).exec();
      }
      
      return {
        user: this.addImageUrl(user),
        profile
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
