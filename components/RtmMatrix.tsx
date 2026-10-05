'use client';

import React from 'react';
import { rtmDataset } from '../lib/mesData';
import { FileCheck, ShieldCheck, Layers, GitMerge } from 'lucide-react';

export default function RtmMatrix() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-semibold text-xs uppercase tracking-wider">
            <FileCheck className="w-4 h-4" /> Strategy & Consulting Deliverable
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Requirement Traceability Matrix (RTM) & Functional Specs
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Bi-directional mapping from client business needs to MES software modules and test suites
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Traceability Covered
          </span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4">Req ID</th>
              <th className="py-3 px-4">Client High-Level Business Need</th>
              <th className="py-3 px-4">Detailed Functional Specification</th>
              <th className="py-3 px-4">MES Technical Architecture Module</th>
              <th className="py-3 px-4">Verification Test Case</th>
              <th className="py-3 px-4">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {rtmDataset.map((item) => (
              <tr key={item.reqId} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-cyan-700 bg-cyan-50/30">
                  {item.reqId}
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs">
                  {item.businessNeed}
                </td>
                <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                  {item.functionalSpecification}
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700">
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {item.mesTechnicalModule}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                  {item.verificationTestCase}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.complianceStatus === 'AUTOMATED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.complianceStatus === 'VERIFIED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {item.complianceStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
