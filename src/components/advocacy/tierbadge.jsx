import React from 'react'

const TIER_CONFIG = {
  page:        { label: 'Page',        color: '#6b7280', bg: 'rgba(107,114,128,0.15)' },
  esquire:     { label: 'Esquire',     color: '#4a90d9', bg: 'rgba(74,144,217,0.15)'  },
  knight:      { label: 'Knight',      color: '#c9a84c', bg: 'rgba(201,168,76,0.15)'  },
  round_table: { label: 'Round Table', color: '#a855f7', bg: 'rgba(168,85,247,0.15)'  },
  admin:       { label: 'Admin',       color: '#ef4444', bg: 'rgba(239,68,68,0.15)'   },
  user:        { label: 'Page',        color: '#6b7280', bg: 'rgba(107,114,128,0.15)' },
};

export default function TierBadge({ role }) {
  const tier = TIER_CONFIG[role] || TIER_CONFIG.user;

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider"
      style={{ color: tier.color, backgroundColor: tier.bg, border: `1px solid ${tier.color}30` }}
    >
      {tier.label}
    </span>
  );
}
