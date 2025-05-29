import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserEmail,
  updateUserStatus,
  uploadUserProfileImage
} from '../controllers/UserController.js';
import upload from '../middlewares/uploadMiddleware.js';
//import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

// Basic CRUD routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Additional user management routes
router.get('/:id/profile', getUserProfile);
router.patch('/:id/email', updateUserEmail);
router.patch('/:id/status', updateUserStatus);

// Profile image upload route
router.post('/:userId/upload-profile-image',upload.single('profileImage'), uploadUserProfileImage);

export default router;