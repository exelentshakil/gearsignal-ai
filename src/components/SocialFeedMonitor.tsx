'use client';

import React, { useState } from 'react';
import {
  Radio,
  Search,
  ExternalLink,
  Sparkles,
  MessageSquare,
  Filter,
  CheckCircle2,
  Clock,
  Flame,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface FeedPost {
  id: string;
  source: string;
  platform: 'Reddit' | 'TheGearPage' | 'TalkBass' | 'YouTube' | 'RSS';
  author: string;
  timeAgo: string;
  title: string;
  excerpt: string;
  url: string;
  matchedTriggers: string[];
  category: string;
  score: number;
  switchingIntent: boolean;
  status: 'New' | 'Reviewed' | 'Ignored';
}

interface SocialFeedMonitorProps {
  onSelectPostForAi?: (post: FeedPost) => void;
  onSelectPostForSlack?: (post: FeedPost) => void;
}

export const SEED_POSTS: FeedPost[] = [
  {
    id: 'post_101',
    source: 'r/GuitarPedals',
    platform: 'Reddit',
    author: 'u/analog_delay_junkie',
    timeAgo: '14m ago',
    title: 'Reverb fee increase again? Where is everyone selling pedals now?',
    excerpt: 'Just sold a Chase Bliss Mood and after the 5% transaction fee, payment processing fee, and bump fee, I lost nearly 14% of the sale price. Is there any reasonable alternative to Reverb that musicians actually use?',
    url: 'https://reddit.com/r/GuitarPedals/comments/1p9x8q',
    matchedTriggers: ['Reverb', 'fee increase', 'alternative to reverb'],
    category: 'actively asking for alternatives',
    score: 10,
    switchingIntent: true,
    status: 'New',
  },
  {
    id: 'post_102',
    source: 'TheGearPage',
    platform: 'TheGearPage',
    author: 'TeleCaster_Tom_77',
    timeAgo: '28m ago',
    title: 'Closed my Reverb shop after 9 years. Tired of buyer scams and slow payouts.',
    excerpt: 'Buyer claimed a mint 1968 Marshall JMP head arrived with a scratch that was already documented in 4 photos. Reverb support froze my $2,800 payout for 3 weeks without human review. Done with them.',
    url: 'https://thegearpage.net/board/index.php?threads/closed-reverb-shop.258912',
    matchedTriggers: ['Reverb', 'payout delay', 'buyer scam', 'leaving reverb'],
    category: 'leaving service / boycott',
    score: 10,
    switchingIntent: true,
    status: 'New',
  },
  {
    id: 'post_103',
    source: 'TalkBass Classifieds',
    platform: 'TalkBass',
    author: 'LowEndGroove',
    timeAgo: '42m ago',
    title: 'Selling custom Sadowsky 5-string—avoiding eBay & Reverb cut',
    excerpt: 'Listing here first because I refuse to give 8-10% to marketplace middlemen. Looking for direct musician-to-musician platforms with fair escrow protection.',
    url: 'https://talkbass.com/threads/fs-custom-sadowsky-avoid-fees.164891',
    matchedTriggers: ['Reverb', 'eBay', 'marketplace middlemen', 'where to sell'],
    category: 'actively asking for alternatives',
    score: 9,
    switchingIntent: true,
    status: 'New',
  },
  {
    id: 'post_104',
    source: 'r/Guitar',
    platform: 'Reddit',
    author: 'u/vintage_strats_only',
    timeAgo: '1h ago',
    title: 'Guitar Center Used vs Sweetwater Gear Exchange vs Reverb for selling 60s Gibson?',
    excerpt: 'Trying to figure out the best place to offload my 1965 SG Special. Sweetwater takes zero fees if you take store credit, but I need cash. What new platforms are offering lower seller fees?',
    url: 'https://reddit.com/r/Guitar/comments/1p9y22',
    matchedTriggers: ['Reverb', 'Sweetwater Gear Exchange', 'lower seller fees'],
    category: 'actively asking for alternatives',
    score: 9,
    switchingIntent: true,
    status: 'New',
  },
  {
    id: 'post_105',
    source: 'r/Bass',
    platform: 'Reddit',
    author: 'u/slap_master_b',
    timeAgo: '2h ago',
    title: 'Reverb 1099-K tax calculation issue and support won\'t respond',
    excerpt: 'Their automated reporting is showing sales I cancelled and refunded. Sent 3 tickets to support over 10 days with only canned automated replies.',
    url: 'https://reddit.com/r/Bass/comments/1p9z41',
    matchedTriggers: ['Reverb', 'support won\'t respond', 'canned replies'],
    category: 'customer service problems',
    score: 8,
    switchingIntent: false,
    status: 'Reviewed',
  },
  {
    id: 'post_106',
    source: 'YouTube Comments',
    platform: 'YouTube',
    author: 'FretboardFanatic',
    timeAgo: '3h ago',
    title: 'Comment on: "Why Selling on Reverb in 2026 is No Longer Worth It"',
    excerpt: 'The bump fee model is extortionate. If you don\'t pay extra 5% bump fee, your listing gets buried on page 8 behind big box dealers.',
    url: 'https://youtube.com/watch?v=mock_video_id',
    matchedTriggers: ['Reverb', 'bump fee', 'extortionate'],
    category: 'fee/payout/policy complaints',
    score: 8,
    switchingIntent: true,
    status: 'New',
  },
];

export function SocialFeedMonitor({ onSelectPostForAi, onSelectPostForSlack }: SocialFeedMonitorProps) {
  const [posts, setPosts] = useState<FeedPost[]>(SEED_POSTS);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((p) => {
    const matchesSource =
      selectedFilter === 'all'
        ? true
        : selectedFilter === 'reddit'
        ? p.platform === 'Reddit'
        : selectedFilter === 'thegearpage'
        ? p.platform === 'TheGearPage'
        : selectedFilter === 'talkbass'
        ? p.platform === 'TalkBass'
        : selectedFilter === 'youtube'
        ? p.platform === 'YouTube'
        : true;

    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.matchedTriggers.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSource && matchesSearch;
  });

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'bg-emerald-500 text-white dark:bg-emerald-600';
    if (score >= 7) return 'bg-blue-500 text-white dark:bg-blue-600';
    if (score >= 5) return 'bg-amber-500 text-white dark:bg-amber-600';
    return 'bg-slate-400 text-white';
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Radio className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Multi-Platform Feed Stream
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Seed Communities: r/Guitar • r/Bass • r/GuitarPedals • TheGearPage • TalkBass
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Live Monitored Opportunities & Scored Threads
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Incoming public community posts scored for marketplace switching intent (1-10) with verified links and direct Slack dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-48 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--color-text-muted)]" />
            <Input
              placeholder="Search keyword, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8 text-xs bg-[var(--color-canvas)] border-[var(--color-border)]"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-3 border-b border-[var(--color-border-subtle)]">
        {[
          { id: 'all', label: 'All Sources', count: posts.length },
          { id: 'reddit', label: 'Reddit', count: posts.filter((p) => p.platform === 'Reddit').length },
          { id: 'thegearpage', label: 'TheGearPage', count: posts.filter((p) => p.platform === 'TheGearPage').length },
          { id: 'talkbass', label: 'TalkBass', count: posts.filter((p) => p.platform === 'TalkBass').length },
          { id: 'youtube', label: 'YouTube', count: posts.filter((p) => p.platform === 'YouTube').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              selectedFilter === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-xs font-mono ${
                selectedFilter === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--color-canvas)] text-[var(--color-text-muted)]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="table-fixed w-full min-w-[980px] text-xs">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-left font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              <th className="py-2.5 px-3 w-[15%]">Source & Author</th>
              <th className="py-2.5 px-3 w-[36%]">Post Title & Community Excerpt</th>
              <th className="py-2.5 px-3 w-[18%]">Matched Triggers</th>
              <th className="py-2.5 px-3 w-[11%] text-center">Score (1-10)</th>
              <th className="py-2.5 px-3 w-[8%] text-center">Status</th>
              <th className="py-2.5 px-3 w-[12%] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
            {filteredPosts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-[var(--color-panel-subtle)]/70 transition-colors"
              >
                {/* Source & Author */}
                <td className="py-3 px-3 align-top">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="rounded bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
                      {post.source}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-semibold text-[var(--color-text-primary)] truncate">
                    {post.author}
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">
                    {post.timeAgo}
                  </span>
                </td>

                {/* Post Title & Excerpt */}
                <td className="py-3 px-3 align-top">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-semibold text-sm text-[var(--color-text-primary)] line-clamp-1">
                      {post.title}
                    </span>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-muted)] hover:text-emerald-600 transition-colors shrink-0"
                      title="Open source post"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                    "{post.excerpt}"
                  </p>
                </td>

                {/* Matched Triggers & Category */}
                <td className="py-3 px-3 align-top">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {post.matchedTriggers.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-[var(--color-panel-subtle)] px-1.5 py-0.5 text-xs font-mono font-medium text-[var(--color-text-primary)] border border-[var(--color-border)] whitespace-nowrap shrink-0"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium block truncate">
                    {post.category}
                  </span>
                </td>

                {/* Opportunity Score */}
                <td className="py-3 px-3 align-top text-center">
                  <div className="inline-flex flex-col items-center">
                    <span
                      className={`inline-flex items-center justify-center h-6 w-8 rounded-full font-mono text-xs font-bold shadow-xs whitespace-nowrap shrink-0 ${getScoreColor(
                        post.score
                      )}`}
                    >
                      {post.score}
                    </span>
                    {post.switchingIntent && (
                      <span className="mt-1 inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono whitespace-nowrap shrink-0">
                        <Flame className="h-3 w-3" />
                        Switch
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-3 align-top text-center">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-mono font-semibold whitespace-nowrap shrink-0 ${
                      post.status === 'New'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                        : post.status === 'Reviewed'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {post.status}
                  </span>
                </td>

                {/* Action */}
                <td className="py-3 px-3 align-top text-right">
                  <div className="flex flex-col gap-1 items-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelectPostForAi ? onSelectPostForAi(post) : document.getElementById("ai-auditor")?.scrollIntoView({ behavior: "smooth" })}
                      className="h-7 text-xs border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 whitespace-nowrap shrink-0"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span>Test AI</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onSelectPostForSlack ? onSelectPostForSlack(post) : document.getElementById("slack")?.scrollIntoView({ behavior: "smooth" })}
                      className="h-7 text-xs text-[var(--color-text-secondary)] hover:text-emerald-600 whitespace-nowrap shrink-0"
                    >
                      <MessageSquare className="h-3 w-3 mr-1 text-indigo-500" />
                      <span>Slack Card</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
        <span>Showing {filteredPosts.length} qualified community threads</span>
        <span>Polling rate: 15 minutes • ETag cached</span>
      </div>
    </div>
  );
}
