import Notification from "../models/Notification.js";
import { Request, Response } from "express";

// Get all notifications
export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find().populate("recipient");
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// Get notifications by user ID
export const getNotificationsByUserId = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({
      recipient: req.params.userId,
    })
      .sort({ createdAt: -1 })
      .populate("recipient");
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user notifications", error });
  }
};

// Get notification by ID
export const getNotificationById = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.id).populate(
      "recipient"
    );
    if (!notification) {
      res.status(404).json({ message: "Notification not found" });
      return;
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notification", error });
  }
};

// Create new notification
export const createNotification = async (req: Request, res: Response) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(400).json({ message: "Error creating notification", error });
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!updatedNotification) {
      res.status(404).json({ message: "Notification not found" });
      return;
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(400).json({ message: "Error updating notification", error });
  }
};

// Delete notification
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.id
    );
    if (!deletedNotification) {
      res.status(404).json({ message: "Notification not found" });
      return;
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error });
  }
};
