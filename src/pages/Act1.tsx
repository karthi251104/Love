import { useState, useEffect } from 'react';
import { Heart, Eye, Sparkles, ArrowRight } from 'lucide-react';

interface Act1Props {
  onNavigate: () => void;
}

const Act1 = ({ onNavigate }: Act1Props) => {
  const [maskRevealed, setMaskRevealed] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowStory(true), 500);
    const t2 = setTimeout(() => setShowNext(true), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const revealMask = () => {
    setMaskRevealed(true);
  };

  return (
    <div className="page-container">
      {/* Chapter Indicator */}
      <div className="absolute top-6 left-6">
        <div 
          className="px-4 py-2 rounded-full text-sm font-display"
          style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#C2185B' }}
        >
          Chapter 1 of 11
        </div>
      </div>

      <div className="content-layer w-full max-w-4xl px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: '#4A90E2' }} />
          <h1 
            className="font-romantic text-4xl md:text-5xl mb-2"
            style={{ color: '#D50000' }}
          >
            The Blue Dress Mystery
          </h1>
          <p className="font-italic-emphasis text-lg" style={{ color: '#4A90E2' }}>
            Behind the mask, destiny waited
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Interactive Mask */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Mask/Face Circle */}
              <div 
                className={`w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center cursor-pointer transition-all duration-1000 ${
                  maskRevealed ? 'scale-110' : 'hover:scale-105'
                }`}
                style={{ 
                  background: maskRevealed 
                    ? 'linear-gradient(135deg, #4A90E2, #FFD700)' 
                    : 'linear-gradient(135deg, #E0E0E0, #BDBDBD)',
                  boxShadow: maskRevealed 
                    ? '0 0 60px rgba(74, 144, 226, 0.6)' 
                    : '0 0 30px rgba(0,0,0,0.2)'
                }}
                onClick={!maskRevealed ? revealMask : undefined}
              >
                {!maskRevealed ? (
                  <div className="text-center">
                    <Eye className="w-16 h-16 mx-auto mb-2" style={{ color: '#666' }} />
                    <p className="text-sm" style={{ color: '#666' }}>Click to reveal</p>
                  </div>
                ) : (
                  <div className="text-center animate-scale-in">
                    <Heart 
                      className="w-20 h-20 mx-auto mb-2 animate-heartbeat"
                      style={{ color: '#FF1744' }}
                      fill="#FF1744"
                    />
                    <p className="font-script text-2xl" style={{ color: 'white' }}>
                      Her Smile
                    </p>
                  </div>
                )}
              </div>

              {/* Glow Ring */}
              <div 
                className={`absolute -inset-4 rounded-full border-2 transition-all duration-1000 ${
                  maskRevealed ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  borderColor: '#FFD700',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
                }}
              />

              {/* Floating Hearts */}
              {maskRevealed && [
                ...Array(6)].map((_, i) => (
                <Heart
                  key={i}
                  className="absolute w-4 h-4 animate-float-gentle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    color: '#4A90E2',
                    opacity: 0.6,
                    animationDelay: `${i * 0.2}s`
                  }}
                  fill="#4A90E2"
                />
              ))}
            </div>
          </div>

          {/* Right: Story Text */}
          <div className="valentine-card p-6">
            {showStory && (
              <div className="space-y-4 animate-fade-in-up">
                <div 
                  className="px-3 py-1 rounded-full text-xs font-display inline-block"
                  style={{ backgroundColor: 'rgba(74, 144, 226, 0.2)', color: '#4A90E2' }}
                >
                  First Year, Kongunadu College
                </div>
                
                <p className="text-lg leading-relaxed" style={{ color: '#880E4F' }}>
                  Post-COVID. Everyone wore masks. Faces hidden.
                </p>
                
                <p 
                  className="font-italic-emphasis text-xl leading-relaxed"
                  style={{ color: '#4A90E2' }}
                >
                  But one blue dress... I couldn't look away.
                </p>

                <div 
                  className="p-4 rounded-xl mt-4"
                  style={{ backgroundColor: 'rgba(255, 215, 0, 0.15)' }}
                >
                  <p className="font-display text-sm" style={{ color: '#B8860B' }}>
                    Day 10 - The Canteen
                  </p>
                  <p className="mt-2" style={{ color: '#880E4F' }}>
                    After ten days of curiosity, I finally saw your face.
                  </p>
                  <p 
                    className="font-italic-emphasis mt-2"
                    style={{ color: '#FF6B9D' }}
                  >
                    No mask. Just you. Just that smile.
                  </p>
                </div>

                <p 
                  className="font-romantic text-lg text-center mt-4"
                  style={{ color: '#D50000' }}
                >
                  From that moment, I decided:<br />
                  <span className="text-gradient-valentine">No other girls. Only you.</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Next Button */}
        {showNext && (
          <div className="mt-10 text-center animate-fade-in-up">
            <button
              onClick={onNavigate}
              className="btn-valentine"
            >
              <span className="flex items-center gap-2">
                Continue to Chapter 2
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act1;
