import { Request, Response } from 'express';
import { uploadProfileImage } from '../services/ImageUploadService.js';
import userService from '../services/UserService.js';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
       res.status(404).json({ message: 'User not found' });
       return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const savedUser = await userService.create(req.body);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.updateUserInfo(req.params.id, req.body);
    if (!updatedUser) {
       res.status(404).json({ message: 'User not found' });
       return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await userService.delete(req.params.id);
    if (!deletedUser) {
       res.status(404).json({ message: 'User not found' });
       return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Get user with profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userProfile = await userService.getUserWithProfile(req.params.id);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user profile', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};

// Update user email
export const updateUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
       res.status(400).json({ message: 'Email is required' });
       return;
    }
    
    const updatedUser = await userService.updateEmail(req.params.id, email);
    res.status(200).json({
      message: 'Email updated successfully. Please verify your new email address.',
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating email', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};

// Update user status
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.body;
    if (isActive === undefined) {
       res.status(400).json({ message: 'isActive status is required' });
       return;
    }
    
    const updatedUser = await userService.updateUserStatus(req.params.id, isActive);
    res.status(200).json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating user status', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};

// Add this method to your existing userController
export const uploadUserProfileImage = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    // Check if user is authorized (assuming req.user is set by auth middleware)
    // if (req.user && req.user.id !== userId) {
    //    res.status(403).json({ message: 'Not authorized to update this profile' });
    // }

    const result = await uploadProfileImage(userId, req.file);

    if (!result.success) {
       res.status(result.error ? 500 : 400).json({ 
        message: result.message,
        error: result.error
      });
      return;
    }

    res.status(200).json({
      message: result.message,
      profileImage: result.profileImage
    });
  } catch (error) {
    console.error('Error in uploadUserProfileImage controller:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};