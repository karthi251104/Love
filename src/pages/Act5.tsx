import { useState, useEffect } from 'react';
import { Gift, Shirt, ArrowRight, Sparkles, Camera, Video, Heart } from 'lucide-react';

interface Act5Props {
  onNavigate: () => void;
}

// Birthday images for November 25, 2025 - Birthday celebration
const base = import.meta.env.BASE_URL;
const birthdayImages = [
  {
    id: 1,
    src: `${base}birthday/birthday-1.jpg`,

    caption: 'The moment you surprised me'
  },
  {
    id: 2,
    src: `${base}birthday/birthday-2.jpg`,
    caption: 'Your beautiful smile'
  },
  {
    id: 3,
    src: `${base}birthday/birthday-3.jpg`,
    caption: 'Together forever'
  },
  {
    id: 4,
    src: `${base}birthday/birthday-4.jpg`,
    caption: 'My favorite person'
  },
  {
    id: 5,
    src: `${base}birthday/birthday-5.jpg`,
    caption: 'Our special celebration'
  }
];

const candleColors = ['#FF6B9D', '#FFD700', '#FF1744', '#FF69B4', '#E040FB'];
const polaroidRotations = [-6, 3, -4, 5, -2];

const Act5 = ({ onNavigate }: Act5Props) => {
  const [showStage2, setShowStage2] = useState(false);
  const [showStage3, setShowStage3] = useState(false);
  const [showStage4, setShowStage4] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [allBlown, setAllBlown] = useState(false);
  const [showSmoke, setShowSmoke] = useState<number[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setShowStage2(true), 2000);
    const t2 = setTimeout(() => setShowStage3(true), 4500);
    const t3 = setTimeout(() => setShowStage4(true), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const blowCandle = (index: number) => {
    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);
    setShowSmoke(prev => [...prev, index]);
    setTimeout(() => setShowSmoke(prev => prev.filter(i => i !== index)), 1500);
    if (newCandles.every(c => !c)) {
      setTimeout(() => setAllBlown(true), 500);
    }
  };

  return (
    <div className="page-container">
      <div className="absolute top-6 left-6">
        <div className="px-4 py-2 rounded-full text-sm font-display" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#C2185B' }}>
          Chapter 5 of 11
        </div>
      </div>

      <div className="content-layer w-full max-w-4xl px-4">
        <div className="text-center mb-6">
          <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: '#FFD700' }} />
          <h1 className="font-romantic text-4xl md:text-5xl mb-2 glow-text-pink" style={{ color: '#D50000' }}>The Lost Bracelets</h1>
          <p className="font-italic-emphasis text-lg" style={{ color: '#880E4F' }}>Guilt + Love + Forgiveness</p>
        </div>

        <p className="font-italic-emphasis text-lg text-center mb-6" style={{ color: '#C2185B' }}>But I need to confess something...</p>

        <div className="valentine-card p-5 mb-4">
          <div className="px-3 py-1 rounded-full text-xs font-display inline-block mb-3" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#B8860B' }}>
            NOVEMBER 25, 2023
          </div>
          <h3 className="font-romantic text-xl mb-3" style={{ color: '#D50000' }}>My First Birthday With You</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 215, 0, 0.3)' }}>
              <Gift className="w-8 h-8" style={{ color: '#B8860B' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: '#880E4F' }}>You gave me a <span style={{ color: '#FFD700' }}>bracelet</span>.</p>
              <p className="text-xs" style={{ color: '#888' }}>Saved for it. Long-term savings. Just for me.</p>
              <p className="text-xs mt-1" style={{ color: '#D50000' }}>For 4 months. Then I lost it.</p>
            </div>
          </div>
        </div>

        {showStage2 && (
          <div className="valentine-card p-5 mb-4 animate-fade-in-up">
            <div className="px-3 py-1 rounded-full text-xs font-display inline-block mb-3" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#B8860B' }}>
              NOVEMBER 25, 2024
            </div>
            <h3 className="font-romantic text-xl mb-3" style={{ color: '#D50000' }}>My Best Birthday Ever</h3>
            <p className="text-xs mb-3" style={{ color: '#888' }}>Retro Cafe, Saibaba Colony, Coimbatore</p>

            {/* Birthday Candles */}
            <div className="mb-5 p-5 rounded-xl text-center" style={{ background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.1), rgba(255, 107, 157, 0.1))' }}>
              <p className="font-display text-sm mb-4 glow-text-gold" style={{ color: '#B8860B' }}>
                {allBlown ? '🎉 Happy Birthday Karthi! 🎉' : '🎂 Tap each candle to blow it out!'}
              </p>
              <div className="flex justify-center gap-4">
                {candlesLit.map((lit, i) => (
                  <div key={i} className="relative cursor-pointer" onClick={() => lit && blowCandle(i)}>
                    {/* Flame */}
                    {lit && (
                      <div className="candle-flame absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 rounded-full"
                        style={{ background: `radial-gradient(circle, #FFF 20%, ${candleColors[i]} 60%, transparent 100%)`, boxShadow: `0 0 12px ${candleColors[i]}, 0 0 24px ${candleColors[i]}50` }}
                      />
                    )}
                    {/* Smoke */}
                    {showSmoke.includes(i) && (
                      <div className="smoke-puff absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(150,150,150,0.4)' }} />
                    )}
                    {/* Candle body */}
                    <div className="w-3 rounded-t-sm" style={{ height: '36px', background: `linear-gradient(180deg, ${candleColors[i]}, ${candleColors[i]}cc)`, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Birthday Gallery Preview */}
            <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 107, 157, 0.1)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-5 h-5" style={{ color: '#FF6B9D' }} />
                <span className="font-display text-sm" style={{ color: '#C2185B' }}>Birthday Memories</span>
              </div>

              {/* Video Section 1 */}
              <div
                className="mb-5 rounded-2xl overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.15), rgba(255, 215, 0, 0.1), rgba(194, 24, 91, 0.1))',
                  border: '2px solid rgba(255, 107, 157, 0.3)',
                  boxShadow: '0 8px 32px rgba(255, 107, 157, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  padding: '16px'
                }}
              >
                {/* Decorative corner hearts */}
                <Heart className="absolute top-3 right-3 w-4 h-4 animate-heartbeat" style={{ color: '#FF6B9D', opacity: 0.5 }} fill="#FF6B9D" />
                <Heart className="absolute bottom-3 left-3 w-3 h-3 animate-float-gentle" style={{ color: '#FFD700', opacity: 0.4 }} fill="#FFD700" />

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF1744, #FF6B9D)', boxShadow: '0 2px 8px rgba(255, 23, 68, 0.3)' }}>
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-display text-sm" style={{ color: '#C2185B' }}>Birthday Celebration</span>
                    <span className="text-xs block" style={{ color: '#888' }}>Our special moments 🎂</span>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: '3px solid rgba(255, 215, 0, 0.3)' }}>
                  <video
                    className="w-full"
                    style={{ maxHeight: '350px', objectFit: 'cover' }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={`${base}birthday/birthday-video-1.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Video Section 2 */}
              <div
                className="mb-5 rounded-2xl overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 107, 157, 0.15), rgba(74, 144, 226, 0.08))',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 8px 32px rgba(255, 215, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  padding: '16px'
                }}
              >
                {/* Decorative corner hearts */}
                <Heart className="absolute top-3 left-3 w-4 h-4 animate-heartbeat" style={{ color: '#FFD700', opacity: 0.5 }} fill="#FFD700" />
                <Heart className="absolute bottom-3 right-3 w-3 h-3 animate-float-gentle" style={{ color: '#FF6B9D', opacity: 0.4 }} fill="#FF6B9D" />

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B9D)', boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)' }}>
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-display text-sm" style={{ color: '#B8860B' }}>More Birthday Fun</span>
                    <span className="text-xs block" style={{ color: '#888' }}>Celebrating together 🎉</span>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: '3px solid rgba(255, 107, 157, 0.3)' }}>
                  <video
                    className="w-full"
                    style={{ maxHeight: '350px', objectFit: 'cover' }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={`${base}birthday/birthday-video-2.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Polaroid Photo Gallery */}
              <div className="flex flex-wrap justify-center gap-4 py-4">
                {birthdayImages.map((img, idx) => (
                  <div
                    key={img.id}
                    className="polaroid relative"
                    style={{ transform: `rotate(${polaroidRotations[idx]}deg)`, maxWidth: '160px' }}
                    onClick={() => setSelectedImage(img.src)}
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full aspect-square object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23FFE4EC"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23FF6B9D" text-anchor="middle" dy=".3em"%3E' + img.caption + '%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <p className="text-center text-xs mt-1 font-italic-emphasis" style={{ color: '#880E4F' }}>{img.caption}</p>
                    <Heart className="absolute top-2 right-2 w-3 h-3" style={{ color: '#FF6B9D', opacity: 0.6 }} fill="#FF6B9D" />
                  </div>
                ))}
              </div>

              <p className="text-xs mt-3 text-center" style={{ color: '#888' }}>
                Our birthday celebration - November 25, 2025
              </p>
            </div>

            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 215, 0, 0.15)' }}>
              <p className="text-sm" style={{ color: '#B8860B' }}>Another bracelet. The same one. You bought it again. With your savings. Again.</p>
            </div>
            <p className="text-sm mt-3" style={{ color: '#880E4F' }}>Because you knew I lost it. Because you loved me anyway.</p>
            <p className="text-xs mt-2" style={{ color: '#D50000' }}>3 months later, I lost it again.</p>
          </div>
        )}

        {showStage3 && (
          <div className="grid md:grid-cols-2 gap-4 mb-4 animate-fade-in-up">
            <div className="valentine-card p-4" style={{ borderColor: 'rgba(213, 0, 0, 0.3)' }}>
              <p className="font-display text-sm mb-2" style={{ color: '#D50000' }}>The Guilt</p>
              <p className="text-xs" style={{ color: '#880E4F' }}>Two bracelets. Both lost. Both bought with her savings.</p>
            </div>
            <div className="valentine-card p-4" style={{ borderColor: 'rgba(255, 215, 0, 0.5)' }}>
              <p className="font-display text-sm mb-2" style={{ color: '#B8860B' }}>The Truth</p>
              <p className="text-xs" style={{ color: '#880E4F' }}>But she never blamed me.</p>
              <p className="text-xs mt-1 font-italic-emphasis glow-text-gold" style={{ color: '#FFD700' }}>"It's okay, Karthi. Objects are temporary. Our love isn't."</p>
            </div>
          </div>
        )}

        {showStage4 && (
          <div className="valentine-card p-5 animate-fade-in-up" style={{ borderColor: 'rgba(74, 144, 226, 0.5)' }}>
            <div className="px-3 py-1 rounded-full text-xs font-display inline-block mb-3" style={{ backgroundColor: 'rgba(74, 144, 226, 0.2)', color: '#4A90E2' }}>
              NOVEMBER 25, 2025
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'white' }}>
                <Shirt className="w-6 h-6" style={{ color: '#333' }} />
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A90E2' }}>
                <div className="w-6 h-6 rounded bg-white/30" />
              </div>
            </div>
            <p className="text-sm" style={{ color: '#880E4F' }}>White shirt. Blue momfit pants.</p>
            <p className="text-xs" style={{ color: '#888' }}>Blue - the dress I first saw. White - our pure beginning.</p>
            <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 215, 0, 0.15)' }}>
              <p className="text-xs" style={{ color: '#B8860B' }}>No bracelet. But something better: A promise that even when I lose things, I'll never lose you.</p>
            </div>
          </div>
        )}

        {showStage4 && (
          <div className="mt-6 text-center animate-fade-in-up">
            <button onClick={onNavigate} className="btn-valentine">
              <span className="flex items-center gap-2">Continue to Chapter 6<ArrowRight className="w-5 h-5" /></span>
            </button>
          </div>
        )}

        {/* Image Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={selectedImage}
                alt="Birthday memory"
                className="max-w-full max-h-[85vh] rounded-lg object-contain"
              />
              <button
                className="absolute -top-10 right-0 text-white hover:text-pink-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act5;
