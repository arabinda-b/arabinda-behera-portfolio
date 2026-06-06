"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage = 0 | 1 | 2 | 3;

interface StageMetadata {
  title: string;
  subtitle: string;
  details: string;
}

const metadata: Record<Stage, StageMetadata> = {
  0: {
    title: "Relativistic Heavy-Ion Collision",
    subtitle: "Xe+Xe @ 5.44 TeV | Pb+Pb @ 5.02 TeV",
    details: "Generating Quark-Gluon Plasma (QGP) [1]",
  },
  1: {
    title: "ATLAS Detector Signal Capture",
    subtitle: "Inner Tracker · EM Cal · HAD Cal · Muon System",
    details: "Capturing particle tracks and energy showers [2, 5]",
  },
  2: {
    title: "High-Level Trigger (HLT) Pipeline",
    subtitle: "Trigger Efficiency: >96% Selection",
    details: "Optimized software selection for photons and electrons [2]",
  },
  3: {
    title: "Generative AI Shower Reconstruction",
    subtitle: "VAE/GAN Model: 100× Speedup vs GEANT4",
    details: "Synthesizing calorimeter showers from latent space [3, 6]",
  },
};

// ── Stage 0 constants ─────────────────────────────────────────────────────────
const COLL_TRACKS = [
  0, 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234, 252, 270, 288,
  306, 324, 342,
];
const COLL_COLORS = [
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#a855f7",
  "#3b82f6",
  "#f97316",
  "#06b6d4",
  "#ec4899",
  "#fbbf24",
  "#84cc16",
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#a855f7",
  "#3b82f6",
  "#f97316",
  "#06b6d4",
  "#ec4899",
  "#fbbf24",
  "#84cc16",
];

// ── Stage 1 constants ─────────────────────────────────────────────────────────
const DET_LAYERS = [
  { r: 48, ry: 35, label: "ITk", color: "#3b82f6", ratio: 0.322 },
  { r: 82, ry: 60, label: "EM Cal", color: "#f59e0b", ratio: 0.55 },
  { r: 114, ry: 83, label: "HAD Cal", color: "#10b981", ratio: 0.765 },
  { r: 149, ry: 109, label: "Muon", color: "#a855f7", ratio: 1.0 },
];
const DET_TRACKS = [14, 48, 82, 116, 152, 188, 224, 260, 296, 332];
const DET_COLORS = [
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#a855f7",
  "#3b82f6",
  "#f97316",
  "#06b6d4",
  "#ec4899",
  "#fbbf24",
  "#84cc16",
];
const DET_TDUR = 1.6,
  DET_CYCLE = 3.6;

// Stage 3: fixed cell delays — no Math.random at render time
const CELL_DELAYS = Array.from(
  { length: 36 },
  (_, i) => ((i * 7 + (i % 5) * 3) % 10) / 10,
);

const PhysicsPipeline: React.FC = () => {
  const [stage, setStage] = useState<Stage>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => ((prev + 1) % 4) as Stage);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl p-8 mx-auto bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative min-h-[500px]">
      {/* Header */}
      <div className="absolute top-6 left-8 text-left z-20">
        <h2 className="text-blue-400 font-mono text-xs uppercase tracking-tighter mb-1">
          High Energy Physics Research Workflow
        </h2>
        <motion.div
          key={stage}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white font-bold text-xl"
        >
          Stage {stage + 1}: {metadata[stage].title}
        </motion.div>
        <div className="text-slate-400 text-sm mt-1">
          {metadata[stage].subtitle}
        </div>
        <div className="text-slate-500 text-xs mt-1 italic">
          {metadata[stage].details}
        </div>
      </div>

      <div className="relative w-full h-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* ── STAGE 0: RELATIVISTIC COLLISION ─────────────────────────── */}
          {stage === 0 && (
            <motion.div
              key="collision"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 260"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="pp-gb">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="pp-gw">
                    <feGaussianBlur stdDeviation="10" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Beam pipe */}
                <line
                  x1="0"
                  y1="130"
                  x2="500"
                  y2="130"
                  stroke="#1e3a5f"
                  strokeWidth="6"
                />
                <line
                  x1="0"
                  y1="130"
                  x2="500"
                  y2="130"
                  stroke="#3b82f625"
                  strokeWidth="2"
                />

                {/* Ion 1 — left → center, fades at impact */}
                <motion.circle
                  cy={130}
                  r={13}
                  fill="#3b82f6"
                  filter="url(#pp-gb)"
                  animate={{ cx: [10, 250], opacity: [1, 1, 0] }}
                  transition={{
                    duration: 1.2,
                    times: [0, 0.82, 1],
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: "easeIn",
                  }}
                />
                {/* Ion 2 — right → center */}
                <motion.circle
                  cy={130}
                  r={13}
                  fill="#7dd3fc"
                  filter="url(#pp-gb)"
                  animate={{ cx: [490, 250], opacity: [1, 1, 0] }}
                  transition={{
                    duration: 1.2,
                    times: [0, 0.82, 1],
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: "easeIn",
                  }}
                />

                {/* Triple shockwave rings */}
                {([0, 0.13, 0.27] as const).map((d, i) => (
                  <motion.circle
                    key={`cw-${i}`}
                    cx={250}
                    cy={130}
                    r={0}
                    fill="none"
                    stroke={i === 0 ? "white" : i === 1 ? "#fbbf24" : "#60a5fa"}
                    strokeWidth={3 - i * 0.6}
                    animate={{ r: [0, 60 + i * 14], opacity: [1, 0] }}
                    transition={{
                      delay: 1.1 + d,
                      duration: 1.1,
                      repeat: Infinity,
                      repeatDelay: 3.5 - d,
                      ease: "easeOut",
                    }}
                  />
                ))}
                {/* Central flash */}
                <motion.circle
                  cx={250}
                  cy={130}
                  r={2}
                  fill="white"
                  filter="url(#pp-gw)"
                  animate={{ r: [0, 28, 3, 0], opacity: [0, 1, 0.6, 0] }}
                  transition={{
                    delay: 1.1,
                    duration: 1.0,
                    repeat: Infinity,
                    repeatDelay: 3.6,
                  }}
                />

                {/* Particle tracks — full 360° spray */}
                {COLL_TRACKS.map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <motion.line
                      key={`ct-${deg}`}
                      x1={250}
                      y1={130}
                      x2={250 + Math.cos(rad) * 130}
                      y2={130 + Math.sin(rad) * 100}
                      stroke={COLL_COLORS[i]}
                      strokeWidth={1.4}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        delay: 1.15 + i * 0.025,
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: 3.1,
                      }}
                    />
                  );
                })}

                {/* QGP label */}
                <motion.text
                  x={250}
                  y={205}
                  textAnchor="middle"
                  fill="#f59e0b"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    delay: 1.2,
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 3.2,
                  }}
                >
                  QGP Formation
                </motion.text>
                <motion.text
                  x={250}
                  y={222}
                  textAnchor="middle"
                  fill="#60a5fa"
                  fontSize="10"
                  fontFamily="monospace"
                  animate={{ opacity: [0, 0.9, 0] }}
                  transition={{
                    delay: 1.3,
                    duration: 1.3,
                    repeat: Infinity,
                    repeatDelay: 3.3,
                  }}
                >
                  √sNN = 5.02 TeV
                </motion.text>
              </svg>
            </motion.div>
          )}

          {/* ── STAGE 1: ATLAS DETECTOR ──────────────────────────────────── */}
          {stage === 1 && (
            <motion.div
              key="detection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 260"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Detector layer rings — base + pulsing activation flash */}
                {DET_LAYERS.map((layer, li) => (
                  <g key={layer.label}>
                    <ellipse
                      cx={250}
                      cy={130}
                      rx={layer.r}
                      ry={layer.ry}
                      fill="none"
                      stroke={layer.color}
                      strokeWidth={li === 3 ? 2.5 : 2}
                      opacity={0.38}
                    />
                    <motion.ellipse
                      cx={250}
                      cy={130}
                      rx={layer.r}
                      ry={layer.ry}
                      fill="none"
                      stroke={layer.color}
                      strokeWidth={li === 3 ? 5 : 4}
                      style={{ filter: `drop-shadow(0 0 7px ${layer.color})` }}
                      animate={{ opacity: [0, 0.72, 0] }}
                      transition={{
                        delay: layer.ratio * DET_TDUR,
                        duration: 0.55,
                        repeat: Infinity,
                        repeatDelay: DET_CYCLE - 0.55,
                      }}
                    />
                    <text
                      x={250 + layer.r + 5}
                      y={133}
                      fill={layer.color}
                      fontSize="9"
                      fontFamily="monospace"
                      opacity={0.9}
                    >
                      {layer.label}
                    </text>
                  </g>
                ))}

                {/* Track guide lines */}
                {DET_TRACKS.map((deg, ti) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={`g-${deg}`}
                      x1={250}
                      y1={130}
                      x2={250 + Math.cos(rad) * 149}
                      y2={130 + Math.sin(rad) * 109}
                      stroke={DET_COLORS[ti]}
                      strokeWidth={0.7}
                      opacity={0.16}
                    />
                  );
                })}

                {/* Traveling particle dots */}
                {DET_TRACKS.map((deg, ti) => {
                  const rad = (deg * Math.PI) / 180;
                  const endX = 250 + Math.cos(rad) * 149;
                  const endY = 130 + Math.sin(rad) * 109;
                  return (
                    <motion.circle
                      key={`p-${deg}`}
                      r={4.5}
                      fill={DET_COLORS[ti]}
                      style={{
                        filter: `drop-shadow(0 0 9px ${DET_COLORS[ti]})`,
                      }}
                      animate={{
                        cx: [250, endX],
                        cy: [130, endY],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        delay: ti * 0.22,
                        duration: DET_TDUR,
                        repeat: Infinity,
                        repeatDelay: DET_CYCLE - DET_TDUR,
                        ease: "linear",
                      }}
                    />
                  );
                })}

                {/* Layer hit flashes */}
                {DET_TRACKS.map((deg, ti) => {
                  const rad = (deg * Math.PI) / 180;
                  return DET_LAYERS.map((layer, li) => {
                    const hx = 250 + Math.cos(rad) * layer.r;
                    const hy = 130 + Math.sin(rad) * layer.ry;
                    return (
                      <motion.circle
                        key={`h-${ti}-${li}`}
                        cx={hx}
                        cy={hy}
                        r={2.5}
                        fill={layer.color}
                        style={{
                          filter: `drop-shadow(0 0 10px ${layer.color})`,
                        }}
                        animate={{ r: [2.5, 8, 2.5], opacity: [0, 1, 0] }}
                        transition={{
                          delay: ti * 0.22 + layer.ratio * DET_TDUR,
                          duration: 0.45,
                          repeat: Infinity,
                          repeatDelay: DET_CYCLE - 0.45,
                        }}
                      />
                    );
                  });
                })}

                {/* Beam pipe — outer glow + core */}
                <motion.circle
                  cx={250}
                  cy={130}
                  r={13}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  animate={{ opacity: [0.12, 0.55, 0.12], r: [12, 17, 12] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <circle
                  cx={250}
                  cy={130}
                  r={10}
                  fill="#020617"
                  stroke="#475569"
                  strokeWidth={1.5}
                />
                <motion.circle
                  cx={250}
                  cy={130}
                  r={5}
                  fill="#3b82f6"
                  animate={{ opacity: [0.5, 1, 0.5], r: [5, 7, 5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <text
                  x={250}
                  y={160}
                  textAnchor="middle"
                  fill="#3b82f666"
                  fontSize="8.5"
                  fontFamily="monospace"
                >
                  IP · Pb+Pb
                </text>
              </svg>
            </motion.div>
          )}

          {/* ── STAGE 2: HLT PIPELINE ────────────────────────────────────── */}
          {stage === 2 && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 w-full px-4"
            >
              <div className="w-1/3 p-3 border border-slate-700 rounded bg-slate-900 text-[9px] font-mono text-blue-300 h-32 overflow-hidden">
                <div className="text-green-400 mb-1 font-bold">
                  // HLT_INPUT
                </div>
                <div>L1_ACCEPT: 0x3F2A</div>
                <div>RoI_ID: 0x5A2...</div>
                <div>TRACKING_HLT...</div>
                <div>ET_CONV: 26GeV</div>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  animate={{ x: [-40, 40] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="px-3 py-1 bg-blue-600 rounded text-white text-[10px] font-bold shadow-[0_0_12px_#2563eb]"
                >
                  RAW DATA
                </motion.div>
                <div className="text-[9px] font-mono text-slate-500">
                  → HLT filter →
                </div>
              </div>
              <div className="w-1/3 p-3 border border-green-800 rounded bg-slate-900 text-[9px] font-mono text-green-400 h-32">
                <div className="text-green-300 mb-1 font-bold">
                  // HLT_OUTPUT
                </div>
                <div>HLT_SELECTED</div>
                <div>EFFICIENCY: 96%</div>
                <div>PHOTON_ID: PASS</div>
                <div>WRITING_DISK</div>
              </div>
            </motion.div>
          )}

          {/* ── STAGE 3: GENERATIVE AI RECONSTRUCTION ───────────────────── */}
          {stage === 3 && (
            <motion.div
              key="ai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between w-full px-12"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-[10px] text-slate-400 font-mono italic">
                  Latent Space z
                </div>
                <div className="w-10 h-24 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full blur-md animate-pulse" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-6 gap-1"
              >
                {[...Array(36)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      backgroundColor: ["#1e293b", "#60a5fa", "#1e293b"],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: CELL_DELAYS[i],
                    }}
                    className="w-4 h-4 rounded-sm border border-slate-800"
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar — fixed indices */}
      <div className="flex gap-2 mt-8">
        {([0, 1, 2, 3] as Stage[]).map((i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              stage === i ? "bg-blue-500 w-16" : "bg-slate-800 w-8"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhysicsPipeline;
