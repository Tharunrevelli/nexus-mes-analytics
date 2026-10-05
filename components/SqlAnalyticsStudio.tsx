'use client';

import React, { useState } from 'react';
import { Database, Play, Download, Terminal, Clock, CheckCircle } from 'lucide-react';
import { sqlPresets, executeQuery } from '../lib/mesData';
import { SqlQueryResult } from '../lib/types';

export default function SqlAnalyticsStudio() {
  const [selectedPreset, setSelectedPreset] = useState(sqlPresets[0].id);
  const [queryText, setQueryText] = useState(sqlPresets[0].query);
  const [result, setResult] = useState<SqlQueryResult>(() => executeQuery(sqlPresets[0].query));

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    const p = sqlPresets.find((x) => x.id === presetId);
    if (p) {
      setQueryText(p.query);
      setResult(executeQuery(p.query));
    }
  };

  const handleRun = () => {
    setResult(executeQuery(queryText));
  };

  const handleExportCsv = () => {
    if (!result || result.rows.length === 0) return;
    const headers = result.columns.join(',');
    const rows = result.rows.map((r) => result.columns.map((c) => `"${r[c] ?? ''}"`).join(',')).join('\n');
    const blob = new Blob([headers + '\n' + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mes_query_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-semibold text-xs uppercase tracking-wider">
            <Database className="w-4 h-4" /> SQL Analytics Studio & OLAP Engine
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Manufacturing Intelligence & Defect Geneology Query Console
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Query industrial telemetry, scrap distributions, and warranty risk correlations with sub-millisecond execution
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            onClick={handleRun}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Execute Query
          </button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 mt-5">
        {sqlPresets.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectPreset(p.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedPreset === p.id
                ? 'bg-cyan-50 text-cyan-700 border border-cyan-300 font-bold shadow-xs'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* SQL Editor Area */}
      <div className="mt-4 relative">
        <textarea
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          rows={3}
          className="w-full bg-slate-900 text-cyan-300 font-mono text-xs p-3.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          spellCheck={false}
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-400" /> {result.executionTimeMs} ms
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> {result.rowCount} rows
          </span>
        </div>
      </div>

      {/* Results Table */}
      <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                {result.columns.map((col, idx) => (
                  <th key={idx} className="py-3 px-4">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {result.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                  {result.columns.map((col, cIdx) => (
                    <td key={cIdx} className="py-3 px-4 font-mono text-[11px]">
                      {col.includes('Risk') ? (
                        <span
                          className={`px-2 py-0.5 rounded font-bold ${
                            row[col] > 40
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {row[col]}
                        </span>
                      ) : (
                        row[col]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
