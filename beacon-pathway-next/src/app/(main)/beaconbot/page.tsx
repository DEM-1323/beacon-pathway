"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export default function BeaconBotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm BeaconBot, your educational pathway assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a real implementation, we'd fetch from Supabase
      // For now, we'll simulate a response
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error getting bot response:", error);
      setIsLoading(false);
    }
  };

  // Simple response logic - would be replaced with real database lookups in production
  const getBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let responseText = "";

    if (input.includes("major") || input.includes("study")) {
      responseText =
        "We offer a wide range of majors including Computer Science, Business, Psychology, and more. What subjects are you most interested in?";
    } else if (
      input.includes("scholarship") ||
      input.includes("financial aid")
    ) {
      responseText =
        "There are many scholarship opportunities available! Check the Opportunities section for current listings or visit the Financial Aid office for personalized assistance.";
    } else if (input.includes("career") || input.includes("job")) {
      responseText =
        "Your career path will depend on your interests and skills. Have you taken our pathway assessment quiz? It can help identify potential career matches.";
    } else if (input.includes("hello") || input.includes("hi")) {
      responseText =
        "Hello! How can I assist with your educational journey today?";
    } else {
      responseText =
        "I'm not sure I understand. Could you rephrase your question or ask about topics like majors, scholarships, or career paths?";
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: "bot",
      timestamp: new Date(),
    };
  };

  return (
    <div className="max-w-4xl mx-auto py-8 h-[calc(100vh-10rem)] flex flex-col">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex-1 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">BeaconBot</h1>

        <div className="flex-1 overflow-y-auto mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                  <div className="flex space-x-2 items-center">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask BeaconBot a question..."
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
