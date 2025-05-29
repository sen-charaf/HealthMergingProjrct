export enum ErrorType {
  FUNCTIONAL = 'FUNCTIONAL', 
  TECHNICAL = 'TECHNICAL',   
}

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    type: ErrorType = ErrorType.FUNCTIONAL,
    statusCode: number = 400,
    isOperational: boolean = true
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
    
    // Set the prototype explicitly
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Helper functions to create specific error types
export const createFunctionalError = (message: string, statusCode: number = 400): AppError => {
  return new AppError(message, ErrorType.FUNCTIONAL, statusCode, true);
};

export const createTechnicalError = (message: string, statusCode: number = 500): AppError => {
  return new AppError(message, ErrorType.TECHNICAL, statusCode, false);
};

// Common error factory functions
export const createNotFoundError = (resource: string): AppError => {
  return createFunctionalError(`${resource} not found`, 404);
};

export const createValidationError = (message: string): AppError => {
  return createFunctionalError(message, 400);
};

export const createUnauthorizedError = (message: string = 'Unauthorized'): AppError => {
  return createFunctionalError(message, 401);
};

export const createForbiddenError = (message: string = 'Forbidden'): AppError => {
  return createFunctionalError(message, 403);
};

export const createDatabaseError = (message: string): AppError => {
  return createTechnicalError(`Database error: ${message}`, 500);
};