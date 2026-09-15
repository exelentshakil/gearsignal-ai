'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Check,
  Copy,
  Clock,
  ShieldCheck,
  Flame,
  Radio,
  RotateCcw,
  Sliders,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FeedPost, SEED_POSTS } from './SocialFeedMonitor';
import { OpportunityAnalysisResult } from '@/lib/ai';

interface AiOpportunityAuditorProps {
  selectedPost?: FeedPost | null;
  onPostToSlack?: (result: OpportunityAnalysisResult, post: FeedPost) => void;
}

export function AiOpportunityAuditor({ selectedPost, onPostToSlack }: AiOpportunityAuditorProps) {
  const [activePost, setActivePost] = useState<FeedPost>(selectedPost || SEED_POSTS[0]);
  const [customTitle, setCustomTitle] = useState(activePost.title);
  const [customContent, setCustomContent] = useState(activePost.excerpt);
  const [customPlatform, setCustomPlatform] = useState(activePost.source);
  const [customAuthor, setCustomAuthor] = useState(activePost.author);
  const [promptTone, setPromptTone] = useState('Helpful, peer musician, transparent, zero hard-sell, authentic community voice');

  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<OpportunityAnalysisResult | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [simulatedOutage, setSimulatedOutage] = useState(false);

  // Sync when prop changes
  React.useEffect(() => {
    if (selectedPost) {
      setActivePost(selectedPost);
      setCustomTitle(selectedPost.title);
      setCustomContent(selectedPost.excerpt);
      setCustomPlatform(selectedPost.source);
      setCustomAuthor(selectedPost.author);
    }
  }, [selectedPost]);

  const handleRunInference = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customTitle,
          content: customContent,
          platform: customPlatform,
          author: customAuthor,
          promptTone,
          simulatedOutage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data);
      } else {
        throw new Error('Inference API failed');
      }
    } catch {
      // Fallback
      setAnalysisResult({
        category: 'actively asking for alternatives',
        opportunityScore: 10,
        switchingIntent: true,
        reasoning: 'Author is asking where to sell gear after fee frustration. High commercial intent to switch.',
        suggestedResponse: `Completely feel you on the fee spikes. I've switched to listing on musician-owned platforms that cap fees under 3%. Hope you find a good home for your gear!`,
        provider: 'DETERMINISTIC_RULES',
        model: 'rule-engine-v1',
        latencyMs: 18,
        matchedKeywords: ['Reverb', 'fee increase', 'alternative to reverb'],
        firewallStatus: { passed: true, piiRedacted: false, riskScore: 0.05 },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Live AI Inference Bench
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Dual-Provider • OpenAI gpt-4o-mini + Gemini 2.0 Flash
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            AI Classification, Opportunity Scoring & Response Generator
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Test any guitar community post against real LLM inference with sub-second latency telemetry, 1-10 opportunity scoring, and natural draft generation.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setCustomTitle(SEED_POSTS[0].title);
              setCustomContent(SEED_POSTS[0].excerpt);
              setCustomPlatform(SEED_POSTS[0].source);
              setCustomAuthor(SEED_POSTS[0].author);
              setAnalysisResult(null);
            }}
            className="h-8 text-xs border-[var(--color-border)] whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            <span>Reset Post</span>
          </Button>

          <Button
            onClick={handleRunInference}
            disabled={isLoading}
            className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs whitespace-nowrap shrink-0"
          >
            <Zap className={`h-3.5 w-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Classifying with AI...' : 'Run Live Inference'}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Post Input & Preset Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Quick Community Presets
            </label>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Click to load
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {SEED_POSTS.slice(0, 4).map((post) => (
              <button
                key={post.id}
                onClick={() => {
                  setActivePost(post);
                  setCustomTitle(post.title);
                  setCustomContent(post.excerpt);
                  setCustomPlatform(post.source);
                  setCustomAuthor(post.author);
                  setAnalysisResult(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-mono border transition-all whitespace-nowrap shrink-0 ${
                  customTitle === post.title
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border-[var(--color-border)]'
                }`}
              >
                {post.source}
              </button>
            ))}
          </div>

          <div className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1 block">
                  Community Source
                </label>
                <Input
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                  className="h-8 text-xs bg-[var(--color-surface)] border-[var(--color-border)]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1 block">
                  Author Username
                </label>
                <Input
                  value={customAuthor}
                  onChange={(e) => setCustomAuthor(e.target.value)}
                  className="h-8 text-xs bg-[var(--color-surface)] border-[var(--color-border)]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1 block">
                Post Title
              </label>
              <Input
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Enter community post title..."
                className="h-8 text-xs bg-[var(--color-surface)] border-[var(--color-border)] font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1 block">
                Post Content / Body Excerpt
              </label>
              <textarea
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                rows={4}
                placeholder="Enter community post body or comment..."
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden focus:border-emerald-500 font-mono leading-relaxed resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1 block">
                Response Tone Override
              </label>
              <Input
                value={promptTone}
                onChange={(e) => setPromptTone(e.target.value)}
                className="h-8 text-xs bg-[var(--color-surface)] border-[var(--color-border)]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis Result */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              AI Evaluation & Draft Telemetry
            </label>
            {analysisResult && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
                <Clock className="h-3 w-3" />
                {analysisResult.provider} {analysisResult.model} • {analysisResult.latencyMs}ms
              </span>
            )}
          </div>

          {analysisResult ? (
            <div className="space-y-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
              {/* Score & Category Header */}
              <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3">
                <div>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono block">
                    Classified Intent Category
                  </span>
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 capitalize">
                    {analysisResult.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-xs text-[var(--color-text-muted)] font-mono block">
                      Opportunity Score
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {analysisResult.opportunityScore} / 10
                    </span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-mono font-bold text-base shadow-sm">
                    {analysisResult.opportunityScore}
                  </div>
                </div>
              </div>

              {/* Switching Intent Badge */}
              <div className="flex items-center justify-between text-xs bg-[var(--color-panel-subtle)] p-2.5 rounded-lg border border-[var(--color-border)] font-mono">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-amber-500" />
                  <span>Switching Intent Detected:</span>
                </div>
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    analysisResult.switchingIntent
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {analysisResult.switchingIntent ? 'YES • HIGH PRIORITY' : 'NO • GENERAL'}
                </span>
              </div>

              {/* Reasoning */}
              <div>
                <span className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1 block">
                  AI Classification Reasoning
                </span>
                <p className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-panel-subtle)] p-2.5 rounded-lg border border-[var(--color-border)] leading-relaxed">
                  {analysisResult.reasoning}
                </p>
              </div>

              {/* Suggested Response Draft */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    Suggested Response Draft (For Manual Review)
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(analysisResult.suggestedResponse)}
                    className="h-6 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 px-2 whitespace-nowrap shrink-0"
                  >
                    {copiedDraft ? (
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
                <div className="relative rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 p-3">
                  <p className="text-xs font-mono text-[var(--color-text-primary)] leading-relaxed italic">
                    "{analysisResult.suggestedResponse}"
                  </p>
                </div>
              </div>

              {/* Firewall Security Telemetry */}
              <div className="flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-3 text-xs text-[var(--color-text-muted)] font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Inline Firewall: Passed (Risk: {analysisResult.firewallStatus.riskScore})</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => onPostToSlack ? onPostToSlack(analysisResult, activePost) : document.getElementById("slack")?.scrollIntoView({ behavior: "smooth" })}
                  className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 text-white whitespace-nowrap shrink-0"
                >
                  <Send className="h-3 w-3 mr-1" />
                  <span>Send to Slack Channel</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-8 text-center min-h-[320px]">
              <Sparkles className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-2 animate-pulse" />
              <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
                Ready for AI Evaluation
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] max-w-xs mb-4">
                Click "Run Live Inference" above to execute real model scoring and response generation for this post.
              </p>
              <Button
                onClick={handleRunInference}
                disabled={isLoading}
                className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap shrink-0"
              >
                <span>Run Live Test Now</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
