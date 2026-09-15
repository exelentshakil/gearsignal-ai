'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Sliders,
  Radio,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewerTourProps {
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
}

export function ReviewerTour({ onNavigate, onOpenChaosModal }: ReviewerTourProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const evaluationPaths = [
    {
      id: 'config',
      badge: 'Step 1 • No-Code Base',
      title: 'Central Keyword Management',
      desc: 'Add or edit brands, competitors (Reverb, eBay), complaint triggers, and intent phrases without touching Make/n8n workflows.',
      actionLabel: 'Open Config Base',
      icon: Sliders,
    },
    {
      id: 'feeds',
      badge: 'Step 2 • Seed Sources',
      title: 'Multi-Community Feeds',
      desc: 'Real-time ingestion across r/Guitar, r/Bass, r/GuitarPedals, TheGearPage, and TalkBass classifieds with zero paid scrapers.',
      actionLabel: 'Inspect Feeds',
      icon: Radio,
    },
    {
      id: 'ai-auditor',
      badge: 'Step 3 • Real AI Engine',
      title: 'AI Opportunity Scoring',
      desc: 'Test real LLM inference (OpenAI gpt-4o-mini & Gemini 2.0 Flash) classifying complaints, scoring switching intent (1-10), and drafting replies.',
      actionLabel: 'Test Live AI',
      icon: Sparkles,
    },
    {
      id: 'slack',
      badge: 'Step 4 • Human-in-the-Loop',
      title: 'Slack Review Queue',
      desc: 'Interactive Block Kit alert cards with direct source links, author info, score badges, and 1-click copyable response drafts.',
      actionLabel: 'Review Slack Alerts',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs transition-all">
      {/* Top Banner Header with Problem-Solution Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Executive Evaluation Briefing
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Pine Beach Custom Marketplace Intel
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
            How to Evaluate This Social-Listening & Lead Discovery MVP
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-4xl">
            A practical, modular system that monitors guitar communities for marketplace fee dissatisfaction and switching intent, runs low-cost AI classification, and delivers qualified leads to Slack for manual review.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 text-xs border-[var(--color-border)] whitespace-nowrap shrink-0"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                Expand Briefing
              </>
            ) : (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-1" />
                Collapse Briefing
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Collapsible Evaluation Paths */}
      {!isCollapsed && (
        <div className="mt-4 space-y-4">
          {/* 4 Interactive Evaluation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {evaluationPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 transition-all hover:border-emerald-500/40 hover:bg-[var(--color-surface)] hover:shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
                        {path.badge}
                      </span>
                      <Icon className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                      {path.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {path.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)]">
                    <button
                      onClick={() => onNavigate(path.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{path.actionLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3-Layer Defense Summary Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-xs text-emerald-950 dark:text-emerald-200">
                <strong className="font-semibold text-emerald-900 dark:text-emerald-100">
                  3-Layer Low-Cost Architecture:
                </strong>{' '}
                1. Deterministic regex pre-filter ($0 cost) ➔ 2. Dual LLM classification ($0.0001/post) ➔ 3. Human Slack review gate (zero bot spam).
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChaosModal}
              className="h-7 text-xs border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300 whitespace-nowrap shrink-0"
            >
              <Zap className="h-3 w-3 mr-1 text-amber-600 dark:text-amber-400" />
              <span>Test Failover</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
