import React, { useState } from 'react';
import { playAnthemSynth } from '../utils/audioSynth';
import { Play, HelpCircle, Flag, Compass, Image, Flame, X, ArrowRight } from 'lucide-react';
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
        maxWidth: '460px',
        width: '100%',
        padding: '24px 20px',
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
            top: '12px',
            right: '12px',
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

        {/* Logo */}
        <div style={{ marginBottom: '14px' }}>
          <Gita4YouthLogo size="medium" />
        </div>

        <h2 className="tricolor-gradient-text" style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '6px' }}>
          HAPPY INDEPENDENCE DAY!
        </h2>
        <p style={{ color: '#E2E8F0', fontSize: '0.9rem', marginBottom: '18px', lineHeight: '1.45' }}>
          Welcome to Gita4Youth — Way of Life! Celebrate India's 79th Independence Day.
        </p>

        {/* National Anthem Player */}
        <div style={{
          background: 'rgba(7, 11, 21, 0.9)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '18px'
        }}>
          <p style={{ color: '#F59E0B', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>
            NATIONAL ANTHEM
          </p>

          <button
            onClick={handlePlayAnthem}
            className="btn-mobile-secondary"
            style={{ minHeight: '46px', margin: '0 auto', maxWidth: '280px' }}
          >
            <Play size={18} />
            <span>{isPlaying ? 'Playing Anthem...' : 'Play National Anthem 🇮🇳'}</span>
          </button>
        </div>

        {/* Feature Navigation Pills */}
        <p style={{ color: '#94A3B8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '8px' }}>
          Quick Feature Guide:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
          <button
            onClick={() => { setActiveTab('quiz'); onClose(); }}
            style={{
              background: 'rgba(217, 119, 6, 0.2)',
              border: '1px solid #D97706',
              borderRadius: '8px',
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
            <span>Take Quiz</span>
          </button>

          <button
            onClick={() => { setActiveTab('flag'); onClose(); }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
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
            <span>Flag Hoisting</span>
          </button>

          <button
            onClick={() => { setActiveTab('trail'); onClose(); }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
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
            <span>Freedom Fighters</span>
          </button>

          <button
            onClick={() => { setActiveTab('tribute'); onClose(); }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
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
            <span>Diya Tributes</span>
          </button>
        </div>

        {/* Primary CTA */}
        <button
          onClick={handleStartQuiz}
          className="btn-mobile-primary"
        >
          <HelpCircle size={18} />
          <span>Play Independence Quiz</span>
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}
