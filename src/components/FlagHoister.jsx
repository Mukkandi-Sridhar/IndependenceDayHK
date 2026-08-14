import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playAnthemSynth, playFanfare } from '../utils/audioSynth';
import { Flag, Play, Sparkles, Volume2, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';
import Gita4YouthLogo from './Gita4YouthLogo';

export default function FlagHoister({ setActiveTab }) {
  const [hoistPosition, setHoistPosition] = useState(0);
  const [isHoisting, setIsHoisting] = useState(false);
  const [isFullyHoisted, setIsFullyHoisted] = useState(false);
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [showFlowers, setShowFlowers] = useState(false);

  const anthemLyrics = [
    { hi: "जन गण मन अधिनायक जय हे", en: "Jana Gana Mana Adhinayaka Jaya He" },
    { hi: "भारत भाग्य विधाता", en: "Bharata Bhagya Vidhata" },
    { hi: "पंजाब सिन्धु गुजरात मराठा", en: "Punjab Sindhu Gujarata Maratha" },
    { hi: "द्राविड़ उत्कल बंग", en: "Dravida Utkala Banga" },
    { hi: "विन्ध्य हिमाचल यमुना गंगा", en: "Vindhya Himachala Yamuna Ganga" },
    { hi: "उच्छल जलधि तरंग", en: "Uchchala Jaladhi Taranga" },
    { hi: "तव शुभ नामे जागे", en: "Tava Shubha Name Jage" },
    { hi: "तव शुभ आशिष मागे", en: "Tava Shubha Gatha" },
    { hi: "जन गण मंगल दायक जय हे", en: "Jana Gana Mangala Dayaka Jaya He" },
    { hi: "भारत भाग्य विधाता", en: "Bharata Bhagya Vidhata" },
    { hi: "जय हे, जय हे, जय हे", en: "Jaya He, Jaya He, Jaya He" },
    { hi: "जय जय जय जय हे!", en: "Jaya Jaya Jaya Jaya He!" }
  ];

  const flowerTypes = ['🌸', '🌼', '🏵️', '🌺', '🌷', '🌸', '🌼', '🏵️'];

  useEffect(() => {
    startAnthem();
  }, []);

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
        startAnthem();
      }
    }, 25);
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
    }, 1700);

    playAnthemSynth();
  };

  const handleReset = () => {
    setHoistPosition(0);
    setIsFullyHoisted(false);
    setIsPlayingAnthem(false);
    setCurrentLyricIndex(-1);
    setShowFlowers(false);
  };

  const handleGoToQuiz = () => {
    setActiveTab('quiz');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="container-mobile" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div className="dharma-badge" style={{ marginBottom: '6px' }}>
          <Sparkles size={14} color="#F59E0B" />
          <span>Har Ghar Tiranga • Gita4Youth</span>
        </div>

        <h1 className="tricolor-gradient-text" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)', fontWeight: '800', lineHeight: 1.2 }}>
          HOIST THE TRICOLOR FLAG
        </h1>
        <p style={{ color: '#CBD5E1', fontSize: '0.95rem', marginTop: '4px' }}>
          Pull the rope below to hoist the national flag & play the National Anthem song at full sound!
        </p>
      </div>

      {/* Main Flag Stage */}
      <div className="grid-mobile-single" style={{ gap: '20px' }}>
        
        {/* GRAND REALISTIC WAVING FLAG DISPLAY STAGE (PERFECTLY CONTAINED) */}
        <div className="card-dharma" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '380px',
          position: 'relative',
          overflow: 'hidden'
        }}>

          {/* FLOWER PETAL SHOWER (PUSHPA VARSHA) */}
          {showFlowers && Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="flower-petal"
              style={{
                left: `${(i * 6) + 2}%`,
                animationDelay: `${(i * 0.2)}s`,
                animationDuration: `${2.2 + (i % 3) * 0.4}s`,
                fontSize: `${18 + (i % 4) * 4}px`
              }}
            >
              {flowerTypes[i % flowerTypes.length]}
            </span>
          ))}

          {/* Steel Pole Container (Shifted Left so Flag stays 100% inside card) */}
          <div style={{
            position: 'absolute',
            left: 'calc(50% - 68px)',
            top: '12px',
            bottom: '12px',
            width: '2px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {/* Top Golden Finial Sphere */}
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
              height: '250px',
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
              height: '240px',
              background: 'rgba(245, 158, 11, 0.6)',
              zIndex: 2
            }} />
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '4px',
              width: '2px',
              height: '240px',
              background: 'rgba(245, 158, 11, 0.6)',
              zIndex: 2
            }} />

            {/* PERFECTLY CONTAINED TRICOLOR FLAG (135px x 81px) */}
            <div style={{
              position: 'absolute',
              top: `${190 - (hoistPosition * 1.75)}px`,
              left: '4px',
              width: '135px',
              height: '81px',
              transition: 'top 0.1s linear',
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
                <div style={{ flex: 1, background: '#D97706' }} />
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

          {/* Action Buttons */}
          <div style={{ marginTop: '16px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <button
                  onClick={handleGoToQuiz}
                  className="btn-mobile-primary"
                  style={{ minHeight: '48px', fontSize: '1rem' }}
                >
                  <HelpCircle size={20} />
                  <span>Now Take the Independence Quiz</span>
                  <ArrowRight size={18} />
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={startAnthem}
                    className="btn-mobile-secondary"
                    style={{ flex: 1 }}
                  >
                    <Play size={18} />
                    <span>Replay Song</span>
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
              </div>
            )}
          </div>
        </div>

        {/* Anthem Lyrics & Quick Quiz Redirect Banner */}
        <div className="card-dharma" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 size={20} color="#F59E0B" />
                <h3 style={{ fontSize: '1.15rem', color: '#FFF' }}>
                  National Anthem Song
                </h3>
              </div>
              <Gita4YouthLogo size="small" showTagline={false} />
            </div>

            {/* Lyrics Display */}
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
                  <p style={{ fontSize: '0.92rem', marginBottom: '4px' }}>Jana Gana Mana song playing at full volume.</p>
                  <p style={{ fontSize: '0.8rem', color: '#F59E0B' }}>"Jana Gana Mana" • Tagore</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleGoToQuiz}
            className="btn-mobile-primary"
            style={{ minHeight: '48px', fontSize: '1rem' }}
          >
            <HelpCircle size={20} />
            <span>Go to Independence Quiz</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
