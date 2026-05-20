"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, Play, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

const DAILY_MISSIONS = [
  { title: "Generate 3 Viral Hooks", xp: 50, completed: true },
  { title: "Complete Lesson: Outreach 101", xp: 100, completed: false },
  { title: "Send 5 DM Pitches", xp: 150, completed: false },
];

const ACTIVE_ROADMAP = {
  title: "AI Automation Agency (AAA)",
  progress: 35,
  nextStep: "Setting up Make.com Webhooks",
};

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-2 text-white">Welcome back, Creator.</h1>
          <p className="text-gray-400">You're 50 XP away from Level 5. Let's execute.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105">
          <Zap className="w-4 h-4 fill-black" /> Quick Action
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAIN ROADMAP WIDGET */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass border border-white/10 rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Current Focus</p>
          <h2 className="text-2xl font-bold mb-4">{ACTIVE_ROADMAP.title}</h2>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">{ACTIVE_ROADMAP.progress}%</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                style={{ width: `${ACTIVE_ROADMAP.progress}%` }} 
              />
            </div>
          </div>

          <div className="bg-[#0a0a0c] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-blue-400 ml-1" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Up Next</p>
                <p className="text-sm font-bold text-white">{ACTIVE_ROADMAP.nextStep}</p>
              </div>
            </div>
            <Link href="/dashboard/roadmaps/1" className="text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
              Continue
            </Link>
          </div>
        </motion.div>

        {/* DAILY MISSIONS WIDGET */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass border border-white/10 rounded-3xl p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Daily Missions</h3>
            <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md">300 XP Total</span>
          </div>

          <div className="space-y-3 flex-1">
            {DAILY_MISSIONS.map((mission, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${mission.completed ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-[#111] border-white/5'}`}>
                {mission.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`text-sm font-medium ${mission.completed ? 'text-gray-400 line-through' : 'text-gray-200'}`}>{mission.title}</p>
                  <p className="text-xs text-blue-400 font-bold mt-1">+{mission.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h3 className="font-bold text-lg mb-4">AI Workspaces</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Generate Hooks", emoji: "🎣", color: "from-blue-500/20 to-blue-600/5" },
            { title: "Cold DM Builder", emoji: "💬", color: "from-purple-500/20 to-purple-600/5" },
            { title: "Niche Finder", emoji: "🔍", color: "from-emerald-500/20 to-emerald-600/5" },
            { title: "Talk to Mentor", emoji: "🧠", color: "from-orange-500/20 to-orange-600/5" }
          ].map((action, i) => (
            <motion.button 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${action.color} text-left hover:scale-105 transition-all group`}
            >
              <div className="text-3xl mb-3">{action.emoji}</div>
              <h4 className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">{action.title}</h4>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
