import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import WelcomeAnthemModal from './components/WelcomeAnthemModal';
import FlagHoister from './components/FlagHoister';
import FreedomTrail from './components/FreedomTrail';
import QuizModule from './components/QuizModule';
import TirangaStudio from './components/TirangaStudio';
import TributeWall from './components/TributeWall';
import Footer from './components/Footer';
import { toggleAmbientSound } from './utils/audioSynth';

export default function App() {
  const [activeTab, setActiveTab] = useState('quiz');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);

  // Scroll to absolute top of page whenever activeTab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  useEffect(() => {
    toggleAmbientSound(audioEnabled);
  }, [audioEnabled]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '56px' }}>
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

      {/* Automatic Welcome & National Anthem Modal with Feature Popups */}
      <WelcomeAnthemModal
        isOpen={welcomeModalOpen}
        onClose={() => setWelcomeModalOpen(false)}
        setActiveTab={handleTabChange}
      />

      {/* Main Viewport */}
      <main style={{ flex: 1, paddingTop: '12px' }}>
        {activeTab === 'quiz' && <QuizModule setActiveTab={handleTabChange} />}
        {activeTab === 'flag' && <FlagHoister setActiveTab={handleTabChange} />}
        {activeTab === 'trail' && <FreedomTrail />}
        {activeTab === 'studio' && <TirangaStudio />}
        {activeTab === 'tribute' && <TributeWall />}
      </main>

      {/* Mobile Fixed 1-Tap Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}
