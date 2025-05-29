"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import {
  Search,
  FileText,
  Clock,
  AlertCircle,
  Send,
  Calendar,
  ChevronLeft,
  Info,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when conversation changes or new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    // In a real app, this would send the message to the backend
    const updatedConversation = {
      ...activeConversation,
      lastMessage: {
        content: newMessage,
        timestamp: new Date(),
      },
      messages: [
        ...activeConversation.messages,
        {
          id: `msg-${Date.now()}`,
          sender: "patient" as const, // Explicitly type as "patient"
          content: newMessage,
          timestamp: new Date(),
        },
      ],
    };

    // Update the conversation in the conversations list
    const updatedConversations = conversations.map((conv) =>
      conv.id === activeConversation.id ? updatedConversation : conv
    );

    // Update state
    setConversations(updatedConversations);
    setActiveConversation(updatedConversation);
    setNewMessage("");
  };

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv-1",
      doctor: {
        id: "dr-1",
        name: "Dr. Sarah Johnson",
        speciality: "Cardiology",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      appointment: {
        id: "apt-1",
        date: new Date(2023, 4, 10), // May 10, 2023
        type: "Follow-up",
      },
      lastMessage: {
        content:
          "Please let me know if you have any questions about your new medication.",
        timestamp: new Date(2023, 4, 10, 14, 30), // May 10, 2023, 2:30 PM
      },
      messages: [
        {
          id: "msg-1",
          sender: "doctor",
          content:
            "Hello John, how are you feeling after our appointment yesterday?",
          timestamp: new Date(2023, 4, 10, 10, 15), // May 10, 2023, 10:15 AM
        },
        {
          id: "msg-2",
          sender: "patient",
          content:
            "I'm feeling better, thank you. The new medication seems to be helping with my blood pressure.",
          timestamp: new Date(2023, 4, 10, 11, 30), // May 10, 2023, 11:30 AM
        },
        {
          id: "msg-3",
          sender: "doctor",
          content:
            "That's great to hear! Remember to take it consistently and monitor your readings as we discussed.",
          timestamp: new Date(2023, 4, 10, 13, 45), // May 10, 2023, 1:45 PM
        },
        {
          id: "msg-4",
          sender: "doctor",
          content:
            "Please let me know if you have any questions about your new medication.",
          timestamp: new Date(2023, 4, 10, 14, 30), // May 10, 2023, 2:30 PM
        },
      ],
      status: "active", // active, expired
      expiresAt: new Date(2023, 4, 13), // May 13, 2023 (3 days after appointment)
    },
    {
      id: "conv-2",
      doctor: {
        id: "dr-2",
        name: "Dr. Michael Chen",
        speciality: "Pulmonology",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      appointment: {
        id: "apt-2",
        date: new Date(2023, 4, 5), // May 5, 2023
        type: "Annual Check-up",
      },
      lastMessage: {
        content:
          "Your test results look good. Continue with the current treatment plan.",
        timestamp: new Date(2023, 4, 6, 9, 20), // May 6, 2023, 9:20 AM
      },
      messages: [
        {
          id: "msg-5",
          sender: "doctor",
          content:
            "Hello John, it was good to see you yesterday for your check-up.",
          timestamp: new Date(2023, 4, 5, 16, 10), // May 5, 2023, 4:10 PM
        },
        {
          id: "msg-6",
          sender: "patient",
          content:
            "Thank you, Dr. Chen. When will my test results be available?",
          timestamp: new Date(2023, 4, 5, 17, 25), // May 5, 2023, 5:25 PM
        },
        {
          id: "msg-7",
          sender: "doctor",
          content:
            "Your test results look good. Continue with the current treatment plan.",
          timestamp: new Date(2023, 4, 6, 9, 20), // May 6, 2023, 9:20 AM
        },
      ],
      status: "expired", // active, expired
      expiresAt: new Date(2023, 4, 8), // May 8, 2023 (3 days after appointment)
    },
    {
      id: "conv-3",
      doctor: {
        id: "dr-3",
        name: "Dr. Emily Rodriguez",
        speciality: "Dermatology",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      appointment: {
        id: "apt-3",
        date: new Date(), // Today
        type: "Consultation",
      },
      lastMessage: {
        content:
          "Here's the information about the treatment options we discussed today.",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2)), // 2 hours ago
      },
      messages: [
        {
          id: "msg-8",
          sender: "doctor",
          content:
            "Thank you for coming in today, John. I've prescribed the cream we discussed.",
          timestamp: new Date(new Date().setHours(new Date().getHours() - 3)), // 3 hours ago
        },
        {
          id: "msg-9",
          sender: "doctor",
          content:
            "Here's the information about the treatment options we discussed today.",
          timestamp: new Date(new Date().setHours(new Date().getHours() - 2)), // 2 hours ago
        },
      ],
      status: "active", // active, expired
      expiresAt: new Date(new Date().setDate(new Date().getDate() + 3)), // 3 days from today
    },
  ]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left sidebar with navigation would be here in a full app */}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white p-4 border-b flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">Messages</h1>
            <p className="text-gray-500">
              Communicate with your healthcare providers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setInfoDialogOpen(true)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>About messaging</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Conversations list */}
          <div className="w-80 border-r bg-white flex flex-col overflow-hidden">
            <div className="p-3 border-b shrink-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="pl-9"
                />
              </div>
            </div>

            <Tabs
              defaultValue="active"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <TabsList className="grid w-full grid-cols-2 p-0 h-auto shrink-0">
                <TabsTrigger
                  value="active"
                  className="rounded-none data-[state=active]:bg-blue-50"
                >
                  Active Chats
                </TabsTrigger>
                <TabsTrigger
                  value="expired"
                  className="rounded-none data-[state=active]:bg-blue-50"
                >
                  Expired
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="active"
                className="flex-1 p-0 m-0 overflow-hidden"
              >
                <ScrollArea className="h-full">
                  {conversations
                    .filter((conv) => conv.status === "active")
                    .map((conversation) => (
                      <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        isActive={activeConversation?.id === conversation.id}
                        onClick={() => setActiveConversation(conversation)}
                      />
                    ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent
                value="expired"
                className="flex-1 p-0 m-0 overflow-hidden"
              >
                <ScrollArea className="h-full">
                  {conversations
                    .filter((conv) => conv.status === "expired")
                    .map((conversation) => (
                      <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        isActive={activeConversation?.id === conversation.id}
                        onClick={() => setActiveConversation(conversation)}
                      />
                    ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Conversation area */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {activeConversation ? (
              <>
                {/* Conversation header */}
                <div className="p-4 border-b flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden h-8 w-8"
                      onClick={() => setActiveConversation(null)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Avatar>
                      <AvatarImage
                        src={
                          activeConversation.doctor.avatar || "/placeholder.svg"
                        }
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {activeConversation.doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">
                        {activeConversation.doctor.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {activeConversation.doctor.speciality}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:flex"
                    >
                      <Calendar className="h-4 w-4 text-blue-700" />
                      Schedule Appointment
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Appointment info */}
                <div className="bg-blue-50 p-3 border-b flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-700" />
                    <span className="text-sm">
                      <span className="font-medium">Last appointment:</span>{" "}
                      {format(
                        activeConversation.appointment.date,
                        "MMMM d, yyyy"
                      )}{" "}
                      • {activeConversation.appointment.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-700" />
                    <span className="text-sm">
                      {activeConversation.status === "active" ? (
                        <>
                          Chat expires on{" "}
                          {format(activeConversation.expiresAt, "MMMM d, yyyy")}
                        </>
                      ) : (
                        <>Chat expired</>
                      )}
                    </span>
                  </div>
                </div>

                {/* Messages area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4 pb-4">
                    {activeConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "patient"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {message.sender === "doctor" && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage
                              src={
                                activeConversation.doctor.avatar ||
                                "/placeholder.svg"
                              }
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {activeConversation.doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`max-w-md rounded-lg p-3 ${
                              message.sender === "patient"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {message.content}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 px-1">
                            {format(message.timestamp, "h:mm a")}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message input */}
                {activeConversation.status === "active" ? (
                  <form
                    onSubmit={handleSendMessage}
                    className="p-3 border-t flex gap-2 shrink-0"
                  >
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      className="bg-blue-700 hover:bg-blue-800"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </form>
                ) : (
                  <div className="p-4 border-t bg-gray-50 shrink-0">
                    <Alert
                      variant="destructive"
                      className="bg-amber-50 text-amber-800 border-amber-200"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Chat expired</AlertTitle>
                      <AlertDescription>
                        This chat has expired. You can only message your doctor
                        within 3 days after your appointment. Please schedule a
                        new appointment if you need further assistance.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MessageIcon className="h-10 w-10 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500 max-w-md">
                  Choose a conversation from the list to view your messages with
                  your healthcare provider.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Dialog */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>About Patient Messaging</DialogTitle>
            <DialogDescription>
              Important information about the messaging system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h4 className="font-medium">Time-Limited Conversations</h4>
                <p className="text-sm text-gray-500">
                  You can message your doctor for up to 3 days after your
                  appointment. After that, the conversation will expire.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h4 className="font-medium">Not for Emergencies</h4>
                <p className="text-sm text-gray-500">
                  This messaging system is not for emergencies. If you have a
                  medical emergency, please call 911 or go to the nearest
                  emergency room.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h4 className="font-medium">Need More Time?</h4>
                <p className="text-sm text-gray-500">
                  If you need to continue the conversation after it expires,
                  please schedule a new appointment or follow-up.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setInfoDialogOpen(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  avatar: string;
}

interface Appointment {
  id: string;
  date: Date;
  type: string;
}

interface Message {
  id: string;
  sender: "doctor" | "patient";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  doctor: Doctor;
  appointment: Appointment;
  lastMessage: {
    content: string;
    timestamp: Date;
  };
  messages: Message[];
  status: "active" | "expired";
  expiresAt: Date;
}

function ConversationItem({
  conversation,
  isActive,
  onClick,
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
        isActive ? "bg-blue-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={conversation.doctor.avatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-blue-100 text-blue-700">
            {conversation.doctor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="font-semibold truncate">
              {conversation.doctor.name}
            </div>
            <div className="text-xs text-gray-500">
              {isToday(conversation.lastMessage.timestamp)
                ? format(conversation.lastMessage.timestamp, "h:mm a")
                : format(conversation.lastMessage.timestamp, "MMM d")}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {conversation.doctor.speciality}
          </div>
          <div className="text-sm truncate">
            {conversation.lastMessage.content}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>{format(conversation.appointment.date, "MMM d, yyyy")}</span>
        </div>
        {conversation.status === "active" ? (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Active
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-700 hover:bg-gray-100"
          >
            Expired
          </Badge>
        )}
      </div>
    </div>
  );
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
