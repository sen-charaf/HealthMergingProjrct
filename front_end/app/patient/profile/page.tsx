"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/api/api";
import { useRouter } from "next/navigation";
import  UserProfile  from "@/types/user";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { PatientProfile } from "@/types/user";

export default function ProfilePage() {
  // Use the auth context to get user information
  const { user } = useAuth();
  const patientProfile = user?.profile as PatientProfile;
  
  // Add notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  // Add file upload related hooks here
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    bloodType: "",
    height: "",
    weight: "",
    primaryCarePhysician: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phoneNumber: "",
    },
    insuranceProvider: {
      name: "",
      policyNumber: "",
    },
    preferredPharmacy: {
      name: "",
      address: "",
    },
  });
  //const router = useRouter();



  // Fetch user profile when userId is available
  useEffect(() => {
    
      if (!user) return;

      try {
        setUserProfile(user);
        console.log(user);

      
        
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phoneNumber: user.phoneNumber || "",
          dateOfBirth: user.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().split("T")[0]
            : "",
          address: user.address || "",
          bloodType: patientProfile?.bloodType || "",
          height: patientProfile?.height || "",
          weight: patientProfile?.weight || "",
          primaryCarePhysician: patientProfile?.primaryCarePhysician || "",
          emergencyContact: {
            name: patientProfile.emergencyContact?.name || "",
            relationship: patientProfile.emergencyContact?.relationship || "",
            phoneNumber: patientProfile.emergencyContact?.phoneNumber || "",
          },
          insuranceProvider: {
            name: patientProfile.insuranceProvider?.name || "",
            policyNumber: patientProfile.insuranceProvider?.policyNumber || "",
          },
          preferredPharmacy: {
            name: patientProfile.preferredPharmacy?.name || "",
            address: patientProfile.preferredPharmacy?.address || "",
          },
        });
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
   
    
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested objects (emergency contact, insurance, pharmacy)
    if (name.includes(".")) {
      const [objectName, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [objectName]: {
          ...(prev[objectName as keyof typeof prev] as Record<string, string>),
          [field]: value,
        },
      }));
    } else {
      // Handle regular fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Update handleSaveChanges to use our custom notification
  const handleSaveChanges = async () => {
    if (!user) return;

    try {
      // Prepare user data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
      };

      // Prepare profile data
      const profileData = {
        bloodType: formData.bloodType,
        height: formData.height,
        weight: formData.weight,
        primaryCarePhysician: formData.primaryCarePhysician,
        emergencyContact: {
          name: formData.emergencyContact.name,
          relationship: formData.emergencyContact.relationship,
          phoneNumber: formData.emergencyContact.phoneNumber,
        },
        insuranceProvider: {
          name: formData.insuranceProvider.name,
          policyNumber: formData.insuranceProvider.policyNumber,
        },
        preferredPharmacy: {
          name: formData.preferredPharmacy.name,
          address: formData.preferredPharmacy.address,
        },
      };

      // Update user info
      await api.put(`/users/${user._id}`, userData);

      // Update patient profile
      await api.put(`/patients/user/${user._id}`, profileData);

      // Fetch updated profile
      const response = await api.get(`/auth/me`);
      setUserProfile(response.data);

      setEditMode(false);

      // Show success notification
      setNotification({
        show: true,
        type: "success",
        message: "Your profile has been updated successfully.",
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, type: "success", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);

      // Show error notification
      setNotification({
        show: true,
        type: "error",
        message: "There was an error updating your profile. Please try again.",
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, type: "error", message: "" });
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[500px] col-span-1 rounded-lg" />
          <Skeleton className="h-[500px] col-span-1 md:col-span-2 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="p-6">
        Failed to load profile data. Please try again later.
      </div>
    );
  }

  const profile = userProfile.profile as PatientProfile;

  // Format date of birth if available
  const formattedDOB = userProfile.dateOfBirth
    ? format(new Date(userProfile.dateOfBirth), "MMMM d, yyyy")
    : "Not provided";

  // Create initials for avatar fallback
  const initials = `${userProfile.firstName?.charAt(0) || ""}${
    userProfile.lastName?.charAt(0) || ""
  }`;
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?._id) return;

    try {
      setUploading(true);

      // Create form data
      const formData = new FormData();
      formData.append("profileImage", file);
  
      // Upload the image
      await api.post(`/users/${user._id}/upload-profile-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Fetch updated profile to get the new image URL
      const response = await api.get(`/users/${user._id}/profile`);
      console.log(response.data);
      setUserProfile({...response.data.user, profile: response.data.profile});

      // Show success notification
      setNotification({
        show: true,
        type: "success",
        message: "Profile photo updated successfully.",
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, type: "success", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Failed to upload profile image:", error);

      // Show error notification
      setNotification({
        show: true,
        type: "error",
        message: "Failed to upload profile image. Please try again.",
      });

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, type: "error", message: "" });
      }, 3000);
    } finally {
      setUploading(false);
    }
  };

  // Add function to trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6">
      {/* Add notification display */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">My Profile</h1>
        {editMode ? (
          <div className="space-x-2">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-900 hover:bg-blue-800"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="border-blue-900 text-blue-900 hover:bg-blue-50"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={
                  userProfile.profileImage || "/placeholder.svg?height=96&width=96"
                }
                alt={`${userProfile.firstName} ${userProfile.lastName}`}
              />
              <AvatarFallback className="text-xl bg-blue-100 text-blue-900">
                {initials}
              </AvatarFallback>
            </Avatar>
            {editMode ? (
              <div className="space-y-2 w-full">
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="text-center"
                />
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="text-center"
                />
              </div>
            ) : (
              <h2 className="text-xl font-bold text-blue-900">{`${userProfile.firstName} ${userProfile.lastName}`}</h2>
            )}
            <p className="text-gray-500 mb-4">Patient ID: {userProfile._id}</p>

            {/* Add hidden file input and update button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              className="w-full bg-blue-900 hover:bg-blue-800 mb-2"
              onClick={handleUploadClick}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload New Photo"}
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Email Address
              </h3>
              <p className="text-blue-900">{userProfile.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Phone Number
              </h3>
              {editMode ? (
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
              ) : (
                <p className="text-blue-900">
                  {userProfile.phoneNumber || "Not provided"}
                </p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Date of Birth
              </h3>
              {editMode ? (
                <Input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-blue-900">{formattedDOB}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              {editMode ? (
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              ) : (
                <p className="text-blue-900">
                  {userProfile.address || "Not provided"}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="col-span-1 md:col-span-2 p-6">
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Primary Care Physician
                </h3>
                {editMode ? (
                  <Input
                    name="primaryCarePhysician"
                    value={formData.primaryCarePhysician}
                    onChange={handleInputChange}
                    placeholder="Primary Care Physician"
                    className="mb-4"
                  />
                ) : (
                  <p className="text-blue-900 mb-4">
                    {profile?.primaryCarePhysician || "Not specified"}
                  </p>
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Blood Type
                </h3>
                {editMode ? (
                  <Input
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    placeholder="Blood Type"
                    className="mb-4"
                  />
                ) : (
                  <p className="text-blue-900 mb-4">
                    {profile?.bloodType || "Not specified"}
                  </p>
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Height
                </h3>
                {editMode ? (
                  <Input
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="Height (cm)"
                    className="mb-4"
                  />
                ) : (
                  <p className="text-blue-900 mb-4">
                    {profile?.height ? `${profile.height} cm` : "Not specified"}
                  </p>
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Weight
                </h3>
                {editMode ? (
                  <Input
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Weight (kg)"
                    className="mb-4"
                  />
                ) : (
                  <p className="text-blue-900 mb-4">
                    {profile?.weight ? `${profile.weight} kg` : "Not specified"}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Emergency Contact
                </h3>
                {editMode ? (
                  <div className="space-y-2 mb-4">
                    <Input
                      name="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleInputChange}
                      placeholder="Contact Name"
                    />
                    <Input
                      name="emergencyContact.relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={handleInputChange}
                      placeholder="Relationship"
                    />
                    <Input
                      name="emergencyContact.phoneNumber"
                      value={formData.emergencyContact.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                    />
                  </div>
                ) : profile?.emergencyContact &&
                  profile.emergencyContact.name &&
                  profile.emergencyContact.relationship ? (
                  <>
                    <p className="text-blue-900">{`${profile.emergencyContact.name} (${profile.emergencyContact.relationship})`}</p>
                    <p className="text-blue-900 mb-4">
                      {profile.emergencyContact.phoneNumber ||
                        "No phone number"}
                    </p>
                  </>
                ) : (
                  <p className="text-blue-900 mb-4">Not specified</p>
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Insurance Provider
                </h3>
                {editMode ? (
                  <div className="space-y-2 mb-4">
                    <Input
                      name="insuranceProvider.name"
                      value={formData.insuranceProvider.name}
                      onChange={handleInputChange}
                      placeholder="Provider Name"
                    />
                    <Input
                      name="insuranceProvider.policyNumber"
                      value={formData.insuranceProvider.policyNumber}
                      onChange={handleInputChange}
                      placeholder="Policy Number"
                    />
                  </div>
                ) : profile?.insuranceProvider ? (
                  <>
                    <p className="text-blue-900">
                      {profile.insuranceProvider.name}
                    </p>
                    <p className="text-blue-900 mb-4">
                      Policy #: {profile.insuranceProvider.policyNumber}
                    </p>
                  </>
                ) : (
                  <p className="text-blue-900 mb-4">Not specified</p>
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Preferred Pharmacy
                </h3>
                {editMode ? (
                  <div className="space-y-2">
                    <Input
                      name="preferredPharmacy.name"
                      value={formData.preferredPharmacy.name}
                      onChange={handleInputChange}
                      placeholder="Pharmacy Name"
                    />
                    <Input
                      name="preferredPharmacy.address"
                      value={formData.preferredPharmacy.address}
                      onChange={handleInputChange}
                      placeholder="Pharmacy Address"
                    />
                  </div>
                ) : profile?.preferredPharmacy ? (
                  <>
                    <p className="text-blue-900">
                      {profile.preferredPharmacy.name}
                    </p>
                    <p className="text-blue-900">
                      {profile.preferredPharmacy.address}
                    </p>
                  </>
                ) : (
                  <p className="text-blue-900">Not specified</p>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Account Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">
                    Notification Preferences
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage how you receive notifications
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">
                    Privacy Settings
                  </h3>
                  <p className="text-sm text-gray-500">
                    Control your data and privacy preferences
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
