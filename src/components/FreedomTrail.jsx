import React, { useState } from 'react';
import { FREEDOM_FIGHTERS } from '../data/freedomFighters';
import { BookOpen, Volume2, Share2, Check, Compass } from 'lucide-react';

export default function FreedomTrail() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);

  const categories = ['All', 'Valor & Action', 'Truth & Ahimsa', 'Sacrifice', 'Shakti & Duty', 'Unity & Resolve', 'Spiritual Swaraj'];

  const filteredFighters = selectedCategory === 'All'
    ? FREEDOM_FIGHTERS
    : FREEDOM_FIGHTERS.filter(f => f.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleSpeak = (fighter) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      if (speakingId === fighter.id) {
        setSpeakingId(null);
        return;
      }

      const text = `${fighter.name}. ${fighter.tagline}. Gita Shloka: ${fighter.shloka.meaning}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);

      setSpeakingId(fighter.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (fighter) => {
    const text = `"${fighter.tagline}" - ${fighter.name}\n\n📖 Bhagavad Gita Wisdom (${fighter.shloka.chapter}):\n${fighter.shloka.sanskrit}\n\nGita4Youth • Way of Life 🇮🇳`;
    navigator.clipboard.writeText(text);
    setCopiedId(fighter.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="container-mobile" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div className="dharma-badge" style={{ marginBottom: '8px' }}>
          <Compass size={14} color="#F59E0B" />
          <span>Freedom & Gita Trail</span>
        </div>
        <h1 className="tricolor-gradient-text" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)', fontWeight: '800' }}>
          HEROES & GITA WISDOM
        </h1>
        <p style={{ color: '#CBD5E1', fontSize: '0.95rem', marginTop: '4px' }}>
          Discover how freedom leaders drew immortal courage and selflessness from the Bhagavad Gita.
        </p>
      </div>

      {/* Category Pills (44px touch height) */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '20px',
        scrollbarWidth: 'none'
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              minHeight: '44px',
              whiteSpace: 'nowrap',
              background: selectedCategory === cat ? 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' : 'rgba(15, 23, 42, 0.8)',
              border: selectedCategory === cat ? '1px solid #D97706' : '1px solid rgba(245, 158, 11, 0.25)',
              color: selectedCategory === cat ? '#FFF' : '#CBD5E1',
              padding: '8px 16px',
              borderRadius: '22px',
              cursor: 'pointer',
              fontSize: '0.84rem',
              fontWeight: '600',
              flexShrink: 0
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile-First Grid (Single Column on Mobile) */}
      <div className="grid-mobile-single" style={{ gap: '20px' }}>
        {filteredFighters.map((fighter) => (
          <div
            key={fighter.id}
            className="card-dharma"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{
                  background: 'rgba(217, 119, 6, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#F59E0B',
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  fontWeight: '600'
                }}>
                  {fighter.category}
                </span>
                <span style={{ color: '#F59E0B', fontSize: '0.78rem', fontWeight: '600' }}>
                  {fighter.dates}
                </span>
              </div>

              <h2 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '2px' }}>
                {fighter.name}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '0.82rem', fontWeight: '500', marginBottom: '12px' }}>
                {fighter.title}
              </p>

              {/* Quote Tagline */}
              <div style={{
                background: 'rgba(7, 11, 21, 0.8)',
                borderLeft: '3px solid #15803D',
                padding: '10px 12px',
                borderRadius: '0 6px 6px 0',
                marginBottom: '14px'
              }}>
                <p className="font-quote" style={{ color: '#F59E0B', fontSize: '0.98rem', fontStyle: 'italic', fontWeight: '600' }}>
                  "{fighter.tagline}"
                </p>
              </div>

              <p style={{ color: '#E2E8F0', fontSize: '0.88rem', lineHeight: '1.45', marginBottom: '14px' }}>
                {fighter.bio}
              </p>

              {/* Bhagavad Gita Shloka */}
              <div style={{
                background: 'rgba(20, 25, 45, 0.95)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '10px',
                padding: '12px',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <BookOpen size={14} color="#F59E0B" />
                  <span style={{ color: '#F59E0B', fontSize: '0.78rem', fontWeight: '700' }}>
                    {fighter.shloka.chapter}
                  </span>
                </div>

                <p className="font-quote" style={{
                  color: '#F8FAFC',
                  fontSize: '0.92rem',
                  fontWeight: '600',
                  lineHeight: '1.5',
                  marginBottom: '4px'
                }}>
                  {fighter.shloka.sanskrit}
                </p>

                <p style={{ color: '#CBD5E1', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  "{fighter.shloka.meaning}"
                </p>
              </div>
            </div>

            {/* Action Bar (44px touch targets) */}
            <div style={{
              display: 'flex',
              gap: '8px',
              paddingTop: '10px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <button
                onClick={() => handleSpeak(fighter)}
                className="btn-mobile-secondary"
                style={{ flex: 1, minHeight: '44px', padding: '8px 12px', fontSize: '0.82rem' }}
              >
                <Volume2 size={16} />
                <span>{speakingId === fighter.id ? 'Speaking...' : 'Listen'}</span>
              </button>

              <button
                onClick={() => handleCopy(fighter)}
                className="btn-mobile-secondary"
                style={{ flex: 1, minHeight: '44px', padding: '8px 12px', fontSize: '0.82rem' }}
              >
                {copiedId === fighter.id ? <Check size={16} color="#22C55E" /> : <Share2 size={16} />}
                <span>{copiedId === fighter.id ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
