import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FilePlus, Shield, BookOpen,
  Calendar, MessageSquare, Lightbulb, X, Car,
  Accessibility, FileText
} from 'lucide-react';
import TierBadge from '../herald/tierbadge'

const NAV_ITEMS = [
  { path: '/herald', icon: LayoutDashboard, label: 'Cases' },
  { path: '/herald/new', icon: FilePlus, label: 'New Case' },
  { path: '/herald/icbc', icon: Car, label: 'ICBC Guide' },
  { path: '/herald/pwd', icon: Accessibility, label: 'PWD Guide' },
  { path: '/herald/letters', icon: FileText, label: 'Letters' },
  { path: '/herald/rights', icon: BookOpen, label: 'Know Your Rights' },
  { path: '/herald/deadlines', icon: Calendar, label: 'Deadlines' },
  { path: '/herald/suggest', icon: Lightbulb, label: 'Suggest Tool' },
];

export default function HeraldSidebar({ user, isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside className={`
        fixed top-0 left-0 h-full z-50 w-64 bg-[#0a0a1a] border-r border-[#1a1a2e]
        flex flex-col transition-transform duration-300
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5 border-b border-[#1a1a2e]">
          <button onClick={onClose} className="lg:hidden absolute top-4 right-4 text-[#666]">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#c9a84c]" />
            <div>
              <h1 className="text-lg font-semibold text-[#c9a84c]" style={{ fontFamily: 'Cinzel, serif' }}>
                The Herald
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#666]">KoRT Advocate</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                  ${isActive
                    ? 'bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20'
                    : 'text-[#888] hover:text-[#ccc] hover:bg-[#ffffff06]'
                  }
                `}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1a1a2e]">
          {user && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] text-xs font-semibold">
                {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#ccc] truncate">{user.full_name || user.email}</p>
                <TierBadge role={user.role} />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
