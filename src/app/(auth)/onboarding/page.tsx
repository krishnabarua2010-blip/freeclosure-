"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";

const INTERESTS = [
  "AI Automation", "Video Editing", "Content Creation", 
  "Copywriting", "Faceless YouTube", "Thumbnail Design", 
  "Email Marketing", "Web Design", "SaaS Builder"
];

export default function OnboardingPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest));
    } else {
      if (selected.length < 3) setSelected([...selected, interest]);
    }
  };

  const completeOnboarding = async () => {
    // In real app: Save interests to Supabase users table
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-4 text-white">What are you building?</h1>
          <p className="text-gray-400">Select up to 3 interests. We'll customize your AI mentor and roadmaps.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {INTERESTS.map((interest, i) => {
            const isSelected = selected.includes(interest);
            return (
              <motion.button
                key={interest}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => toggleInterest(interest)}
                className={`p-4 rounded-xl border text-sm font-bold flex items-center justify-between transition-all ${
                  isSelected 
                    ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.2)]" 
                    : "bg-[#111] border-white/5 text-gray-400 hover:border-white/20 hover:bg-[#1a1a1a]"
                }`}
              >
                {interest}
                {isSelected && <Check className="w-4 h-4" />}
              </motion.button>
            )
          })}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={completeOnboarding}
            disabled={selected.length === 0}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:bg-white/10 disabled:text-gray-500 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
          >
            Start Executing <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
