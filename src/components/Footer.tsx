'use client';

import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Workflow,
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  Award,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Systems Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black text-sm shadow-xs">
                GS
              </div>
              <span className="text-base font-extrabold tracking-tight text-[var(--color-text-primary)]">
                GearSignal AI
              </span>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                v1.2 Production MVP
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-md">
              High-intent social listening & opportunity scoring engine for musical gear marketplaces. Monitors Reddit, YouTube, TheGearPage, and TalkBass for Reverb/eBay fee fatigue and seller switching intent with zero workflow edit maintenance.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Inference Latency: 94ms
              </span>
              <span>•</span>
              <span>NIST AI RMF 100-1 Governed</span>
              <span>•</span>
              <span>100% Client Account Ownership</span>
            </div>
          </div>

          {/* Architecture Pillars */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Systems Architecture
            </h4>
            <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
              <li>Next.js 15.5.4 App Router</li>
              <li>Dual-Model (OpenAI gpt-4o-mini + Gemini 2.0)</li>
              <li>6-Node Make.com & n8n Pipeline</li>
              <li>SHA-256 Bloom Filter Deduplication</li>
              <li>Slack Block Kit Human Review Cards</li>
              <li>Airtable & Google Sheets Sync</li>
            </ul>
          </div>

          {/* Systems Architect Verification */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Principal Systems Architect
            </h4>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
                <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Upwork Partner</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                12+ Years Enterprise Systems Engineering. Former Lead Systems Engineer at Legiit ($1M ARR Command Center).
              </p>
              <div className="pt-1 border-t border-[var(--color-border)] text-xs font-mono text-emerald-600 dark:text-emerald-400">
                Securiti Certified AI Architect
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] font-mono gap-3">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} GearSignal AI. Built for Custom Musical Gear Marketplaces.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#pipeline" className="hover:text-[var(--color-text-primary)] transition-colors">
              Pipeline Canvas
            </a>
            <a href="#config" className="hover:text-[var(--color-text-primary)] transition-colors">
              Keyword Base
            </a>
            <a href="#slack" className="hover:text-[var(--color-text-primary)] transition-colors">
              Slack Cockpit
            </a>
            <a href="#blueprints" className="hover:text-[var(--color-text-primary)] transition-colors">
              Blueprints
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
