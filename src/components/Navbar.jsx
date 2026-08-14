import React, { useState } from 'react';
import Gita4YouthLogo from './Gita4YouthLogo';
import { Flag, Compass, HelpCircle, Image, Flame, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'flag', label: 'Flag Hoisting', icon: Flag },
    { id: 'quiz', label: 'Independence Quiz', icon: HelpCircle },
    { id: 'trail', label: 'Freedom Fighters', icon: Compass },
    { id: 'studio', label: 'Photo Frames', icon: Image },
    { id: 'tribute', label: 'Diya Tributes', icon: Flame },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(11, 15, 25, 0.96)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
      padding: '10px 16px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Brand Logo */}
        <div onClick={() => { setActiveTab('flag'); setMobileMenuOpen(false); }} style={{ minHeight: '44px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Gita4YouthLogo size="small" />
        </div>

        {/* Desktop Nav Items */}
        <nav style={{ display: 'none', gap: '6px', alignItems: 'center' }} className="md-flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  minHeight: '44px',
                  background: isActive ? 'rgba(217, 119, 6, 0.18)' : 'transparent',
                  border: isActive ? '1px solid #D97706' : '1px solid transparent',
                  color: isActive ? '#F59E0B' : '#94A3B8',
                  padding: '8px 16px',
                  borderRadius: '22px',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? '600' : '500',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#F59E0B' : '#94A3B8'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Drawer Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              minHeight: '44px',
              minWidth: '44px',
              background: 'transparent',
              border: 'none',
              color: '#F8FAFC',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="md-hidden"
          >
            {mobileMenuOpen ? <X size={26} color="#F59E0B" /> : <Menu size={26} color="#F8FAFC" />}
          </button>
        </div>
      </div>

      {/* Mobile Single-Column Drawer */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: '10px',
          padding: '12px',
          background: '#0B0F19',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  minHeight: '48px',
                  background: isActive ? 'rgba(217, 119, 6, 0.18)' : 'transparent',
                  border: isActive ? '1px solid #D97706' : '1px solid transparent',
                  color: isActive ? '#F59E0B' : '#E2E8F0',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.98rem',
                  fontWeight: '600',
                  width: '100%'
                }}
              >
                <Icon size={20} color={isActive ? '#F59E0B' : '#94A3B8'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .md-flex { display: flex !important; }
          .md-hidden { display: none !important; }
        }
      `}</style>
    </header>
  );
}
