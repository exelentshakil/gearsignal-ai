'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import {
  Activity,
  Radio,
  Sliders,
  Sparkles,
  MessageSquare,
  Database,
  Calculator,
  Download,
  Terminal,
  Shield,
  Sun,
  Moon,
  Zap,
  ChevronDown,
  Command as CommandIcon,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
  onOpenGovernanceDrawer: () => void;
  onOpenLogsDrawer: () => void;
  onOpenCommandMenu: () => void;
}

export function Header({
  activeSection,
  onNavigate,
  onOpenChaosModal,
  onOpenGovernanceDrawer,
  onOpenLogsDrawer,
  onOpenCommandMenu,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  // Primary 5 high-signal navigation anchors
  const primaryNavItems = [
    { id: 'pipeline', label: 'Pipeline', icon: Activity },
    { id: 'config', label: 'Keywords', icon: Sliders },
    { id: 'feeds', label: 'Feeds', icon: Radio },
    { id: 'ai-auditor', label: 'AI Auditor', icon: Sparkles },
    { id: 'slack', label: 'Slack Alerts', icon: MessageSquare },
  ];

  // Secondary navigation anchors in sleek "More" dropdown
  const secondaryNavItems = [
    { id: 'datastore', label: 'Dedupe Data Store', icon: Database, desc: 'Airtable & Google Sheets sync' },
    { id: 'roi', label: 'Cost & ROI Engine', icon: Calculator, desc: 'Itemized infrastructure micro-costs' },
    { id: 'blueprints', label: 'Make & n8n Blueprints', icon: Download, desc: 'Turnkey 1-click JSON exports' },
    { id: 'briefing', label: 'Executive Briefing', icon: Zap, desc: 'Problem context & evaluation paths' },
  ];

  // Check if current active section is inside secondary items
  const isSecondaryActive = secondaryNavItems.some((item) => item.id === activeSection);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md">
      {/* Top 3-Zone Main Navigation Bar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Left Brand Anchor (Max ~200px) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('briefing')}
            className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xs">
              <Radio className="h-4 w-4 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-baseline gap-0.5">
                <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                  GearSignal
                </span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  AI
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live MVP
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Center Streamlined Primary Navigation (Max ~450px) */}
        <nav className="hidden lg:flex items-center gap-0.5 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)]">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold shadow-xs border border-[var(--color-border)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/50'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Sleek "More" Dropdown Menu for Secondary Sections */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  isSecondaryActive
                    ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold shadow-xs border border-[var(--color-border)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/50'
                }`}
              >
                <span>More</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[var(--color-surface)] border border-[var(--color-border)] p-1.5">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs ${
                      isActive ? 'bg-[var(--color-panel-subtle)] font-semibold text-emerald-600 dark:text-emerald-400' : 'text-[var(--color-text-primary)]'
                    }`}
                  >
                    <Icon className="h-4 w-4 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-medium leading-none">{item.label}</div>
                      <div className="text-xs text-[var(--color-text-muted)] mt-1 font-normal">{item.desc}</div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Zone 3: Right Operations & Utilities (Max ~310px, Zero Overflow) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search ⌘K Button */}
          <button
            onClick={onOpenCommandMenu}
            className="hidden sm:flex h-8 items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-slate-400 transition-colors"
            title="Quick Navigation Palette (⌘K)"
          >
            <CommandIcon className="h-3.5 w-3.5" />
            <kbd className="rounded bg-[var(--color-surface)] px-1 py-0.5 text-xs font-mono font-bold border border-[var(--color-border)] text-[var(--color-text-primary)]">
              ⌘K
            </kbd>
          </button>

          {/* Consolidated Diagnostics & Governance Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex h-8 items-center gap-1.5 text-xs border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-panel-subtle)] px-2.5 whitespace-nowrap"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                <span>Diagnostics</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 bg-[var(--color-surface)] border border-[var(--color-border)] p-1.5">
              <DropdownMenuItem
                onClick={onOpenChaosModal}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Zap className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                <div>
                  <div className="font-bold text-[var(--color-text-primary)]">Chaos & Resilience Test</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Test API outages, 429 backoff & failover</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onOpenGovernanceDrawer}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Shield className="h-4 w-4 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-[var(--color-text-primary)]">NIST AI RMF Posture</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Securiti certified OWASP LLM guardrails</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onOpenLogsDrawer}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Terminal className="h-4 w-4 mt-0.5 text-indigo-500 shrink-0" />
                <div>
                  <div className="font-bold text-[var(--color-text-primary)]">Live Pipeline Event Logs</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Real-time HTTP & AI inference traces</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* High-Contrast Action CTA: Chaos Test */}
          <Button
            size="sm"
            onClick={onOpenChaosModal}
            className="h-8 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs border border-amber-600/30 whitespace-nowrap shrink-0 px-3"
          >
            <Zap className="h-3.5 w-3.5 mr-1" />
            <span>Chaos Test</span>
          </Button>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 p-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Pill Navigation */}
      <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-canvas)] py-1.5 px-4 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {[...primaryNavItems, ...secondaryNavItems].map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
              }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
