'use client';

import React from 'react';
import OeeMetrics from '../components/OeeMetrics';
import StationTelemetryView from '../components/StationTelemetry';
import SqlAnalyticsStudio from '../components/SqlAnalyticsStudio';
import RtmMatrix from '../components/RtmMatrix';
import AiCopilot from '../components/AiCopilot';
import { Factory, Cpu, Layers, GitCompare, Sparkles, Database } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100/70 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Top Header */}
      <header className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-200">
              Accenture S&C Asset
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
              MES • IoT • SQL • GenAI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            NexusMES Analytics Platform
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Cloud Manufacturing Execution System (MES) with Real-Time IoT Telemetry Ingestion, Predictive Warranty Quality Analytics, Embedded SQL OLAP Studio, and Requirement Traceability Matrix (RTM).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
            <Factory className="w-4 h-4 text-cyan-600" />
            <span>ISO-9001 Digital Geneology</span>
          </div>
        </div>
      </header>

      {/* OEE KPI Summary Cards */}
      <section>
        <OeeMetrics />
      </section>

      {/* Section 1: Live Station Telemetry */}
      <section>
        <StationTelemetryView />
      </section>

      {/* Section 2: SQL Analytics Studio */}
      <section>
        <SqlAnalyticsStudio />
      </section>

      {/* Section 3: Requirement Traceability Matrix (RTM) */}
      <section>
        <RtmMatrix />
      </section>

      {/* Section 4: GenAI Operations Copilot */}
      <section>
        <AiCopilot />
      </section>

      {/* Section 5: As-Is vs To-Be Manufacturing Consulting Impact */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 text-cyan-600 font-semibold text-xs uppercase tracking-wider">
          <GitCompare className="w-4 h-4" /> Operations Consulting Transformation
        </div>
        <h3 className="text-lg font-bold text-slate-900 mt-1">
          Manufacturing Operating Model Transformation Impact
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Quantified business outcomes delivered via MES modernization and predictive warranty intelligence
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
            <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Scrap Rate Reduction</span>
            <p className="text-2xl font-black text-slate-900 mt-1">-34.5% Defect Rate</p>
            <p className="text-xs text-slate-600 mt-1">
              Real-time thermal drift alerts on laser welding prevent batch scrap, saving $1.42M annually.
            </p>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Overall Equipment Effectiveness</span>
            <p className="text-2xl font-black text-slate-900 mt-1">+12.2% OEE Uplift</p>
            <p className="text-xs text-slate-600 mt-1">
              Dynamic buffer balancing and cycle-time smoothing elevated plant OEE from 75.4% to 87.6%.
            </p>
          </div>

          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
            <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Warranty Exposure Avoidance</span>
            <p className="text-2xl font-black text-slate-900 mt-1">$890k Claims Intercepted</p>
            <p className="text-xs text-slate-600 mt-1">
              Pre-quarantining high warranty-risk batches prior to customer shipment eliminates field recalls.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-200">
        NexusMES Analytics • Enterprise Manufacturing Execution & Quality Intelligence • Built with Next.js & TypeScript
      </footer>
    </main>
  );
}
