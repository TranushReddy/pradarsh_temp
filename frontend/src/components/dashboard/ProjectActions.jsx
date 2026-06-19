import React, { useState } from 'react';

export default function ProjectActions({ projectId, onRedeployCompleted }) {
  const [loadingAction, setLoadingAction] = useState(null);
  const [logs, setLogs] = useState([]);

  const triggerAction = (actionName, duration, message) => {
    setLoadingAction(actionName);
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] Initializing ${actionName}...`, ...prev]);
    
    setTimeout(() => {
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Action completed: ${message}`,
        ...prev
      ]);
      setLoadingAction(null);
      if (onRedeployCompleted) onRedeployCompleted();
    }, duration);
  };

  return (
    <div className="bg-white border border-slate-150 rounded-2xl p-6 text-left space-y-5 shadow-sm">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono border-b border-slate-100 pb-3">
        Project Telemetry Actions
      </h3>

      {/* Button Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          onClick={() => triggerAction('Redeploy', 2000, 'Re-instantiated Docker build container.')}
          disabled={loadingAction !== null}
          className="bg-indigo-50 border border-indigo-100/50 hover:border-indigo-200 text-indigo-600 text-[10px] font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-40"
        >
          {loadingAction === 'Redeploy' ? 'Rebuilding...' : '🔄 Rebuild Node'}
        </button>

        <button
          onClick={() => triggerAction('Cache Clear', 1500, 'All local build layers and packages purged.')}
          disabled={loadingAction !== null}
          className="bg-purple-50 border border-purple-100/50 hover:border-purple-200/80 text-purple-650 text-purple-600 text-[10px] font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-40"
        >
          {loadingAction === 'Cache Clear' ? 'Purging...' : '🧹 Clear Cache'}
        </button>

        <button
          onClick={() => triggerAction('Audit Check', 1200, 'Vulnerabilities scan: 0 alerts found.')}
          disabled={loadingAction !== null}
          className="bg-cyan-50 border border-cyan-100/50 hover:border-cyan-200 text-cyan-700 text-[10px] font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-40"
        >
          {loadingAction === 'Audit Check' ? 'Auditing...' : '🛡 Security Scan'}
        </button>
      </div>

      {/* Action Logs Box */}
      {logs.length > 0 && (
        <div className="bg-slate-900 border border-slate-950 rounded-xl p-4 space-y-1 font-mono text-[9px] text-slate-350 max-h-36 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className={log.includes('completed') ? 'text-emerald-400' : 'text-slate-500'}>
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
