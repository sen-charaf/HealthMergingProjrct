"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Send, Paperclip, ChevronLeft, Phone, Video } from "lucide-react"

// Define types for conversation
interface Conversation {
  name: string
  avatar: string
  message: string
  time: string
  unread: boolean
  urgent: boolean
}

export default function MessagesPage() {
  const [messageInput, setMessageInput] = useState<string>("")
  const [selectedConversation, setSelectedConversation] = useState<number>(0)
  const [mobileView, setMobileView] = useState<"list" | "chat">("list") // "list" or "chat"
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedConversation])

  // Add this new useEffect to handle scrolling when sending a new message
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
    
    return () => clearTimeout(scrollTimeout)
  }, [messageInput])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return
    
    // Here you would normally send the message to your backend
    console.log("Sending message:", messageInput)
    
    // Clear input after sending
    setMessageInput("")
  }

  const handleSelectConversation = (index: number) => {
    setSelectedConversation(index)
    setMobileView("chat")
  }

  const handleBackToList = () => {
    setMobileView("list")
  }

  // Sample conversations data
  const conversations: Conversation[] = [
    {
      name: "John Doe",
      avatar: "JD",
      message: "I've been experiencing chest pain again...",
      time: "10:30 AM",
      unread: true,
      urgent: true,
    },
    {
      name: "Sarah Smith",
      avatar: "SS",
      message: "Thank you for the prescription, doctor.",
      time: "Yesterday",
      unread: false,
      urgent: false,
    },
    {
      name: "Michael Johnson",
      avatar: "MJ",
      message: "When should I schedule my next appointment?",
      time: "Yesterday",
      unread: true,
      urgent: false,
    }
  ]

  return (
    <div className="p-6 h-screen flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Messages</h1>
          <p className="text-gray-500">Communicate with patients and colleagues</p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800">
          <Plus className="h-4 w-4 mr-2" /> New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        <Card className={`col-span-1 p-0 border-0 shadow-md overflow-hidden flex flex-col ${mobileView === "chat" ? "hidden lg:flex" : "flex"}`}>
          <div className="p-4 border-b border-gray-200 bg-white shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search messages" className="pl-10 bg-white border-gray-200" />
            </div>
          </div>

          <Tabs defaultValue="inbox" className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 shrink-0">
              <TabsList className="bg-white border-b-0 p-0 h-12">
                <TabsTrigger
                  value="inbox"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3"
                >
                  Inbox
                </TabsTrigger>
                <TabsTrigger
                  value="sent"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3"
                >
                  Sent
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3"
                >
                  Archived
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="inbox" className="m-0 flex-1 overflow-hidden">
              <div className="divide-y divide-gray-200 h-full overflow-y-auto">
                {conversations.map((conversation, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer ${
                      selectedConversation === index ? "bg-blue-50" : ""
                    } ${conversation.unread ? "bg-blue-50/50" : ""}`}
                    onClick={() => handleSelectConversation(index)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={conversation.urgent ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}>
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.unread && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-600 border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className={`font-medium ${conversation.unread ? "text-blue-900" : "text-gray-700"}`}>
                          {conversation.name}
                        </h3>
                        <p className="text-xs text-gray-500">{conversation.time}</p>
                      </div>
                      <div className="flex items-center">
                        {conversation.urgent && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 mr-2">Urgent</Badge>
                        )}
                      </div>
                      <p className={`text-sm truncate ${conversation.unread ? "text-gray-700" : "text-gray-500"}`}>
                        {conversation.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sent" className="m-0 flex-1 overflow-hidden">
              <div className="p-4 text-center text-gray-500">No sent messages</div>
            </TabsContent>

            <TabsContent value="archived" className="m-0 flex-1 overflow-hidden">
              <div className="p-4 text-center text-gray-500">No archived messages</div>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className={`col-span-1 lg:col-span-2 p-0 border-0 shadow-md overflow-hidden flex flex-col ${mobileView === "list" ? "hidden lg:flex" : "flex"}`}>
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={handleBackToList}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-red-100 text-red-800">JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-blue-900">John Doe</h2>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>
                </div>
                <p className="text-xs text-gray-500">Patient ID: P-10042389</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                <Video className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                View Chart
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 bg-gray-50">
            <div className="space-y-4">
              <div className="flex justify-center">
                <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Today, 10:30 AM</p>
              </div>

              <div className="flex items-end gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-red-100 text-red-800">JD</AvatarFallback>
                </Avatar>
                <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-sm max-w-[80%]">
                  <p className="text-gray-800">
                    Hello Dr. Johnson, I've been experiencing chest pain again since yesterday evening. It's similar to
                    what I felt last month, but more intense. Should I be concerned?
                  </p>
                </div>
              </div>

              {/* Doctor's reply */}
              <div className="flex items-end justify-end gap-3">
                <div className="bg-blue-600 p-3 rounded-lg rounded-br-none text-white max-w-[80%]">
                  <p>
                    Hello John, I'm concerned about your symptoms. Chest pain that's more intense than before needs immediate attention. 
                    Can you describe the pain in more detail? Is it sharp, dull, or pressure-like? Does it radiate to your arm, jaw, or back?
                  </p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-800">DR</AvatarFallback>
                </Avatar>
              </div>
              
              {/* Add this div at the end of your messages */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="icon" className="rounded-full border-gray-200">
                <Paperclip className="h-4 w-4 text-gray-500" />
              </Button>
              <Input 
                type="text" 
                placeholder="Type your message..." 
                className="bg-white border-gray-200"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button type="submit" size="icon" className="rounded-full bg-blue-900 hover:bg-blue-800">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
