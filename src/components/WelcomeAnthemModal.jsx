import React, { useState } from 'react';
import { playAnthemSynth, playFanfare } from '../utils/audioSynth';
import { Play, Sparkles, HelpCircle, Flag, Compass, Image, Flame, X, ArrowRight } from 'lucide-react';
import Gita4YouthLogo from './Gita4YouthLogo';

export default function WelcomeAnthemModal({ isOpen, onClose, setActiveTab }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const handlePlayAnthem = () => {
    setIsPlaying(true);
    playAnthemSynth();
  };

  const handleStartQuiz = () => {
    setActiveTab('quiz');
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(7, 11, 21, 0.94)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="card-dharma" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '24px',
        textAlign: 'center',
        position: 'relative',
        borderColor: '#D97706',
        boxShadow: '0 8px 30px rgba(217, 119, 6, 0.3)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
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

        {/* Logo & Welcome */}
        <div style={{ marginBottom: '16px' }}>
          <Gita4YouthLogo size="medium" />
        </div>

        <h2 className="tricolor-gradient-text" style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '6px' }}>
          SWATANTRATA MAHOTSAV
        </h2>
        <p style={{ color: '#E2E8F0', fontSize: '0.92rem', marginBottom: '20px', lineHeight: '1.45' }}>
          Welcome! Experience India's 79th Independence Day with Gita4Youth — Way of Life.
        </p>

        {/* National Anthem Player Box */}
        <div style={{
          background: 'rgba(7, 11, 21, 0.9)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <p style={{ color: '#F59E0B', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>
            NATIONAL ANTHEM AUDIO
          </p>

          <button
            onClick={handlePlayAnthem}
            className="btn-mobile-secondary"
            style={{ minHeight: '48px', margin: '0 auto', maxWidth: '300px' }}
          >
            <Play size={18} />
            <span>{isPlaying ? 'Playing Jana Gana Mana...' : 'Play National Anthem 🇮🇳'}</span>
          </button>
        </div>

        {/* Feature Discovery Popups Grid */}
        <p style={{ color: '#94A3B8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '10px' }}>
          Explore Interactive Features:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => { setActiveTab('quiz'); onClose(); }}
            style={{
              background: 'rgba(217, 119, 6, 0.18)',
              border: '1px solid #D97706',
              borderRadius: '10px',
              padding: '10px',
              color: '#F59E0B',
              fontSize: '0.82rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <HelpCircle size={16} />
            <span>Patriot Quiz</span>
          </button>

          <button
            onClick={() => { setActiveTab('flag'); onClose(); }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '10px',
              color: '#E2E8F0',
              fontSize: '0.82rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Flag size={16} />
            <span>Flag Hoist</span>
          </button>

          <button
            onClick={() => { setActiveTab('trail'); onClose(); }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '10px',
              color: '#E2E8F0',
              fontSize: '0.82rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Compass size={16} />
            <span>Freedom Trail</span>
          </button>

          <button
            onClick={() => { setActiveTab('tribute'); onClose(); }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '10px',
              color: '#E2E8F0',
              fontSize: '0.82rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Flame size={16} />
            <span>Diya Wall</span>
          </button>
        </div>

        {/* Primary CTA: Take Quiz Now */}
        <button
          onClick={handleStartQuiz}
          className="btn-mobile-primary"
        >
          <HelpCircle size={20} />
          <span>Take Patriot Quiz Now</span>
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}
