import React, { useState, useEffect, useRef } from 'react';
import { dbService } from '../services/dbService';
import confetti from 'canvas-confetti';
import { Flame, Send, Sparkles, MapPin, Clock } from 'lucide-react';
import Gita4YouthLogo from './Gita4YouthLogo';

export default function TributeWall() {
  const [tributes, setTributes] = useState([]);
  const [totalDiyas, setTotalDiyas] = useState(1947);
  const [hasLitDiya, setHasLitDiya] = useState(false);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const nameInputRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    // Load from DB
    setTributes(dbService.getTributes());
    setTotalDiyas(dbService.getTotalDiyas());
  }, []);

  const handleLightDiya = () => {
    const updatedCount = dbService.incrementDiyas();
    setTotalDiyas(updatedCount);
    setHasLitDiya(true);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#D97706', '#F59E0B', '#15803D']
    });
  };

  const handleFocus = (ref) => {
    if (ref && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const handlePostTribute = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newTribute = {
      id: Date.now().toString(),
      name: name.trim(),
      location: location.trim() || 'Bharat',
      message: message.trim(),
      timestamp: 'Just now',
      diyasLit: 1
    };

    // Save to DB
    const updated = dbService.addTribute(newTribute);
    setTributes(updated);

    const updatedCount = dbService.incrementDiyas();
    setTotalDiyas(updatedCount);
    setHasLitDiya(true);

    setName('');
    setLocation('');
    setMessage('');

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#D97706', '#F59E0B', '#15803D']
    });
  };

  return (
    <div className="container-mobile" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '70px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div className="dharma-badge" style={{ marginBottom: '6px' }}>
          <Flame size={14} color="#F59E0B" />
          <span>Swatantrata Veero Ko Naman</span>
        </div>
        <h1 className="tricolor-gradient-text" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', fontWeight: '800' }}>
          VIRTUAL DIYA WALL
        </h1>
        <p style={{ color: '#CBD5E1', fontSize: '0.92rem', marginTop: '2px' }}>
          Light a digital Diya of gratitude for India's freedom martyrs and post your tribute.
        </p>
      </div>

      {/* Diya Counter Box */}
      <div className="card-dharma" style={{
        textAlign: 'center',
        marginBottom: '16px',
        borderColor: 'rgba(245, 158, 11, 0.4)',
        padding: '20px 16px'
      }}>
        <div style={{ display: 'inline-block', marginBottom: '8px' }}>
          <svg viewBox="0 0 60 90" width="50" height="70" className={hasLitDiya ? "animate-flame-calm" : ""}>
            <path d="M 5 60 Q 30 90 55 60 Q 50 45 30 50 Q 10 45 5 60 Z" fill="#B45309" stroke="#F59E0B" strokeWidth="2" />
            <ellipse cx="30" cy="52" rx="20" ry="6" fill="#78350F" />
            <path
              d="M 30 10 Q 42 35 30 50 Q 18 35 30 10 Z"
              fill="url(#flameGradRestrained2)"
            />
            <defs>
              <linearGradient id="flameGradRestrained2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="60%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', color: '#F59E0B', marginBottom: '2px', fontWeight: '800' }}>
          {totalDiyas.toLocaleString()} DIYAS LIT (DB STORED)
        </h2>

        <button
          onClick={handleLightDiya}
          className="btn-mobile-primary"
          style={{ marginTop: '10px' }}
        >
          <Flame size={18} />
          <span>{hasLitDiya ? 'Light Another Diya 🪔' : 'Light a Digital Diya 🪔'}</span>
        </button>
      </div>

      {/* Grid: Form + Feed */}
      <div className="grid-mobile-single" style={{ gap: '16px' }}>
        
        {/* Form */}
        <div className="card-dharma">
          <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Send size={16} color="#F59E0B" /> Post Your Tribute
          </h3>

          <form onSubmit={handlePostTribute} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>
                Your Name:
              </label>
              <input
                ref={nameInputRef}
                type="text"
                required
                value={name}
                onFocus={() => handleFocus(nameInputRef)}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Mukherjee"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>
                City / State:
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kolkata, West Bengal"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>
                Tribute Message:
              </label>
              <textarea
                ref={messageInputRef}
                required
                rows={3}
                value={message}
                onFocus={() => handleFocus(messageInputRef)}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="btn-mobile-primary"
              style={{ marginTop: '4px' }}
            >
              <span>Submit & Save to Database</span>
            </button>
          </form>
        </div>

        {/* Live Feed */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="#F59E0B" /> Database Tributes Feed ({tributes.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
            {tributes.map((item) => (
              <div key={item.id} className="card-dharma" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '0.92rem' }}>
                    {item.name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontSize: '0.72rem' }}>
                    <Flame size={12} color="#D97706" />
                    <span>Diya Lit</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', fontSize: '0.72rem', marginBottom: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <MapPin size={11} /> {item.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={11} /> {item.timestamp}
                  </span>
                </div>

                <p className="font-quote" style={{ color: '#E2E8F0', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: '1.4' }}>
                  "{item.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
