"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Loader2, ArrowUpCircle } from "lucide-react";

interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey. I'm your AI execution mentor. Let's build your future. What skills do you currently have, and how much time can you dedicate per day?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) })
      });
      
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || "Sorry, I had an execution error. Try again."
      }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black mb-1 flex items-center gap-3">
            AI Mentor <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded-md uppercase tracking-widest border border-blue-500/20">Active</span>
          </h1>
          <p className="text-gray-400 text-sm">Strategic, sharp, and execution-focused.</p>
        </div>
      </div>

      <div className="flex-1 glass border border-white/10 rounded-3xl overflow-hidden flex flex-col relative shadow-[0_0_50px_rgba(37,99,235,0.05)]">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                msg.role === "user" 
                  ? "bg-white text-black" 
                  : "bg-gradient-to-tr from-blue-600 to-blue-400 border border-blue-400/50"
              }`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              
              <div className={`p-4 rounded-2xl ${
                msg.role === "user" 
                  ? "bg-[#222] border border-white/10 text-white" 
                  : "bg-[#111] border border-blue-500/10 text-gray-200"
              }`}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 border border-blue-400/50 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-[#111] border border-blue-500/10 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span className="text-sm text-gray-400">Analyzing strategy...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#0a0a0c] border-t border-white/10">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a roadmap, pitch review, or strategy..."
              className="w-full bg-[#111] border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-[#151518] transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-50 disabled:bg-[#222] disabled:text-gray-500 transition-colors"
            >
              <ArrowUpCircle className="w-5 h-5" />
            </button>
          </form>
          <div className="flex justify-center gap-4 mt-3">
            {["Suggest a side hustle", "Review my DM pitch", "How to get my first client?"].map((suggestion, i) => (
              <button 
                key={i}
                type="button"
                onClick={() => setInput(suggestion)}
                className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
