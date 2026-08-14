import React, { useState, useRef, useEffect } from 'react';
import { Image, Upload, Download, Sparkles, Layers } from 'lucide-react';
import Gita4YouthLogo from './Gita4YouthLogo';

export default function TirangaStudio() {
  const [userImage, setUserImage] = useState(null);
  const [slogan, setSlogan] = useState('Vande Mataram! 🇮🇳');
  const [gitaQuote, setGitaQuote] = useState('Karma - Duty Beyond Self');
  const [frameStyle, setFrameStyle] = useState('classic'); // 'classic', 'goldBorder', 'tricolorRing'

  const canvasRef = useRef(null);
  const sloganInputRef = useRef(null);

  const defaultImageSrc = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = userImage || defaultImageSrc;
    img.onload = () => {
      renderCanvas(img);
    };
  }, [userImage, slogan, gitaQuote, frameStyle]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Keyboard-aware input scroll focus helper
  const handleFocus = (ref) => {
    if (ref && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const renderCanvas = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 800;

    // Draw user photo
    ctx.drawImage(img, 0, 0, 800, 800);

    // Dark gradient overlay
    const textGrad = ctx.createLinearGradient(0, 500, 0, 800);
    textGrad.addColorStop(0, 'rgba(0,0,0,0)');
    textGrad.addColorStop(1, 'rgba(11,15,25,0.92)');
    ctx.fillStyle = textGrad;
    ctx.fillRect(0, 500, 800, 300);

    // Frame styling
    if (frameStyle === 'classic') {
      ctx.fillStyle = 'rgba(217, 119, 6, 0.9)';
      ctx.fillRect(0, 0, 800, 36);
      ctx.fillStyle = 'rgba(21, 128, 61, 0.9)';
      ctx.fillRect(0, 764, 800, 36);
    } else if (frameStyle === 'goldBorder') {
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, 786, 786);
    } else if (frameStyle === 'tricolorRing') {
      ctx.fillStyle = '#D97706';
      ctx.fillRect(0, 0, 16, 800);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(16, 0, 16, 800);
      ctx.fillStyle = '#15803D';
      ctx.fillRect(32, 0, 16, 800);
    }

    // Top Right Gita4Youth Branding Stamp
    ctx.fillStyle = 'rgba(11, 15, 25, 0.88)';
    ctx.fillRect(480, 24, 290, 60);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(480, 24, 290, 60);

    ctx.font = '800 16px Cinzel, serif';
    ctx.fillStyle = '#F59E0B';
    ctx.fillText('GITA', 495, 58);
    ctx.fillStyle = '#FFF';
    ctx.fillText('4', 542, 58);
    ctx.fillStyle = '#22C55E';
    ctx.fillText('YOUTH', 560, 58);

    ctx.font = '600 8px Poppins, sans-serif';
    ctx.fillStyle = '#F59E0B';
    ctx.fillText('WAY OF LIFE • ART OF LIVING & LEAVING', 495, 72);

    // Slogan
    ctx.font = '800 34px Rozha One, serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#F59E0B';
    ctx.fillText(slogan, 400, 690);

    // Gita Quote
    ctx.font = 'italic 18px Philosopher, serif';
    ctx.fillStyle = '#FEF3C7';
    ctx.fillText(`"${gitaQuote}"`, 400, 730);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `Gita4Youth_Tiranga_Profile_${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="container-mobile" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div className="dharma-badge" style={{ marginBottom: '8px' }}>
          <Image size={14} color="#F59E0B" />
          <span>Tiranga Profile Studio</span>
        </div>
        <h1 className="tricolor-gradient-text" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', fontWeight: '800' }}>
          PATRIOTIC PHOTO FRAME
        </h1>
        <p style={{ color: '#CBD5E1', fontSize: '0.95rem', marginTop: '4px' }}>
          Upload your photo, select slogans & Gita quotes, and download your high-resolution profile frame!
        </p>
      </div>

      <div className="grid-mobile-single" style={{ gap: '20px' }}>
        
        {/* Controls Panel */}
        <div className="card-dharma" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="#F59E0B" />
            <h2 style={{ fontSize: '1.15rem', color: '#FFF' }}>
              Frame Controls
            </h2>
          </div>

          {/* Photo Upload with 48px Target */}
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>
              Upload Your Photo:
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'rgba(217, 119, 6, 0.1)',
              border: '1px dashed #D97706',
              borderRadius: '10px',
              minHeight: '48px',
              padding: '12px',
              color: '#F59E0B',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.92rem'
            }}>
              <Upload size={18} />
              <span>Choose Photo File</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Slogan Input with 16px font and keyboard scroll */}
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>
              Slogan Text:
            </label>
            <input
              ref={sloganInputRef}
              type="text"
              value={slogan}
              onFocus={() => handleFocus(sloganInputRef)}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="e.g. Vande Mataram!"
            />
          </div>

          {/* Gita Quote Select */}
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>
              Gita Wisdom Tagline:
            </label>
            <select
              value={gitaQuote}
              onChange={(e) => setGitaQuote(e.target.value)}
            >
              <option value="Karma - Duty Beyond Self">Karma - Duty Beyond Self</option>
              <option value="Karmanye Vadhikaraste">Karmanye Vadhikaraste</option>
              <option value="Arise, Awake & Serve the Nation">Arise, Awake & Serve the Nation</option>
              <option value="Truth, Valor & Unity">Truth, Valor & Unity</option>
            </select>
          </div>

          {/* Frame Style Pills */}
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>
              Frame Theme:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'classic', label: 'Tricolor Bars' },
                { id: 'goldBorder', label: 'Gold Trim' },
                { id: 'tricolorRing', label: 'Side Ribbon' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFrameStyle(f.id)}
                  style={{
                    flex: 1,
                    minHeight: '44px',
                    background: frameStyle === f.id ? 'rgba(217, 119, 6, 0.2)' : 'rgba(7, 11, 21, 0.6)',
                    border: frameStyle === f.id ? '1px solid #D97706' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: frameStyle === f.id ? '#F59E0B' : '#CBD5E1',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="btn-mobile-primary"
            style={{ marginTop: '8px' }}
          >
            <Download size={18} />
            <span>Download HD Profile Image</span>
          </button>
        </div>

        {/* Live Canvas Studio Preview */}
        <div className="card-dharma" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ color: '#F59E0B', fontSize: '0.82rem', fontWeight: '600', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={15} /> 800x800 HD Canvas Preview
          </span>

          <div style={{
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '1/1',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
