"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Save, Activity, Server, Clock, BarChart3 } from "lucide-react";

interface Roadmap {
  id: string;
  title: string;
  difficulty: string;
  estimated_duration: string;
}

export default function AdminPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([
    { id: "1", title: "AI Automation Agency (AAA)", difficulty: "Beginner", estimated_duration: "4 Weeks" },
    { id: "2", title: "Faceless YouTube Channel", difficulty: "Intermediate", estimated_duration: "8 Weeks" },
  ]);
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newRoadmap, setNewRoadmap] = useState({ title: "", difficulty: "", estimated_duration: "" });

  // Mock W&B Metrics
  const [metrics, setMetrics] = useState({
    avgLatency: 840,
    totalCalls: 12450,
    errorRate: 0.2,
    activeModel: "Qwen/Qwen3-Coder-480B-A35B-Instruct"
  });

  const handleAdd = () => {
    if (!newRoadmap.title) return;
    setRoadmaps([...roadmaps, { id: Date.now().toString(), ...newRoadmap }]);
    setNewRoadmap({ title: "", difficulty: "", estimated_duration: "" });
  };

  const handleDelete = (id: string) => {
    setRoadmaps(roadmaps.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-1 flex items-center gap-3">
            Admin Console <span className="bg-red-600/20 text-red-400 text-xs px-2 py-1 rounded-md uppercase tracking-widest border border-red-500/20">God Mode</span>
          </h1>
          <p className="text-gray-400 text-sm">Manage roadmaps and monitor AI infrastructure.</p>
        </div>
      </div>

      {/* W&B INFRASTRUCTURE DASHBOARD */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Weights & Biases (Weave) Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass border border-white/5 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Clock className="w-4 h-4" /> <span className="text-sm font-medium">Avg Latency</span>
            </div>
            <div className="text-3xl font-black text-white">{metrics.avgLatency} <span className="text-sm text-gray-500 font-medium">ms</span></div>
            <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[80%]" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass border border-white/5 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <BarChart3 className="w-4 h-4" /> <span className="text-sm font-medium">Total LLM Calls</span>
            </div>
            <div className="text-3xl font-black text-white">{(metrics.totalCalls / 1000).toFixed(1)}k</div>
            <p className="text-xs text-emerald-400 mt-2 font-medium">+12% this week</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass border border-white/5 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Server className="w-4 h-4" /> <span className="text-sm font-medium">Active Provider</span>
            </div>
            <div className="text-lg font-bold text-blue-400 truncate">W&B Inference</div>
            <p className="text-xs text-gray-500 mt-1 truncate" title={metrics.activeModel}>{metrics.activeModel}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass border border-white/5 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Activity className="w-4 h-4" /> <span className="text-sm font-medium">Error Rate</span>
            </div>
            <div className="text-3xl font-black text-white">{metrics.errorRate}%</div>
            <p className="text-xs text-gray-500 mt-2 font-medium">Fallback Mistral: Ready</p>
          </motion.div>
        </div>
      </section>

      {/* ROADMAP MANAGER */}
      <section className="pt-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Edit2 className="w-5 h-5 text-purple-400" />
          Roadmap Manager
        </h2>

        <div className="glass border border-white/5 rounded-2xl overflow-hidden">
          {/* Add New */}
          <div className="p-6 bg-[#111] border-b border-white/5 flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
              <input 
                type="text" 
                value={newRoadmap.title}
                onChange={e => setNewRoadmap({...newRoadmap, title: e.target.value})}
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg py-2 px-3 text-sm focus:border-blue-500 outline-none transition-colors"
                placeholder="e.g. TikTok Shop Masterclass"
              />
            </div>
            <div className="w-48">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Difficulty</label>
              <select 
                value={newRoadmap.difficulty}
                onChange={e => setNewRoadmap({...newRoadmap, difficulty: e.target.value})}
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg py-2 px-3 text-sm focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Select...</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="w-32">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration</label>
              <input 
                type="text" 
                value={newRoadmap.estimated_duration}
                onChange={e => setNewRoadmap({...newRoadmap, estimated_duration: e.target.value})}
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg py-2 px-3 text-sm focus:border-blue-500 outline-none transition-colors"
                placeholder="e.g. 2 Weeks"
              />
            </div>
            <button 
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {/* List */}
          <div className="divide-y divide-white/5">
            {roadmaps.map((roadmap) => (
              <div key={roadmap.id} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">{roadmap.title}</h3>
                  <div className="flex gap-3 mt-1 text-xs text-gray-500 font-medium">
                    <span className="bg-white/10 px-2 py-0.5 rounded">{roadmap.difficulty}</span>
                    <span>{roadmap.estimated_duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(roadmap.id)} className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
