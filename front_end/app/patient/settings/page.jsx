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

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-white border border-gray-200 mb-6">
          <TabsTrigger value="account" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            Account
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            Privacy
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Account Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Personal Information</h3>
                <p className="text-sm text-gray-500 mb-4">Update your personal details</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="(555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Button className="bg-blue-900 hover:bg-blue-800">Save Changes</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Communication Preferences</h3>
                <p className="text-sm text-gray-500 mb-4">Manage how we contact you</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Email Communication</p>
                      <p className="text-sm text-gray-500">
                        Receive emails about your account, appointments, and medical updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive text messages for appointment reminders</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Phone Calls</p>
                      <p className="text-sm text-gray-500">Receive phone calls for important updates</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Language & Accessibility</h3>
                <p className="text-sm text-gray-500 mb-4">Customize your experience</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Preferred Language</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Time Zone</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <Button className="bg-blue-900 hover:bg-blue-800">Save Preferences</Button>
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
                <h3 className="text-md font-medium text-blue-900 mb-2">Appointment Notifications</h3>
                <p className="text-sm text-gray-500 mb-4">Manage reminders for your appointments</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Appointment Reminders</p>
                      <p className="text-sm text-gray-500">Receive reminders before your scheduled appointments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Appointment Changes</p>
                      <p className="text-sm text-gray-500">
                        Get notified when your appointment is rescheduled or canceled
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Follow-up Reminders</p>
                      <p className="text-sm text-gray-500">Receive reminders to schedule follow-up appointments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Medication Notifications</h3>
                <p className="text-sm text-gray-500 mb-4">Manage reminders for your medications</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Medication Reminders</p>
                      <p className="text-sm text-gray-500">Receive reminders to take your medications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Refill Reminders</p>
                      <p className="text-sm text-gray-500">Get notified when it's time to refill your prescriptions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Medication Updates</p>
                      <p className="text-sm text-gray-500">Receive updates about your medications</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Other Notifications</h3>
                <p className="text-sm text-gray-500 mb-4">Manage other types of notifications</p>

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
                      <p className="font-medium text-gray-700">Messages from Providers</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications for new messages from your healthcare providers
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Health Tips & News</p>
                      <p className="text-sm text-gray-500">Receive occasional health tips and news</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Privacy Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Data Sharing</h3>
                <p className="text-sm text-gray-500 mb-4">Control how your data is shared</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Share with Healthcare Providers</p>
                      <p className="text-sm text-gray-500">
                        Allow your healthcare providers to access your medical records
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Share with Insurance Providers</p>
                      <p className="text-sm text-gray-500">
                        Allow your insurance company to access your medical records
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Share for Research Purposes</p>
                      <p className="text-sm text-gray-500">Allow anonymized data to be used for medical research</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Privacy Controls</h3>
                <p className="text-sm text-gray-500 mb-4">Manage your privacy preferences</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Login History</p>
                      <p className="text-sm text-gray-500">View your recent login activity</p>
                    </div>
                    <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                      View
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Download Your Data</p>
                      <p className="text-sm text-gray-500">Download a copy of your personal data</p>
                    </div>
                    <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4">Security Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Password</h3>
                <p className="text-sm text-gray-500 mb-4">Update your password</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Current Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">New Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm New Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <Button className="bg-blue-900 hover:bg-blue-800">Update Password</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-blue-900 mb-2">Account Security</h3>
                <p className="text-sm text-gray-500 mb-4">Manage your account security settings</p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Session Management</p>
                      <p className="text-sm text-gray-500">Manage your active sessions</p>
                    </div>
                    <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Account Recovery</p>
                      <p className="text-sm text-gray-500">Set up account recovery options</p>
                    </div>
                    <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-md font-medium text-red-600 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-500 mb-4">Irreversible actions for your account</p>

                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
