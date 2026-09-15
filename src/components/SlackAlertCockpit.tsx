'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Flame,
  Send,
  Radio,
  Hash,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeedPost, SEED_POSTS } from './SocialFeedMonitor';

interface SlackAlertItem {
  id: string;
  post: FeedPost;
  score: number;
  category: string;
  draftResponse: string;
  status: 'New' | 'Reviewed' | 'Ignored';
  timestamp: string;
}

const INITIAL_SLACK_ALERTS: SlackAlertItem[] = [
  {
    id: 'slack_001',
    post: SEED_POSTS[0],
    score: 10,
    category: 'actively asking for alternatives',
    draftResponse: 'Man, totally feel you on those recent fee hikes. A lot of boutique pedal collectors have been moving to direct musician-to-musician platforms that cap fees under 3%. Check out TalkBass classifieds too for bass gear!',
    status: 'New',
    timestamp: 'Today at 4:12 PM',
  },
  {
    id: 'slack_002',
    post: SEED_POSTS[1],
    score: 10,
    category: 'leaving service / boycott',
    draftResponse: 'Terrible that they froze your payout over documented shipping photos. When platforms side with scammers without human review, it kills vintage gear sales. Have you looked at dedicated marketplace alternatives with real seller escrow?',
    status: 'New',
    timestamp: 'Today at 3:55 PM',
  },
  {
    id: 'slack_003',
    post: SEED_POSTS[2],
    score: 9,
    category: 'actively asking for alternatives',
    draftResponse: 'Gorgeous Sadowsky! 100% with you on cutting out the 10% marketplace tax. Good luck with the sale—musicians keeping the cash in their own pockets is what we need.',
    status: 'Reviewed',
    timestamp: 'Today at 3:10 PM',
  },
];

export function SlackAlertCockpit() {
  const [alerts, setAlerts] = useState<SlackAlertItem[]>(INITIAL_SLACK_ALERTS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyDraft = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpdateStatus = (id: string, newStatus: 'Reviewed' | 'Ignored') => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0">
              <MessageSquare className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Slack Alerts Cockpit
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Core Requirement 5 • Human Review Workflow
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Dedicated Slack Channel Dispatch Simulator (#gear-leads-alerts)
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Zero automated bot spam. High-intent opportunities arrive as structured Block Kit cards with direct links, score badges, and 1-click copyable response drafts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1.5 rounded-lg bg-[var(--color-panel-subtle)] px-2.5 py-1 border border-[var(--color-border)]">
            <Hash className="h-3.5 w-3.5 text-indigo-500" />
            gear-leads-alerts
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            Webhook: 200 OK
          </span>
        </div>
      </div>

      {/* Simulated Slack Channel Window */}
      <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-slate-50 dark:bg-slate-950/60 p-4 sm:p-5">
        {/* Slack Channel Subheader */}
        <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-950 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white font-bold text-xs">
              #
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--color-text-primary)]">
                gear-leads-alerts
              </span>
              <span className="text-xs text-[var(--color-text-muted)] ml-2">
                | Qualified marketplace switching leads & fee complaints
              </span>
            </div>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {alerts.filter((a) => a.status === 'New').length} Pending Review
          </span>
        </div>

        {/* Message Feed */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-xl border p-4 transition-all ${
                alert.status === 'New'
                  ? 'border-indigo-300 dark:border-indigo-800 bg-[var(--color-surface)] shadow-xs'
                  : alert.status === 'Reviewed'
                  ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/10 opacity-80'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/30 opacity-60'
              }`}
            >
              {/* Bot Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs">
                    GS
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--color-text-primary)]">
                        GearSignal Bot
                      </span>
                      <span className="rounded bg-indigo-100 dark:bg-indigo-950 px-1.5 py-0.2 text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300">
                        APP
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] font-mono">
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-mono font-bold whitespace-nowrap shrink-0 ${
                      alert.score >= 9
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}
                  >
                    <Flame className="h-3 w-3 text-amber-500" />
                    Opportunity Score: {alert.score}/10
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-mono font-semibold whitespace-nowrap shrink-0 ${
                      alert.status === 'New'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : alert.status === 'Reviewed'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>
              </div>

              {/* Block Kit Content Card */}
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 space-y-3">
                {/* Alert Title & Source Link */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                      {alert.post.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)] font-mono mt-0.5">
                      Source: {alert.post.source} ({alert.post.platform}) • Author: {alert.post.author}
                    </p>
                  </div>
                  <a
                    href={alert.post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>View Post</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Excerpt */}
                <div className="border-l-2 border-indigo-500 pl-3 py-0.5">
                  <p className="text-xs text-[var(--color-text-secondary)] italic leading-relaxed">
                    "{alert.post.excerpt}"
                  </p>
                </div>

                {/* Matched Keywords Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[var(--color-surface)] p-2.5 rounded-md border border-[var(--color-border)]">
                  <div>
                    <span className="text-[var(--color-text-muted)] block">Matched Keywords:</span>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {alert.post.matchedTriggers.join(' • ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-muted)] block">Classified Intent:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
                      {alert.category}
                    </span>
                  </div>
                </div>

                {/* Suggested Response Draft */}
                <div className="rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      Suggested Peer Response Draft
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyDraft(alert.id, alert.draftResponse)}
                      className="h-6 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/50 px-2 whitespace-nowrap shrink-0"
                    >
                      {copiedId === alert.id ? (
                        <>
                          <Check className="h-3 w-3 mr-1 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          <span>Copy Draft</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs font-mono text-[var(--color-text-primary)] leading-relaxed">
                    "{alert.draftResponse}"
                  </p>
                </div>

                {/* Action Buttons for Operator */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(alert.id, 'Reviewed')}
                      className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap shrink-0"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      <span>Mark Handled</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateStatus(alert.id, 'Ignored')}
                      className="h-7 text-xs border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/50 whitespace-nowrap shrink-0"
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      <span>Dismiss / Ignore</span>
                    </Button>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
                    Click through & paste draft manually
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
