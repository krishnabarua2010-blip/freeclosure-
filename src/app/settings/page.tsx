"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, User, CreditCard, Shield, Bell, LogOut, Key } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API Keys", icon: Key },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 selection:bg-gray-700/50 overflow-hidden relative">
      
      {/* 3D GRID BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.25]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)] animate-[grid-move_15s_linear_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <style jsx global>{`
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-400" />
            Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your Pre Closer preferences and configurations.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  activeTab === tab.id 
                    ? "bg-white/10 text-white border border-white/5" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-blue-400" : "text-gray-500"}`} />
                {tab.label}
              </button>
            ))}
            
            <div className="pt-6 mt-6 border-t border-white/10">
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-dark border border-white/5 p-6 sm:p-8 rounded-3xl"
            >
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                      JD
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">First Name</label>
                      <input type="text" defaultValue="John" className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-400">Email Address</label>
                      <input type="email" defaultValue="john@example.com" disabled className="w-full bg-[#0a0a0c]/50 border border-white/10 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "api" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">API Configuration</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-200">
                      Connect your OpenAI API key to power the AI mentor and side hustle finder engine.
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">OpenAI API Key</label>
                      <input 
                        type="password" 
                        placeholder="sk-..." 
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold transition-colors">
                      Save API Keys
                    </button>
                  </div>
                </div>
              )}

              {["security", "billing", "notifications"].includes(activeTab) && (
                <div className="py-12 text-center text-gray-400">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <Settings className="w-8 h-8 text-gray-500" />
                  </div>
                  <p>This module is currently in development.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
