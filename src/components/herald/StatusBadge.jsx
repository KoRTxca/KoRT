import React from 'react';

const STATUS_CONFIG = {
  open:        { label: 'Open',        color: '#4a90d9' },
  in_progress: { label: 'In Progress', color: '#c9a84c' },
  waiting:     { label: 'Waiting',     color: '#f97316' },
  resolved:    { label: 'Resolved',    color: '#22c55e' },
  closed:      { label: 'Closed',      color: '#6b7280' },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.open;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium"
      style={{ color: config.color, backgroundColor: `${config.color}15` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
      {config.label}
    </span>
  );
}
