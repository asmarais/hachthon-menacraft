"use client";

import { Shield, Layers, Search } from "lucide-react";
import ScoreMeter from "./ScoreMeter";
import type { AxisResult } from "@/app/types/analysis";
import { getAxisDisplay, humanizeFlag } from "@/app/lib/verdictDisplay";

interface AxisCardProps {
  axis: AxisResult;
}

const AXIS_CONFIG: Record<
  string,
  { icon: typeof Shield; gradient: string }
> = {
  "Content Authenticity": {
    icon: Shield,
    gradient: "from-indigo/20 to-transparent",
  },
  "Contextual Consistency": {
    icon: Layers,
    gradient: "from-amber/20 to-transparent",
  },
  "Source Credibility": {
    icon: Search,
    gradient: "from-emerald/20 to-transparent",
  },
};

function getMeterLabel(axisName: string): string {
  if (axisName === "Contextual Consistency") return "consistency";
  if (axisName === "Source Credibility") return "trust";
  if (axisName === "Content Authenticity") return "authenticity";
  return "score";
}

export default function AxisCard({ axis }: AxisCardProps) {
  const config = AXIS_CONFIG[axis.axis] ?? {
    icon: Shield,
    gradient: "from-indigo/20 to-transparent",
  };
  const Icon = config.icon;

  const display = getAxisDisplay(
    axis.axis,
    axis.verdict ?? "",
    typeof axis.score === "number" ? axis.score : 0,
    axis.flags
  );

  const headlineClass =
    display.tone === "good"
      ? "text-emerald"
      : display.tone === "bad"
        ? "text-red"
        : display.tone === "caution"
          ? "text-amber"
          : "text-amber";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card p-6 transition-all hover:border-indigo/30">
      <div
        className={`absolute inset-0 bg-linear-to-b ${config.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
      />
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-elevated">
            <Icon size={18} className="text-indigo" />
          </div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {axis.axis}
          </h3>
        </div>

        <div className="flex justify-center">
          <ScoreMeter
            score={axis.score}
            color={display.meterColor}
            label={getMeterLabel(axis.axis)}
          />
        </div>

        <p
          className={`mt-3 text-center text-base font-semibold tracking-tight ${headlineClass}`}
        >
          {display.label}
        </p>
        {display.subtitle && (
          <p className="mt-1 text-center text-xs leading-snug text-text-muted">
            {display.subtitle}
          </p>
        )}

        {axis.flags && axis.flags.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-border-subtle pt-4">
            {axis.flags.slice(0, 6).map((flag, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-left text-[11px] leading-snug text-text-secondary"
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    display.tone === "good"
                      ? "bg-emerald"
                      : display.tone === "bad"
                        ? "bg-red"
                        : "bg-amber"
                  }`}
                />
                <span>{humanizeFlag(flag)}</span>
              </li>
            ))}
            {axis.flags.length > 6 && (
              <li className="text-[10px] text-text-muted italic">
                +{axis.flags.length - 6} more signals
              </li>
            )}
          </ul>
        )}
        {axis.explanation && (
          <p className="mt-4 border-t border-border-subtle pt-4 text-[11px] italic leading-relaxed text-text-muted">
            {axis.explanation}
          </p>
        )}
      </div>
    </div>
  );
}
