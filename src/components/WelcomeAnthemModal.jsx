import React, { useState, useEffect } from 'react';
import { playAnthemSynth, playFanfare } from '../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Flag, Sparkles, HelpCircle, ArrowRight, X } from 'lucide-react';
import Gita4YouthLogo from './Gita4YouthLogo';

export default function WelcomeAnthemModal({ isOpen, onClose, setActiveTab }) {
  const [hoistPosition, setHoistPosition] = useState(0);
  const [isHoisting, setIsHoisting] = useState(false);
  const [isFullyHoisted, setIsFullyHoisted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Automatically play National Anthem song at full volume on opening! No button needed.
      playAnthemSynth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleHoist = () => {
    if (isHoisting || isFullyHoisted) return;
    setIsHoisting(true);

    let currentPos = hoistPosition;
    const interval = setInterval(() => {
      currentPos += 4;
      setHoistPosition(currentPos);

      if (currentPos >= 100) {
        clearInterval(interval);
        setIsHoisting(false);
        setIsFullyHoisted(true);
        playFanfare();
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#D97706', '#FFFFFF', '#15803D']
        });
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
      background: 'rgba(7, 11, 21, 0.95)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '14px'
    }}>
      <div className="card-dharma" style={{
        maxWidth: '440px',
        width: '100%',
        padding: '20px 16px',
        textAlign: 'center',
        position: 'relative',
        borderColor: '#D97706',
        boxShadow: '0 8px 30px rgba(217, 119, 6, 0.35)'
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
          <X size={22} />
        </button>

        {/* Header Logo */}
        <div style={{ marginBottom: '10px' }}>
          <Gita4YouthLogo size="small" />
        </div>

        <div className="dharma-badge" style={{ marginBottom: '8px' }}>
          <Sparkles size={13} color="#F59E0B" />
          <span>Har Ghar Tiranga • Swatantrata Mahotsav</span>
        </div>

        {/* Flag Pole Simulation Inside Popup */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          display: 'flex',
          justifyContent: 'center',
          background: 'rgba(7, 11, 21, 0.8)',
          borderRadius: '12px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          marginBottom: '14px',
          paddingTop: '10px'
        }}>
          {/* Top Finial */}
          <div style={{
            position: 'absolute',
            top: '8px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#F59E0B',
            boxShadow: '0 0 8px #F59E0B',
            zIndex: 3
          }} />

          {/* Steel Pole */}
          <div style={{
            position: 'absolute',
            top: '14px',
            width: '5px',
            height: '180px',
            background: 'linear-gradient(90deg, #94A3B8, #F1F5F9 50%, #64748B)',
            borderRadius: '3px',
            zIndex: 1
          }} />

          {/* Flag Fabric Element */}
          <div style={{
            position: 'absolute',
            top: `${150 - (hoistPosition * 1.35)}px`,
            left: 'calc(50% + 2px)',
            width: '110px',
            height: '66px',
            transition: 'top 0.08s linear',
            zIndex: 2
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '0 4px 4px 0',
              overflow: 'hidden',
              boxShadow: '2px 4px 8px rgba(0,0,0,0.5)'
            }}>
              <div style={{ flex: 1, background: '#D97706' }} />
              <div style={{
                flex: 1,
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg viewBox="0 0 40 40" width="20" height="20" className="animate-chakra-calm">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#1E1B4B" strokeWidth="1.5" />
                  <circle cx="20" cy="20" r="3" fill="#1E1B4B" />
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
                        strokeWidth="0.9"
                      />
                    );
                  })}
                </svg>
              </div>
              <div style={{ flex: 1, background: '#15803D' }} />
            </div>
          </div>

          {/* Pedestal */}
          <div style={{
            position: 'absolute',
            bottom: '6px',
            width: '100px',
            height: '14px',
            background: '#334155',
            borderRadius: '3px',
            zIndex: 3
          }} />
        </div>

        {/* Action Button inside Popup */}
        {!isFullyHoisted ? (
          <button
            onClick={handleHoist}
            disabled={isHoisting}
            className="btn-mobile-primary"
          >
            <Flag size={20} />
            <span>{isHoisting ? `Hoisting Flag (${hoistPosition}%)...` : 'Pull Rope to Hoist Flag 🇮🇳'}</span>
          </button>
        ) : (
          <button
            onClick={handleGoToQuiz}
            className="btn-mobile-primary"
          >
            <HelpCircle size={20} />
            <span>Now Play Independence Quiz</span>
            <ArrowRight size={18} />
          </button>
        )}

      </div>
    </div>
  );
}
