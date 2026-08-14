import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playAnthemSynth, playFanfare } from '../utils/audioSynth';
import { Flag, Play, Sparkles, Volume2, RefreshCw, Compass } from 'lucide-react';
import Gita4YouthLogo from './Gita4YouthLogo';

export default function FlagHoister({ setActiveTab }) {
  const [hoistPosition, setHoistPosition] = useState(0); // 0 to 100
  const [isHoisting, setIsHoisting] = useState(false);
  const [isFullyHoisted, setIsFullyHoisted] = useState(false);
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  const anthemLyrics = [
    { hi: "जन गण मन अधिनायक जय हे", en: "Jana Gana Mana Adhinayaka Jaya He" },
    { hi: "भारत भाग्य विधाता", en: "Bharata Bhagya Vidhata" },
    { hi: "पंजाब सिन्धु गुजरात मराठा", en: "Punjab Sindhu Gujarata Maratha" },
    { hi: "द्राविड़ उत्कल बंग", en: "Dravida Utkala Banga" },
    { hi: "विन्ध्य हिमाचल यमुना गंगा", en: "Vindhya Himachala Yamuna Ganga" },
    { hi: "उच्छल जलधि तरंग", en: "Uchchala Jaladhi Taranga" },
    { hi: "तव शुभ नामे जागे", en: "Tava Shubha Name Jage" },
    { hi: "तव शुभ आशिष मागे", en: "Tava Shubha Ashisha Mage" },
    { hi: "गाहे तव जय गाथा", en: "Gahe Tava Jaya Gatha" },
    { hi: "जन गण मंगल दायक जय हे", en: "Jana Gana Mangala Dayaka Jaya He" },
    { hi: "भारत भाग्य विधाता", en: "Bharata Bhagya Vidhata" },
    { hi: "जय हे, जय हे, जय हे", en: "Jaya He, Jaya He, Jaya He" },
    { hi: "जय जय जय जय हे!", en: "Jaya Jaya Jaya Jaya He!" }
  ];

  const triggerTricolorConfetti = () => {
    // Restrained, dignified confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#D97706', '#FFFFFF', '#15803D']
    });
  };

  const handleHoist = () => {
    if (isHoisting || isFullyHoisted) return;
    setIsHoisting(true);

    let currentPos = hoistPosition;
    const interval = setInterval(() => {
      currentPos += 2;
      setHoistPosition(currentPos);

      if (currentPos >= 100) {
        clearInterval(interval);
        setIsHoisting(false);
        setIsFullyHoisted(true);
        playFanfare();
        triggerTricolorConfetti();
        startAnthem();
      }
    }, 35);
  };

  const startAnthem = () => {
    setIsPlayingAnthem(true);
    setCurrentLyricIndex(0);

    let lyricIdx = 0;
    const lyricInterval = setInterval(() => {
      lyricIdx += 1;
      if (lyricIdx < anthemLyrics.length) {
        setCurrentLyricIndex(lyricIdx);
      } else {
        clearInterval(lyricInterval);
        setIsPlayingAnthem(false);
      }
    }, 1800);

    playAnthemSynth();
  };

  const handleReset = () => {
    setHoistPosition(0);
    setIsFullyHoisted(false);
    setIsPlayingAnthem(false);
    setCurrentLyricIndex(-1);
  };

  return (
    <div className="container-mobile" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div className="dharma-badge" style={{ marginBottom: '8px' }}>
          <Sparkles size={14} color="#F59E0B" />
          <span>Har Ghar Tiranga • Gita4Youth</span>
        </div>

        <h1 className="tricolor-gradient-text" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)', fontWeight: '800', lineHeight: 1.2 }}>
          NATIONAL FLAG HOIST
        </h1>
        <p style={{ color: '#CBD5E1', fontSize: '0.95rem', marginTop: '6px' }}>
          Unfurl the national flag with pride and honor the timeless spirit of Swatantrata.
        </p>
      </div>

      {/* Main Single Column Mobile-First Grid */}
      <div className="grid-mobile-single" style={{ gap: '20px' }}>
        
        {/* Flag Pole Stage */}
        <div className="card-dharma" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '380px',
          position: 'relative',
          overflow: 'hidden'
        }}>

          {/* Flag Pole Container */}
          <div style={{ position: 'relative', width: '100%', height: '280px', display: 'flex', justifyContent: 'center' }}>
            
            {/* Top Finial */}
            <div style={{
              position: 'absolute',
              top: '0',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#F59E0B',
              boxShadow: '0 0 10px #F59E0B',
              zIndex: 3
            }} />

            {/* Steel Pole */}
            <div style={{
              position: 'absolute',
              top: '8px',
              width: '6px',
              height: '260px',
              background: 'linear-gradient(90deg, #94A3B8, #F1F5F9 50%, #64748B)',
              borderRadius: '3px',
              zIndex: 1
            }} />

            {/* Raised Flag Element */}
            <div style={{
              position: 'absolute',
              top: `${220 - (hoistPosition * 2.1)}px`, // moves from bottom (220px) to top (10px)
              left: 'calc(50% + 3px)',
              width: '130px',
              height: '78px',
              transition: 'top 0.1s linear',
              zIndex: 2
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0 4px 4px 0',
                overflow: 'hidden',
                boxShadow: '2px 4px 10px rgba(0,0,0,0.4)'
              }}>
                <div style={{ flex: 1, background: '#D97706' }} />
                <div style={{
                  flex: 1,
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 40 40" width="24" height="24" className="animate-chakra-calm">
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

            {/* Base Pedestal */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              width: '120px',
              height: '18px',
              background: '#334155',
              borderRadius: '4px',
              zIndex: 3
            }} />
          </div>

          {/* Action Buttons with 48px Touch Targets */}
          <div style={{ marginTop: '16px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {!isFullyHoisted ? (
              <button
                onClick={handleHoist}
                disabled={isHoisting}
                className="btn-mobile-primary"
              >
                <Flag size={20} />
                <span>{isHoisting ? `Hoisting Flag (${hoistPosition}%)...` : 'Pull Rope & Hoist Flag 🇮🇳'}</span>
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <button
                  onClick={startAnthem}
                  className="btn-mobile-secondary"
                  style={{ flex: 1 }}
                >
                  <Play size={18} />
                  <span>Replay Anthem</span>
                </button>
                <button
                  onClick={handleReset}
                  className="btn-mobile-secondary"
                  style={{ width: '48px', minWidth: '48px', padding: 0 }}
                  aria-label="Reset Hoisting"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Anthem Lyrics & Gita Quote Panel */}
        <div className="card-dharma" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 size={20} color="#F59E0B" />
                <h3 style={{ fontSize: '1.15rem', color: '#FFF' }}>
                  National Anthem
                </h3>
              </div>
              <Gita4YouthLogo size="small" showTagline={false} />
            </div>

            {/* Lyrics Synchronized Display */}
            <div style={{
              background: 'rgba(7, 11, 21, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '10px',
              padding: '16px',
              minHeight: '130px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {currentLyricIndex >= 0 ? (
                <div>
                  <p className="font-quote" style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#F59E0B',
                    marginBottom: '6px'
                  }}>
                    {anthemLyrics[currentLyricIndex].hi}
                  </p>
                  <p style={{ fontSize: '0.92rem', color: '#E2E8F0', fontStyle: 'italic' }}>
                    {anthemLyrics[currentLyricIndex].en}
                  </p>
                </div>
              ) : (
                <div style={{ color: '#94A3B8' }}>
                  <p style={{ fontSize: '0.92rem', marginBottom: '4px' }}>Tap <strong>"Pull Rope & Hoist Flag"</strong> to unfurl the flag and play the National Anthem.</p>
                  <p style={{ fontSize: '0.8rem', color: '#F59E0B' }}>"Jana Gana Mana" • Composed by Rabindranath Tagore</p>
                </div>
              )}
            </div>

            {/* Gita Quote */}
            <div style={{
              background: 'rgba(217, 119, 6, 0.08)',
              borderLeft: '3px solid #F59E0B',
              padding: '12px 14px',
              borderRadius: '0 8px 8px 0'
            }}>
              <p className="font-quote" style={{ fontSize: '0.95rem', color: '#F59E0B', fontStyle: 'italic', marginBottom: '4px' }}>
                "Whatever action a noble leader performs, common citizens follow. Whatever standards they set, all the world pursues."
              </p>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: '600' }}>
                — Bhagavad Gita 3.21 | Youth Duty for Nation Building
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('trail')}
              className="btn-mobile-primary"
            >
              <Compass size={18} />
              <span>Explore Freedom & Gita Trail</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
