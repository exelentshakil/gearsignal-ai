'use client';

import React, { useState } from 'react';
import {
  Database,
  Table,
  ShieldCheck,
  Search,
  Filter,
  Download,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Fingerprint,
  ArrowUpDown,
  FileSpreadsheet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEED_POSTS, FeedPost } from './SocialFeedMonitor';

export interface DataStoreRecord {
  id: string;
  dedupeKey: string;
  platform: string;
  source: string;
  author: string;
  url: string;
  title: string;
  matchedCategory: string;
  matchedKeyword: string;
  score: number;
  draftResponse: string;
  status: 'New' | 'Reviewed' | 'Ignored';
  discoveredAt: string;
  processedState: 'Processed' | 'Dedupe Blocked';
}

const INITIAL_RECORDS: DataStoreRecord[] = [
  {
    id: 'rec_01J8A',
    dedupeKey: 'sha256:7f9a2b8c91...',
    platform: 'Reddit',
    source: 'r/GuitarPedals',
    author: 'u/analog_delay_junkie',
    url: 'https://reddit.com/r/GuitarPedals/comments/reverb_fee_hike_again',
    title: 'Reverb fee hike again? Just lost 14% of a pedal sale...',
    matchedCategory: 'actively asking for alternatives',
    matchedKeyword: 'Reverb • fee increase',
    score: 10,
    draftResponse: 'Man, totally feel you on those recent fee hikes. A lot of boutique pedal collectors have been moving to direct musician-to-musician platforms that cap fees under 3%.',
    status: 'New',
    discoveredAt: '2026-09-16 16:12:04',
    processedState: 'Processed',
  },
  {
    id: 'rec_01J8B',
    dedupeKey: 'sha256:3d4e5f6a7b...',
    platform: 'TheGearPage',
    source: 'TheGearPage.net',
    author: 'TeleMaster1962',
    url: 'https://thegearpage.net/board/index.php?threads/reverb-buyer-claim-scam-funds-frozen.2498112',
    title: 'Reverb buyer claim scam - funds frozen despite delivery proof',
    matchedCategory: 'leaving service / boycott',
    matchedKeyword: 'payout hold • scam',
    score: 10,
    draftResponse: 'Terrible that they froze your payout over documented shipping photos. When platforms side with scammers without human review, it kills vintage gear sales.',
    status: 'New',
    discoveredAt: '2026-09-16 15:55:18',
    processedState: 'Processed',
  },
  {
    id: 'rec_01J8C',
    dedupeKey: 'sha256:9c8b7a6f5e...',
    platform: 'TalkBass',
    source: 'TalkBass.com',
    author: 'LowEndGroover',
    url: 'https://talkbass.com/threads/fs-ft-sadowsky-metro-will-trade-avoiding-ebay-reverb.1620941',
    title: 'FS/FT: Sadowsky Metro - Looking for buyer directly (avoiding Reverb/eBay tax)',
    matchedCategory: 'actively asking for alternatives',
    matchedKeyword: 'avoiding Reverb • eBay tax',
    score: 9,
    draftResponse: 'Gorgeous Sadowsky! 100% with you on cutting out the 10% marketplace tax. Good luck with the sale.',
    status: 'Reviewed',
    discoveredAt: '2026-09-16 15:10:42',
    processedState: 'Processed',
  },
  {
    id: 'rec_01J8D',
    dedupeKey: 'sha256:7f9a2b8c91...', // Identical hash to rec_01J8A
    platform: 'Reddit',
    source: 'r/GuitarPedals',
    author: 'u/analog_delay_junkie',
    url: 'https://reddit.com/r/GuitarPedals/comments/reverb_fee_hike_again',
    title: 'Reverb fee hike again? Just lost 14% of a pedal sale...',
    matchedCategory: 'actively asking for alternatives',
    matchedKeyword: 'Reverb • fee increase',
    score: 10,
    draftResponse: 'Man, totally feel you on those recent fee hikes.',
    status: 'Ignored',
    discoveredAt: '2026-09-16 16:25:30',
    processedState: 'Dedupe Blocked',
  },
];

export function DataStoreInspector() {
  const [records, setRecords] = useState<DataStoreRecord[]>(INITIAL_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'New' | 'Reviewed' | 'Ignored'>('all');
  const [viewMode, setViewMode] = useState<'airtable' | 'sheets'>('airtable');
  const [dedupeLog, setDedupeLog] = useState<string | null>(null);

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.matchedKeyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const testDeduplicationEngine = () => {
    setDedupeLog('Simulating duplicate ingestion: Re-scanning r/GuitarPedals for post #reverb_fee_hike_again...');
    setTimeout(() => {
      setDedupeLog(
        '✓ DEDUPE SUCCESS: Hash sha256:7f9a2b8c91 exists in 14-day LRU cache. Ingestion halted at Node 2. Zero AI tokens billed, zero duplicate Slack alerts sent.'
      );
    }, 800);
  };

  const handleUpdateStatus = (id: string, newStatus: 'New' | 'Reviewed' | 'Ignored') => {
    setRecords(
      records.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Database className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Core Requirement 6
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Duplicate Prevention & Lightweight Data Store
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Airtable & Google Sheets Deduplication Store
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Zero enterprise database cost. Tracks platform ID, URL, discovered timestamp, matched category, score, and response status with 14-day hash deduplication.
          </p>
        </div>

        {/* View Switcher & Test Action */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-0.5 text-xs font-medium">
            <button
              onClick={() => setViewMode('airtable')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'airtable'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs font-semibold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Airtable Base
            </button>
            <button
              onClick={() => setViewMode('sheets')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'sheets'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs font-semibold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Google Sheet
            </button>
          </div>

          <Button
            size="sm"
            onClick={testDeduplicationEngine}
            className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium whitespace-nowrap shrink-0"
          >
            <Fingerprint className="h-3.5 w-3.5 mr-1" />
            <span>Test Dedupe Block</span>
          </Button>
        </div>
      </div>

      {/* Deduplication Test Feedback Bar */}
      {dedupeLog && (
        <div className="mb-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 p-3 text-xs font-mono text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{dedupeLog}</span>
          </div>
          <button
            onClick={() => setDedupeLog(null)}
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 text-xs px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <Input
            placeholder="Search records, triggers, authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-mono">
            <Filter className="h-3.5 w-3.5" />
            <span>Status:</span>
            {(['all', 'New', 'Reviewed', 'Ignored'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  statusFilter === st
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                    : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {filteredRecords.length} rows
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
              <th className="py-2.5 px-3 font-semibold">Post ID & Hash</th>
              <th className="py-2.5 px-3 font-semibold">Source & Author</th>
              <th className="py-2.5 px-3 font-semibold">Title Excerpt</th>
              <th className="py-2.5 px-3 font-semibold">Trigger / Intent</th>
              <th className="py-2.5 px-3 font-semibold">Score</th>
              <th className="py-2.5 px-3 font-semibold">Dedupe State</th>
              <th className="py-2.5 px-3 font-semibold">Review Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filteredRecords.map((r) => (
              <tr
                key={r.id}
                className={`hover:bg-[var(--color-panel-subtle)] transition-colors ${
                  r.processedState === 'Dedupe Blocked' ? 'opacity-60 bg-slate-50/50 dark:bg-slate-900/30' : ''
                }`}
              >
                {/* ID & Key */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="font-bold text-[var(--color-text-primary)] block">
                    {r.id}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {r.dedupeKey}
                  </span>
                </td>

                {/* Source & Author */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 block">
                    {r.source}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {r.author}
                  </span>
                </td>

                {/* Title & Link */}
                <td className="py-2.5 px-3 max-w-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-sans font-medium text-[var(--color-text-primary)]">
                      {r.title}
                    </span>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:text-indigo-700 shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">
                    {r.discoveredAt}
                  </span>
                </td>

                {/* Trigger & Intent */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="font-medium text-[var(--color-text-primary)] block">
                    {r.matchedKeyword}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 capitalize">
                    {r.matchedCategory}
                  </span>
                </td>

                {/* Score */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center justify-center font-bold rounded px-2 py-0.5 text-xs ${
                      r.score >= 9
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {r.score}/10
                  </span>
                </td>

                {/* Dedupe Status */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  {r.processedState === 'Processed' ? (
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      Ingested
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded bg-red-50 dark:bg-red-950/40 px-2 py-0.5 text-xs text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-semibold">
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                      Duplicate Blocked
                    </span>
                  )}
                </td>

                {/* Review Status Dropdown/Toggle */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <select
                    value={r.status}
                    onChange={(e) =>
                      handleUpdateStatus(r.id, e.target.value as 'New' | 'Reviewed' | 'Ignored')
                    }
                    className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs font-mono font-medium text-[var(--color-text-primary)] focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Ignored">Ignored</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-text-muted)] font-mono gap-2">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
          <span>Synced with client's Google Sheet & Airtable Base via REST API</span>
        </div>
        <span>Retention: 90 days • Auto-archived to cold storage CSV</span>
      </div>
    </div>
  );
}
