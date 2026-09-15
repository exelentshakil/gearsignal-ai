'use client';

import React, { useState } from 'react';
import {
  Radio,
  Filter,
  Sliders,
  Sparkles,
  MessageSquare,
  Database,
  Play,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface PipelineNode {
  id: string;
  step: string;
  name: string;
  category: string;
  status: 'ARMED' | 'RUNNING' | 'VERIFIED' | 'IDLE';
  latency: string;
  cost: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  details: {
    technology: string;
    trigger: string;
    payloadSample: string;
    failureMode: string;
  };
}

export function WorkflowCanvas() {
  const [selectedNode, setSelectedNode] = useState<PipelineNode | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  const nodes: PipelineNode[] = [
    {
      id: 'node-ingest',
      step: '01',
      name: 'Source Ingestion',
      category: 'Multi-Platform Poller',
      status: 'ARMED',
      latency: '210ms',
      cost: '$0.00',
      icon: Radio,
      description: 'Continuous polling of r/Guitar, r/Bass, r/GuitarPedals JSON and TheGearPage & TalkBass XenForo RSS feeds.',
      details: {
        technology: 'Public JSON Endpoints + XenForo RSS with ETag/Last-Modified caching',
        trigger: 'Cron schedule (every 15 min) or webhook listener',
        payloadSample: '{\n  "source": "Reddit",\n  "community": "r/GuitarPedals",\n  "post_id": "t3_1p9x8q",\n  "title": "Reverb seller fees are out of control—alternatives?"\n}',
        failureMode: '429 Rate Limit handled via exponential backoff (2s, 4s, 8s); fallback to cached XML.',
      },
    },
    {
      id: 'node-dedup',
      step: '02',
      name: 'Deduplication Gate',
      category: 'SHA-256 Hash Cache',
      status: 'ARMED',
      latency: '15ms',
      cost: '$0.00',
      icon: Filter,
      description: 'Calculates cryptographic hash of platform:post_id and verifies against 30-day lightweight cache base.',
      details: {
        technology: 'Crypto SHA-256 in-memory Set + Airtable / Google Sheets index',
        trigger: 'Immediate post-ingestion payload pipeline',
        payloadSample: '{\n  "hash": "8f3b...e4a1",\n  "is_duplicate": false,\n  "cache_action": "ALLOW_PASS"\n}',
        failureMode: 'If cache base times out, in-memory LRU cache serves as instant failsafe.',
      },
    },
    {
      id: 'node-filter',
      step: '03',
      name: 'Keyword Pre-Filter',
      category: 'Deterministic Pre-Gate',
      status: 'ARMED',
      latency: '8ms',
      cost: '$0.00',
      icon: Sliders,
      description: 'Filters incoming stream against Central Configuration table brands, complaints, and intent phrases.',
      details: {
        technology: 'High-speed Regex Trie matching against Airtable Config Base',
        trigger: 'Post passing deduplication gate',
        payloadSample: '{\n  "matched_brands": ["Reverb"],\n  "matched_complaints": ["seller fees", "out of control"],\n  "matched_intent": ["alternatives"],\n  "pass_to_llm": true\n}',
        failureMode: 'Discards 85%+ irrelevant chatter (photos, tone demos) without burning LLM tokens.',
      },
    },
    {
      id: 'node-ai',
      step: '04',
      name: 'Dual-AI Scoring',
      category: 'LLM Classification',
      status: 'ARMED',
      latency: '380ms',
      cost: '$0.0001',
      icon: Sparkles,
      description: 'Zero-shot classification into 9 categories, 1-10 Opportunity Score calculation, and natural musician draft response.',
      details: {
        technology: 'OpenAI gpt-4o-mini (Primary) with automated failover to Google Gemini 2.0 Flash',
        trigger: 'Filtered candidate post with matched intent keywords',
        payloadSample: '{\n  "category": "fee/payout/policy complaints",\n  "opportunity_score": 9,\n  "switching_intent": true,\n  "draft_response": "Totally agree on the fees. Check out..."\n}',
        failureMode: 'If OpenAI returns 429/503, Gemini 2.0 Flash handles payload in <450ms automatically.',
      },
    },
    {
      id: 'node-slack',
      step: '05',
      name: 'Slack Human Gate',
      category: 'Block Kit Alert',
      status: 'ARMED',
      latency: '180ms',
      cost: '$0.00',
      icon: MessageSquare,
      description: 'Sends rich Slack card with direct link, score badge, excerpt, and 1-click copyable response draft for manual posting.',
      details: {
        technology: 'Slack Webhooks API with Block Kit rich interactive components',
        trigger: 'Opportunity score >= threshold (default 7+)',
        payloadSample: '{\n  "channel": "#gear-leads-alerts",\n  "blocks": [\n    { "type": "header", "text": "🚨 Opportunity Score: 9/10" },\n    { "type": "section", "text": "Author: u/fuzz_pedal_fan" }\n  ]\n}',
        failureMode: 'Slack rate limit retries via Inngest step function; alert preserved in Data Store.',
      },
    },
    {
      id: 'node-store',
      step: '06',
      name: 'Data Store Sync',
      category: 'Sheets / Airtable Log',
      status: 'ARMED',
      latency: '240ms',
      cost: '$0.00',
      icon: Database,
      description: 'Appends qualified thread record with timestamp, AI score, draft, and status for historical analytics.',
      details: {
        technology: 'Google Sheets API v4 / Airtable Base REST API',
        trigger: 'Post-Slack dispatch pipeline terminal step',
        payloadSample: '{\n  "row_id": "REC_984",\n  "platform": "Reddit",\n  "author": "u/fuzz_pedal_fan",\n  "status": "New",\n  "ai_score": 9\n}',
        failureMode: 'Buffered locally if spreadsheet API is rate-limited, flushes on next polling cycle.',
      },
    },
  ];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);

    const stepInterval = 650;
    nodes.forEach((_, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx);
        if (idx === nodes.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setActiveStepIndex(null);
          }, stepInterval + 200);
        }
      }, idx * stepInterval);
    });
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Living Pipeline Architecture
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Make.com / n8n Event Flow
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            End-to-End Modular Orchestration DAG
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Ingestion ➔ Deduplication ➔ Regex Pre-Filter ➔ Dual LLM Scoring ➔ Slack Review Gate ➔ Data Store
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs whitespace-nowrap shrink-0"
          >
            <Play className={`h-3.5 w-3.5 mr-1.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulating Pipeline...' : 'Simulate Live Flow'}</span>
          </Button>
        </div>
      </div>

      {/* Interactive Workflow Node Chain */}
      <div className="relative overflow-x-auto pb-4 pt-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-[920px]">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isStepActive = activeStepIndex === index;
            const isStepPassed = activeStepIndex !== null && activeStepIndex > index;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`group relative flex-1 min-w-[140px] cursor-pointer rounded-xl border p-3 transition-all hover:shadow-md ${
                    isStepActive
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30 scale-[1.02]'
                      : isStepPassed
                      ? 'border-emerald-300 dark:border-emerald-800 bg-[var(--color-surface)]'
                      : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-emerald-500/40 hover:bg-[var(--color-surface)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-mono font-bold text-[var(--color-text-muted)]">
                      {node.step}
                    </span>
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded font-mono font-medium whitespace-nowrap shrink-0 ${
                        isStepActive
                          ? 'bg-emerald-600 text-white'
                          : isStepPassed
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                          : 'bg-[var(--color-canvas)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                      }`}
                    >
                      {isStepActive ? 'RUNNING' : isStepPassed ? 'DONE' : node.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                        isStepActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[var(--color-canvas)] text-[var(--color-text-secondary)] group-hover:text-emerald-600 border border-[var(--color-border)]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                      {node.name}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)] truncate mb-2">
                    {node.category}
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] border-t border-[var(--color-border-subtle)] pt-1.5">
                    <span>{node.latency}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {node.cost}
                    </span>
                  </div>
                </div>

                {/* Connector Wire with Pulse Packet */}
                {index < nodes.length - 1 && (
                  <div className="relative flex items-center justify-center w-6 shrink-0">
                    <div className="h-0.5 w-full bg-[var(--color-border)]" />
                    {isStepActive && (
                      <div className="absolute h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500 animate-ping" />
                    )}
                    <div className="absolute h-1.5 w-1.5 rounded-full bg-[var(--color-border)]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-3 font-mono">
        <div className="flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-emerald-600" />
          <span>Click any node to inspect operational parameters, payload schemas, and error boundaries.</span>
        </div>
        <span className="hidden sm:inline">100% Client-Owned Account Deployment</span>
      </div>

      {/* Node Detail Slide-Out Parameter Sheet */}
      <Sheet open={!!selectedNode} onOpenChange={(open) => !open && setSelectedNode(null)}>
        <SheetContent className="w-full sm:max-w-md bg-[var(--color-surface)] border-l border-[var(--color-border)] overflow-y-auto">
          {selectedNode && (
            <div className="space-y-5 pt-2">
              <SheetHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Step {selectedNode.step}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">
                    {selectedNode.category}
                  </span>
                </div>
                <SheetTitle className="text-lg font-bold text-[var(--color-text-primary)]">
                  {selectedNode.name}
                </SheetTitle>
                <SheetDescription className="text-xs text-[var(--color-text-secondary)]">
                  {selectedNode.description}
                </SheetDescription>
              </SheetHeader>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 font-mono text-xs">
                <div>
                  <span className="text-[var(--color-text-muted)] block">Execution Latency</span>
                  <span className="font-bold text-[var(--color-text-primary)] text-sm">
                    {selectedNode.latency}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)] block">Cost / Run</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {selectedNode.cost}
                  </span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                    Underlying Technology
                  </h4>
                  <p className="text-[var(--color-text-secondary)] font-mono bg-[var(--color-panel-subtle)] p-2 rounded-lg border border-[var(--color-border)]">
                    {selectedNode.details.technology}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                    Execution Trigger
                  </h4>
                  <p className="text-[var(--color-text-secondary)] font-mono bg-[var(--color-panel-subtle)] p-2 rounded-lg border border-[var(--color-border)]">
                    {selectedNode.details.trigger}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                    Sample JSON Payload
                  </h4>
                  <pre className="rounded-lg border border-[var(--color-border)] bg-[var(--color-canvas)] p-2.5 font-mono text-xs text-[var(--color-text-secondary)] overflow-x-auto">
                    {selectedNode.details.payloadSample}
                  </pre>
                </div>

                <div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 p-3">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-900 dark:text-amber-200 mb-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    <span>Failure Mode & Circuit Breaker</span>
                  </div>
                  <p className="text-amber-900/80 dark:text-amber-300/80 text-xs">
                    {selectedNode.details.failureMode}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--color-border)]">
                <Button
                  onClick={() => setSelectedNode(null)}
                  className="w-full text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Close Inspection
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
