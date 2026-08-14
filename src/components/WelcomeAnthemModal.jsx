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

  const flowerTypes = ['🌸', '🌼', '🏵️', '🌺', '🌷', '🌹', '🌻', '🌸', '🌼', '🏵️'];

  const triggerFlowersAndConfetti = () => {
    setShowFlowers(true);
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.4 },
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
    <>
      {/* FULL-SCREEN ABUNDANT FLOWER PETAL SHOWER OVERLAY (PUSHPA VARSHA OVER ENTIRE SCREEN) */}
      {showFlowers && (
        <div className="full-screen-flower-container">
          {Array.from({ length: 42 }).map((_, i) => (
            <span
              key={i}
              className="full-screen-flower"
              style={{
                left: `${(i * 2.38) + 0.5}%`,
                animationDelay: `${(i % 8) * 0.28}s`,
                animationDuration: `${2.8 + (i % 5) * 0.5}s`,
                fontSize: `${20 + (i % 4) * 6}px`
              }}
            >
              {flowerTypes[i % flowerTypes.length]}
            </span>
          ))}
        </div>
      )}

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
          maxWidth: '440px',
          width: '100%',
          padding: '18px 14px',
          textAlign: 'center',
          position: 'relative',
          borderColor: '#D97706',
          boxShadow: '0 10px 40px rgba(217, 119, 6, 0.4)',
          overflow: 'hidden'
        }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>

          {/* Header Logo */}
          <div style={{ marginBottom: '6px' }}>
            <Gita4YouthLogo size="small" />
          </div>

          <div className="dharma-badge" style={{ marginBottom: '10px' }}>
            <Sparkles size={13} color="#F59E0B" />
            <span>Har Ghar Tiranga • Swatantrata Mahotsav</span>
          </div>

          {/* PERFECTLY CONTAINED FLAG DISPLAY STAGE */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '270px',
            display: 'flex',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(7, 11, 21, 0.99) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            marginBottom: '14px',
            paddingTop: '8px',
            overflow: 'hidden'
          }}>

            {/* Steel Pole Container (Shifted Left so Flag stays 100% inside card) */}
            <div style={{
              position: 'absolute',
              left: 'calc(50% - 68px)',
              top: '10px',
              bottom: '10px',
              width: '2px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              {/* Golden Finial Sphere */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '-8px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#F59E0B',
                boxShadow: '0 0 10px #F59E0B',
                zIndex: 3
              }} />

              {/* Pulley Wheel */}
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '-5px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid #F59E0B',
                zIndex: 3
              }} />

              {/* Steel Pole */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '-3px',
                width: '7px',
                height: '235px',
                background: 'linear-gradient(90deg, #94A3B8, #F1F5F9 50%, #64748B)',
                borderRadius: '3px',
                zIndex: 1
              }} />

              {/* Visible Pulley Ropes */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '-6px',
                width: '2px',
                height: '225px',
                background: 'rgba(245, 158, 11, 0.6)',
                zIndex: 2
              }} />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '4px',
                width: '2px',
                height: '225px',
                background: 'rgba(245, 158, 11, 0.6)',
                zIndex: 2
              }} />

              {/* PERFECTLY PROPORTIONED TRICOLOR FLAG (135px x 81px) */}
              <div style={{
                position: 'absolute',
                top: `${175 - (hoistPosition * 1.6)}px`,
                left: '4px',
                width: '135px',
                height: '81px',
                transition: 'top 0.08s linear',
                zIndex: 4,
                filter: 'drop-shadow(2px 4px 10px rgba(0,0,0,0.65))'
              }}>
                {/* Waving Fabric Wrapper */}
                <div className="flag-wave-animated" style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '0 5px 5px 0',
                  overflow: 'hidden',
                  boxShadow: '3px 4px 14px rgba(0,0,0,0.6)',
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
                    <svg viewBox="0 0 40 40" width="25" height="25" className="animate-chakra-calm">
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
                  top: '3px',
                  left: '-5px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#F59E0B'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '3px',
                  left: '-5px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#F59E0B'
                }} />
              </div>

              {/* Base Pedestal */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '-55px',
                width: '110px',
                height: '14px',
                background: '#334155',
                borderRadius: '4px',
                zIndex: 3,
                border: '1px solid #64748B'
              }} />
            </div>

          </div>

          {/* Action Button */}
          {!isFullyHoisted ? (
            <button
              onClick={handleHoist}
              disabled={isHoisting}
              className="btn-mobile-primary"
              style={{ minHeight: '48px', fontSize: '1rem' }}
            >
              <Flag size={20} />
              <span>{isHoisting ? `Hoisting Flag (${hoistPosition}%)...` : 'Pull Rope to Hoist Flag 🇮🇳'}</span>
            </button>
          ) : (
            <button
              onClick={handleGoToQuiz}
              className="btn-mobile-primary"
              style={{ minHeight: '48px', fontSize: '1rem' }}
            >
              <HelpCircle size={20} />
              <span>Now Play Independence Quiz</span>
              <ArrowRight size={18} />
            </button>
          )}

        </div>
      </div>
    </>
  );
}
