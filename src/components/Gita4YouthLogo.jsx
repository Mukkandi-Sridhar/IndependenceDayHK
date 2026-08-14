import React from 'react';

export default function Gita4YouthLogo({ size = 'medium', showTagline = true }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';
  
  const iconDimensions = isSmall ? 40 : isLarge ? 72 : 52;
  
  return (
    <div className="flex items-center gap-3 cursor-pointer group" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      {/* Official Gita4Youth Lotus Logo Container */}
      <div style={{
        position: 'relative',
        width: `${iconDimensions}px`,
        height: `${iconDimensions}px`,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid #FFD700',
        boxShadow: '0 0 12px rgba(255, 153, 51, 0.5), inset 0 0 8px rgba(255, 215, 0, 0.3)',
        background: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <img
          src="/gita4youth-logo.png"
          alt="Gita4Youth Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span className="heading-cinzel" style={{ 
            fontSize: isSmall ? '1.2rem' : isLarge ? '2.2rem' : '1.6rem', 
            fontWeight: '900', 
            color: '#FF9933',
            letterSpacing: '1px'
          }}>
            GITA
          </span>
          <span className="heading-cinzel" style={{ 
            fontSize: isSmall ? '1.2rem' : isLarge ? '2.2rem' : '1.6rem', 
            fontWeight: '900', 
            color: '#FFFFFF',
            letterSpacing: '1px'
          }}>
            4
          </span>
          <span className="heading-cinzel" style={{ 
            fontSize: isSmall ? '1.2rem' : isLarge ? '2.2rem' : '1.6rem', 
            fontWeight: '900', 
            color: '#138808',
            letterSpacing: '1px'
          }}>
            YOUTH
          </span>
        </div>
        {showTagline && (
          <span style={{ 
            fontSize: isSmall ? '0.65rem' : isLarge ? '0.85rem' : '0.72rem', 
            color: '#FFD700', 
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            WAY OF LIFE • ART OF LIVING & LEAVING
          </span>
        )}
      </div>
    </div>
  );
}
