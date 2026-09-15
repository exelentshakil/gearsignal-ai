'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ReviewerTour } from '@/components/ReviewerTour';
import { BentoGrid } from '@/components/BentoGrid';
import { WorkflowCanvas } from '@/components/WorkflowCanvas';
import { KeywordManager } from '@/components/KeywordManager';
import { SocialFeedMonitor } from '@/components/SocialFeedMonitor';
import { AiOpportunityAuditor } from '@/components/AiOpportunityAuditor';
import { SlackAlertCockpit } from '@/components/SlackAlertCockpit';
import { DataStoreInspector } from '@/components/DataStoreInspector';
import { RoiCostCalculator } from '@/components/RoiCostCalculator';
import { BlueprintExporter } from '@/components/BlueprintExporter';
import { ChaosSimulatorModal } from '@/components/ChaosSimulatorModal';
import { AiGovernanceDrawer } from '@/components/AiGovernanceDrawer';
import { ExecutionLogDrawer } from '@/components/ExecutionLogDrawer';
import { CommandMenu } from '@/components/CommandMenu';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('briefing');
  const [chaosModalOpen, setChaosModalOpen] = useState(false);
  const [governanceDrawerOpen, setGovernanceDrawerOpen] = useState(false);
  const [logsDrawerOpen, setLogsDrawerOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic ScrollSpy using IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      'briefing',
      'pipeline',
      'config',
      'feeds',
      'ai-auditor',
      'slack',
      'datastore',
      'roi',
      'blueprints',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] transition-colors">
      {/* Sticky Header with ScrollSpy Nav */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenChaosModal={() => setChaosModalOpen(true)}
        onOpenGovernanceDrawer={() => setGovernanceDrawerOpen(true)}
        onOpenLogsDrawer={() => setLogsDrawerOpen(true)}
        onOpenCommandMenu={() => setCommandMenuOpen(true)}
      />

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Section 1: Executive Briefing */}
        <section id="briefing" className="scroll-mt-24">
          <ReviewerTour
            onNavigate={handleNavigate}
            onOpenChaosModal={() => setChaosModalOpen(true)}
          />
        </section>

        {/* Section 2: High-Density Micro-Observability Bento KPIs */}
        <section id="metrics" className="scroll-mt-24">
          <BentoGrid />
        </section>

        {/* Section 3: 6-Node Animated Event Pipeline */}
        <section id="pipeline" className="scroll-mt-24">
          <WorkflowCanvas />
        </section>

        {/* Section 4: Centralized No-Code Keyword & Competitor Config Base */}
        <section id="config" className="scroll-mt-24">
          <KeywordManager />
        </section>

        {/* Section 5: Multi-Community Feed Monitor */}
        <section id="feeds" className="scroll-mt-24">
          <SocialFeedMonitor />
        </section>

        {/* Section 6: AI Opportunity Auditor & Dual-Model Engine */}
        <section id="ai-auditor" className="scroll-mt-24">
          <AiOpportunityAuditor />
        </section>

        {/* Section 7: Slack Alert Cockpit & Human Review */}
        <section id="slack" className="scroll-mt-24">
          <SlackAlertCockpit />
        </section>

        {/* Section 8: Airtable & Sheets Deduplication Store */}
        <section id="datastore" className="scroll-mt-24">
          <DataStoreInspector />
        </section>

        {/* Section 9: Itemized Recurring Cost Breakdown & Marketplace ROI */}
        <section id="roi" className="scroll-mt-24">
          <RoiCostCalculator />
        </section>

        {/* Section 10: 1-Click Make.com & n8n Blueprint Exporters */}
        <section id="blueprints" className="scroll-mt-24">
          <BlueprintExporter />
        </section>
      </main>

      {/* Verified Systems Architect Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ChaosSimulatorModal
        open={chaosModalOpen}
        onOpenChange={setChaosModalOpen}
      />

      <AiGovernanceDrawer
        open={governanceDrawerOpen}
        onOpenChange={setGovernanceDrawerOpen}
      />

      <ExecutionLogDrawer
        open={logsDrawerOpen}
        onOpenChange={setLogsDrawerOpen}
      />

      <CommandMenu
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
        onOpenChaos={() => {
          setCommandMenuOpen(false);
          setChaosModalOpen(true);
        }}
        onOpenGovernance={() => {
          setCommandMenuOpen(false);
          setGovernanceDrawerOpen(true);
        }}
        onOpenLogs={() => {
          setCommandMenuOpen(false);
          setLogsDrawerOpen(true);
        }}
      />
    </div>
  );
}
