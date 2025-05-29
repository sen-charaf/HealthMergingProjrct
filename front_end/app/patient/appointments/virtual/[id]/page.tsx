"use client";

import { useState, useEffect, useRef } from "react";
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
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VirtualAppointmentProps {
  params: {
    id: string;
  };
}

interface ChatMessage {
  id: number;
  sender: "doctor" | "patient";
  message: string;
  time: string;
}

export default function VirtualAppointmentPage({
  params,
}: VirtualAppointmentProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWaiting, setIsWaiting] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Mock doctor data
  const doctor = {
    name: "Dr. Sarah Johnson",
    speciality: "Family Medicine",
    avatar: "/placeholder.svg",
  };

  // Chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "doctor",
      message: "Hello! I'll be with you shortly. How are you feeling today?",
      time: "10:02 AM",
    },
  ]);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate doctor joining after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWaiting(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: chatMessages.length + 1,
      sender: "patient",
      message: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages([...chatMessages, newMsg]);
    setNewMessage("");

    // Simulate doctor response after 2 seconds
    setTimeout(() => {
      const doctorReply: ChatMessage = {
        id: chatMessages.length + 2,
        sender: "doctor",
        message: "I understand. Can you tell me more about your symptoms?",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prev) => [...prev, doctorReply]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-blue-700">
            Virtual Appointment
          </h1>
          <Badge className="bg-green-100 text-green-800">
            {isWaiting ? "Waiting Room" : "In Progress"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {formatTime(elapsedTime)}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
            {isWaiting ? (
              <div className="text-center text-white">
                <div className="animate-pulse mb-4">
                  <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                  <h2 className="text-xl font-semibold">
                    Waiting for doctor to join...
                  </h2>
                </div>
                <p className="text-gray-400">
                  Your appointment with {doctor.name} will begin shortly
                </p>
              </div>
            ) : (
              <>
                {!isVideoOff ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Avatar className="h-32 w-32 border-2 border-white">
                      <AvatarImage src={doctor.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-4xl">
                        {doctor.name
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
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-semibold">{doctor.name}</h2>
                      <p className="text-gray-400">{doctor.speciality}</p>
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
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      ME
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      ME
                    </AvatarFallback>
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
                      isMuted
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
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
                      isVideoOff
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? (
                      <VideoOff className="h-5 w-5" />
                    ) : (
                      <Video className="h-5 w-5" />
                    )}
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
                      isScreenSharing
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-700 text-white hover:bg-gray-600"
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
                      isChatOpen
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-700 text-white hover:bg-gray-600"
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
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-3 border-b border-gray-200 font-semibold flex justify-between items-center">
              <span>Chat</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-3" ref={chatContainerRef}>
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "patient" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "patient"
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
            <Button
              variant="destructive"
              onClick={() => (window.location.href = "/patient/appointments")}
            >
              End Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
