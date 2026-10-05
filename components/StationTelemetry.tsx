'use client';

import React, { useState } from 'react';
import { initialStations } from '../lib/mesData';
import { StationTelemetry } from '../lib/types';
import { Cpu, Thermometer, Radio, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export default function StationTelemetryView() {
  const [stations, setStations] = useState<StationTelemetry[]>(initialStations);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const simulateTick = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStations((prev) =>
        prev.map((s) => ({
          ...s,
          tempCelsius: Number((s.tempCelsius + (Math.random() * 0.8 - 0.4)).toFixed(1)),
          vibrationMmSec: Number((s.vibrationMmSec + (Math.random() * 0.1 - 0.05)).toFixed(2)),
          partsProcessedToday: s.partsProcessedToday + Math.floor(Math.random() * 2),
        }))
      );
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-semibold text-xs uppercase tracking-wider">
            <Radio className="w-4 h-4 animate-pulse" /> Live OPC-UA / MQTT Sensor Stream
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Shopfloor Station Telemetry & Edge Sensor Metrics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time IoT vibration, thermal tolerances, and cycle-time performance monitoring
          </p>
        </div>

        <button
          onClick={simulateTick}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} /> Ingest Live Telemetry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stations.map((st) => (
          <div
            key={st.stationId}
            className={`p-4 rounded-xl border transition-all ${
              st.status === 'WARNING'
                ? 'border-amber-300 bg-amber-50/20'
                : 'border-slate-200 bg-slate-50/40 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {st.stationId}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">{st.name}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{st.line}</p>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  st.status === 'WARNING'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {st.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-200/60 text-xs">
              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Thermometer className="w-3 h-3" /> Temperature
                </span>
                <p className={`font-bold mt-0.5 ${st.tempCelsius > 80 ? 'text-amber-600' : 'text-slate-800'}`}>
                  {st.tempCelsius}°C
                </p>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <ActivityIcon className="w-3 h-3" /> Vibration
                </span>
                <p className={`font-bold mt-0.5 ${st.vibrationMmSec > 2.0 ? 'text-amber-600' : 'text-slate-800'}`}>
                  {st.vibrationMmSec} mm/s
                </p>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-medium">Cycle Time</span>
                <p className="font-bold text-slate-800 mt-0.5">
                  {st.cycleTimeSec}s <span className="text-[10px] font-normal text-slate-400">/ {st.targetCycleTimeSec}s</span>
                </p>
              </div>

              <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-medium">Station OEE</span>
                <p className="font-bold text-cyan-600 mt-0.5">{st.oeePercent}%</p>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-200/40">
              <span>Produced: {st.partsProcessedToday} pcs</span>
              <span className={st.scrapCountToday > 15 ? 'text-rose-600 font-bold' : ''}>
                Scrap: {st.scrapCountToday} pcs
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
