"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
type PhysStage = 0 | 1 | 2 | 3;
type AIStage = 0 | 1 | 2 | 3;

// ═══════════════════════════════════════════════════════════════════════════════
// PHYSICS PANEL — constants
// ═══════════════════════════════════════════════════════════════════════════════

const physMeta = [
  {
    title: "Pb+Pb Collision @ 5.02 TeV",
    sub: "Quark-Gluon Plasma Formation · LHC Run 2",
    color: "text-blue-400",
  },
  {
    title: "ATLAS Detector Response",
    sub: "Inner Tracker · EM Cal · HAD Cal · Muon System",
    color: "text-yellow-400",
  },
  {
    title: "HLT Trigger Selection",
    sub: ">96% Efficiency · Photon & Electron ID",
    color: "text-green-400",
  },
  {
    title: "Flow Correlation Analysis",
    sub: "v₂{4} · PCA · Longitudinal Decorrelations",
    color: "text-purple-400",
  },
];

const trackColors = [
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#a855f7",
  "#3b82f6",
  "#f97316",
  "#06b6d4",
  "#ec4899",
];

const scatterPoints = [
  { x: 5, y: 72 },
  { x: 11, y: 65 },
  { x: 17, y: 59 },
  { x: 23, y: 53 },
  { x: 30, y: 47 },
  { x: 37, y: 42 },
  { x: 44, y: 37 },
  { x: 51, y: 33 },
  { x: 58, y: 29 },
  { x: 65, y: 25 },
  { x: 72, y: 22 },
  { x: 79, y: 19 },
  { x: 86, y: 17 },
  { x: 93, y: 15 },
];

const histoBars = [0.28, 0.52, 0.78, 1.0, 0.92, 0.73, 0.52, 0.36, 0.21];

const hltLines = [
  { text: "L1_ACCEPT: 0x3F2A", color: "text-zinc-400" },
  { text: "RoI_ETA: 0.42  PHI: 1.87", color: "text-zinc-400" },
  { text: "TRACKING_HLT... OK", color: "text-blue-400" },
  { text: "E/p RATIO: 0.97", color: "text-zinc-400" },
  { text: "HLT_e26_lhtight: PASS", color: "text-green-400" },
  { text: "PHOTON_ID: LOOSE", color: "text-zinc-400" },
  { text: "ET_CONV: 31.2 GeV", color: "text-zinc-400" },
  { text: "EFFICIENCY: 96.1%", color: "text-yellow-400" },
  { text: "WRITING TO AOD...", color: "text-blue-300" },
];

// LHC ring orbit keyframes — precomputed (stage 0 physics)
const LHC_CX = 150,
  LHC_CY = 106,
  LHC_R = 74;
const LHC_STEPS = 48;
const LHC_X1 = Array.from(
  { length: LHC_STEPS + 1 },
  (_, i) =>
    LHC_CX + LHC_R * Math.cos(-Math.PI / 2 + (2 * Math.PI * i) / LHC_STEPS),
);
const LHC_Y1 = Array.from(
  { length: LHC_STEPS + 1 },
  (_, i) =>
    LHC_CY + LHC_R * Math.sin(-Math.PI / 2 + (2 * Math.PI * i) / LHC_STEPS),
);
const LHC_X2 = Array.from(
  { length: LHC_STEPS + 1 },
  (_, i) =>
    LHC_CX + LHC_R * Math.cos(-Math.PI / 2 - (2 * Math.PI * i) / LHC_STEPS),
);
const LHC_Y2 = Array.from(
  { length: LHC_STEPS + 1 },
  (_, i) =>
    LHC_CY + LHC_R * Math.sin(-Math.PI / 2 - (2 * Math.PI * i) / LHC_STEPS),
);
const lhcDetPoints = [
  {
    x: LHC_CX,
    y: LHC_CY - LHC_R,
    label: "ATLAS",
    highlight: true,
    color: "#f59e0b",
  },
  {
    x: LHC_CX,
    y: LHC_CY + LHC_R,
    label: "CMS",
    highlight: false,
    color: "#ef4444",
  },
  {
    x: LHC_CX - LHC_R,
    y: LHC_CY,
    label: "ALICE",
    highlight: false,
    color: "#10b981",
  },
  {
    x: LHC_CX + LHC_R,
    y: LHC_CY,
    label: "LHCb",
    highlight: false,
    color: "#8b5cf6",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// AI PANEL — constants
// ═══════════════════════════════════════════════════════════════════════════════

const aiMeta = [
  {
    title: "CI/CD Pipeline",
    sub: "Git · GitHub Actions · Docker · OCI Registry",
    color: "text-orange-400",
  },
  {
    title: "Cloud Deployment",
    sub: "OCI · Kubernetes · Load Balancer · Auto-scale",
    color: "text-violet-400",
  },
  {
    title: "Agentic Orchestration",
    sub: "LangGraph · RAG · MCP Tools · Reasoning Loop",
    color: "text-yellow-400",
  },
  {
    title: "Production Output",
    sub: "Analysis Plots · AI Chat Assistant",
    color: "text-green-400",
  },
];

// CI/CD pipeline nodes (stage 0)
const ciNodes = [
  { label: "GIT", x: 22, color: "#f97316", sub: "a3f2e91" },
  { label: "BUILD", x: 82, color: "#3b82f6", sub: "2m 14s" },
  { label: "TEST", x: 150, color: "#06b6d4", sub: "97% pass" },
  { label: "DOCKER", x: 218, color: "#8b5cf6", sub: "v2.4.1" },
  { label: "OCI", x: 278, color: "#10b981", sub: "3 pods" },
];

// Cloud architecture node geometry (stage 1)
const cloudLB = {
  x: 150,
  y: 30,
  w: 80,
  h: 22,
  color: "#8b5cf6",
  label: "Load Balancer",
};
const cloudPods = [
  { x: 55, y: 100, color: "#3b82f6", label: "Pod-1" },
  { x: 150, y: 100, color: "#3b82f6", label: "Pod-2" },
  { x: 245, y: 100, color: "#3b82f6", label: "Pod-3" },
];
const cloudDBs = [
  { x: 95, y: 168, color: "#10b981", label: "VecDB" },
  { x: 205, y: 168, color: "#f59e0b", label: "OracleDB" },
];
const PW = 52,
  PH = 22,
  DW = 62,
  DH = 22;
const cloudLines = [
  // LB → pods
  {
    x1: 150,
    y1: cloudLB.y + cloudLB.h / 2,
    x2: 55,
    y2: 100 - PH / 2,
    c: "#8b5cf6",
  },
  {
    x1: 150,
    y1: cloudLB.y + cloudLB.h / 2,
    x2: 150,
    y2: 100 - PH / 2,
    c: "#8b5cf6",
  },
  {
    x1: 150,
    y1: cloudLB.y + cloudLB.h / 2,
    x2: 245,
    y2: 100 - PH / 2,
    c: "#8b5cf6",
  },
  // pods → dbs
  { x1: 55, y1: 100 + PH / 2, x2: 95, y2: 168 - DH / 2, c: "#3b82f6" },
  { x1: 150, y1: 100 + PH / 2, x2: 95, y2: 168 - DH / 2, c: "#3b82f6" },
  { x1: 150, y1: 100 + PH / 2, x2: 205, y2: 168 - DH / 2, c: "#3b82f6" },
  { x1: 245, y1: 100 + PH / 2, x2: 205, y2: 168 - DH / 2, c: "#3b82f6" },
];

// Agentic orbit keyframes (stage 2) — precomputed, no Math.random at render
const STEPS = 24;
const OCX = 150,
  OCY = 110,
  ORX = 105,
  ORY = 70;
const OXS = Array.from(
  { length: STEPS + 1 },
  (_, i) => OCX + ORX * Math.cos((2 * Math.PI * i) / STEPS),
);
const OYS = Array.from(
  { length: STEPS + 1 },
  (_, i) => OCY + ORY * Math.sin((2 * Math.PI * i) / STEPS),
);
const OXS2 = [...OXS.slice(12), ...OXS.slice(1, 13)];
const OYS2 = [...OYS.slice(12), ...OYS.slice(1, 13)];

const orbitNodes = [
  { label: "RAG", x: OCX, y: OCY - ORY, color: "#f59e0b" },
  { label: "Plan", x: OCX + ORX, y: OCY, color: "#3b82f6" },
  { label: "Execute", x: OCX, y: OCY + ORY, color: "#10b981" },
  { label: "Reflect", x: OCX - ORX, y: OCY, color: "#a855f7" },
];
const mcpTools = [
  { label: "Search", x: 246, y: 32 },
  { label: "Code", x: 255, y: 190 },
  { label: "Files", x: 45, y: 190 },
  { label: "API", x: 35, y: 32 },
];

// App output (stage 3)
const appChatMessages = [
  { role: "user", text: "Q3 revenue vs forecast?", delay: 0.2 },
  { role: "agent", text: "$4.2M · +12% vs target ✓", delay: 0.9 },
  { role: "user", text: "High churn risk accounts?", delay: 1.6 },
  { role: "agent", text: "3 accts · $840K ARR at risk", delay: 2.3 },
];
const appBars = [0.48, 0.55, 0.61, 0.72, 0.68, 0.79, 0.88, 0.95];

const aiStackBadges: Record<AIStage, string[]> = {
  0: ["Git", "GitHub Actions", "Docker", "OCI Registry", "Jenkins"],
  1: ["OCI", "Kubernetes", "Terraform", "Helidon", "Spring Boot"],
  2: ["LangGraph", "LangChain", "MCP", "Claude API", "RAG"],
  3: ["Vector DB", "FastAPI", "Next.js", "Matplotlib", "Pandas"],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PHYSICS VISUALIZATIONS
// ═══════════════════════════════════════════════════════════════════════════════

function CollisionViz() {
  const atX = LHC_CX,
    atY = LHC_CY - LHC_R; // ATLAS interaction point (top of ring)
  // Track angles from ATLAS point that stay within the SVG (downward fan, avoiding top-clip)
  const ctA = [340, 355, 10, 25, 42, 60, 80, 100, 120, 140, 158, 175, 195, 208];
  return (
    <motion.div
      key="col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full h-full flex items-center justify-center"
    >
      <svg width="300" height="210" viewBox="0 0 300 210">
        <defs>
          <filter id="lhc-gb">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lhc-gw">
            <feGaussianBlur stdDeviation="9" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lhc-gg">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* LHC tunnel — visible ring body + glowing beam channel */}
        <circle
          cx={LHC_CX}
          cy={LHC_CY}
          r={LHC_R + 6}
          fill="none"
          stroke="#3f3f46"
          strokeWidth={13}
        />
        <circle
          cx={LHC_CX}
          cy={LHC_CY}
          r={LHC_R}
          fill="none"
          stroke="#1e40af"
          strokeWidth={3}
          opacity={0.55}
        />
        <circle
          cx={LHC_CX}
          cy={LHC_CY}
          r={LHC_R}
          fill="none"
          stroke="#60a5fa"
          strokeWidth={1}
          opacity={0.3}
        />

        {/* Dimmed experiment points: CMS, ALICE, LHCb */}
        {lhcDetPoints
          .filter((d) => !d.highlight)
          .map((det) => (
            <g key={det.label}>
              <circle
                cx={det.x}
                cy={det.y}
                r={5}
                fill={det.color + "40"}
                stroke={det.color + "99"}
                strokeWidth={1.5}
              />
              <text
                x={
                  det.label === "ALICE"
                    ? det.x - 11
                    : det.label === "LHCb"
                      ? det.x + 11
                      : det.x
                }
                y={det.label === "CMS" ? det.y + 15 : det.y + 4}
                textAnchor={
                  det.label === "ALICE"
                    ? "end"
                    : det.label === "LHCb"
                      ? "start"
                      : "middle"
                }
                fill={det.color + "cc"}
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {det.label}
              </text>
            </g>
          ))}

        {/* ATLAS — large glowing highlighted point */}
        <motion.circle
          cx={atX}
          cy={atY}
          r={11}
          fill="#f59e0b"
          stroke="#fbbf24"
          strokeWidth={2.5}
          filter="url(#lhc-gg)"
          animate={{ r: [10, 14, 10], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <text
          x={atX}
          y={atY - 18}
          textAnchor="middle"
          fill="#fbbf24"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
        >
          ATLAS
        </text>

        {/* LHC center label */}
        <text
          x={LHC_CX}
          y={LHC_CY - 4}
          textAnchor="middle"
          fill="#a1a1aa"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
        >
          LHC
        </text>
        <text
          x={LHC_CX}
          y={LHC_CY + 8}
          textAnchor="middle"
          fill="#71717a"
          fontSize="8"
          fontFamily="monospace"
        >
          CERN
        </text>

        {/* Ion 1 — trails + main */}
        {[0.28, 0.55].map((td, ti) => (
          <motion.circle
            key={`t1-${ti}`}
            r={5 - ti}
            fill="#3b82f6"
            style={{ opacity: 0.28 - ti * 0.1 }}
            animate={{ cx: LHC_X1, cy: LHC_Y1 }}
            transition={{
              delay: td,
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        <motion.circle
          r={8}
          fill="#3b82f6"
          filter="url(#lhc-gb)"
          animate={{ cx: LHC_X1, cy: LHC_Y1 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Ion 2 — trails + main */}
        {[0.28, 0.55].map((td, ti) => (
          <motion.circle
            key={`t2-${ti}`}
            r={5 - ti}
            fill="#7dd3fc"
            style={{ opacity: 0.28 - ti * 0.1 }}
            animate={{ cx: LHC_X2, cy: LHC_Y2 }}
            transition={{
              delay: td,
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        <motion.circle
          r={8}
          fill="#7dd3fc"
          filter="url(#lhc-gb)"
          animate={{ cx: LHC_X2, cy: LHC_Y2 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Triple expanding shockwave rings at ATLAS */}
        {([0, 0.13, 0.28] as const).map((d, i) => (
          <motion.circle
            key={`cw-${i}`}
            cx={atX}
            cy={atY}
            r={0}
            fill="none"
            stroke={i === 0 ? "white" : i === 1 ? "#fbbf24" : "#60a5fa"}
            strokeWidth={2.5 - i * 0.5}
            animate={{ r: [0, 30 + i * 7], opacity: [1, 0] }}
            transition={{
              delay: d,
              duration: 1.1,
              repeat: Infinity,
              repeatDelay: 3.9 - d,
              ease: "easeOut",
            }}
          />
        ))}
        {/* Central flash fill */}
        <motion.circle
          cx={atX}
          cy={atY}
          r={2}
          fill="white"
          filter="url(#lhc-gw)"
          animate={{ r: [0, 18, 2, 0], opacity: [0, 1, 0.6, 0] }}
          transition={{ duration: 1.0, repeat: Infinity, repeatDelay: 4.0 }}
        />

        {/* Particle tracks from collision */}
        {ctA.map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <motion.line
              key={`ct-${deg}`}
              x1={atX}
              y1={atY}
              x2={atX + Math.cos(rad) * 85}
              y2={atY + Math.sin(rad) * 70}
              stroke={trackColors[i % trackColors.length]}
              strokeWidth={1.3}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: 0.08 + i * 0.03,
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 3.3,
              }}
            />
          );
        })}

        {/* QGP + energy label */}
        <motion.text
          x={atX}
          y={atY + 52}
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            delay: 0.2,
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 3.7,
          }}
        >
          QGP · Pb+Pb
        </motion.text>
        <motion.text
          x={atX}
          y={atY + 66}
          textAnchor="middle"
          fill="#60a5fa"
          fontSize="7.5"
          fontFamily="monospace"
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{
            delay: 0.3,
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 3.8,
          }}
        >
          √sNN = 5.02 TeV
        </motion.text>
      </svg>
    </motion.div>
  );
}

function DetectorViz() {
  const cx = 155,
    cy = 108;
  const dLayers = [
    { r: 38, ry: 27, label: "ITk", color: "#3b82f6", ratio: 0.311 },
    { r: 65, ry: 46, label: "EM Cal", color: "#f59e0b", ratio: 0.533 },
    { r: 92, ry: 65, label: "HAD Cal", color: "#10b981", ratio: 0.754 },
    { r: 122, ry: 86, label: "Muon", color: "#a855f7", ratio: 1.0 },
  ];
  const dTracks = [18, 52, 86, 122, 155, 192, 228, 264, 300, 338];
  const dColors = [
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
  const maxR = 122,
    maxRY = 86,
    TDUR = 1.6,
    CYCLE = 3.6;
  return (
    <motion.div
      key="det"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full h-full flex items-center justify-center"
    >
      <svg width="320" height="220" viewBox="0 0 320 220">
        {/* Detector layer rings — base + pulsing activation flash */}
        {dLayers.map((layer, li) => (
          <g key={layer.label}>
            {/* Steady base ring */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={layer.r}
              ry={layer.ry}
              fill="none"
              stroke={layer.color}
              strokeWidth={li === 3 ? 2.5 : 2}
              opacity={0.4}
            />
            {/* Full-ring flash when particles arrive at this layer */}
            <motion.ellipse
              cx={cx}
              cy={cy}
              rx={layer.r}
              ry={layer.ry}
              fill="none"
              stroke={layer.color}
              strokeWidth={li === 3 ? 3 : 2.5}
              style={{ filter: `drop-shadow(0 0 4px ${layer.color})` }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                delay: layer.ratio * TDUR,
                duration: 0.55,
                repeat: Infinity,
                repeatDelay: CYCLE - 0.55,
              }}
            />
            <text
              x={cx + layer.r + 5}
              y={cy - 26 + li * 18}
              fill={layer.color}
              fontSize="9.5"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {layer.label}
            </text>
          </g>
        ))}

        {/* Track guide lines */}
        {dTracks.map((deg, ti) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={`g-${deg}`}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(rad) * maxR}
              y2={cy + Math.sin(rad) * maxRY}
              stroke={dColors[ti]}
              strokeWidth={0.7}
              opacity={0.18}
            />
          );
        })}

        {/* Traveling particle dots — larger + brighter glow */}
        {dTracks.map((deg, ti) => {
          const rad = (deg * Math.PI) / 180;
          const endX = cx + Math.cos(rad) * maxR,
            endY = cy + Math.sin(rad) * maxRY;
          return (
            <motion.circle
              key={`p-${deg}`}
              r={4}
              fill={dColors[ti]}
              style={{ filter: `drop-shadow(0 0 5px ${dColors[ti]})` }}
              animate={{
                cx: [cx, endX],
                cy: [cy, endY],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                delay: ti * 0.22,
                duration: TDUR,
                repeat: Infinity,
                repeatDelay: CYCLE - TDUR,
                ease: "linear",
              }}
            />
          );
        })}

        {/* Layer hit flashes — more dramatic */}
        {dTracks.map((deg, ti) => {
          const rad = (deg * Math.PI) / 180;
          return dLayers.map((layer, li) => {
            const hx = cx + Math.cos(rad) * layer.r,
              hy = cy + Math.sin(rad) * layer.ry;
            return (
              <motion.circle
                key={`h-${ti}-${li}`}
                cx={hx}
                cy={hy}
                r={2}
                fill={layer.color}
                style={{ filter: `drop-shadow(0 0 6px ${layer.color})` }}
                animate={{ r: [2, 5, 2], opacity: [0, 1, 0] }}
                transition={{
                  delay: ti * 0.22 + layer.ratio * TDUR,
                  duration: 0.45,
                  repeat: Infinity,
                  repeatDelay: CYCLE - 0.45,
                }}
              />
            );
          });
        })}

        {/* Beam pipe — outer glow ring + core */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={12}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={1.5}
          animate={{ opacity: [0.08, 0.3, 0.08], r: [11, 13, 11] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={9}
          fill="#09090b"
          stroke="#52525b"
          strokeWidth={1.5}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={4}
          fill="#3b82f6"
          animate={{ opacity: [0.5, 1, 0.5], r: [4, 6, 4] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <text
          x={cx}
          y={cy + 28}
          textAnchor="middle"
          fill="#3b82f680"
          fontSize="7"
          fontFamily="monospace"
        >
          IP · Pb+Pb
        </text>
      </svg>
    </motion.div>
  );
}

function TriggerViz() {
  return (
    <motion.div
      key="trg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full flex gap-3 px-2"
    >
      <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-4 font-mono text-[9px] leading-[1.7] overflow-hidden h-52">
        <div className="text-green-400 mb-2 font-bold">
          // HLT_PIPELINE v2.0
        </div>
        {hltLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className={line.color}
          >
            {line.text}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-20">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px #22c55e",
              "0 0 14px #22c55e",
              "0 0 0px #22c55e",
            ],
          }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-full py-2 bg-green-500/15 border border-green-500 rounded-lg text-green-400 text-[10px] font-bold font-mono text-center"
        >
          PASS
        </motion.div>
        <div className="w-full py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-600 text-[10px] font-mono text-center">
          REJECT
        </div>
        <div className="text-[9px] font-mono text-yellow-400 text-center mt-1">
          96.1%
          <br />
          eff
        </div>
        <div className="text-[8px] font-mono text-zinc-600 text-center">
          ~40M evt/s
        </div>
      </div>
    </motion.div>
  );
}

function AnalysisViz() {
  return (
    <motion.div
      key="ana"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full flex gap-3 px-2"
    >
      <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-3">
        <div className="text-[9px] font-mono text-zinc-400 mb-2">
          v₂&#123;4&#125; vs centrality
        </div>
        <div className="flex items-end gap-0.5 h-20 mb-1">
          {histoBars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h * 100}%` }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: "easeOut" }}
              className="flex-1 rounded-t-sm"
              style={{
                backgroundColor: `hsl(${220 - i * 10},80%,${Math.round(45 + h * 20)}%)`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[7px] text-zinc-600 font-mono">
          <span>0%</span>
          <span>centrality</span>
          <span>80%</span>
        </div>
        <div className="text-[7px] font-mono text-purple-400 mt-1">
          PRL 126, 122301 (2021)
        </div>
      </div>
      <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-3">
        <div className="text-[9px] font-mono text-zinc-400 mb-2">
          ρ(v₂², ⟨pT⟩)
        </div>
        <div className="relative h-20 w-full">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-700" />
          <div className="absolute bottom-0 left-0 top-0 w-px bg-zinc-700" />
          {scatterPoints.map((pt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              className="absolute w-1.5 h-1.5 rounded-full bg-purple-400"
              style={{
                left: `${pt.x}%`,
                bottom: `${pt.y}%`,
                transform: "translate(-50%,50%)",
              }}
            />
          ))}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-[15%] left-[4%] right-[4%] h-px bg-purple-500/50 origin-left"
            style={{ transform: "rotate(-25deg)" }}
          />
        </div>
        <div className="flex justify-between text-[7px] text-zinc-600 font-mono mt-1">
          <span>⟨pT⟩</span>
          <span>→</span>
        </div>
        <div className="text-[7px] font-mono text-purple-400 mt-1">
          PRC 107, 054910 (2023)
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// AI VISUALIZATIONS
// ═══════════════════════════════════════════════════════════════════════════════

function CICDViz() {
  const NW = 44,
    NH = 24,
    NY = 76;
  return (
    <motion.div
      key="ci"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full h-full flex items-center justify-center"
    >
      <svg width="300" height="160" viewBox="0 0 300 160">
        {/* Connection lines */}
        {ciNodes.slice(0, -1).map((node, i) => (
          <line
            key={i}
            x1={node.x + NW / 2}
            y1={NY}
            x2={ciNodes[i + 1].x - NW / 2}
            y2={NY}
            stroke="#3f3f46"
            strokeWidth={1.5}
          />
        ))}
        {/* Traveling packet */}
        <motion.circle
          cy={NY}
          r={4.5}
          fill="white"
          style={{ filter: "drop-shadow(0 0 5px white)" }}
          animate={{ cx: [22, 278], opacity: [0, 1, 1, 1, 0] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "linear",
          }}
        />
        {/* Nodes */}
        {ciNodes.map((node, idx) => (
          <g key={node.label}>
            <motion.rect
              x={node.x - NW / 2}
              y={NY - NH / 2}
              width={NW}
              height={NH}
              rx={5}
              fill={node.color + "22"}
              stroke={node.color}
              strokeWidth={1.5}
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: idx * 0.35,
              }}
            />
            <text
              x={node.x}
              y={NY + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={node.color}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={NY + 21}
              textAnchor="middle"
              fill="#52525b"
              fontSize="7"
              fontFamily="monospace"
            >
              {node.sub}
            </text>
          </g>
        ))}
        {/* Checkmarks above */}
        {ciNodes.slice(0, 4).map((node, i) => (
          <motion.text
            key={`ck-${i}`}
            x={node.x}
            y={NY - 20}
            textAnchor="middle"
            fill={node.color}
            fontSize="9"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.3, duration: 0.3 }}
          >
            ✓
          </motion.text>
        ))}
        {/* Spinning deploy indicator on last node */}
        <motion.circle
          cx={278}
          cy={NY - 22}
          r={5}
          fill="none"
          stroke="#10b981"
          strokeWidth={1.5}
          strokeDasharray="6 4"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "278px " + String(NY - 22) + "px" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
}

function CloudViz() {
  return (
    <motion.div
      key="cloud"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full h-full flex items-center justify-center"
    >
      <svg width="300" height="200" viewBox="0 0 300 200">
        {/* Connection lines */}
        {cloudLines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#3f3f46"
            strokeWidth={1.5}
          />
        ))}
        {/* Animated packets on each connection */}
        {cloudLines.map((l, i) => (
          <motion.circle
            key={`pkt-${i}`}
            r={3.5}
            fill={l.c}
            style={{ filter: `drop-shadow(0 0 4px ${l.c})` }}
            animate={{
              cx: [l.x1, l.x2],
              cy: [l.y1, l.y2],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              repeatDelay: 2.4,
              delay: i * 0.36,
              ease: "linear",
            }}
          />
        ))}
        {/* Load Balancer */}
        <motion.rect
          x={cloudLB.x - cloudLB.w / 2}
          y={cloudLB.y - cloudLB.h / 2}
          width={cloudLB.w}
          height={cloudLB.h}
          rx={5}
          fill={cloudLB.color + "22"}
          stroke={cloudLB.color}
          strokeWidth={1.5}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text
          x={cloudLB.x}
          y={cloudLB.y + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={cloudLB.color}
          fontSize="8"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {cloudLB.label}
        </text>
        {/* Pods */}
        {cloudPods.map((pod) => (
          <g key={pod.label}>
            <motion.rect
              x={pod.x - PW / 2}
              y={pod.y - PH / 2}
              width={PW}
              height={PH}
              rx={4}
              fill={pod.color + "20"}
              stroke={pod.color}
              strokeWidth={1.5}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: cloudPods.indexOf(pod) * 0.4,
              }}
            />
            <text
              x={pod.x}
              y={pod.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={pod.color}
              fontSize="8"
              fontFamily="monospace"
            >
              {pod.label}
            </text>
          </g>
        ))}
        {/* Databases */}
        {cloudDBs.map((db) => (
          <g key={db.label}>
            <motion.rect
              x={db.x - DW / 2}
              y={db.y - DH / 2}
              width={DW}
              height={DH}
              rx={4}
              fill={db.color + "20"}
              stroke={db.color}
              strokeWidth={1.5}
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: cloudDBs.indexOf(db) * 0.5,
              }}
            />
            <text
              x={db.x}
              y={db.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={db.color}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {db.label}
            </text>
          </g>
        ))}
        <text
          x={150}
          y={195}
          textAnchor="middle"
          fill="#52525b"
          fontSize="7"
          fontFamily="monospace"
        >
          Kubernetes · OCI · Auto-scale
        </text>
      </svg>
    </motion.div>
  );
}

function AgenticViz() {
  return (
    <motion.div
      key="agent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full h-full flex items-center justify-center"
    >
      <svg width="300" height="220" viewBox="0 0 300 220">
        {/* Dashed lines from center to MCP tools */}
        {mcpTools.map((tool, i) => (
          <motion.line
            key={i}
            x1={OCX}
            y1={OCY}
            x2={tool.x}
            y2={tool.y}
            stroke="#ec4899"
            strokeWidth={0.8}
            strokeDasharray="3 3"
            animate={{ strokeOpacity: [0.12, 0.38, 0.12] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        {/* Orbit ellipse */}
        <ellipse
          cx={OCX}
          cy={OCY}
          rx={ORX}
          ry={ORY}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={1}
          strokeOpacity={0.2}
          strokeDasharray="4 4"
        />
        {/* MCP tool boxes */}
        {mcpTools.map((tool) => (
          <g key={tool.label}>
            <motion.rect
              x={tool.x - 19}
              y={tool.y - 11}
              width={38}
              height={22}
              rx={4}
              fill="#18181b"
              stroke="#ec4899"
              strokeWidth={1}
              strokeOpacity={0.6}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: mcpTools.indexOf(tool) * 0.4,
              }}
            />
            <text
              x={tool.x}
              y={tool.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ec4899"
              fontSize="7.5"
              fontFamily="monospace"
            >
              {tool.label}
            </text>
          </g>
        ))}
        {/* Orbit nodes */}
        {orbitNodes.map((node) => (
          <g key={node.label}>
            <rect
              x={node.x - 22}
              y={node.y - 12}
              width={44}
              height={24}
              rx={5}
              fill="#18181b"
              stroke={node.color}
              strokeWidth={1.5}
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={node.color}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {node.label}
            </text>
          </g>
        ))}
        {/* Traveling signal dots */}
        <motion.circle
          r={5}
          fill="#3b82f6"
          style={{ filter: "drop-shadow(0 0 7px #3b82f6)" }}
          animate={{ cx: OXS, cy: OYS }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          r={4}
          fill="#f59e0b"
          style={{ filter: "drop-shadow(0 0 6px #f59e0b)" }}
          animate={{ cx: OXS2, cy: OYS2 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {/* Central agent node — outer pulse ring */}
        <motion.circle
          cx={OCX}
          cy={OCY}
          r={20}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={1.5}
          animate={{ r: [20, 28, 20], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        {/* Central agent node — solid */}
        <circle
          cx={OCX}
          cy={OCY}
          r={20}
          fill="#0f172a"
          stroke="#3b82f6"
          strokeWidth={2}
          style={{ filter: "drop-shadow(0 0 10px #3b82f660)" }}
        />
        <text
          x={OCX}
          y={OCY + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="9.5"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Agent
        </text>
      </svg>
    </motion.div>
  );
}

function AppOutputViz() {
  return (
    <motion.div
      key="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="w-full flex gap-3 px-2"
    >
      {/* Chat */}
      <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-3 overflow-hidden h-52">
        <div className="text-[9px] font-mono text-zinc-500 mb-2.5">
          AI ASSISTANT · RAG
        </div>
        <div className="flex flex-col gap-1.5">
          {appChatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === "user" ? 8 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: msg.delay }}
              className={`text-[9px] font-mono rounded px-2 py-1 leading-tight ${
                msg.role === "user"
                  ? "bg-zinc-800 text-zinc-300 self-end ml-auto max-w-[88%]"
                  : "bg-blue-500/15 border border-blue-500/30 text-blue-300 max-w-[92%]"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              delay: 2.8,
              duration: 0.7,
              repeat: Infinity,
              repeatDelay: 1.6,
            }}
            className="text-[9px] font-mono text-zinc-500 ml-1"
          >
            ▋
          </motion.span>
        </div>
      </div>
      {/* Plot */}
      <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-3">
        <div className="text-[9px] font-mono text-zinc-400 mb-2">
          Monthly Revenue · FY2025 ($M)
        </div>
        <div className="flex items-end gap-0.5 h-28 mb-1">
          {appBars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="flex-1 rounded-t-sm"
              style={{
                backgroundColor: `hsl(${145 + i * 4},60%,${Math.round(35 + h * 22)}%)`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[7px] text-zinc-600 font-mono">
          <span>Jan</span>
          <span>FY2025</span>
          <span>Aug</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-2 text-[7px] font-mono text-green-400"
        >
          847 txns analysed · forecast confidence 97%
        </motion.div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHYSICS PANEL
// ═══════════════════════════════════════════════════════════════════════════════

function PhysicsPanel({ stage }: { stage: PhysStage }) {
  return (
    <div className="relative bg-zinc-950 rounded-2xl border border-zinc-800 p-6 overflow-hidden flex flex-col min-h-[500px]">
      <div className="absolute inset-0 bg-blue-500/[0.03] pointer-events-none" />
      <div className="mb-5 z-10 relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Researcher · High Energy Physics · ATLAS · CERN
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
          >
            <h3 className="text-white font-bold text-lg leading-tight">
              {physMeta[stage].title}
            </h3>
            <p
              className={`text-[11px] font-mono mt-1 ${physMeta[stage].color}`}
            >
              {physMeta[stage].sub}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
        <AnimatePresence mode="wait">
          {stage === 0 && <CollisionViz />}
          {stage === 1 && <DetectorViz />}
          {stage === 2 && <TriggerViz />}
          {stage === 3 && <AnalysisViz />}
        </AnimatePresence>
      </div>
      <div className="mt-5 border-t border-zinc-800/60 pt-4 z-10 relative">
        <div className="text-[9px] font-mono text-zinc-600 mb-2 uppercase tracking-wider">
          Analysis Stack
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {[
            "C++ / ROOT",
            "Uproot",
            "Awkward Array",
            "NumPy",
            "Matplotlib",
            "GEANT4",
          ].map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-1.5 mt-4 z-10 relative">
        {([0, 1, 2, 3] as PhysStage[]).map((i) => (
          <motion.div
            key={i}
            animate={{
              width: stage === i ? 24 : 8,
              backgroundColor: stage === i ? "#3b82f6" : "#3f3f46",
            }}
            transition={{ duration: 0.3 }}
            className="h-1 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// AI PANEL
// ═══════════════════════════════════════════════════════════════════════════════

function AIPipelinePanel({ stage }: { stage: AIStage }) {
  return (
    <div className="relative bg-zinc-950 rounded-2xl border border-zinc-800 p-6 overflow-hidden flex flex-col min-h-[500px]">
      <div className="absolute inset-0 bg-emerald-500/[0.025] pointer-events-none" />
      <div className="mb-5 z-10 relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            AI Engineering · AI Pipeline
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
          >
            <h3 className="text-white font-bold text-lg leading-tight">
              {aiMeta[stage].title}
            </h3>
            <p className={`text-[11px] font-mono mt-1 ${aiMeta[stage].color}`}>
              {aiMeta[stage].sub}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
        <AnimatePresence mode="wait">
          {stage === 0 && <CICDViz />}
          {stage === 1 && <CloudViz />}
          {stage === 2 && <AgenticViz />}
          {stage === 3 && <AppOutputViz />}
        </AnimatePresence>
      </div>
      <div className="mt-5 border-t border-zinc-800/60 pt-4 z-10 relative">
        <div className="text-[9px] font-mono text-zinc-600 mb-2 uppercase tracking-wider">
          AI Stack
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-1.5 flex-wrap"
          >
            {aiStackBadges[stage].map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-zinc-400"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-1.5 mt-4 z-10 relative">
        {([0, 1, 2, 3] as AIStage[]).map((i) => (
          <motion.div
            key={i}
            animate={{
              width: stage === i ? 24 : 8,
              backgroundColor: stage === i ? "#10b981" : "#3f3f46",
            }}
            transition={{ duration: 0.3 }}
            className="h-1 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const DualPanelHero: React.FC = () => {
  const [physicsStage, setPhysicsStage] = useState<PhysStage>(0);
  const [aiStage, setAIStage] = useState<AIStage>(0);

  useEffect(() => {
    const t = setInterval(
      () => setPhysicsStage((p) => ((p + 1) % 4) as PhysStage),
      5500,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setAIStage((p) => ((p + 1) % 4) as AIStage),
      5500,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhysicsPanel stage={physicsStage} />
        <AIPipelinePanel stage={aiStage} />
      </div>
    </div>
  );
};

export default DualPanelHero;
