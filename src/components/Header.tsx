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
  Command as CommandIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const navItems = [
    { id: 'briefing', label: 'Briefing', icon: Zap },
    { id: 'pipeline', label: 'Pipeline', icon: Activity },
    { id: 'config', label: 'Config', icon: Sliders },
    { id: 'feeds', label: 'Feeds', icon: Radio },
    { id: 'ai-auditor', label: 'AI Auditor', icon: Sparkles },
    { id: 'slack', label: 'Slack Alert', icon: MessageSquare },
    { id: 'datastore', label: 'Data Store', icon: Database },
    { id: 'roi', label: 'ROI Calc', icon: Calculator },
    { id: 'blueprints', label: 'Blueprints', icon: Download },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md">
      {/* Top Main Navigation Bar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity & Live Status */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('briefing')}
            className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-500/20">
              <Radio className="h-4 w-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                  GearSignal AI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 whitespace-nowrap shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  6 Feeds Live
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] font-mono hidden md:block">
                Social-Listening & Lead Discovery MVP
              </p>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Pills (ScrollSpy Connected) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)]">
          {navItems.map((item) => {
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
        </nav>

        {/* Right: Operational Tool Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCommandMenu}
            className="hidden sm:flex h-8 items-center gap-1.5 text-xs border-[var(--color-border)] px-2.5 whitespace-nowrap shrink-0"
          >
            <CommandIcon className="h-3.5 w-3.5" />
            <kbd className="rounded bg-[var(--color-canvas)] px-1 py-0.5 text-xs font-mono font-semibold border border-[var(--color-border)]">
              ⌘K
            </kbd>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenChaosModal}
            className="h-8 text-xs border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300 whitespace-nowrap shrink-0"
          >
            <Zap className="h-3.5 w-3.5 mr-1 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Chaos Test</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenGovernanceDrawer}
            className="hidden md:flex h-8 text-xs border-[var(--color-border)] whitespace-nowrap shrink-0"
          >
            <Shield className="h-3.5 w-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
            <span>NIST AI RMF</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenLogsDrawer}
            className="h-8 text-xs border-[var(--color-border)] whitespace-nowrap shrink-0"
          >
            <Terminal className="h-3.5 w-3.5 mr-1" />
            <span className="hidden sm:inline">Live Logs</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 p-0 text-[var(--color-text-secondary)]"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Pill Navigation */}
      <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-canvas)] py-1.5 px-4 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {navItems.map((item) => {
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
