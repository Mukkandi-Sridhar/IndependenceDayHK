import React from 'react';
import Gita4YouthLogo from './Gita4YouthLogo';

export default function Footer({ setActiveTab }) {
  return (
    <footer style={{
      marginTop: '40px',
      background: '#070B15',
      borderTop: '1px solid rgba(245, 158, 11, 0.2)',
      padding: '32px 16px 24px'
    }}>
      <div className="container-mobile" style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: 0
      }}>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px'
        }}>
          <Gita4YouthLogo size="medium" />
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', maxWidth: '420px', lineHeight: '1.45' }}>
            Empowering youth through Bhagavad Gita's timeless principles of duty (Karma), courage (Virya), and national unity.
          </p>

          {/* Quick Nav Pills (44px touch targets) */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { id: 'flag', label: 'Flag Hoist' },
              { id: 'trail', label: 'Freedom Trail' },
              { id: 'quiz', label: 'Independence Quiz' },
              { id: 'studio', label: 'Tiranga Studio' },
              { id: 'tribute', label: 'Diya Wall' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  minHeight: '44px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#CBD5E1',
                  borderRadius: '22px',
                  padding: '8px 14px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(245, 158, 11, 0.15)' }} />

        <div style={{
          textAlign: 'center',
          color: '#64748B',
          fontSize: '0.78rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <p>© 2026 Gita4Youth Movement • Way of Life</p>
          <p style={{ color: '#F59E0B' }}>Swatantrata Mahotsav • India 79th Independence Day</p>
        </div>

      </div>
    </footer>
  );
}
