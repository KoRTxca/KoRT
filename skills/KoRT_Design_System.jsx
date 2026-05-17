import React from 'react';

/**
 * KoRT Sovereign Design System Tokens & Base UI Component Matrix
 * Use this file to import the "Quantum Aurum" branding protocols
 * directly into your Claude Design/Artifacts environment.
 */

export const KoRT_Tokens = {
  colors: {
    bgVoid: '#050608',
    bgCard: 'rgba(10, 12, 18, 0.75)',
    borderCard: 'rgba(212, 175, 55, 0.2)',
    gold: '#d4af37',
    goldBright: '#f9d71c',
    cyan: '#00f2ff',
    red: '#ff2a2a',
    green: '#00ff88',
    textPrimary: '#ffffff',
    textSecondary: '#a0a5b5',
  },
  typography: {
    fontFamilyBody: "'Outfit', sans-serif",
    fontFamilyHeader: "'Space Grotesk', sans-serif",
  },
  shadows: {
    card: '0 20px 50px rgba(0, 0, 0, 0.4)',
    cyanGlow: '0 0 15px rgba(0, 242, 255, 0.2)',
    goldGlow: '0 0 25px rgba(212, 175, 55, 0.3)',
  },
  effects: {
    glassBlur: 'blur(25px)',
  }
};

export const Card = ({ children, className = '', title, style = {} }) => {
  return (
    <div 
      className={`kort-card ${className}`}
      style={{
        background: KoRT_Tokens.colors.bgCard,
        backdropFilter: KoRT_Tokens.effects.glassBlur,
        WebkitBackdropFilter: KoRT_Tokens.effects.glassBlur,
        border: `1px solid ${KoRT_Tokens.colors.borderCard}`,
        borderRadius: '24px',
        padding: '2.5rem',
        marginBottom: '2.5rem',
        boxShadow: KoRT_Tokens.shadows.card,
        position: 'relative',
        overflow: 'hidden',
        borderTop: `3px solid ${KoRT_Tokens.colors.gold}`,
        color: KoRT_Tokens.colors.textPrimary,
        fontFamily: KoRT_Tokens.typography.fontFamilyBody,
        ...style
      }}
    >
      {title && (
        <h2 
          style={{
            fontFamily: KoRT_Tokens.typography.fontFamilyHeader,
            fontSize: '1.8rem',
            color: KoRT_Tokens.colors.gold,
            marginBottom: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            paddingBottom: '0.8rem',
            display: 'flex',
            alignItem: 'center',
            gap: '12px'
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export const Button = ({ children, onClick, variant = 'primary', style = {} }) => {
  const isPrimary = variant === 'primary';
  return (
    <button
      onClick={onClick}
      style={{
        background: isPrimary ? KoRT_Tokens.colors.gold : 'transparent',
        color: isPrimary ? '#000000' : KoRT_Tokens.colors.gold,
        border: isPrimary ? 'none' : `1px solid ${KoRT_Tokens.colors.gold}`,
        padding: '1rem 3rem',
        fontWeight: '800',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: KoRT_Tokens.typography.fontFamilyBody,
        boxShadow: isPrimary ? KoRT_Tokens.shadows.goldGlow : 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ...style
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        if (isPrimary) e.currentTarget.style.boxShadow = '0 0 35px #f9d71c';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        if (isPrimary) e.currentTarget.style.boxShadow = KoRT_Tokens.shadows.goldGlow;
      }}
    >
      {children}
    </button>
  );
};

export const HUDStatus = ({ status = 'ACTIVE', walletBalance = '1,250.00' }) => {
  return (
    <div
      style={{
        background: KoRT_Tokens.colors.bgCard,
        border: `1px solid ${KoRT_Tokens.colors.borderCard}`,
        borderRadius: '50px',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        backdropFilter: KoRT_Tokens.effects.glassBlur,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        width: 'fit-content',
        color: KoRT_Tokens.colors.textPrimary,
        fontFamily: KoRT_Tokens.typography.fontFamilyBody,
      }}
    >
      <div 
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: KoRT_Tokens.colors.green,
          boxShadow: `0 0 10px ${KoRT_Tokens.colors.green}`
        }}
      />
      <span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px' }}>
        SOVEREIGN {status}
      </span>
      <span style={{ opacity: 0.3 }}>|</span>
      <span style={{ color: KoRT_Tokens.colors.green, fontWeight: '800', fontSize: '0.85rem' }}>
        {walletBalance} DD
      </span>
    </div>
  );
};
