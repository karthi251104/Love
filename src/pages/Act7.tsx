import { useState, useEffect } from 'react';
import { Church, TreePine, Heart, ArrowRight, Calendar } from 'lucide-react';

interface Act7Props {
  onNavigate: () => void;
}

const Act7 = ({ onNavigate }: Act7Props) => {
  const [kissDate, setKissDate] = useState<string>('');
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [wrongDate, setWrongDate] = useState(false);
  const [bubblePopped, setBubblePopped] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    if (dateConfirmed) {
      const timer = setTimeout(() => setShowNext(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [dateConfirmed]);

  const popBubble = () => setBubblePopped(true);

  const handleDateConfirm = () => {
    if (kissDate) {
      // The correct first kiss date is April 23, 2023
      if (kissDate === '2023-04-23') {
        setWrongDate(false);
        setDateConfirmed(true);
      } else {
        setWrongDate(true);
        // Shake animation reset
        setTimeout(() => setWrongDate(false), 2000);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="page-container">
      <div className="absolute top-6 left-6">
        <div className="px-4 py-2 rounded-full text-sm font-display" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#C2185B' }}>
          Chapter 7 of 11
        </div>
      </div>

      <div className="content-layer w-full max-w-3xl px-4">
        {/* Date Picker Section - shown first before kiss content */}
        {!dateConfirmed && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-8">
              <Heart className="w-10 h-10 mx-auto mb-3 animate-heartbeat" style={{ color: '#FF1744' }} fill="#FF1744" />
              <h1 className="font-romantic text-4xl md:text-5xl mb-2" style={{ color: '#D50000' }}>
                Our First Kiss
              </h1>
              <p className="font-italic-emphasis text-lg" style={{ color: '#880E4F' }}>
                Before we relive this moment...
              </p>
            </div>

            <div className="valentine-card p-6 md:p-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.3), rgba(255, 215, 0, 0.3))',
                    boxShadow: '0 0 30px rgba(255, 107, 157, 0.2)'
                  }}
                >
                  <Calendar className="w-10 h-10" style={{ color: '#C2185B' }} />
                </div>

                <h2 className="font-romantic text-2xl mb-2" style={{ color: '#D50000' }}>
                  When was our first kiss?
                </h2>
                <p className="font-italic-emphasis text-sm mb-6" style={{ color: '#880E4F' }}>
                  Pick the date from your heart's memory 💕
                </p>

                <div className="mb-6">
                  <input
                    type="date"
                    value={kissDate}
                    onChange={(e) => { setKissDate(e.target.value); setWrongDate(false); }}
                    className="w-full px-4 py-3 rounded-xl text-center text-lg font-display outline-none transition-all duration-300 focus:scale-105"
                    style={{
                      backgroundColor: wrongDate ? 'rgba(213, 0, 0, 0.1)' : 'rgba(255, 107, 157, 0.1)',
                      border: wrongDate ? '2px solid rgba(213, 0, 0, 0.6)' : '2px solid rgba(255, 107, 157, 0.4)',
                      color: '#880E4F',
                      cursor: 'pointer',
                      animation: wrongDate ? 'shake 0.5s ease-in-out' : 'none'
                    }}
                  />
                  {wrongDate && (
                    <div className="mt-3 animate-fade-in-up">
                      <p className="text-sm font-display" style={{ color: '#D50000' }}>❌ Wrong date! Try again...</p>
                      <p className="text-xs mt-1" style={{ color: '#880E4F' }}>Think harder, my love 💭</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleDateConfirm}
                  disabled={!kissDate}
                  className="btn-valentine text-lg px-8 py-3 transition-all duration-300"
                  style={{
                    opacity: kissDate ? 1 : 0.5,
                    cursor: kissDate ? 'pointer' : 'not-allowed'
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5" fill="white" />
                    Relive This Moment
                    <Heart className="w-5 h-5" fill="white" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Kiss Content - shown after date is confirmed */}
        {dateConfirmed && (
          <>
            <div className="text-center mb-6 animate-fade-in-up">
              <div className="inline-block px-4 py-2 rounded-full mb-3" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)' }}>
                <span className="font-display text-xl" style={{ color: '#B8860B' }}>
                  {formatDate(kissDate)}
                </span>
              </div>
              <h1 className="font-romantic text-4xl md:text-5xl mb-2" style={{ color: '#D50000' }}>The Temple Kiss</h1>
              <p className="font-italic-emphasis text-lg" style={{ color: '#880E4F' }}>Our first sacred moment</p>
            </div>

            <div className="valentine-card p-6 mb-4 animate-fade-in-up">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 215, 0, 0.3)' }}>
                  <Church className="w-6 h-6" style={{ color: '#B8860B' }} />
                </div>
                <div>
                  <p className="font-display" style={{ color: '#B8860B' }}>Saibaba Temple</p>
                </div>
              </div>
              <p className="text-center text-sm" style={{ color: '#880E4F' }}>
                We went to Saibaba Temple. Prayed together. Blessed our love.
              </p>
              <div className="mt-4 p-3 rounded-xl text-center" style={{ backgroundColor: 'rgba(255, 107, 157, 0.15)' }}>
                <p className="font-italic-emphasis text-sm" style={{ color: '#C2185B' }}>Then we walked to the park...</p>
              </div>
            </div>

            <div className="valentine-card p-6 mb-4 animate-fade-in-up" style={{ background: 'linear-gradient(180deg, rgba(34, 197, 94, 0.1), white)' }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <TreePine className="w-6 h-6" style={{ color: '#22C55E' }} />
                <p className="font-display" style={{ color: '#22C55E' }}>The Park</p>
              </div>
              <p className="text-center text-sm mb-6" style={{ color: '#880E4F' }}>
                And there, under the sky, with only the stars watching...
              </p>

              <div className="text-center">
                {!bubblePopped ? (
                  <div onClick={popBubble} className="inline-block cursor-pointer animate-float-gentle">
                    <div
                      className="w-28 h-28 rounded-full mx-auto flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(244,194,194,0.7))',
                        boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.1), 0 0 30px rgba(244,194,194,0.5)'
                      }}
                    >
                      <span className="text-5xl" style={{ opacity: 0.7 }}>💋</span>
                    </div>
                    <p className="text-xs mt-2" style={{ color: '#888' }}>Click the bubble</p>
                  </div>
                ) : (
                  <div className="animate-scale-in">
                    <div className="text-7xl mb-2 animate-heartbeat">💏</div>
                    <div className="mt-4 p-5 rounded-2xl inline-block" style={{ background: 'linear-gradient(135deg, rgba(244, 194, 194, 0.4), rgba(255, 107, 157, 0.2))', border: '2px solid rgba(255, 107, 157, 0.3)', boxShadow: '0 8px 30px rgba(255, 107, 157, 0.15)' }}>
                      <p className="font-romantic text-xl" style={{ color: '#C2185B' }}>We shared a Center Fresh bubblegum kiss.</p>
                      <p className="text-sm mt-2" style={{ color: '#880E4F' }}>Not our first kiss. But our favorite.</p>
                      <p className="font-italic-emphasis text-sm mt-2" style={{ color: '#FFD700' }}>Sweet. Simple. Ours.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="inline-block px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(255, 215, 0, 0.15)' }}>
                <p className="text-sm" style={{ color: '#880E4F' }}>
                  A temple blessing. A park promise. A bubblegum bond.
                </p>
              </div>
            </div>

            {showNext && (
              <div className="text-center animate-fade-in-up">
                <button onClick={onNavigate} className="btn-valentine">
                  <span className="flex items-center gap-2">Continue to Chapter 8<ArrowRight className="w-5 h-5" /></span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Act7;
