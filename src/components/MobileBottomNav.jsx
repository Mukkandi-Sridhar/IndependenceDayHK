import React from 'react';
import { HelpCircle, Flag, Compass, Image, Flame } from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, isFeatured: true },
    { id: 'flag', label: 'Flag', icon: Flag },
    { id: 'trail', label: 'Heroes', icon: Compass },
    { id: 'studio', label: 'Frames', icon: Image },
    { id: 'tribute', label: 'Diyas', icon: Flame },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99,
      background: 'rgba(11, 15, 25, 0.96)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(245, 158, 11, 0.3)',
      padding: '6px 8px 8px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.6)'
    }} className="mobile-bottom-nav-only">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            style={{
              flex: 1,
              minHeight: '48px',
              background: isActive ? 'rgba(217, 119, 6, 0.2)' : 'transparent',
              border: isActive ? '1px solid #D97706' : '1px solid transparent',
              borderRadius: '12px',
              color: isActive ? '#F59E0B' : '#94A3B8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              cursor: 'pointer',
              padding: '4px 2px',
              position: 'relative',
              touchAction: 'manipulation'
            }}
          >
            {tab.isFeatured && !isActive && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                background: '#D97706',
                color: '#FFF',
                fontSize: '0.6rem',
                fontWeight: '700',
                padding: '1px 5px',
                borderRadius: '8px'
              }}>
                PLAY
              </span>
            )}
            <Icon size={20} color={isActive ? '#F59E0B' : '#94A3B8'} />
            <span style={{
              fontSize: '0.72rem',
              fontWeight: isActive ? '700' : '500'
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}

      <style>{`
        @media (min-width: 900px) {
          .mobile-bottom-nav-only {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
