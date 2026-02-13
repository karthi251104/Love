import { useState, useEffect } from 'react';
import { Heart, MessageSquare, XCircle, RefreshCw, ArrowRight } from 'lucide-react';

interface Act3Props {
  onNavigate: () => void;
}

const Act3 = ({ onNavigate }: Act3Props) => {
  const [typedText, setTypedText] = useState('');
  const [showRejection, setShowRejection] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const fullMessage = "Nandhini, I want to marry you.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullMessage.length) {
        setTypedText(fullMessage.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowRejection(true), 1000);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showRejection) {
      const timer = setTimeout(() => setShowContinue(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [showRejection]);

  return (
    <div className="page-container">
      <div className="absolute top-6 left-6">
        <div className="px-4 py-2 rounded-full text-sm font-display" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#C2185B' }}>
          Chapter 3 of 11
        </div>
      </div>

      <div className="content-layer w-full max-w-3xl px-4">
        <div className="text-center mb-8">
          <Heart className="w-10 h-10 mx-auto mb-3" style={{ color: '#FF1744' }} fill="#FF1744" />
          <h1 className="font-romantic text-4xl md:text-5xl mb-2" style={{ color: '#D50000' }}>The Bold Proposal</h1>
          <p className="font-italic-emphasis text-lg" style={{ color: '#FF1744' }}>Marriage, not dating</p>
        </div>

        <div className="valentine-card p-6 md:p-8 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5" style={{ color: '#FFD700' }} />
            <span className="font-display text-sm" style={{ color: '#B8860B' }}>The Message</span>
          </div>
          <div className="rounded-2xl p-6 mb-4 relative" style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 107, 157, 0.2))', border: '2px solid rgba(255, 215, 0, 0.4)' }}>
            <p className="font-romantic text-2xl md:text-3xl text-center" style={{ color: '#880E4F' }}>"{typedText}"<span className="animate-pulse">|</span></p>
            <Heart className="absolute -top-3 -right-3 w-8 h-8 animate-heartbeat" style={{ color: '#FF1744' }} fill="#FF1744" />
          </div>
          <div className="text-center">
            <p className="font-display text-lg" style={{ color: '#B8860B' }}>Not a love confession.</p>
            <p className="font-romantic text-xl mt-1" style={{ color: '#D50000' }}>A <span className="text-gradient-valentine">marriage</span> proposal.</p>
          </div>
        </div>

        {showRejection && (
          <div className="valentine-card p-6 mb-6 animate-fade-in-up" style={{ borderColor: 'rgba(213, 0, 0, 0.4)' }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <XCircle className="w-5 h-5" style={{ color: '#D50000' }} />
              <span className="font-display text-sm" style={{ color: '#D50000' }}>Her Response</span>
            </div>
            <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'rgba(213, 0, 0, 0.1)' }}>
              <p className="font-italic-emphasis text-lg text-center" style={{ color: '#880E4F' }}>"I can't... My father... Our family situation..."</p>
              <p className="font-display text-lg text-center mt-2" style={{ color: '#D50000' }}>"We can't make it."</p>
            </div>
            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-2" style={{ color: '#D50000', opacity: 0.5 }} />
              <p className="font-display" style={{ color: '#880E4F' }}>[Your heart breaks]</p>
              <p className="text-sm mt-1" style={{ color: '#FF6B9D' }}>But you don't give up.</p>
            </div>
          </div>
        )}

        {showContinue && (
          <div className="text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16" style={{ backgroundColor: 'rgba(255, 215, 0, 0.5)' }} />
              <RefreshCw className="w-5 h-5 animate-spin" style={{ color: '#FFD700' }} />
              <div className="h-px w-16" style={{ backgroundColor: 'rgba(255, 215, 0, 0.5)' }} />
            </div>
            <p className="font-italic-emphasis text-lg mb-4" style={{ color: '#880E4F' }}>So we stayed friends.</p>
            <div className="flex justify-center gap-4 mb-6">
              {['Malls', 'Movies', 'Parks'].map((place, i) => (
                <div key={place} className="px-4 py-2 rounded-full animate-scale-in" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', animationDelay: `${i * 0.2}s` }}>
                  <span className="text-sm" style={{ color: '#B8860B' }}>{place}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl inline-block" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)' }}>
              <p className="font-italic-emphasis" style={{ color: '#C2185B' }}>But every moment, I was hoping.<br />Waiting. Believing.</p>
            </div>
            <div className="mt-8">
              <button onClick={onNavigate} className="btn-valentine">
                <span className="flex items-center gap-2">Continue to Chapter 4<ArrowRight className="w-5 h-5" /></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act3;
