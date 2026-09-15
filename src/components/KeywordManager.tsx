'use client';

import React, { useState } from 'react';
import {
  Sliders,
  Plus,
  X,
  Radio,
  Sparkles,
  Save,
  Check,
  RotateCcw,
  SlidersHorizontal,
  Layers,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MonitoringSource {
  id: string;
  name: string;
  platform: string;
  type: string;
  enabled: boolean;
}

export function KeywordManager() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Brands / Competitors
  const [competitors, setCompetitors] = useState<string[]>([
    'Reverb',
    'eBay',
    'Sweetwater Gear Exchange',
    'Guitar Center Used',
    'Craigslist / FB Marketplace',
  ]);
  const [newCompetitor, setNewCompetitor] = useState('');

  // Complaint / Dissatisfaction Keywords
  const [complaintKeywords, setComplaintKeywords] = useState<string[]>([
    'seller fee',
    'payout delay',
    'unfair return',
    'support won\'t respond',
    'buyer scam',
    'fee increase',
    'account closed',
    'robbed on shipping',
  ]);
  const [newComplaint, setNewComplaint] = useState('');

  // High-Intent Switching Phrases
  const [highIntentPhrases, setHighIntentPhrases] = useState<string[]>([
    'alternative to reverb',
    'where to sell guitar',
    'leaving reverb',
    'switching from ebay',
    'better marketplace for pedals',
    'reverb alternative 2026',
    'done with reverb',
  ]);
  const [newHighIntent, setNewHighIntent] = useState('');

  // Thresholds & Prompt Configuration
  const [minScore, setMinScore] = useState<number>(7);
  const [promptTone, setPromptTone] = useState<string>(
    'Helpful, peer musician, transparent, zero hard-sell, authentic community voice'
  );

  // Sources
  const [sources, setSources] = useState<MonitoringSource[]>([
    { id: 'reddit_guitar', name: 'r/Guitar', platform: 'Reddit', type: 'JSON RSS', enabled: true },
    { id: 'reddit_bass', name: 'r/Bass', platform: 'Reddit', type: 'JSON RSS', enabled: true },
    { id: 'reddit_pedals', name: 'r/GuitarPedals', platform: 'Reddit', type: 'JSON RSS', enabled: true },
    { id: 'thegearpage', name: 'TheGearPage Board', platform: 'Forum', type: 'XenForo RSS', enabled: true },
    { id: 'talkbass', name: 'TalkBass Classifieds', platform: 'Forum', type: 'XenForo RSS', enabled: true },
    { id: 'youtube', name: 'YouTube Gear Discussions', platform: 'YouTube', type: 'Data API v3', enabled: true },
    { id: 'twitter_x', name: 'X/Twitter Gear Filter', platform: 'Twitter/X', type: 'Filtered Stream', enabled: false },
  ]);

  const addCompetitor = () => {
    if (newCompetitor.trim() && !competitors.includes(newCompetitor.trim())) {
      setCompetitors([...competitors, newCompetitor.trim()]);
      setNewCompetitor('');
    }
  };

  const removeCompetitor = (comp: string) => {
    setCompetitors(competitors.filter((c) => c !== comp));
  };

  const addComplaint = () => {
    if (newComplaint.trim() && !complaintKeywords.includes(newComplaint.trim())) {
      setComplaintKeywords([...complaintKeywords, newComplaint.trim()]);
      setNewComplaint('');
    }
  };

  const removeComplaint = (kw: string) => {
    setComplaintKeywords(complaintKeywords.filter((k) => k !== kw));
  };

  const addHighIntent = () => {
    if (newHighIntent.trim() && !highIntentPhrases.includes(newHighIntent.trim())) {
      setHighIntentPhrases([...highIntentPhrases, newHighIntent.trim()]);
      setNewHighIntent('');
    }
  };

  const removeHighIntent = (phrase: string) => {
    setHighIntentPhrases(highIntentPhrases.filter((p) => p !== phrase));
  };

  const toggleSource = (sourceId: string) => {
    setSources(
      sources.map((s) => (s.id === sourceId ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetDefaults = () => {
    setCompetitors(['Reverb', 'eBay', 'Sweetwater Gear Exchange', 'Guitar Center Used']);
    setMinScore(7);
    setPromptTone('Helpful, peer musician, transparent, zero hard-sell, authentic community voice');
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Sliders className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Centralized Config Base
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Requirement 1 & 7 • Zero Workflow Edits
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Marketplace, Keyword & Prompt Control Plane
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            All ingestion nodes and AI scoring modules pull directly from this central table. Changes take effect on the next polling cycle without editing Make/n8n.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDefaults}
            className="h-8 text-xs border-[var(--color-border)] whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            <span>Reset</span>
          </Button>

          <Button
            onClick={handleSave}
            className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs whitespace-nowrap shrink-0"
          >
            {savedSuccess ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1 text-white" />
                <span>Saved to Base</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5 mr-1" />
                <span>Save Config</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Monitored Competitors & Communities */}
        <div className="space-y-5">
          {/* Competitors Card */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                Competitors & Marketplaces
              </h4>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                {competitors.length} Active
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-3">
              Platforms where fee dissatisfaction or seller churn should be intercepted.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {competitors.map((comp) => (
                <span
                  key={comp}
                  className="inline-flex items-center gap-1 rounded-md bg-[var(--color-surface)] px-2.5 py-1 text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-2xs whitespace-nowrap shrink-0"
                >
                  <span>{comp}</span>
                  <button
                    onClick={() => removeCompetitor(comp)}
                    className="text-[var(--color-text-muted)] hover:text-red-600 transition-colors ml-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add marketplace (e.g. VintageGuitar)..."
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCompetitor()}
                className="h-8 text-xs bg-[var(--color-surface)] border-[var(--color-border)]"
              />
              <Button
                onClick={addCompetitor}
                size="sm"
                variant="outline"
                className="h-8 text-xs whitespace-nowrap shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Monitoring Sources Card */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                Active Ingestion Channels
              </h4>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                {sources.filter((s) => s.enabled).length}/{sources.length} Enabled
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-3">
              Toggle specific subreddits, forums, or APIs without code changes.
            </p>

            <div className="space-y-2">
              {sources.map((src) => (
                <div
                  key={src.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Radio className={`h-3.5 w-3.5 shrink-0 ${src.enabled ? 'text-emerald-600' : 'text-[var(--color-text-muted)]'}`} />
                    <span className="font-semibold text-[var(--color-text-primary)] truncate">
                      {src.name}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
                      ({src.type})
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSource(src.id)}
                    className={`px-2 py-0.5 rounded text-xs font-semibold font-mono transition-colors whitespace-nowrap shrink-0 ${
                      src.enabled
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-[var(--color-canvas)] text-[var(--color-text-muted)]'
                    }`}
                  >
                    {src.enabled ? 'ACTIVE' : 'PAUSED'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Dissatisfaction & High-Intent Triggers */}
        <div className="space-y-5">
          {/* High Intent Card */}
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-950/10 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                High-Intent Switching Triggers (Score 9–10)
              </h4>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-3">
              Phrases signaling immediate switching intent, asking for alternatives, or boycotts.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {highIntentPhrases.map((phrase) => (
                <span
                  key={phrase}
                  className="inline-flex items-center gap-1 rounded-md bg-[var(--color-surface)] px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs whitespace-nowrap shrink-0"
                >
                  <span>{phrase}</span>
                  <button
                    onClick={() => removeHighIntent(phrase)}
                    className="text-[var(--color-text-muted)] hover:text-red-600 transition-colors ml-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add intent phrase (e.g. boycotting reverb)..."
                value={newHighIntent}
                onChange={(e) => setNewHighIntent(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addHighIntent()}
                className="h-8 text-xs bg-[var(--color-surface)] border-[var(--color-border)]"
              />
              <Button
                onClick={addHighIntent}
                size="sm"
                variant="outline"
                className="h-8 text-xs whitespace-nowrap shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Dissatisfaction Keywords Card */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                Complaint / Dissatisfaction Keywords
              </h4>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                {complaintKeywords.length} Triggers
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-3">
              Keywords that indicate pain points (fees, payout delays, scam disputes).
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {complaintKeywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 rounded-md bg-[var(--color-surface)] px-2.5 py-1 text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-2xs whitespace-nowrap shrink-0"
                >
                  <span>{kw}</span>
                  <button
                    onClick={() => removeComplaint(kw)}
                    className="text-[var(--color-text-muted)] hover:text-red-600 transition-colors ml-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add complaint keyword (e.g. 1099 tax hold)..."
                value={newComplaint}
                onChange={(e) => setNewComplaint(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addComplaint()}
                className="h-8 text-xs bg-[var(--color-surface)] border-[var(--color-border)]"
              />
              <Button
                onClick={addComplaint}
                size="sm"
                variant="outline"
                className="h-8 text-xs whitespace-nowrap shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Column 3: Thresholds, Tone & Prompt Customization */}
        <div className="space-y-5">
          {/* Threshold & Tone Card */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
              Minimum Slack Alert Threshold
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] mb-4">
              Posts scoring below this threshold are logged to the database but will NOT ping Slack.
            </p>

            <div className="space-y-2 bg-[var(--color-surface)] p-3.5 rounded-lg border border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                  Min Opportunity Score:
                </span>
                <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {minScore} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-[var(--color-text-muted)]">
                <span>1 (All Chatter)</span>
                <span>7 (High Intent)</span>
                <span>10 (Switching Only)</span>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
                AI Response Draft Tone Prompt
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                Editable prompt instructions governing the suggested reply draft.
              </p>
              <textarea
                value={promptTone}
                onChange={(e) => setPromptTone(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden focus:border-emerald-500 font-mono leading-relaxed resize-none"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  'Peer Musician',
                  'Supportive Builder',
                  'Direct & Concise',
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      if (preset === 'Peer Musician') {
                        setPromptTone('Helpful, peer musician, transparent, zero hard-sell, authentic community voice');
                      } else if (preset === 'Supportive Builder') {
                        setPromptTone('Independent pedal builder & collector, empathetic on high commission fees, friendly recommendation');
                      } else {
                        setPromptTone('Short, direct 2 sentences, acknowledging fee frustration and providing a quick link to fair alternatives');
                      }
                    }}
                    className="text-xs px-2 py-0.5 rounded bg-[var(--color-canvas)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] whitespace-nowrap shrink-0 font-medium"
                  >
                    Preset: {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
