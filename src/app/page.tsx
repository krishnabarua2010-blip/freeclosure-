"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Rocket, Target, Zap, Bot, Shield, Trophy, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import InfinityGrid from "@/components/InfinityGrid";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Fade up animations for sections
      gsap.utils.toArray<HTMLElement>(".gsap-fade-up").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Staggered features
      gsap.fromTo(".gsap-feature-card", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#features",
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-gray-200 selection:bg-gray-700/50 overflow-x-hidden">
      
      {/* 3D INFINITE MESH GRID BACKGROUND */}
      <InfinityGrid />

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 glass-dark border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Pre Closer<span className="text-gray-400">.ai</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="text-sm font-bold bg-white text-black px-4 py-2 rounded-full hover:scale-105 transition-transform">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center gsap-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-gray-500/30 mb-8 hover:bg-white/5 transition-colors cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
            <span className="text-xs font-medium text-gray-300">Pre Closer 2.0 is live. Join 10k+ ambitious students.</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1] text-white">
            Turn your skills into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 neon-text">
              income using AI.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
            The digital operating system for ambitious students. Discover side hustles, execute with AI mentors, and build your future today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-200 text-black rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-4 glass text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
              Watch Demo
            </Link>
          </div>
        </section>

        {/* DEMO / DASHBOARD PREVIEW */}
        <section id="demo" className="max-w-6xl mx-auto px-6 mb-32 gsap-fade-up">
          <div className="relative rounded-2xl glass-dark p-2 overflow-hidden neon-border">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-500/5 to-transparent pointer-events-none" />
            <div className="bg-[#050505] rounded-xl overflow-hidden border border-white/5 aspect-video relative flex items-center justify-center shadow-2xl">
              {/* Fake UI for visual impact */}
              <div className="absolute inset-0 grid grid-cols-12 gap-4 p-6 opacity-40">
                <div className="col-span-3 space-y-4">
                  <div className="h-10 w-full bg-white/5 rounded-lg" />
                  <div className="h-8 w-3/4 bg-white/5 rounded-lg" />
                  <div className="h-8 w-5/6 bg-white/5 rounded-lg" />
                </div>
                <div className="col-span-6 space-y-4">
                  <div className="h-32 w-full bg-gradient-to-r from-gray-500/10 to-gray-700/10 rounded-xl border border-gray-500/20" />
                  <div className="h-48 w-full bg-white/5 rounded-xl" />
                </div>
                <div className="col-span-3 space-y-4">
                  <div className="h-24 w-full bg-white/5 rounded-xl" />
                  <div className="h-24 w-full bg-white/5 rounded-xl" />
                </div>
              </div>
              <div className="absolute z-10 text-center glass p-8 rounded-2xl">
                <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-2">AI Side Hustle Finder</h3>
                <p className="text-gray-400">Analyzing your skills and interests...</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16 gsap-fade-up">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Your AI Business Launcher</h2>
            <p className="text-gray-400 text-lg">Everything you need to go from zero to first income.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Side Hustle Finder", desc: "Discover realistic income paths tailored to your exact skills and available time." },
              { icon: Bot, title: "AI Mentor Mode", desc: "A practical, sharp, and actionable AI mentor that guides your execution daily." },
              { icon: Rocket, title: "Action Workflows", desc: "Generate hooks, DM scripts, and client outreach messages in one click." },
              { icon: Trophy, title: "Gamified Roadmaps", desc: "Step-by-step visual roadmaps to learn high-income skills like AI automation." },
              { icon: Zap, title: "Daily Missions", desc: "Earn XP, build streaks, and stay motivated with a gamified execution engine." },
              { icon: Shield, title: "Template Vault", desc: "Access hundreds of proven outreach scripts, ad copy, and content structures." },
            ].map((feature, i) => (
              <div 
                key={i}
                className={`glass glass-feature-${i} p-8 rounded-2xl group gsap-feature-card cursor-default`}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-500/10 border border-gray-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="max-w-4xl mx-auto px-6 py-32 text-center gsap-fade-up">
          <div className="glass-dark border border-gray-500/30 p-12 rounded-3xl relative overflow-hidden neon-border group hover:border-gray-400/50 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-600/10 rounded-full blur-[80px] group-hover:bg-gray-500/20 transition-colors" />
            
            <h2 className="text-4xl font-black mb-4 relative z-10 text-white">Simple, Student-Friendly Pricing</h2>
            <p className="text-gray-400 mb-8 relative z-10">Choose the plan that matches your ambition.</p>
            
            {/* Interactive Toggle */}
            <div className="flex items-center justify-center gap-4 mb-10 relative z-10">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-7 bg-gray-800 rounded-full p-1 border border-gray-600 relative transition-colors hover:border-gray-400"
              >
                <motion.div 
                  className="w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: isAnnual ? 28 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
                Annually <span className="text-green-400 text-xs ml-1 font-bold">(-20%)</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center mb-8 relative z-10">
              <div className="text-2xl text-gray-500 line-through font-medium mb-1 decoration-gray-600 decoration-2">
                {isAnnual ? '₹17,988' : '₹1499'}
              </div>
              <div className="text-7xl font-black text-white flex items-baseline gap-2 tabular-nums">
                {isAnnual ? '₹240' : '₹300'}<span className="text-2xl text-gray-500 font-medium">/mo</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border border-gray-600/50 text-gray-300 rounded-full text-sm font-bold shadow-lg">
                <Sparkles className="w-4 h-4" /> Launch Discount Active
              </div>
            </div>

            <ul className="text-left max-w-sm mx-auto space-y-4 mb-10 relative z-10">
              {['Unlimited AI Mentor Chat', 'All Premium Roadmaps', 'Full Template Vault Access', 'Daily XP & Rewards', 'Private Opportunity Feed'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button className="w-full sm:w-auto px-12 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-lg transition-transform hover:scale-105 relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Start Your Free Trial
            </button>
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 glass">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gray-400" />
            <span className="font-bold text-xl tracking-tight text-white">Pre Closer<span className="text-gray-400">.ai</span></span>
          </div>
          <p className="text-gray-500 text-sm font-medium">© 2026 Pre Closer AI. Built for the ambitious.</p>
        </div>
      </footer>
    </div>
  );
}
