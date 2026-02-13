import { useEffect, useState } from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

interface Act0Props {
  onNavigate: () => void;
}

const Act0 = ({ onNavigate }: Act0Props) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 500);
    const t2 = setTimeout(() => setShowNames(true), 1500);
    const t3 = setTimeout(() => setShowButton(true), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="page-container">
      {/* Decorative Stars */}
      {[...Array(8)].map((_, i) => (
        <Star
          key={i}
          className="absolute animate-sparkle"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            color: '#FFD700',
            opacity: 0.6,
            animationDelay: `${i * 0.3}s`
          }}
          fill="#FFD700"
        />
      ))}

      <div className="content-layer text-center max-w-3xl px-4">
        {/* Sparkle Icon */}
        <div className={`mb-6 transition-all duration-1000 ${showTitle ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <Sparkles className="w-16 h-16 mx-auto" style={{ color: '#FFD700' }} />
        </div>

        {/* Main Title */}
        {showTitle && (
          <div className="animate-fade-in-up">
            <h1 
              className="font-script text-5xl md:text-7xl mb-4"
              style={{ color: '#D50000' }}
            >
              Written in the Stars
            </h1>
            <p 
              className="font-italic-emphasis text-xl md:text-2xl"
              style={{ color: '#880E4F' }}
            >
              A Love Story of Cosmic Destiny
            </p>
          </div>
        )}

        {/* Names */}
        {showNames && (
          <div className="mt-10 animate-scale-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Heart 
                className="w-6 h-6 animate-heartbeat"
                style={{ color: '#FF6B9D' }}
                fill="#FF6B9D"
              />
              <span 
                className="font-romantic text-3xl md:text-4xl"
                style={{ color: '#C2185B' }}
              >
                Karthi
              </span>
              <span 
                className="font-script text-4xl"
                style={{ color: '#FF1744' }}
              >
                &
              </span>
              <span 
                className="font-romantic text-3xl md:text-4xl"
                style={{ color: '#C2185B' }}
              >
                Nandhini
              </span>
              <Heart 
                className="w-6 h-6 animate-heartbeat"
                style={{ color: '#FF6B9D' }}
                fill="#FF6B9D"
              />
            </div>

            <div 
              className="inline-block px-6 py-3 rounded-full"
              style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)' }}
            >
              <p className="font-display text-sm" style={{ color: '#B8860B' }}>
                Our journey through 11 chapters of love
              </p>
            </div>
          </div>
        )}

        {/* Start Button */}
        {showButton && (
          <div className="mt-12 animate-fade-in-up">
            <button
              onClick={onNavigate}
              className="btn-valentine text-lg px-10 py-4"
            >
              <span className="flex items-center gap-3">
                <Heart className="w-5 h-5" fill="white" />
                Begin Our Story
                <Heart className="w-5 h-5" fill="white" />
              </span>
            </button>
            
            <p className="mt-4 text-sm" style={{ color: '#888' }}>
              Chapter 1 of 11
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act0;
