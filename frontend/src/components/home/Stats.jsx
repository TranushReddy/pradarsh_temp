import React from 'react';

export default function Stats() {
  const statsList = [
    { label: 'Active Projects', value: '420+', desc: 'Live portfolios and showcases cataloged.' },
    { label: 'Platform Uptime', value: '99.99%', desc: 'Registry cloud availability monitoring.' },
    { label: 'Build Deployments', value: '12.8K+', desc: 'Total applications hosted globally.' },
    { label: 'Instantiating Velocity', value: '< 12s', desc: 'Average build compilation times.' }
  ];

  return (
    <div className="bg-gray-50 border-y border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsList.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 hover:bg-gradient-to-r hover:from-white hover:to-accent-200/70 hover:border-primary-300 p-6 rounded-2xl transition-all duration-300 text-left group shadow-sm hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-1"
            >
              <div className="text-3xl font-black text-gray-900 group-hover:text-primary-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-[11px] font-black uppercase tracking-wider text-accent-500 mt-2 font-mono">
                {stat.label}
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
