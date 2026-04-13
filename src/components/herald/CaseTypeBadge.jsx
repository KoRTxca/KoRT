import React from 'react';

const CASE_TYPES = {
  icbc_claim:         { label: 'ICBC Claim',       emoji: '🚗', color: '#4a90d9' },
  pwd_disability:     { label: 'PWD/Disability',   emoji: '♿', color: '#a855f7' },
  housing_dispute:    { label: 'Housing Dispute',  emoji: '🏠', color: '#22c55e' },
  legal_letter:       { label: 'Legal Letter',     emoji: '⚖️', color: '#c9a84c' },
  benefits_assistance:{ label: 'Benefits/IA',      emoji: '📋', color: '#f97316' },
  other_government:   { label: 'Government Issue', emoji: '❓', color: '#6b7280' },
};

export default function CaseTypeBadge({ type, size = 'sm' }) {
  const config = CASE_TYPES[type] || CASE_TYPES.other_government;
  const isLarge = size === 'lg';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-medium ${
        isLarge ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'
      }`}
      style={{
        color: config.color,
        backgroundColor: `${config.color}15`,
        border: `1px solid ${config.color}30`
      }}
    >
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
}

export { CASE_TYPES };
