"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AIStage = 0 | 1 | 2 | 3;

interface AIMetadata {
  title: string;
  subtitle: string;
  stack: string[];
}

const aiMetadata: Record<AIStage, AIMetadata> = {
  0: {
    title: "Cloud-Native Ingestion",
    subtitle: "Distributed Microservices & CI/CD",
    stack: ["Java", "Helidon", "OCI", "Jenkins"],
  },
  1: {
    title: "Knowledge Vectorization",
    subtitle: "RAG & Semantic Search Layer",
    stack: ["Oracle Vector DB", "Embeddings", "Python"],
  },
  2: {
    title: "Agentic Orchestration",
    subtitle: "LLM Reasoning & Task Planning",
    stack: ["LangGraph", "LangChain", "Claude/Gemini"],
  },
  3: {
    title: "MCP Context Bridge",
    subtitle: "Model Context Protocol Execution",
    stack: ["MCP", "Enterprise Logs", "RAG Output"],
  },
};

const AIEngineeringPipeline: React.FC = () => {
  const [stage, setStage] = useState<AIStage>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => ((prev + 1) % 4) as AIStage);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl p-8 mx-auto bg-slate-900 rounded-3xl border border-blue-500/30 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] relative min-h-[500px]">
      {/* Header Info */}
      <div className="absolute top-6 left-8 text-left z-20">
        <h2 className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
          AI Engineering Portfolio
        </h2>
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-bold text-2xl"
        >
          {aiMetadata[stage].title}
        </motion.div>
        <div className="text-slate-300 text-sm mt-1">
          {aiMetadata[stage].subtitle}
        </div>
        <div className="flex gap-2 mt-3">
          {aiMetadata[stage].stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-blue-900/40 text-blue-300 border border-blue-700/50 rounded text-[10px] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="relative w-full h-64 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* STAGE 0: CLOUD CLUSTER */}
          {stage === 0 && (
            <motion.div
              key="cloud"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-8"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className="w-16 h-20 bg-slate-800 border border-blue-500/50 rounded-lg flex flex-col p-2 gap-2 shadow-lg shadow-blue-500/10"
                >
                  <div className="w-full h-2 bg-blue-500/30 rounded" />
                  <div className="w-2/3 h-2 bg-slate-700 rounded" />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-auto w-full h-4 bg-cyan-500/20 rounded flex items-center justify-center text-[8px] text-cyan-300 font-bold"
                  >
                    API
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* STAGE 1: VECTOR DB */}
          {stage === 1 && (
            <motion.div
              key="vector"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="w-32 h-32 border-2 border-dashed border-blue-400/30 rounded-full animate-spin-slow flex items-center justify-center" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-1 p-4 bg-slate-800 rounded border border-blue-500">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        backgroundColor: ["#1e293b", "#3b82f6", "#1e293b"],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: Math.random(),
                      }}
                      className="w-2 h-2 rounded-full"
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-[10px] text-blue-400 font-mono">
                {stage === 1 && "VECTOR_UPSERT..."}
              </div>
            </motion.div>
          )}

          {/* STAGE 2: AGENT THINKING */}
          {stage === 2 && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-40 h-40 border-t-2 border-b-2 border-cyan-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center font-mono text-cyan-400 text-xs text-center">
                  REASONING
                  <br />
                  LOOP
                </div>
              </div>
              <div className="flex gap-4">
                {["Planner", "Executor", "Critic"].map((role) => (
                  <div
                    key={role}
                    className="px-3 py-1 border border-slate-700 rounded bg-slate-800 text-[10px] text-slate-400 italic"
                  >
                    {role}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STAGE 3: MCP CONTEXT BRIDGE */}
          {stage === 3 && (
            <motion.div
              key="mcp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full px-20"
            >
              <div className="flex items-center justify-between">
                <div className="w-20 h-20 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                  LLM
                </div>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-green-500 relative">
                  <motion.div
                    animate={{ x: [5], opacity: [6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-[-4px] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
                  />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-400">
                    MCP GATEWAY
                  </div>
                </div>
                <div className="w-20 h-20 border border-green-500 bg-green-500/10 rounded flex items-center justify-center text-green-400 text-[10px] text-center font-mono">
                  TOOL
                  <br />
                  CONTEXT
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Logic */}
      <div className="flex gap-3 mt-12">
        {[6 - 8].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-700 ${stage === i ? "bg-cyan-500 w-24 shadow-[0_0_10px_#06b6d4]" : "bg-slate-800 w-12"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AIEngineeringPipeline;
