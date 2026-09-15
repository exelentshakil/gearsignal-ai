'use client';

import React from 'react';
import {
  Radio,
  Target,
  Clock,
  Filter,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export function BentoGrid() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1: Feed Ingestion Uptime & Sparkline */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Feed Ingestion Health
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Radio className="h-3 w-3 animate-pulse" />
              <span>99.98% Live</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              6 Channels
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              r/Guitar • Forums • YT
            </span>
          </div>

          {/* Inline SVG Sparkline */}
          <div className="mt-3 h-10 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 200 40">
              <defs>
                <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,32 Q 25,28 50,30 T 100,20 T 150,15 T 200,10 L 200,40 L 0,40 Z"
                fill="url(#emeraldGrad)"
              />
              <path
                d="M 0,32 Q 25,28 50,30 T 100,20 T 150,15 T 200,10"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">
            Zero-cost public RSS & JSON endpoints polling every 15m
          </p>
        </div>

        {/* Card 2: Opportunity Qualification Precision */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Lead Qualification
            </span>
            <div className="flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 whitespace-nowrap shrink-0">
              <Target className="h-3 w-3" />
              <span>94.2% Signal</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              Score 7–10
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              High-Intent Threshold
            </span>
          </div>

          {/* Segmented Pipeline Bar */}
          <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
            <div className="w-[62%] bg-emerald-500" title="Switching Intent (62%)" />
            <div className="w-[24%] bg-amber-500" title="Fee Complaints (24%)" />
            <div className="w-[14%] bg-blue-500" title="Support Disputes (14%)" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>Switching: 62%</span>
            <span>Fees: 24%</span>
            <span>Support: 14%</span>
          </div>
        </div>

        {/* Card 3: Dual LLM Latency Telemetry */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Dual-AI Latency
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Clock className="h-3 w-3" />
              <span>Sub-Second</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              412 ms
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              gpt-4o-mini avg
            </span>
          </div>

          {/* Comparative Model Bar */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-secondary)] font-mono">OpenAI gpt-4o-mini</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">380ms</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-[38%] bg-emerald-500 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[var(--color-text-secondary)] font-mono">Gemini 2.0 Flash (Backup)</span>
              <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">445ms</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-[44%] bg-blue-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 4: Deduplication Efficiency */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Duplicate Prevention
            </span>
            <div className="flex items-center gap-1 rounded-full bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 whitespace-nowrap shrink-0">
              <Filter className="h-3 w-3" />
              <span>Zero Repeats</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              100% Filtered
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              SHA-256 Hashes
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-mono">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>30-Day TTL memory base blocks duplicate thread alerts</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Google Sheets & Airtable keyed by platform:post_id
          </p>
        </div>

        {/* Card 5: Operational Token Burn */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Monthly LLM Burn
            </span>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 whitespace-nowrap shrink-0">
              <Flame className="h-3 w-3" />
              <span>Sub-Penny</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              $0.48 / mo
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              ~3,500 posts
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-mono">
            <span>Regex pre-filter drops:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">86.4% noise</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
            <div className="h-full w-[13.6%] bg-amber-500 rounded-full" />
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Only keyword-matched candidates trigger LLM tokens
          </p>
        </div>

        {/* Card 6: Human Review Velocity */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Human Review SLA
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Clock className="h-3 w-3" />
              <span>Slack Cards</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              4.2 min
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Click-to-Respond
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-mono">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>1-Click copy draft response ready for Reddit / Forum</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Zero bot spam • 100% human-authorized engagement
          </p>
        </div>
      </div>
    </div>
  );
}
