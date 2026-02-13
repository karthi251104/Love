import { useState, useEffect } from 'react';
import { Users, Heart, Home, Smile, ArrowRight } from 'lucide-react';

interface Act8Props {
  onNavigate: () => void;
}

const Act8 = ({ onNavigate }: Act8Props) => {
  const [showMerge, setShowMerge] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMerge(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-container">
      <div className="absolute top-6 left-6">
        <div className="px-4 py-2 rounded-full text-sm font-display" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#C2185B' }}>
          Chapter 8 of 11
        </div>
      </div>

      <div className="content-layer w-full max-w-4xl px-4">
        <div className="text-center mb-8">
          <Users className="w-10 h-10 mx-auto mb-3" style={{ color: '#FFD700' }} />
          <h1 className="font-romantic text-4xl md:text-5xl mb-2" style={{ color: '#D50000' }}>The Family Acceptance</h1>
          <p className="font-italic-emphasis text-lg" style={{ color: '#880E4F' }}>Two families, one blessing</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="valentine-card p-5" style={{ borderColor: 'rgba(34, 197, 94, 0.4)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                <Home className="w-6 h-6" style={{ color: '#22C55E' }} />
              </div>
              <div>
                <p className="font-display text-sm" style={{ color: '#22C55E' }}>MY PARENTS</p>
                <p className="text-xs" style={{ color: '#888' }}>Free spirits. Jolly hearts.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Smile className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#22C55E' }} />
              <p className="text-sm" style={{ color: '#880E4F' }}>Easy acceptance.</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}>
              <p className="text-sm font-italic-emphasis" style={{ color: '#22C55E' }}>"If she makes you happy,<br />she makes us happy."</p>
            </div>
          </div>

          <div className="valentine-card p-5" style={{ borderColor: 'rgba(244, 194, 194, 0.4)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(244, 194, 194, 0.3)' }}>
                <Home className="w-6 h-6" style={{ color: '#C2185B' }} />
              </div>
              <div>
                <p className="font-display text-sm" style={{ color: '#C2185B' }}>HER PARENTS</p>
                <p className="text-xs" style={{ color: '#888' }}>The ones she feared.</p>
              </div>
            </div>
            <p className="text-sm mb-3" style={{ color: '#880E4F' }}>But they already knew me. As her friend.</p>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(244, 194, 194, 0.2)' }}>
              <p className="text-sm font-italic-emphasis" style={{ color: '#C2185B' }}>"We knew. We were waiting for you both to figure it out."</p>
            </div>
          </div>
        </div>

        {showMerge && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16" style={{ backgroundColor: 'rgba(255, 215, 0, 0.5)' }} />
              <Heart className="w-10 h-10 animate-heartbeat" style={{ color: '#FFD700' }} fill="#FFD700" />
              <div className="h-px w-16" style={{ backgroundColor: 'rgba(255, 215, 0, 0.5)' }} />
            </div>

            <div className="valentine-card p-6 text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.5)' }}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="font-display text-2xl" style={{ color: '#22C55E' }}>2</p>
                  <p className="text-xs" style={{ color: '#888' }}>FAMILIES</p>
                </div>
                <div>
                  <p className="font-display text-2xl" style={{ color: '#FFD700' }}>0</p>
                  <p className="text-xs" style={{ color: '#888' }}>RESISTANCE</p>
                </div>
                <div>
                  <p className="font-display text-2xl" style={{ color: '#FF1744' }}>1</p>
                  <p className="text-xs" style={{ color: '#888' }}>BLESSING</p>
                </div>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 215, 0, 0.15)' }}>
                <p className="text-sm" style={{ color: '#880E4F' }}>
                  Her biggest fear: <span style={{ color: '#22C55E' }}>Never came true.</span>
                </p>
                <p className="text-sm mt-2 font-italic-emphasis" style={{ color: '#B8860B' }}>
                  The father she was scared of welcomed me with open arms.
                </p>
              </div>

              <p className="font-romantic text-lg mt-4" style={{ color: '#D50000' }}>
                Because even they could see what the stars already wrote:
              </p>
              <p className="font-display text-xl mt-2" style={{ color: '#FFD700' }}>
                We belong together.
              </p>
            </div>

            <div className="mt-6 text-center">
              <button onClick={onNavigate} className="btn-valentine">
                <span className="flex items-center gap-2">Continue to Chapter 9<ArrowRight className="w-5 h-5" /></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act8;
