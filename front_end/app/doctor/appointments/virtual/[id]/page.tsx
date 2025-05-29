"use client"

import { useState, useEffect, useRef } from "react"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  MessageSquare,
  Monitor,
  Settings,
  X,
  Send,
  FileText,
  AlertCircle,
  PlusCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface VirtualAppointmentProps {
  params: {
    id: string;
  }
}

interface ChatMessage {
  id: number;
  sender: "doctor" | "patient";
  message: string;
  time: string;
}

interface PrescriptionData {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  refills: string;
  dispenseAsWritten: boolean;
}

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  allergies: string[];
  medications: string[];
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
  };
  appointmentType: string;
  appointmentReason: string;
}

export default function DoctorVirtualAppointmentPage({ params }: VirtualAppointmentProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(true)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isPatientWaiting, setIsPatientWaiting] = useState(true)
  const [newMessage, setNewMessage] = useState("")
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [prescriptionOpen, setPrescriptionOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [appointmentNotes, setAppointmentNotes] = useState("")
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  
  // Prescription state
  const [prescription, setPrescription] = useState<PrescriptionData>({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    refills: "0",
    dispenseAsWritten: false,
  })
  
  // Mock patient data
  const patient: PatientData = {
    id: "P-12345",
    name: "John Doe",
    age: 45,
    gender: "Male",
    dob: "10/15/1978",
    phone: "(555) 123-4567",
    email: "john.doe@example.com",
    allergies: ["Penicillin", "Peanuts"],
    medications: ["Lisinopril 10mg", "Atorvastatin 20mg"],
    vitalSigns: {
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
    },
    appointmentType: "Follow-up",
    appointmentReason: "Headaches and dizziness for the past week",
  }
  
  // Chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "patient",
      message: "Hello Dr. Johnson, I've been experiencing headaches for the past week.",
      time: "10:02 AM",
    },
  ])

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simulate joining the patient after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPatientWaiting(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages, isChatOpen])

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg: ChatMessage = {
      id: chatMessages.length + 1,
      sender: "doctor",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, newMsg])
    setNewMessage("")
    
    // Simulate patient response after 3 seconds
    setTimeout(() => {
      const patientReply: ChatMessage = {
        id: chatMessages.length + 2,
        sender: "patient",
        message: "Yes, doctor. The pain is mostly on the right side of my head and gets worse in the morning.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages(prev => [...prev, patientReply])
    }, 3000)
  }

  // Handle prescription form changes
  const handlePrescriptionChange = (field: keyof PrescriptionData, value: string | boolean): void => {
    setPrescription((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle prescription submission
  const handlePrescriptionSubmit = (): void => {
    console.log("Prescription submitted:", prescription)

    // Add a message to the chat
    const newMsg: ChatMessage = {
      id: chatMessages.length + 1,
      sender: "doctor",
      message: `I've sent a prescription for ${prescription.medication} ${prescription.dosage}, to be taken ${prescription.frequency} for ${prescription.duration}.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setChatMessages([...chatMessages, newMsg])

    // Close the modal and reset form
    setPrescriptionOpen(false)

    // Show a success message or notification here
    alert("Prescription sent successfully!")
  }

  // Handle saving appointment notes
  const handleSaveNotes = (): void => {
    console.log("Appointment notes saved:", appointmentNotes)
    setNotesOpen(false)
    alert("Notes saved successfully!")
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Patient info sidebar - conditionally visible */}
      {isPatientInfoOpen && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden shadow-sm">
          <div className="p-3 border-b border-gray-200 bg-[#1e3a8a] text-white flex justify-between items-center">
            <h2 className="font-semibold">Patient Information</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-white hover:bg-blue-800"
              onClick={() => setIsPatientInfoOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="h-12 w-12 border border-gray-200">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback className="bg-blue-100 text-[#1e3a8a]">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-[#1e3a8a]">{patient.name}</h2>
                  <div className="text-xs text-gray-500">
                    {patient.age} years • {patient.gender}
                  </div>
                  <div className="text-xs text-gray-500">ID: {patient.id}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-1">Appointment Details</h3>
                  <div className="bg-gray-50 rounded-md p-2 space-y-1 text-xs">
                    <div>
                      <span className="text-gray-500">Type:</span> {patient.appointmentType}
                    </div>
                    <div>
                      <span className="text-gray-500">Reason:</span> {patient.appointmentReason}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-1">Vital Signs</h3>
                  <div className="bg-gray-50 rounded-md p-2 space-y-1 text-xs">
                    <div>
                      <span className="text-gray-500">BP:</span> {patient.vitalSigns.bloodPressure}
                    </div>
                    <div>
                      <span className="text-gray-500">HR:</span> {patient.vitalSigns.heartRate}
                    </div>
                    <div>
                      <span className="text-gray-500">Temp:</span> {patient.vitalSigns.temperature}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-1">Medical Information</h3>
                  <div className="bg-gray-50 rounded-md p-2 space-y-2 text-xs">
                    <div>
                      <div className="font-medium mb-1">Allergies</div>
                      <div className="flex flex-wrap gap-1">
                        {patient.allergies.map((allergy, index) => (
                          <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Current Medications</div>
                      <div className="flex flex-col gap-1">
                        {patient.medications.map((medication, index) => (
                          <div key={index} className="text-xs">{medication}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-1">Contact Information</h3>
                  <div className="bg-gray-50 rounded-md p-2 space-y-1 text-xs">
                    <div>
                      <span className="text-gray-500">Phone:</span> {patient.phone}
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span> {patient.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-blue-700">Virtual Appointment</h1>
            <Badge className="bg-green-100 text-green-800">
              {isPatientWaiting ? "Connecting..." : "In Progress"}
            </Badge>
            {!isPatientInfoOpen && (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2"
                onClick={() => setIsPatientInfoOpen(true)}
              >
                Show Patient Info
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {formatTime(elapsedTime)}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setNotesOpen(true)}
            >
              <FileText className="h-4 w-4" />
              <span>Notes</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setPrescriptionOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
              <span>Prescription</span>
            </Button>
          </div>
        </header>

        {/* Video area */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
            {isPatientWaiting ? (
              <div className="text-center text-white">
                <div className="animate-pulse mb-4">
                  <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                  <h2 className="text-xl font-semibold">Connecting to patient...</h2>
                </div>
                <p className="text-gray-400">
                  Establishing connection with {patient.name}
                </p>
              </div>
            ) : (
              <>
                {!isVideoOff ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Avatar className="h-32 w-32 border-2 border-white">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-4xl">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-white">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-semibold">{patient.name}</h2>
                      <p className="text-gray-400">{patient.age} years • {patient.gender}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Self view */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600 shadow-lg">
              {!isVideoOff ? (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-100 text-blue-700">DR</AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-100 text-blue-700">DR</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 p-4 flex items-center justify-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 ${
                      isMuted ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isMuted ? "Unmute" : "Mute"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 ${
                      isVideoOff ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isVideoOff ? "Turn on camera" : "Turn off camera"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 ${
                      isScreenSharing ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    <Monitor className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isScreenSharing ? "Stop sharing" : "Share screen"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 ${
                      isChatOpen ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12 bg-gray-700 text-white hover:bg-gray-600"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-12 w-12 bg-red-600 hover:bg-red-700"
              onClick={() => setShowEndConfirm(true)}
            >
              <Phone className="h-5 w-5 rotate-135" />
            </Button>
          </div>
        </div>

        {/* Chat sidebar */}
        {isChatOpen && (
          <div className="absolute right-0 top-16 bottom-0 w-80 bg-white border-l border-gray-200 flex flex-col shadow-lg">
            <div className="p-3 border-b border-gray-200 font-semibold flex justify-between items-center">
              <span>Chat</span>
              <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-3" ref={chatContainerRef}>
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "doctor"
                          ? "bg-blue-100 text-blue-900"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="text-sm">{msg.message}</div>
                      <div className="text-xs mt-1 opacity-70">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-3 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* End call confirmation dialog */}
      <Dialog open={showEndConfirm} onOpenChange={setShowEndConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>End Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this virtual appointment?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-between">
            <Button variant="outline" onClick={() => setShowEndConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => window.location.href = "/doctor/appointments"}>
              End Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Prescription dialog */}
      <Dialog open={prescriptionOpen} onOpenChange={setPrescriptionOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Write Prescription</DialogTitle>
            <DialogDescription>
              Create a prescription for {patient.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medication">Medication</Label>
                <Input
                  id="medication"
                  value={prescription.medication}
                  onChange={(e) => handlePrescriptionChange("medication", e.target.value)}
                  placeholder="Medication name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  value={prescription.dosage}
                  onChange={(e) => handlePrescriptionChange("dosage", e.target.value)}
                  placeholder="e.g., 10mg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={prescription.frequency}
                  onValueChange={(value) => handlePrescriptionChange("frequency", value)}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once daily">Once Daily</SelectItem>
                    <SelectItem value="twice daily">Twice Daily</SelectItem>
                    <SelectItem value="three times daily">Three Times Daily</SelectItem>
                    <SelectItem value="four times daily">Four Times Daily</SelectItem>
                    <SelectItem value="as needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={prescription.duration}
                  onChange={(e) => handlePrescriptionChange("duration", e.target.value)}
                  placeholder="e.g., 7 days"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                value={prescription.instructions}
                onChange={(e) => handlePrescriptionChange("instructions", e.target.value)}
                placeholder="Take with food, etc."
                className="min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="refills">Refills</Label>
                <Select
                  value={prescription.refills}
                  onValueChange={(value) => handlePrescriptionChange("refills", value)}
                >
                  <SelectTrigger id="refills">
                    <SelectValue placeholder="Select refills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end space-x-2">
                <div className="flex items-center space-x-2 h-10">
                  <Checkbox
                    id="dispenseAsWritten"
                    checked={prescription.dispenseAsWritten}
                    onCheckedChange={(checked) => 
                      handlePrescriptionChange("dispenseAsWritten", checked === true)
                    }
                  />
                  <Label htmlFor="dispenseAsWritten">Dispense as written</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPrescriptionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePrescriptionSubmit}>Send Prescription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notes dialog */}
      <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Appointment Notes</DialogTitle>
            <DialogDescription>
              Record notes for this appointment with {patient.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Clinical Notes</Label>
              <Textarea
                id="notes"
                value={appointmentNotes}
                onChange={(e) => setAppointmentNotes(e.target.value)}
                placeholder="Enter your clinical notes here..."
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotesOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Medical record dialog */}
      <Dialog>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Medical Record</DialogTitle>
            <DialogDescription>
              Complete medical history for {patient.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Past Medical History</h3>
              <div className="bg-gray-50 rounded-md p-3 text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Hypertension (diagnosed 2018)</li>
                  <li>Type 2 Diabetes (diagnosed 2019)</li>
                  <li>Hyperlipidemia</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Surgical History</h3>
              <div className="bg-gray-50 rounded-md p-3 text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Appendectomy (2005)</li>
                  <li>Right knee arthroscopy (2015)</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Family History</h3>
              <div className="bg-gray-50 rounded-md p-3 text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Father: Coronary artery disease, deceased at 68</li>
                  <li>Mother: Type 2 diabetes, hypertension, alive at 72</li>
                  <li>Brother: Hypertension</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Previous Visits</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-md p-3 text-sm">
                  <div className="font-medium">November 10, 2022 - Annual Physical</div>
                  <div className="text-gray-500 text-xs mt-1">Dr. Sarah Johnson</div>
                  <div className="mt-2">
                    Patient presented for annual physical. Blood pressure elevated at 142/88. 
                    Discussed lifestyle modifications and medication adjustment. Increased 
                    lisinopril to 20mg daily. Labs ordered.
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-md p-3 text-sm">
                  <div className="font-medium">August 3, 2022 - Follow-up</div>
                  <div className="text-gray-500 text-xs mt-1">Dr. Sarah Johnson</div>
                  <div className="mt-2">
                    Follow-up for diabetes management. A1C improved to 7.1 from 7.8. 
                    Patient reports better adherence to diet and exercise regimen. 
                    Continuing current medications.
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-md p-3 text-sm">
                  <div className="font-medium">May 15, 2022 - Urgent Care</div>
                  <div className="text-gray-500 text-xs mt-1">Dr. Michael Chen</div>
                  <div className="mt-2">
                    Patient presented with symptoms of upper respiratory infection. 
                    Diagnosed with acute bronchitis. Prescribed azithromycin 5-day course 
                    and recommended increased fluid intake and rest.
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Lab Results</h3>
              <div className="bg-gray-50 rounded-md p-3 text-sm">
                <div className="font-medium">November 12, 2022</div>
                <div className="mt-2 space-y-1">
                  <div><span className="text-gray-500">A1C:</span> 7.1% (Target: &lt;7.0%)</div>
                  <div><span className="text-gray-500">Total Cholesterol:</span> 185 mg/dL</div>
                  <div><span className="text-gray-500">LDL:</span> 110 mg/dL</div>
                  <div><span className="text-gray-500">HDL:</span> 42 mg/dL</div>
                  <div><span className="text-gray-500">Triglycerides:</span> 165 mg/dL</div>
                  <div><span className="text-gray-500">eGFR:</span> 75 mL/min/1.73m²</div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency assistance dialog */}
      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Request Emergency Assistance
            </DialogTitle>
            <DialogDescription>
              Request immediate assistance for this patient
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergency-type">Emergency Type</Label>
                <Select defaultValue="medical">
                  <SelectTrigger id="emergency-type">
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical Emergency</SelectItem>
                    <SelectItem value="psychiatric">Psychiatric Emergency</SelectItem>
                    <SelectItem value="technical">Technical Assistance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergency-notes">Additional Notes</Label>
                <Textarea 
                  id="emergency-notes"
                  placeholder="Briefly describe the situation..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              Request Assistance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}