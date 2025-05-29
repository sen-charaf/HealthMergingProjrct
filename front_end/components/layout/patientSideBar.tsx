"use client";

import Link from "next/link";
import {
  Heart,
  LayoutGrid,
  FileText,
  Calendar,
  Pill,
  FileIcon,
  User,
  Settings,
  LogOut,
  MessageCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export function PatientSideBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Get user initials for avatar
  const initials = user 
    ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`
    : "U";

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      // Add a small delay before navigation to ensure state updates complete
      setTimeout(() => {
        router.push("/login");
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect to login page even if logout fails
      router.push("/login");
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-900 text-white rounded flex items-center justify-center font-bold">
            {initials}
          </div>
          <div>
            <h2 className="font-bold text-blue-900">Medical Portal</h2>
            <p className="text-sm text-gray-500">Patient View</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <Link
              href="/patient/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <LayoutGrid className="h-5 w-5" />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/medical-history"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <FileText className="h-5 w-5" />
              <span>Medical History</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/appointments"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <Calendar className="h-5 w-5" />
              <span>Appointments</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/medications"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <Pill className="h-5 w-5" />
              <span>Medications</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/documents"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <FileIcon className="h-5 w-5" />
              <span>Documents</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/messages"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Messages</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {user?.profileImage ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={user.profileImage} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Use a safer approach that doesn't manipulate parent DOM directly
                    e.currentTarget.onerror = null;
                    
                    // Just hide the image and show a fallback color/text via CSS
                    e.currentTarget.style.display = 'none';
                    
                    // Create and append a span with initials instead of using innerHTML
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.classList.add('bg-blue-100', 'text-blue-900', 'flex', 'items-center', 'justify-center', 'font-bold');
                      
                      const span = document.createElement('span');
                      span.textContent = user && user.firstName && user.lastName ? initials : "PT";
                      e.currentTarget.parentElement.appendChild(span);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold">
                {user && user.firstName && user.lastName ? initials : "PT"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-blue-900 truncate">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <Link
              href="/patient/profile"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-900 px-2 py-1.5 rounded-md hover:bg-blue-50"
            >
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/patient/settings"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-900 px-2 py-1.5 rounded-md hover:bg-blue-50"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 px-2 py-1.5 rounded-md hover:bg-red-50 w-full text-left"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
            <Heart className="h-5 w-5 text-blue-900" />
            <span className="text-sm text-blue-900 font-medium">
              HealthCare
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
