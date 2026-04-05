"use client";

import { ShieldAlert, ShieldQuestion, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface VerdictBannerProps {
  verdict: "fake" | "uncertain" | "real";
  score: number;
  explanation: string;
  claim?: string;
}

const VERDICT_CONFIG = {
  fake: {
    bg: "bg-red/10",
    border: "border-red/30",
    color: "text-red",
    icon: ShieldAlert,
    /** Deliberately plain language */
    label: "Not authentic",
    sublabel: "Content appears manipulated, synthetic, or misleading",
    glow: "shadow-red/10",
  },
  uncertain: {
    bg: "bg-amber/10",
    border: "border-amber/30",
    color: "text-amber",
    icon: ShieldQuestion,
    label: "Uncertain",
    sublabel: "Signals are mixed or inconclusive — verify elsewhere",
    glow: "shadow-amber/10",
  },
  real: {
    bg: "bg-emerald/10",
    border: "border-emerald/30",
    color: "text-emerald",
    icon: ShieldCheck,
    label: "Authentic",
    sublabel: "Content appears consistent with genuine media",
    glow: "shadow-emerald/10",
  },
};

export default function VerdictBanner({
  verdict,
  score,
  explanation,
  claim,
}: VerdictBannerProps) {
  const config = VERDICT_CONFIG[verdict];
  const Icon = config.icon;

  const confidencePercent = Math.round(
    verdict === "real"
      ? (1 - score) * 100
      : verdict === "fake"
        ? score * 100
        : (score > 0.5 ? score : 1 - score) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border ${config.border} ${config.bg} p-6 shadow-lg ${config.glow} md:p-8`}
    >
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
            verdict === "real"
              ? "bg-emerald/15"
              : verdict === "fake"
                ? "bg-red/15"
                : "bg-amber/15"
          }`}
        >
          <Icon size={32} className={config.color} />
        </div>
        <div className="flex-1">
          {claim && (
            <div className="mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted opacity-70">
                Analyzed claim
              </span>
              <p className="mt-0.5 text-base font-semibold italic text-text-primary">
                &ldquo;{claim}&rdquo;
              </p>
            </div>
          )}
          <div className="flex flex-col gap-1 md:gap-0">
            <div className="flex flex-col items-center gap-1 md:flex-row md:items-baseline md:gap-3">
              <span
                className={`text-2xl font-bold tracking-tight ${config.color}`}
              >
                {config.label}
              </span>
              <span className={`text-sm font-medium ${config.color} opacity-90`}>
                · {confidencePercent}% confidence
              </span>
            </div>
            <p className={`mt-1 text-sm ${config.color} opacity-80`}>
              {config.sublabel}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {explanation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
