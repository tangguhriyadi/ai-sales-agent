"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { Chatn8n } from "./chat-n8n"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function ChatInterface() {
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     id: "1",
  //     text: "Hello! How can I help you today?",
  //     sender: "assistant",
  //     timestamp: new Date()
  //   }
  // ])
  // const [input, setInput] = useState("")

  // const sendMessage = () => {
  //   if (!input.trim()) return

  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     text: input,
  //     sender: "user",
  //     timestamp: new Date()
  //   }

  //   setMessages(prev => [...prev, userMessage])
  //   setInput("")

  //   // Simulate assistant response
  //   setTimeout(() => {
  //     const assistantMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       text: "I received your message. This is a demo response.",
  //       sender: "assistant",
  //       timestamp: new Date()
  //     }
  //     setMessages(prev => [...prev, assistantMessage])
  //   }, 1000)
  // }

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault()
  //     sendMessage()
  //   }
  // }

  return (
    <div className="flex flex-col h-screen" id="n8n-chat">
     <Chatn8n />
    </div>
    // <div className="flex flex-col h-screen">
    //   <div className="flex-1 overflow-y-auto p-4 space-y-4">
    //     {messages.map((message) => (
    //       <div
    //         key={message.id}
    //         className={`flex ${
    //           message.sender === "user" ? "justify-end" : "justify-start"
    //         }`}
    //       >
    //         <Card
    //           className={`p-3 max-w-[70%] shadow-sm ${
    //             message.sender === "user"
    //               ? "bg-primary/90 text-primary-foreground backdrop-blur-sm"
    //               : "bg-card/70 backdrop-blur-sm border-border/30"
    //           }`}
    //         >
    //           <p className="text-sm">{message.text}</p>
    //           <p className="text-xs opacity-70 mt-1">
    //             {message.timestamp.toLocaleTimeString()}
    //           </p>
    //         </Card>
    //       </div>
    //     ))}
    //   </div>
      
    //   <div className="border-t p-4">
    //     <div className="flex gap-2">
    //       <Input
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         placeholder="Type your message..."
    //         onKeyPress={handleKeyPress}
    //         className="flex-1"
    //       />
    //       <Button onClick={sendMessage} size="icon">
    //         <Send className="h-4 w-4" />
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  )
}