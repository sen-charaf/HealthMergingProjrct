// Function to get user ID from token
export const getUserIdFromToken = (token: string): string | null => {
  if (!token) return null;
  
  try {
    // For JWT tokens, you can decode the payload
    // This is a simple implementation - in production you might want to use a library
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const payload = JSON.parse(jsonPayload);
    return payload.id || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Function to get user ID from cookie
export const getUserId = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  const match = document.cookie.match(/user_id=([^;]+)/);
  return match ? match[1] : null;
};

// Function to get user type from cookie
export const getUserType = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  const match = document.cookie.match(/user_type=([^;]+)/);
  return match ? match[1] : null;
};

// Function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof document === 'undefined') return false;
  
  // Check for auth_token cookie
  return document.cookie.includes('auth_token=');
};

// Function to logout - this will need a backend endpoint to clear the cookies
export const logout = async (): Promise<void> => {
  try {
    // Call logout endpoint to clear cookies server-side
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    
    // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Function to get auth token
export const getToken = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  // Get token from cookies instead of localStorage
  return document.cookie.match(/auth_token=([^;]+)/)?.[1] || null;
};