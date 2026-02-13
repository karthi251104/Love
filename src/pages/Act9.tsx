import { useState, useEffect, useCallback } from 'react';
import { Heart, Sparkles, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import Fireworks from '../components/Fireworks';

interface Act9Props {
  onNavigate: () => void;
}

const Act9 = ({ onNavigate }: Act9Props) => {
  const [showRingBox, setShowRingBox] = useState(false);
  const [ringBoxOpened, setRingBoxOpened] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [saidYes, setSaidYes] = useState(false);
  const [noVisible, setNoVisible] = useState(true);
  const [floatingYesItems, setFloatingYesItems] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Show ring box first
    const timer = setTimeout(() => setShowRingBox(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showRingBox) {
      // Open ring box after a moment
      const timer = setTimeout(() => setRingBoxOpened(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [showRingBox]);

  useEffect(() => {
    if (ringBoxOpened) {
      // Show the question after ring box opens
      const timer = setTimeout(() => setShowQuestion(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [ringBoxOpened]);

  const handleNo = () => {
    const newAttempts = noAttempts + 1;
    setNoAttempts(newAttempts);
    setNoPos({ x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 100 });
    if (newAttempts >= 8) setNoVisible(false);
  };

  const launchYesConfetti = useCallback(() => {
    const colors = ['#FF6B9D', '#FFD700', '#FF1744', '#FF69B4', '#FFC0CB', '#E040FB'];

    // Multiple bursts
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 120,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
          colors,
          scalar: 1.5,
        });
      }, i * 400);
    }

    // Create floating YES particles
    const items: Array<{ id: number; x: number; delay: number }> = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
      });
    }
    setFloatingYesItems(items);
  }, []);

  const handleYes = () => {
    setSaidYes(true);
    launchYesConfetti();
  };

  const noMessages = [
    "The stars know that's wrong...",
    "Lord Murugan wouldn't approve!",
    "The astrologer predicted YES!",
    "You're fighting destiny!",
    "The cosmos disapproves!",
    "This was written in the stars!",
    "The number 23 says YES!",
    "Fine. The universe removes this option."
  ];

  return (
    <div className="page-container">
      {/* Fireworks when she says YES */}
      {saidYes && <Fireworks />}

      {/* Floating YES particles */}
      {floatingYesItems.map(item => (
        <div
          key={item.id}
          className="fixed pointer-events-none floating-yes font-display text-2xl"
          style={{
            left: `${item.x}%`,
            top: `${30 + Math.random() * 40}%`,
            color: ['#FFD700', '#FF6B9D', '#FF1744', '#E040FB'][item.id % 4],
            animationDelay: `${item.delay}s`,
            zIndex: 50,
            textShadow: '0 0 10px currentColor',
          }}
        >
          YES!
        </div>
      ))}

      <div className="absolute top-6 left-6">
        <div className="px-4 py-2 rounded-full text-sm font-display" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#C2185B' }}>
          Chapter 9 of 11
        </div>
      </div>

      <div className="content-layer w-full max-w-3xl px-4">
        <div className="text-center mb-6">
          <Sparkles className="w-10 h-10 mx-auto mb-3" style={{ color: '#FFD700' }} />
          <h1 className="font-display text-3xl md:text-5xl mb-2 glow-text-gold" style={{ color: '#D50000' }}>
            The Cosmic Proposal
          </h1>
        </div>

        {/* Ring Box Animation */}
        {showRingBox && !showQuestion && (
          <div className="text-center animate-scale-in mb-8">
            <div className="inline-block relative" style={{ width: '160px', height: '160px' }}>
              {/* Ring box body */}
              <div
                className="absolute bottom-0 w-full rounded-b-2xl"
                style={{
                  height: '90px',
                  background: 'linear-gradient(135deg, #8B0000, #B22222)',
                  boxShadow: '0 8px 30px rgba(139, 0, 0, 0.5), inset 0 2px 0 rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255, 215, 0, 0.4)',
                }}
              >
                {/* Ring inside */}
                {ringBoxOpened && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 animate-scale-in">
                    <div className="text-5xl" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' }}>💍</div>
                  </div>
                )}
              </div>
              {/* Ring box lid */}
              <div
                className={ringBoxOpened ? 'ring-box-lid' : ''}
                style={{
                  position: 'absolute',
                  top: '20px',
                  width: '100%',
                  height: '60px',
                  background: 'linear-gradient(135deg, #B22222, #DC143C)',
                  borderRadius: '12px 12px 0 0',
                  border: '2px solid rgba(255, 215, 0, 0.4)',
                  boxShadow: '0 -4px 15px rgba(139, 0, 0, 0.3)',
                  transformOrigin: 'top center',
                }}
              >
                {/* Gold clasp */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 rounded-b-full"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #DAA520)', boxShadow: '0 2px 8px rgba(255, 215, 0, 0.5)' }}
                />
              </div>
            </div>
            <p className="font-italic-emphasis mt-6 text-lg glow-text-gold" style={{ color: '#B8860B' }}>
              {ringBoxOpened ? 'Something special awaits...' : 'A mysterious box appears...'}
            </p>
          </div>
        )}

        {!showQuestion && !showRingBox && (
          <div className="valentine-card p-6 text-center animate-fade-in-up">
            <div className="space-y-3">
              <p className="text-sm" style={{ color: '#880E4F' }}>We started behind masks. You wore a blue dress that changed my life.</p>
              <p className="text-sm" style={{ color: '#880E4F' }}>We talked for 7 months. I asked you to marry me.</p>
              <p className="text-sm" style={{ color: '#880E4F' }}>You said no. Then you said yes.</p>
              <p className="text-sm" style={{ color: '#880E4F' }}>I lost two bracelets. You forgave me both times.</p>
              <p className="font-italic-emphasis glow-text-gold" style={{ color: '#B8860B' }}>
                The astrologer predicted you'd marry someone named after Lord Murugan, born on the 25th.
              </p>
              <p className="font-display" style={{ color: '#D50000' }}>
                I am <span style={{ color: '#FFD700' }}>KARTHI</span>. Born <span style={{ color: '#FFD700' }}>NOVEMBER 25</span>.
              </p>
              <p className="font-romantic text-lg glow-text-pink" style={{ color: '#C2185B' }}>
                This isn't coincidence. This is cosmic alignment.
              </p>
            </div>
          </div>
        )}

        {showQuestion && !saidYes && (
          <div className="text-center animate-scale-in">
            <div className="valentine-card p-8 mb-6" style={{ borderColor: 'rgba(255, 215, 0, 0.5)', boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)' }}>
              <Star className="w-8 h-8 mx-auto mb-4 animate-pulse" style={{ color: '#FFD700' }} />
              <h2 className="font-display text-3xl md:text-4xl mb-4 glow-text-gold" style={{ color: '#D50000' }}>
                WILL YOU MARRY ME?
              </h2>
              <p className="font-italic-emphasis text-sm mb-4" style={{ color: '#880E4F' }}>
                For real this time. Choosing. Every day. Forever.
              </p>
            </div>

            <div className="flex justify-center gap-4 relative">
              <button onClick={handleYes} className="btn-valentine text-lg px-8">YES</button>
              {noVisible && (
                <button
                  onClick={handleNo}
                  className="px-8 py-4 rounded-full font-display text-lg transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #D50000, #B71C1C)',
                    color: 'white',
                    transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                    boxShadow: '0 4px 15px rgba(213, 0, 0, 0.4)'
                  }}
                >
                  NO
                </button>
              )}
            </div>

            {noAttempts > 0 && noAttempts < 8 && (
              <p className="mt-4 text-sm animate-fade-in-up glow-text-gold" style={{ color: '#B8860B' }}>
                {noMessages[noAttempts - 1]}
              </p>
            )}

            {!noVisible && (
              <p className="mt-4 font-display glow-text-gold" style={{ color: '#FFD700' }}>
                DESTINY CANNOT BE DENIED
              </p>
            )}
          </div>
        )}

        {saidYes && (
          <div className="text-center animate-scale-in">
            <div className="inline-block p-8 rounded-3xl mb-6" style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B9D)', boxShadow: '0 0 60px rgba(255, 215, 0, 0.6)' }}>
              <Heart className="w-16 h-16 mx-auto mb-4 animate-heartbeat" style={{ color: 'white' }} fill="white" />
              <p className="font-display text-2xl glow-text-gold" style={{ color: 'white' }}>SHE SAID YES!</p>
              <p className="font-romantic text-lg mt-2" style={{ color: 'white' }}>DESTINY CONFIRMED</p>
            </div>
            <div className="mt-6">
              <button onClick={onNavigate} className="btn-valentine">
                <span className="flex items-center gap-2">Read My Final Letter<ArrowRight className="w-5 h-5" /></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act9;
