export enum ErrorType {
  FUNCTIONAL = 'FUNCTIONAL', // Business/validation errors
  TECHNICAL = 'TECHNICAL',   // System/infrastructure errors
  NETWORK = 'NETWORK'        // Network connectivity issues
}

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode?: number;
  public readonly originalError?: any;

  constructor(
    message: string,
    type: ErrorType = ErrorType.TECHNICAL,
    statusCode?: number,
    originalError?: any
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.originalError = originalError;
    
    // Maintains proper stack trace
    Error.captureStackTrace(this, this.constructor);
    
    // Set the prototype explicitly
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Helper functions to create specific error types
export const createFunctionalError = (message: string, statusCode?: number, originalError?: any): AppError => {
  return new AppError(message, ErrorType.FUNCTIONAL, statusCode, originalError);
};

export const createTechnicalError = (message: string, statusCode?: number, originalError?: any): AppError => {
  return new AppError(message, ErrorType.TECHNICAL, statusCode, originalError);
};

export const createNetworkError = (message: string = 'Network error', originalError?: any): AppError => {
  return new AppError(message, ErrorType.NETWORK, undefined, originalError);
};