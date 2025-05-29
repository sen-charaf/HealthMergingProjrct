import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Settings</h1>
          <p className="text-gray-500">Manage your account preferences</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white border border-gray-200 mb-6">
          <TabsTrigger value="general" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            Privacy & Security
          </TabsTrigger>
          <TabsTrigger value="clinical" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            Clinical Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4">General Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Interface Preferences</h3>
                <p className="text-sm text-gray-500 mb-4">Customize your experience</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Dark Mode</p>
                      <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Compact View</p>
                      <p className="text-sm text-gray-500">Display more information on screen</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Show Patient Photos</p>
                      <p className="text-sm text-gray-500">Display patient profile pictures</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Language & Region</h3>
                <p className="text-sm text-gray-500 mb-4">Set your preferred language and regional settings</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Language</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Time Zone</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Date Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Time Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>12-hour (AM/PM)</option>
                      <option>24-hour</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <Button className="bg-blue-900 hover:bg-blue-800">Save Preferences</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Accessibility</h3>
                <p className="text-sm text-gray-500 mb-4">Adjust settings for better accessibility</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Larger Text</p>
                      <p className="text-sm text-gray-500">Increase text size throughout the application</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">High Contrast</p>
                      <p className="text-sm text-gray-500">Enhance visual distinction between elements</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Reduce Motion</p>
                      <p className="text-sm text-gray-500">Minimize animations and transitions</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="mt-4">
                  <Button className="bg-blue-900 hover:bg-blue-800">Save Accessibility Settings</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Notification Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Patient Notifications</h3>
                <p className="text-sm text-gray-500 mb-4">Manage notifications related to patients</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">New Messages</p>
                      <p className="text-sm text-gray-500">Receive notifications when patients send you messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Appointment Reminders</p>
                      <p className="text-sm text-gray-500">Get notified about upcoming appointments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Urgent Patient Updates</p>
                      <p className="text-sm text-gray-500">
                        Receive immediate notifications for critical patient updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Prescription Requests</p>
                      <p className="text-sm text-gray-500">Get notified about new prescription requests</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Clinical Notifications</h3>
                <p className="text-sm text-gray-500 mb-4">Manage notifications related to clinical activities</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Lab Results</p>
                      <p className="text-sm text-gray-500">Get notified when new lab results are available</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Critical Lab Values</p>
                      <p className="text-sm text-gray-500">Receive immediate notifications for abnormal lab results</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Referrals</p>
                      <p className="text-sm text-gray-500">Get notified about new referrals</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Medical Record Updates</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications when other providers update shared patient records
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Administrative Notifications</h3>
                <p className="text-sm text-gray-500 mb-4">Manage notifications related to administrative tasks</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Schedule Changes</p>
                      <p className="text-sm text-gray-500">Get notified about changes to your schedule</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">System Updates</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications about system maintenance and updates
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Staff Messages</p>
                      <p className="text-sm text-gray-500">Get notified about messages from other staff members</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Credential Reminders</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications about expiring credentials and licenses
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Notification Delivery</h3>
                <p className="text-sm text-gray-500 mb-4">Choose how you want to receive notifications</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email Notifications</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>All notifications</option>
                      <option>Urgent notifications only</option>
                      <option>Daily digest</option>
                      <option>None</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">SMS Notifications</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Urgent notifications only</option>
                      <option>All notifications</option>
                      <option>None</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Push Notifications</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>All notifications</option>
                      <option>Urgent notifications only</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <Button className="bg-blue-900 hover:bg-blue-800">Save Notification Preferences</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Privacy & Security Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Account Security</h3>
                <p className="text-sm text-gray-500 mb-4">Manage your account security settings</p>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-blue-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account by requiring a verification code when you sign
                          in.
                        </p>
                      </div>
                      <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        Enable
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-blue-900">Password</h4>
                        <p className="text-sm text-gray-500">
                          Change your password regularly to maintain account security.
                        </p>
                      </div>
                      <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        Change Password
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-blue-900">Login History</h4>
                        <p className="text-sm text-gray-500">
                          Review your recent login activity to ensure account security.
                        </p>
                      </div>
                      <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        View History
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-blue-900">Session Management</h4>
                        <p className="text-sm text-gray-500">
                          Manage your active sessions and sign out from other devices.
                        </p>
                      </div>
                      <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        Manage Sessions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Privacy Controls</h3>
                <p className="text-sm text-gray-500 mb-4">Manage how your information is used and shared</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Profile Visibility</p>
                      <p className="text-sm text-gray-500">
                        Allow other healthcare providers to view your professional profile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Contact Information Sharing</p>
                      <p className="text-sm text-gray-500">Share your contact information with other providers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Research Participation</p>
                      <p className="text-sm text-gray-500">Allow anonymized data to be used for healthcare research</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Analytics Tracking</p>
                      <p className="text-sm text-gray-500">Allow usage data collection to improve the platform</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Data Management</h3>
                <p className="text-sm text-gray-500 mb-4">Manage your personal data</p>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-blue-900">Download Your Data</h4>
                        <p className="text-sm text-gray-500">
                          Download a copy of your personal data and activity history.
                        </p>
                      </div>
                      <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-blue-900">Activity Log</h4>
                        <p className="text-sm text-gray-500">
                          View a log of your activities and actions within the system.
                        </p>
                      </div>
                      <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        View Log
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-red-600 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-500 mb-4">Irreversible actions for your account</p>

                <div className="p-4 border border-red-200 rounded-md bg-red-50">
                  <h4 className="font-medium text-red-800">Deactivate Account</h4>
                  <p className="text-sm text-red-700 mb-4">
                    Temporarily deactivate your account. You can reactivate it later by contacting the administrator.
                  </p>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-100">
                    Deactivate Account
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="clinical">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Clinical Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Documentation Preferences</h3>
                <p className="text-sm text-gray-500 mb-4">Customize your clinical documentation settings</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Default Note Template</p>
                      <p className="text-sm text-gray-500">Use SOAP format as default for clinical notes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Auto-Save Notes</p>
                      <p className="text-sm text-gray-500">Automatically save notes every 2 minutes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Include Signature</p>
                      <p className="text-sm text-gray-500">Automatically add your signature to clinical notes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Default Note Template</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>SOAP Format</option>
                    <option>Problem-Oriented</option>
                    <option>Narrative</option>
                    <option>Custom Template</option>
                  </select>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Prescription Settings</h3>
                <p className="text-sm text-gray-500 mb-4">Customize your prescription preferences</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Default Pharmacy</p>
                      <p className="text-sm text-gray-500">Set a default pharmacy for prescriptions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Medication Interaction Alerts</p>
                      <p className="text-sm text-gray-500">Show alerts for potential medication interactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Generic Substitution</p>
                      <p className="text-sm text-gray-500">Default to generic medications when available</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Default Pharmacy</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>MedRx Pharmacy - Main St</option>
                    <option>City Pharmacy - Downtown</option>
                    <option>Hospital Pharmacy</option>
                    <option>Patient's Choice</option>
                  </select>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Lab & Imaging Preferences</h3>
                <p className="text-sm text-gray-500 mb-4">Customize your lab and imaging settings</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Default Lab Facility</p>
                      <p className="text-sm text-gray-500">Set a default facility for lab orders</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Abnormal Result Highlighting</p>
                      <p className="text-sm text-gray-500">Highlight abnormal lab results</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Show Trending</p>
                      <p className="text-sm text-gray-500">Display trend graphs for lab results</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Default Lab Facility</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Memorial Hospital Lab</option>
                      <option>City Medical Labs</option>
                      <option>Regional Reference Laboratory</option>
                      <option>Patient's Choice</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Default Imaging Facility</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Memorial Hospital Radiology</option>
                      <option>Advanced Imaging Center</option>
                      <option>City Diagnostic Imaging</option>
                      <option>Patient's Choice</option>
                    </select>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Clinical Decision Support</h3>
                <p className="text-sm text-gray-500 mb-4">Customize clinical decision support settings</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Medication Alerts</p>
                      <p className="text-sm text-gray-500">Show alerts for medication interactions and allergies</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Diagnostic Suggestions</p>
                      <p className="text-sm text-gray-500">Show AI-powered diagnostic suggestions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Treatment Guidelines</p>
                      <p className="text-sm text-gray-500">Show evidence-based treatment guidelines</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Preventive Care Reminders</p>
                      <p className="text-sm text-gray-500">Show preventive care recommendations for patients</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="mt-4">
                  <Button className="bg-blue-900 hover:bg-blue-800">Save Clinical Settings</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
