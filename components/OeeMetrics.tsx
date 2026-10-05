'use client';

import React from 'react';
import { Gauge, CheckCircle2, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function OeeMetrics() {
  const oee = 87.6;
  const availability = 95.0;
  const performance = 93.6;
  const quality = 98.2;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall OEE */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Plant OEE</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">{oee}%</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% MoM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">World-class benchmark target: 85.0%</p>
          </div>
          <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
            <Gauge className="w-5 h-5" />
          </div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-cyan-600 h-full rounded-full" style={{ width: `${oee}%` }}></div>
        </div>
      </div>

      {/* Availability */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Availability</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">{availability}%</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +1.8%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Uptime vs Scheduled Hours</p>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${availability}%` }}></div>
        </div>
      </div>

      {/* Performance */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">{performance}%</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +2.4%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Operating Speed vs Ideal Cycle Time</p>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${performance}%` }}></div>
        </div>
      </div>

      {/* Quality / First-Pass Yield */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quality (FPY)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">{quality}%</span>
              <span className="text-xs font-semibold text-rose-500 flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-0.5" /> 51 Scrap Pcs
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Good Units vs Total Units Started</p>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${quality}%` }}></div>
        </div>
      </div>
    </div>
  );
}
