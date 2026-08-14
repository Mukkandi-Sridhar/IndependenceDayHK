import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { playFanfare } from '../utils/audioSynth';
import { dbService } from '../services/dbService';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle, XCircle, Trophy, RefreshCw, ArrowRight, Flame, User, Phone, MapPin, Check, Database } from 'lucide-react';
import Gita4YouthLogo from './Gita4YouthLogo';

export default function QuizModule({ setActiveTab }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const [quizStep, setQuizStep] = useState('quiz');

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPlace, setUserPlace] = useState('');
  const [isGita4YouthMember, setIsGita4YouthMember] = useState('Yes');

  const [highScore, setHighScore] = useState(0);
  const [dbSubmissions, setDbSubmissions] = useState([]);

  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const placeInputRef = useRef(null);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  useEffect(() => {
    setHighScore(dbService.getHighScore());
    setDbSubmissions(dbService.getQuizSubmissions());
  }, []);

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowExplanation(true);

    if (index === currentQ.answer) {
      setScore(prev => prev + 10);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setQuizStep('form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFocus = (ref) => {
    if (ref && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim() || !userPlace.trim()) return;

    const badge = score >= 80 ? 'Freedom Hero Honor' : score >= 50 ? 'Knowledge Seeker Honor' : 'Young Patriot';

    const userData = {
      name: userName.trim(),
      phone: userPhone.trim(),
      place: userPlace.trim(),
      isGita4YouthMember: isGita4YouthMember,
      score: score,
      totalQuestions: QUIZ_QUESTIONS.length,
      badge: badge
    };

    const updatedDb = await dbService.saveQuizSubmission(userData);
    setDbSubmissions(updatedDb);
    setHighScore(dbService.getHighScore());

    setQuizStep('results');
    playFanfare();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setQuizStep('quiz');
    setUserName('');
    setUserPhone('');
    setUserPlace('');
    setIsGita4YouthMember('Yes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-mobile" style={{ maxWidth: '720px', margin: '0 auto', paddingBottom: quizStep === 'quiz' && showExplanation ? '80px' : '60px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div className="dharma-badge" style={{ marginBottom: '6px' }}>
          <HelpCircle size={14} color="#F59E0B" />
          <span>Test Your Knowledge</span>
        </div>
        <h1 className="tricolor-gradient-text" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: '800' }}>
          INDEPENDENCE DAY QUIZ
        </h1>
        {highScore > 0 && (
          <p style={{ color: '#F59E0B', fontSize: '0.82rem', fontWeight: '600', marginTop: '2px' }}>
            🏆 High Score: {highScore} pts
          </p>
        )}
      </div>

      {/* STEP 1: QUIZ QUESTIONS */}
      {quizStep === 'quiz' && (
        <div className="card-dharma" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ color: '#F59E0B', fontSize: '0.85rem', fontWeight: '700' }}>
              Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(217, 119, 6, 0.12)', padding: '4px 10px', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <Trophy size={14} color="#F59E0B" />
              <span style={{ color: '#F59E0B', fontSize: '0.85rem', fontWeight: '700' }}>
                Score: {score}
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', marginBottom: '16px', overflow: 'hidden' }}>
            <div style={{
              width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #D97706, #15803D)',
              transition: 'width 0.3s ease'
            }} />
          </div>

          <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)', color: '#FFFFFF', lineHeight: '1.4', marginBottom: '18px' }}>
            {currentQ.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {currentQ.options.map((option, idx) => {
              let btnStyle = {
                background: 'rgba(7, 11, 21, 0.8)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: '#F8FAFC'
              };

              if (selectedOption !== null) {
                if (idx === currentQ.answer) {
                  btnStyle = {
                    background: 'rgba(21, 128, 61, 0.25)',
                    border: '1.5px solid #22C55E',
                    color: '#4ADE80'
                  };
                } else if (idx === selectedOption) {
                  btnStyle = {
                    background: 'rgba(220, 38, 38, 0.25)',
                    border: '1.5px solid #EF4444',
                    color: '#F87171'
                  };
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  style={{
                    ...btnStyle,
                    minHeight: '52px',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    textAlign: 'left',
                    cursor: selectedOption === null ? 'pointer' : 'default',
                    fontSize: '0.98rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    touchAction: 'manipulation'
                  }}
                >
                  <span style={{ paddingRight: '8px' }}>{option}</span>
                  {selectedOption !== null && idx === currentQ.answer && (
                    <CheckCircle size={20} color="#4ADE80" style={{ flexShrink: 0 }} />
                  )}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQ.answer && (
                    <XCircle size={20} color="#F87171" style={{ flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div style={{
              background: 'rgba(20, 25, 45, 0.95)',
              borderLeft: '4px solid #F59E0B',
              padding: '12px 14px',
              borderRadius: '0 8px 8px 0',
              marginTop: '12px'
            }}>
              <p style={{ color: '#F59E0B', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '2px' }}>
                Explanation:
              </p>
              <p style={{ color: '#E2E8F0', fontSize: '0.88rem', lineHeight: '1.4' }}>
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: USER DETAILS SUBMISSION FORM */}
      {quizStep === 'form' && (
        <div className="card-dharma" style={{ padding: '24px 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <Gita4YouthLogo size="small" />
            </div>
            <h2 style={{ fontSize: '1.35rem', color: '#FFF', fontWeight: '700' }}>
              Save Your Score & Details
            </h2>
            <p style={{ color: '#F59E0B', fontSize: '0.92rem', fontWeight: '600', marginTop: '4px' }}>
              Your Quiz Score: {score} / {QUIZ_QUESTIONS.length * 10} pts
            </p>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                Full Name: *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  ref={nameInputRef}
                  type="text"
                  required
                  value={userName}
                  onFocus={() => handleFocus(nameInputRef)}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  style={{ paddingLeft: '40px' }}
                />
                <User size={18} color="#F59E0B" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                Phone Number: *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  required
                  value={userPhone}
                  onFocus={() => handleFocus(phoneInputRef)}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  style={{ paddingLeft: '40px' }}
                />
                <Phone size={18} color="#F59E0B" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                City / Place: *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  ref={placeInputRef}
                  type="text"
                  required
                  value={userPlace}
                  onFocus={() => handleFocus(placeInputRef)}
                  onChange={(e) => setUserPlace(e.target.value)}
                  placeholder="e.g. Bengaluru, Karnataka"
                  style={{ paddingLeft: '40px' }}
                />
                <MapPin size={18} color="#F59E0B" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>
                Are you part of Gita4Youth? *
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['Yes', 'No'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setIsGita4YouthMember(opt)}
                    style={{
                      flex: 1,
                      minHeight: '48px',
                      background: isGita4YouthMember === opt ? 'rgba(217, 119, 6, 0.25)' : 'rgba(7, 11, 21, 0.8)',
                      border: isGita4YouthMember === opt ? '1.5px solid #D97706' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: isGita4YouthMember === opt ? '#F59E0B' : '#CBD5E1',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.98rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    {isGita4YouthMember === opt && <Check size={18} color="#F59E0B" />}
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn-mobile-primary"
              style={{ marginTop: '10px' }}
            >
              <CheckCircle size={18} />
              <span>Submit My Score</span>
            </button>
          </form>
        </div>
      )}

      {/* STEP 3: RESULTS & DATABASE SUBMISSIONS VIEW */}
      {quizStep === 'results' && (
        <div className="card-dharma" style={{ padding: '24px 16px', textAlign: 'center' }}>
          <Trophy size={52} color="#F59E0B" style={{ margin: '0 auto 10px' }} />

          <h2 className="tricolor-gradient-text" style={{ fontSize: '1.7rem', fontWeight: '800', marginBottom: '4px' }}>
            QUIZ COMPLETED!
          </h2>

          <p style={{ color: '#CBD5E1', fontSize: '1rem', marginBottom: '16px' }}>
            Great job <strong>{userName}</strong>! You scored <strong style={{ color: '#F59E0B', fontSize: '1.2rem' }}>{score}</strong> points.
          </p>

          <div style={{
            background: 'rgba(7, 11, 21, 0.9)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <Gita4YouthLogo size="small" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#E2E8F0' }}>
              <div><strong style={{ color: '#94A3B8' }}>Name:</strong> {userName}</div>
              <div><strong style={{ color: '#94A3B8' }}>Phone:</strong> {userPhone}</div>
              <div><strong style={{ color: '#94A3B8' }}>Place:</strong> {userPlace}</div>
              <div><strong style={{ color: '#94A3B8' }}>Gita4Youth Member:</strong> <span style={{ color: '#F59E0B', fontWeight: '700' }}>{isGita4YouthMember}</span></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={handleRestart}
              className="btn-mobile-primary"
            >
              <RefreshCw size={18} />
              <span>Play Quiz Again</span>
            </button>
            <button
              onClick={() => setActiveTab('tribute')}
              className="btn-mobile-secondary"
            >
              <Flame size={18} />
              <span>Light a Diya on Wall</span>
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Viewport Pinned 'Next' Button */}
      {quizStep === 'quiz' && showExplanation && (
        <div className="sticky-bottom-bar" style={{ bottom: '56px' }}>
          <button
            onClick={handleNext}
            className="btn-mobile-primary"
            style={{ maxWidth: '600px' }}
          >
            <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Submit My Quiz'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

    </div>
  );
}
