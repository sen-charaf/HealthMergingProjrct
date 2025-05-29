import axios, { AxiosError } from 'axios';
import { AppError, createFunctionalError, createTechnicalError, createNetworkError } from './error-types';

// Process API errors and convert them to AppError instances
export const handleApiError = (error: any): AppError => {
  // Check if it's an Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Network error (no response)
    if (!axiosError.response) {
      return createNetworkError('Network error: Unable to connect to the server', axiosError);
    }
    
    const { status, data } = axiosError.response;
    
    // Client errors (4xx) are usually functional errors
    if (status >= 400 && status < 500) {
      // Extract error message from response if available
      const errorMessage = typeof data === 'object' && data?.error?.message 
        ? data.error.message 
        : `Error ${status}: ${axiosError.message}`;
      
      return createFunctionalError(errorMessage, status, axiosError);
    }
    
    // Server errors (5xx) are technical errors
    if (status >= 500) {
      return createTechnicalError(`Server error (${status})`, status, axiosError);
    }
    
    // Fallback for other status codes
    return createTechnicalError(`Unexpected error (${status})`, status, axiosError);
  }
  
  // If it's already an AppError, return it
  if (error instanceof AppError) {
    return error;
  }
  
  // For other types of errors
  return createTechnicalError(
    error?.message || 'An unknown error occurred',
    undefined,
    error
  );
};

// Debug logger for development
export const logErrorDetails = (error: AppError): void => {
  if (process.env.NODE_ENV !== 'production' || localStorage.getItem('enableVerboseErrors') === 'true') {
    console.group('🔴 Error Details');
    console.error('Type:', error.type);
    console.error('Message:', error.message);
    console.error('Status:', error.statusCode || 'N/A');
    console.error('Stack:', error.stack);
    
    if (error.originalError) {
      console.group('Original Error');
      console.error(error.originalError);
      console.groupEnd();
    }
    
    console.groupEnd();
  }
};