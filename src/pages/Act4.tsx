import { useState, useEffect, useCallback } from 'react';
import { MessageCircle, Phone, Heart, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Act4Props {
  onNavigate: () => void;
}

const Act4 = ({ onNavigate }: Act4Props) => {
  const [progress, setProgress] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [celebration, setCelebration] = useState(false);

  useEffect(() => {
    if (isWaiting && progress < 100) {
      const timer = setTimeout(() => setProgress(prev => Math.min(prev + 2, 100)), 80);
      return () => clearTimeout(timer);
    } else if (progress >= 100 && !showReply) {
      setTimeout(() => setShowReply(true), 500);
    }
  }, [isWaiting, progress, showReply]);

  const launchConfetti = useCallback(() => {
    // Rose petal colors burst
    const colors = ['#FF6B9D', '#FF1744', '#FFD700', '#FF69B4', '#FFC0CB'];

    // Center burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Left side
    setTimeout(() => confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    }), 300);

    // Right side
    setTimeout(() => confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    }), 600);

    // Hearts shower
    setTimeout(() => confetti({
      particleCount: 30,
      spread: 160,
      origin: { y: 0.3 },
      colors: ['#FF1744', '#FF6B9D'],
      shapes: ['circle'],
      scalar: 2,
      gravity: 0.5,
    }), 900);
  }, []);

  useEffect(() => {
    if (showReply) {
      setTimeout(() => {
        setCelebration(true);
        launchConfetti();
      }, 2500);
    }
  }, [showReply, launchConfetti]);

  const startWaiting = () => setIsWaiting(true);

  return (
    <div className="page-container">
      <div className="absolute top-6 left-6">
        <div className="px-4 py-2 rounded-full text-sm font-display" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#C2185B' }}>
          Chapter 4 of 11
        </div>
      </div>

      <div className="content-layer w-full max-w-3xl px-4">
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-2 rounded-full mb-3" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)' }}>
            <span className="font-display text-xl" style={{ color: '#B8860B' }}>
              MAY <span style={{ color: '#D50000', textShadow: '0 0 10px rgba(213, 0, 0, 0.5)' }}>23</span>, 2023
            </span>
          </div>
          <h1 className="font-romantic text-4xl md:text-5xl mb-2 glow-text-pink" style={{ color: '#D50000' }}>
            The Night That Changed Everything
          </h1>
        </div>

        <div className="valentine-card p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4" style={{ color: '#B8860B' }} />
            <span className="font-display text-xs" style={{ color: '#B8860B' }}>Your Message</span>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(74, 144, 226, 0.15)' }}>
            <p className="text-sm" style={{ color: '#880E4F' }}>"You said we can't make it, right? So let's leave it."</p>
            <p className="text-sm mt-2" style={{ color: '#4A90E2' }}>"Next year, juniors will come. I need to find someone else."</p>
          </div>
        </div>

        {!showReply && (
          <div className="valentine-card p-6 text-center animate-fade-in-up">
            <Phone className="w-10 h-10 mx-auto mb-3 animate-pulse" style={{ color: '#D50000' }} />
            <p className="text-sm mb-1" style={{ color: '#880E4F' }}>She didn't reply. She didn't answer calls.</p>
            <p className="font-display text-lg mb-4 glow-text-pink" style={{ color: '#D50000' }}>2 hours of silence. 2 hours of fear.</p>
            {!isWaiting ? (
              <button onClick={startWaiting} className="btn-valentine">Wait for her reply...</button>
            ) : (
              <div>
                <div className="w-full h-3 rounded-full mb-3 overflow-hidden" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FF6B9D, #FF1744)' }} />
                </div>
                <p className="text-xs" style={{ color: '#B8860B' }}>Waiting... {Math.floor(progress * 1.2)} minutes</p>
              </div>
            )}
          </div>
        )}

        {showReply && (
          <div className="valentine-card p-6 animate-scale-in" style={{ borderColor: 'rgba(255, 215, 0, 0.5)' }}>
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-4 h-4" style={{ color: '#FFD700' }} />
              <span className="font-display text-xs" style={{ color: '#B8860B' }}>Her Reply</span>
            </div>
            <div className="space-y-3">
              <p className="text-sm" style={{ color: '#880E4F' }}>"Why did you talk like that?</p>
              <p className="text-sm" style={{ color: '#C2185B' }}>I liked you.</p>
              <p className="font-romantic text-xl glow-text-pink" style={{ color: '#FF1744' }}>
                I <span className="text-gradient-valentine">LIKED</span> you, Karthi.
              </p>
              <p className="text-sm" style={{ color: '#880E4F' }}>
                I liked you during all those hangouts. Every mall visit. Every movie. Every moment. I was just scared.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl text-center" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)' }}>
              <Star className="w-5 h-5 mx-auto mb-1" style={{ color: '#FFD700' }} />
              <p className="font-display text-lg glow-text-gold" style={{ color: '#B8860B' }}>I accept. I'll marry you.</p>
            </div>
          </div>
        )}

        {celebration && (
          <div className="mt-6 text-center animate-scale-in">
            <div className="inline-block px-6 py-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B9D)', boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)' }}>
              <Heart className="w-10 h-10 mx-auto mb-2 animate-heartbeat" style={{ color: 'white' }} fill="white" />
              <p className="font-display text-2xl" style={{ color: 'white' }}>
                MAY <span style={{ textShadow: '0 0 10px rgba(255,255,255,0.8)' }}>23</span>, 2023
              </p>
              <p className="font-romantic text-lg mt-2" style={{ color: 'white' }}>The Day She Said YES</p>
            </div>
            <div className="mt-6">
              <button onClick={onNavigate} className="btn-valentine">
                <span className="flex items-center gap-2">Continue to Chapter 5<ArrowRight className="w-5 h-5" /></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act4;
