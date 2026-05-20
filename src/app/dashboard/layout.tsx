"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, Map, BookOpen, MessageSquare, Zap, Flame, Target } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Compass, label: "Opportunities", href: "/dashboard/opportunities" },
  { icon: Map, label: "Roadmaps", href: "/dashboard/roadmaps" },
  { icon: BookOpen, label: "Vault", href: "/dashboard/vault" },
  { icon: MessageSquare, label: "AI Mentor", href: "/dashboard/mentor" },
  { icon: Target, label: "Admin", href: "/dashboard/admin" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#000] text-white overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 glass-dark flex flex-col z-20">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2 mb-8">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-xl tracking-tight">Pre Closer<span className="text-blue-400">.ai</span></span>
          </Link>

          {/* GAMIFIED STATS MINI */}
          <div className="bg-[#111] border border-white/5 rounded-xl p-4 mb-8 flex gap-4 justify-between">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                <Flame className="w-4 h-4" />
                <span className="font-bold text-sm">3</span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Streak</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                <Target className="w-4 h-4" />
                <span className="font-bold text-sm">Lvl 4</span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">450 XP</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_0_20px_rgba(37,99,235,0.1)]" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-blue-400" : "text-gray-500"}`} />
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <div className="bg-gradient-to-tr from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-4 rounded-xl">
            <p className="text-xs font-bold text-white mb-2">Pro Plan Active</p>
            <p className="text-[10px] text-gray-400 mb-3">Unlimited AI execution enabled.</p>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="w-full h-full bg-blue-500" />
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative overflow-y-auto">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="p-8 max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
