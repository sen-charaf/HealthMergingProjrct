import { Request, Response, NextFunction } from 'express';
import { AppError, ErrorType } from '../utils/app-error';
import { Prisma } from '@prisma/client';
import { logger } from '../utils/logger';

// Log error details using the logger
const logError = (err: Error): void => {
  logger.logError(err);
};

// Handle Prisma-specific errors
const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError): AppError => {
  let message = 'Database error';
  let statusCode = 500;
  
  // Handle specific Prisma error codes
  switch (err.code) {
    case 'P2002': // Unique constraint violation
      message = `Duplicate entry for ${err.meta?.target}`;
      statusCode = 409; // Conflict
      break;
    case 'P2025': // Record not found
      message = 'Record not found';
      statusCode = 404;
      break;
    case 'P2003': // Foreign key constraint failed
      message = 'Related record not found';
      statusCode = 400;
      break;
    // Add more specific error codes as needed
  }
  
  return new AppError(message, ErrorType.TECHNICAL, statusCode, true);
};

// Main error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log all errors
  logError(err);
  
  // Default error
  let error = err;
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorType = ErrorType.TECHNICAL;
  
  // Handle AppError instances
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorType = err.type;
  } 
  // Handle Prisma errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(err);
    statusCode = prismaError.statusCode;
    message = prismaError.message;
    errorType = prismaError.type;
  }
  // Handle validation errors (e.g., from express-validator)
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
    errorType = ErrorType.FUNCTIONAL;
  }
  
  // Send response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      type: errorType,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

// Catch 404 errors for undefined routes
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Not found - ${req.originalUrl}`, ErrorType.FUNCTIONAL, 404, true);
  next(error);
};

// Catch unhandled promise rejections
export const unhandledRejectionHandler = (
  reason: Error,
  promise: Promise<any>
): void => {
  console.error('Unhandled Rejection at:', promise);
  logError(reason);
  // In a production environment, you might want to gracefully restart the server
  // process.exit(1);
};