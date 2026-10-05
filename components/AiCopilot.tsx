'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';

interface AiInsight {
  prompt: string;
  response: string;
  recommendedAction: string;
  costSaving: string;
}

const presetInsights: Record<string, AiInsight> = {
  welding_drift: {
    prompt: 'Synthesize anomaly on ST-WELD-02 (Temp: 82.4°C, Vib: 2.8mm/s, Scrap: 10%)',
    response:
      'Diagnostic telemetry identifies localized thermal runaway and high-frequency vibration harmonic at 120Hz. Root cause: bearing raceway spalling and degraded argon shielding gas laminar flow during robotic laser welding.',
    recommendedAction:
      'Quarantine batch B-2026-X12 immediately to prevent field catastrophic failure. Schedule predictive spindle re-greasing and gas diffuser nozzle replacement during shift handover.',
    costSaving: 'Prevents estimated $84,000 in downstream warranty recall penalties for 18 actuator assemblies.',
  },
  oee_optimization: {
    prompt: 'How to elevate Line 1 OEE from 75.4% to 85% world-class benchmark?',
    response:
      'Line 1 performance losses are driven by micro-stops (cycle time variance +4.8s) during tooling transition between CNC-01 and WELD-02. Buffer starving occurs 18% of operating hours.',
    recommendedAction:
      'Implement asynchronous Kanban decoupler buffer (capacity: 12 units) between CNC and Welding cells. Recalibrate weld speed feed-rate parameters.',
    costSaving: 'Generates 48 additional finished powertrain units per day ($1.12M annualized margin uplift).',
  },
};

export default function AiCopilot() {
  const [activeKey, setActiveKey] = useState<string>('welding_drift');
  const [customInput, setCustomInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; action?: string; savings?: string }>>([
    {
      sender: 'assistant',
      text: presetInsights['welding_drift'].response,
      action: presetInsights['welding_drift'].recommendedAction,
      savings: presetInsights['welding_drift'].costSaving,
    },
  ]);

  const handleSelectPreset = (key: string) => {
    setActiveKey(key);
    const p = presetInsights[key];
    setMessages([
      {
        sender: 'user',
        text: p.prompt,
      },
      {
        sender: 'assistant',
        text: p.response,
        action: p.recommendedAction,
        savings: p.costSaving,
      },
    ]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userText = customInput;
    setCustomInput('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      {
        sender: 'assistant',
        text: `AI Synthesis for "${userText}": Cross-referencing shopfloor IoT sensor logs with historical warranty claims indicates a 94.2% correlation between thermal gradient spikes and seal degradation. Recommended corrective SOP dispatched to MES shopfloor supervisor terminal.`,
        action: 'Perform automated acoustic emission test on next 5 production cycles.',
        savings: 'Estimated risk mitigation: $38,500 in avoided field warranty claims.',
      },
    ]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-500" /> GenAI Operations Copilot
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Manufacturing Anomaly Synthesis & Warranty Risk Assistant
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Generative AI assistant synthesizing multi-modal sensor telemetries into actionable engineering resolutions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSelectPreset('welding_drift')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeKey === 'welding_drift'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Welding Anomaly RCA
          </button>
          <button
            onClick={() => handleSelectPreset('oee_optimization')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeKey === 'oee_optimization'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            OEE Uplift Plan
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-4 mt-6 max-h-96 overflow-y-auto pr-1">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`p-4 rounded-2xl max-w-2xl ${
                m.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-br-none'
                  : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-bl-none shadow-xs'
              }`}
            >
              <p className="leading-relaxed">{m.text}</p>
              {m.action && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] space-y-1.5">
                  <div className="flex items-start gap-1.5 text-slate-900 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Action: {m.action}</span>
                  </div>
                  {m.savings && (
                    <div className="flex items-start gap-1.5 text-emerald-700 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{m.savings}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSendCustom} className="mt-4 flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Ask AI Copilot regarding shopfloor telemetry, scrap root-cause, or warranty risk..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-cyan-600 text-white rounded-xl text-xs font-semibold hover:bg-cyan-700 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Send className="w-3.5 h-3.5" /> Ask
        </button>
      </form>
    </div>
  );
}
