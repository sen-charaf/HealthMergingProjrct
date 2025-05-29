import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Mail, MapPin, Phone, Clock, Award, BookOpen, Edit, Plus } from "lucide-react"

export default function DoctorProfilePage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">My Profile</h1>
        <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
          <Edit className="h-4 w-4 mr-2" /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Dr. Sarah Johnson" />
              <AvatarFallback className="text-2xl bg-blue-100 text-blue-900">SJ</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-blue-900">Dr. Sarah Johnson</h2>
            <p className="text-gray-500 mb-2">Cardiologist</p>
            <div className="flex gap-2 mb-4">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">MD</Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">FACC</Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">FAHA</Badge>
            </div>
            <Button className="w-full bg-blue-900 hover:bg-blue-800 mb-2">Upload New Photo</Button>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-900" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                <p className="text-blue-900">dr.johnson@healthcare.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-900" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                <p className="text-blue-900">(555) 987-6543</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-900" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Office Location</h3>
                <p className="text-blue-900">Main Hospital, Floor 3, Suite 302</p>
                <p className="text-blue-900">123 Medical Center Blvd</p>
                <p className="text-blue-900">New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-900" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Office Hours</h3>
                <p className="text-blue-900">Mon-Fri: 9:00 AM - 5:00 PM</p>
                <p className="text-blue-900">Sat: 9:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-md font-medium text-blue-900 mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Patients</p>
                <p className="text-xl font-bold text-blue-900">247</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Appointments</p>
                <p className="text-xl font-bold text-blue-900">32</p>
                <p className="text-xs text-gray-500">This week</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Years of Practice</p>
                <p className="text-xl font-bold text-blue-900">15</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Rating</p>
                <p className="text-xl font-bold text-blue-900">4.9/5</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="col-span-1 md:col-span-2 p-6">
          <Tabs defaultValue="professional">
            <TabsList className="bg-white border border-gray-200 mb-6">
              <TabsTrigger
                value="professional"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Professional Info
              </TabsTrigger>
              <TabsTrigger
                value="credentials"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Credentials
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Schedule
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
                Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="professional">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">About Me</h2>
                  <p className="text-gray-700">
                    Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in diagnosing
                    and treating cardiovascular conditions. She specializes in preventive cardiology, heart failure
                    management, and cardiac imaging. Dr. Johnson is committed to providing compassionate,
                    patient-centered care and staying at the forefront of cardiovascular medicine.
                  </p>
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Preventive Cardiology</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Heart Failure</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Cardiac Imaging</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Echocardiography</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Hypertension Management</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Education & Training</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="bg-blue-100 p-2 rounded-full h-fit">
                        <Award className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900">Cardiology Fellowship</h3>
                        <p className="text-gray-700">Massachusetts General Hospital</p>
                        <p className="text-sm text-gray-500">2005 - 2008</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-blue-100 p-2 rounded-full h-fit">
                        <Award className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900">Internal Medicine Residency</h3>
                        <p className="text-gray-700">Johns Hopkins Hospital</p>
                        <p className="text-sm text-gray-500">2002 - 2005</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-blue-100 p-2 rounded-full h-fit">
                        <Award className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900">Doctor of Medicine</h3>
                        <p className="text-gray-700">Harvard Medical School</p>
                        <p className="text-sm text-gray-500">1998 - 2002</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Publications</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="bg-blue-100 p-2 rounded-full h-fit">
                        <BookOpen className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900">
                          Advances in Preventive Cardiology: A Comprehensive Review
                        </h3>
                        <p className="text-gray-700">Journal of the American College of Cardiology</p>
                        <p className="text-sm text-gray-500">2021</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-blue-100 p-2 rounded-full h-fit">
                        <BookOpen className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900">
                          Novel Approaches to Heart Failure Management in the Digital Age
                        </h3>
                        <p className="text-gray-700">New England Journal of Medicine</p>
                        <p className="text-sm text-gray-500">2019</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-blue-100 p-2 rounded-full h-fit">
                        <BookOpen className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900">
                          The Role of Echocardiography in Modern Cardiovascular Practice
                        </h3>
                        <p className="text-gray-700">Circulation</p>
                        <p className="text-sm text-gray-500">2017</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="credentials">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Board Certifications</h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">
                            American Board of Internal Medicine - Cardiology
                          </h3>
                          <p className="text-sm text-gray-500">Certification #: ABC123456</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="text-sm text-gray-700">June 15, 2008</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Expiration Date</p>
                          <p className="text-sm text-gray-700">June 15, 2028</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">American Board of Internal Medicine</h3>
                          <p className="text-sm text-gray-500">Certification #: DEF789012</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="text-sm text-gray-700">June 10, 2005</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Expiration Date</p>
                          <p className="text-sm text-gray-700">June 10, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Medical Licenses</h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">New York State Medical License</h3>
                          <p className="text-sm text-gray-500">License #: NY12345678</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="text-sm text-gray-700">July 1, 2008</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Expiration Date</p>
                          <p className="text-sm text-gray-700">June 30, 2024</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">Massachusetts State Medical License</h3>
                          <p className="text-sm text-gray-500">License #: MA87654321</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="text-sm text-gray-700">August 15, 2005</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">Expiration Date</p>
                          <p className="text-sm text-gray-700">August 14, 2023</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-600 text-amber-600 hover:bg-amber-50"
                        >
                          Renewal Due Soon
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Professional Memberships</h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <h3 className="font-medium text-blue-900">American College of Cardiology (FACC)</h3>
                      <p className="text-sm text-gray-500">Member since 2008</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <h3 className="font-medium text-blue-900">American Heart Association (FAHA)</h3>
                      <p className="text-sm text-gray-500">Member since 2009</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <h3 className="font-medium text-blue-900">American Medical Association</h3>
                      <p className="text-sm text-gray-500">Member since 2002</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Regular Schedule</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-900">Monday</h3>
                          <p className="text-gray-700">9:00 AM - 5:00 PM</p>
                          <p className="text-sm text-gray-500">Patient Appointments</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-900">Tuesday</h3>
                          <p className="text-gray-700">9:00 AM - 5:00 PM</p>
                          <p className="text-sm text-gray-500">Patient Appointments</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-900">Wednesday</h3>
                          <p className="text-gray-700">9:00 AM - 1:00 PM</p>
                          <p className="text-sm text-gray-500">Patient Appointments</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-900">Wednesday</h3>
                          <p className="text-gray-700">2:00 PM - 5:00 PM</p>
                          <p className="text-sm text-gray-500">Research</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-900">Thursday</h3>
                          <p className="text-gray-700">9:00 AM - 5:00 PM</p>
                          <p className="text-sm text-gray-500">Patient Appointments</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-900">Friday</h3>
                          <p className="text-gray-700">9:00 AM - 5:00 PM</p>
                          <p className="text-sm text-gray-500">Patient Appointments</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-900">Saturday</h3>
                          <p className="text-gray-700">9:00 AM - 12:00 PM</p>
                          <p className="text-sm text-gray-500">Patient Appointments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Time Off & Unavailability</h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">Annual Medical Conference</h3>
                          <p className="text-sm text-gray-500">June 15 - June 20, 2023</p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Upcoming</Badge>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">Summer Vacation</h3>
                          <p className="text-sm text-gray-500">July 10 - July 24, 2023</p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Upcoming</Badge>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">Winter Holiday</h3>
                          <p className="text-sm text-gray-500">December 23 - January 2, 2024</p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Upcoming</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="bg-blue-900 hover:bg-blue-800">
                      <Plus className="h-4 w-4 mr-2" /> Request Time Off
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="account">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Account Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
                      <input
                        type="text"
                        defaultValue="Sarah"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Johnson"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                      <input
                        type="email"
                        defaultValue="dr.johnson@healthcare.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="(555) 987-6543"
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
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Change Password</h2>
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
                  </div>
                  <div className="mt-4">
                    <Button className="bg-blue-900 hover:bg-blue-800">Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-bold text-blue-900 mb-4">Two-Factor Authentication</h2>
                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-blue-900">Two-Factor Authentication</h3>
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
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h2>
                  <div className="p-4 border border-red-200 rounded-md bg-red-50">
                    <h3 className="font-medium text-red-800">Deactivate Account</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Temporarily deactivate your account. You can reactivate it later by contacting the administrator.
                    </p>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-100">
                      Deactivate Account
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
