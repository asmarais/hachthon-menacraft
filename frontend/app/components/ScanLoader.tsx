"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { AnalysisStatus, ContentType } from "@/app/types/analysis";

const CONTENT_HINTS: Record<ContentType, string> = {
  image: "Images are checked for manipulation traces and context.",
  video: "Video can take longer while audio and frames are processed.",
  document: "Documents are parsed and cross-checked for consistency.",
  url: "We fetch the page and analyze text and linked media.",
};

interface ScanLoaderProps {
  message?: string;
  status?: AnalysisStatus;
  contentType?: ContentType;
}

export default function ScanLoader({
  message,
  status = "analyzing",
  contentType = "image",
}: ScanLoaderProps) {
  const displayMessage =
    message?.trim() || "Working on your analysis…";
  const phaseLabel =
    status === "uploading" ? "Preparing" : "Analyzing";
  const hint = CONTENT_HINTS[contentType] ?? CONTENT_HINTS.image;

  return (
    <div
      className="relative mx-auto w-full max-w-lg px-1"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="pointer-events-none absolute -inset-8 top-1/2 left-1/2 h-[420px] w-[min(100vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/[0.07] blur-[100px]" />

      <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-bg-card/90 p-8 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.22), transparent 55%)",
          }}
        />

        <div className="relative flex flex-col items-center gap-8">
          <div className="flex w-full items-center justify-between gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                status === "uploading"
                  ? "bg-amber/15 text-amber"
                  : "bg-indigo/15 text-indigo"
              }`}
            >
              {phaseLabel}
            </span>
            <span className="font-mono text-[11px] text-text-muted">
              Please keep this tab open
            </span>
          </div>

          {/* Animated ring + core */}
          <div className="relative flex h-36 w-36 items-center justify-center">
            <svg
              className="absolute h-full w-full"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border-subtle"
              />
              <g
                className="animate-loader-orbit"
                style={{ transformOrigin: "50px 50px" }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="url(#scanLoaderGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="184 292"
                  transform="rotate(-90 50 50)"
                />
              </g>
              <defs>
                <linearGradient
                  id="scanLoaderGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="loader-core h-16 w-16 rounded-2xl border border-indigo/25 bg-bg-elevated/90 shadow-[0_0_40px_-8px_rgba(99,102,241,0.5)]" />
            </div>
            <div className="absolute inset-0 animate-loader-ping opacity-30" />
          </div>

          {/* Indeterminate progress bar */}
          <div className="w-full space-y-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
              <div className="loader-progress-indeterminate h-full rounded-full bg-linear-to-r from-indigo-dim via-indigo to-emerald" />
            </div>
            <p className="text-center font-mono text-[11px] text-text-muted">
              Multi-axis forensic run in progress — timing depends on file size
            </p>
          </div>

          {/* Status text */}
          <div className="min-h-[3.25rem] w-full text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={displayMessage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-base font-medium leading-snug text-text-primary md:text-lg"
              >
                {displayMessage}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="max-w-sm text-center text-sm leading-relaxed text-text-secondary">
            {hint}
          </p>
        </div>
      </div>
    </div>
  );
}
