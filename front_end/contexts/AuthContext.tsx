"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import api from "@/api/api"
import UserProfile  from "@/types/user"

type AuthContextType = {
  user: UserProfile | null
  isLoading: boolean
  login: (email: string, password: string, userType: string) => Promise<UserProfile | undefined>
  logout: () => Promise<void>
  isAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        // With HTTP-only cookies, we don't need to manually send the token
        // The cookie will be sent automatically with the request
        const response = await api.get("/auth/me")
        setUser(response.data)
      } catch (error) {
        console.error("Auth verification failed:", error)
        // No need to remove token from localStorage as it's now in HTTP-only cookies
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = async (email: string, password: string, userType: string) => {
    try {
      const response = await api.post("/auth/login", { email, password, userType })
      // No need to store token in localStorage as it's now in HTTP-only cookies
      setUser(response.data.user)
      return response.data.user
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Call the logout endpoint to clear cookies on the server
      await api.post("/auth/logout")
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
      // Even if the server request fails, clear the user state
      setUser(null)
    }
  }

  const isAuthenticated = () => {
    return !!user
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}