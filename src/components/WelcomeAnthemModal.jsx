import React, { useState, useEffect } from 'react';
import { playAnthemSynth, playFanfare } from '../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Flag, Sparkles, HelpCircle, ArrowRight, X } from 'lucide-react';
import Gita4YouthLogo from './Gita4YouthLogo';

export default function WelcomeAnthemModal({ isOpen, onClose, setActiveTab }) {
  const [hoistPosition, setHoistPosition] = useState(0);
  const [isHoisting, setIsHoisting] = useState(false);
  const [isFullyHoisted, setIsFullyHoisted] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Automatically play Jana Gana Mana full song on open
      playAnthemSynth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const flowerTypes = ['🌸', '🌼', '🏵️', '🌺', '🌷', '🌸', '🌼', '🏵️'];

  const triggerFlowersAndConfetti = () => {
    setShowFlowers(true);
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D97706', '#FFFFFF', '#15803D', '#F59E0B']
    });
  };

  const handleHoist = () => {
    if (isHoisting || isFullyHoisted) return;
    setIsHoisting(true);

    let currentPos = hoistPosition;
    const interval = setInterval(() => {
      currentPos += 3;
      setHoistPosition(currentPos);

      if (currentPos >= 100) {
        clearInterval(interval);
        setIsHoisting(false);
        setIsFullyHoisted(true);
        playFanfare();
        triggerFlowersAndConfetti();
      }
    }, 25);
  };

  const handleGoToQuiz = () => {
    setActiveTab('quiz');
    onClose();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(7, 11, 21, 0.96)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px'
    }}>
      <div className="card-dharma" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '20px 16px',
        textAlign: 'center',
        position: 'relative',
        borderColor: '#D97706',
        boxShadow: '0 10px 40px rgba(217, 119, 6, 0.4)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            minHeight: '44px',
            minWidth: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Header Logo */}
        <div style={{ marginBottom: '8px' }}>
          <Gita4YouthLogo size="small" />
        </div>

        <div className="dharma-badge" style={{ marginBottom: '10px' }}>
          <Sparkles size={14} color="#F59E0B" />
          <span>Har Ghar Tiranga • Swatantrata Mahotsav</span>
        </div>

        {/* PROMINENT REALISTIC WAVING FLAG & FLOWER SHOWER CONTAINER */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '290px',
          display: 'flex',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(7, 11, 21, 0.99) 100%)',
          borderRadius: '14px',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          marginBottom: '16px',
          paddingTop: '10px',
          overflow: 'hidden'
        }}>

          {/* FLOWER PETAL SHOWER (PUSHPA VARSHA) */}
          {showFlowers && Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="flower-petal"
              style={{
                left: `${(i * 7) + 3}%`,
                animationDelay: `${(i * 0.22)}s`,
                animationDuration: `${2.2 + (i % 3) * 0.4}s`,
                fontSize: `${16 + (i % 4) * 4}px`
              }}
            >
              {flowerTypes[i % flowerTypes.length]}
            </span>
          ))}

          {/* Top Golden Finial Sphere */}
          <div style={{
            position: 'absolute',
            top: '8px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#F59E0B',
            boxShadow: '0 0 12px #F59E0B',
            zIndex: 3
          }} />

          {/* Pulley Wheel */}
          <div style={{
            position: 'absolute',
            top: '16px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            border: '2px solid #F59E0B',
            zIndex: 3
          }} />

          {/* Steel Pole */}
          <div style={{
            position: 'absolute',
            top: '18px',
            width: '8px',
            height: '255px',
            background: 'linear-gradient(90deg, #94A3B8, #F1F5F9 50%, #64748B)',
            borderRadius: '4px',
            zIndex: 1
          }} />

          {/* Visible Pulley Ropes */}
          <div style={{
            position: 'absolute',
            top: '24px',
            left: 'calc(50% - 6px)',
            width: '2px',
            height: '240px',
            background: 'rgba(245, 158, 11, 0.6)',
            zIndex: 2
          }} />
          <div style={{
            position: 'absolute',
            top: '24px',
            left: 'calc(50% + 4px)',
            width: '2px',
            height: '240px',
            background: 'rgba(245, 158, 11, 0.6)',
            zIndex: 2
          }} />

          {/* REALISTIC WAVING TRICOLOR FLAG FABRIC */}
          <div style={{
            position: 'absolute',
            top: `${200 - (hoistPosition * 1.85)}px`,
            left: 'calc(50% + 5px)',
            width: '190px',
            height: '114px',
            transition: 'top 0.08s linear',
            zIndex: 4,
            filter: 'drop-shadow(2px 6px 14px rgba(0,0,0,0.65))'
          }}>
            {/* Waving Fabric Wrapper */}
            <div className="flag-wave-animated" style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '0 6px 6px 0',
              overflow: 'hidden',
              boxShadow: '4px 6px 18px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255, 255, 255, 0.35)'
            }}>
              {/* Saffron Band */}
              <div style={{ flex: 1, background: '#D97706' }} />
              {/* White Band with Ashoka Chakra */}
              <div style={{
                flex: 1,
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg viewBox="0 0 40 40" width="34" height="34" className="animate-chakra-calm">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#1E1B4B" strokeWidth="1.6" />
                  <circle cx="20" cy="20" r="3.5" fill="#1E1B4B" />
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 360) / 24;
                    return (
                      <line
                        key={i}
                        x1="20"
                        y1="20"
                        x2={20 + 16 * Math.cos((angle * Math.PI) / 180)}
                        y2={20 + 16 * Math.sin((angle * Math.PI) / 180)}
                        stroke="#1E1B4B"
                        strokeWidth="1.1"
                      />
                    );
                  })}
                </svg>
              </div>
              {/* Green Band */}
              <div style={{ flex: 1, background: '#15803D' }} />
            </div>

            {/* Rope Ties to Pole */}
            <div style={{
              position: 'absolute',
              top: '4px',
              left: '-6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#F59E0B'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '4px',
              left: '-6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#F59E0B'
            }} />
          </div>

          {/* Heavy Pedestal Base */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            width: '140px',
            height: '16px',
            background: '#334155',
            borderRadius: '4px',
            zIndex: 3,
            border: '1px solid #64748B'
          }} />
        </div>

        {/* Action Button */}
        {!isFullyHoisted ? (
          <button
            onClick={handleHoist}
            disabled={isHoisting}
            className="btn-mobile-primary"
            style={{ minHeight: '52px', fontSize: '1.05rem' }}
          >
            <Flag size={22} />
            <span>{isHoisting ? `Hoisting Flag (${hoistPosition}%)...` : 'Pull Rope to Hoist Flag 🇮🇳'}</span>
          </button>
        ) : (
          <button
            onClick={handleGoToQuiz}
            className="btn-mobile-primary"
            style={{ minHeight: '52px', fontSize: '1.05rem' }}
          >
            <HelpCircle size={22} />
            <span>Now Play Independence Quiz</span>
            <ArrowRight size={20} />
          </button>
        )}

      </div>
    </div>
  );
}
