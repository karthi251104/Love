import { useEffect, useState } from 'react';
import { Heart, Star, Sparkles, Clock } from 'lucide-react';

const Act10 = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  // Countdown from May 23, 2023
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date('2023-05-23T00:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const lines = [
    { text: "My Dearest Nandhini,", style: "font-romantic text-2xl", color: "#D50000" },
    { text: "", style: "", color: "" },
    { text: "You saw me in a blue dress behind a mask.", style: "font-italic-emphasis", color: "#880E4F" },
    { text: "I saw my forever.", style: "font-romantic text-xl glow-text-pink", color: "#FF1744" },
    { text: "", style: "", color: "" },
    { text: "You said no. Then you said yes.", style: "", color: "#880E4F" },
    { text: "You lost two bracelets. I lost my heart to you.", style: "font-italic-emphasis glow-text-pink", color: "#C2185B" },
    { text: "", style: "", color: "" },
    { text: "The astrologer predicted 'Murugan name, 25th birthday.'", style: "", color: "#880E4F" },
    { text: "I am Karthi. Born November 25.", style: "font-display glow-text-gold", color: "#B8860B" },
    { text: "The cosmos knew before we did.", style: "font-italic-emphasis glow-text-gold", color: "#FFD700" },
    { text: "", style: "", color: "" },
    { text: "I don't promise perfection.", style: "", color: "#880E4F" },
    { text: "I promise to love you the way the stars predicted.", style: "font-romantic glow-text-pink", color: "#FF1744" },
    { text: "Permanently. Cosmically. Divinely.", style: "font-italic-emphasis glow-text-gold", color: "#D50000" },
    { text: "", style: "", color: "" },
    { text: "You are my blue dress.", style: "", color: "#4A90E2" },
    { text: "My May 23.", style: "glow-text-gold", color: "#FFD700" },
    { text: "My written destiny.", style: "font-script text-2xl glow-text-pink", color: "#D50000" },
    { text: "", style: "", color: "" },
    { text: "Forever Yours,", style: "font-italic-emphasis", color: "#880E4F" },
    { text: "Karthi", style: "font-script text-3xl glow-text-pink", color: "#D50000" },
  ];

  useEffect(() => {
    lines.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, index * 600);
    });
  }, []);

  return (
    <div className="page-container" style={{ minHeight: '150vh' }}>
      {[...Array(6)].map((_, i) => (
        <Star
          key={i}
          className="absolute animate-sparkle"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            color: '#FFD700',
            opacity: 0.5,
            animationDelay: `${i * 0.5}s`
          }}
          fill="#FFD700"
        />
      ))}

      <div className="content-layer w-full max-w-2xl px-4 py-12">
        <div className="text-center mb-8">
          <div className="px-4 py-2 rounded-full text-sm font-display inline-block" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#C2185B' }}>
            Chapter 10 of 11 - The Final Letter
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="valentine-card p-5 mb-6 count-pulse">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-5 h-5" style={{ color: '#FF6B9D' }} />
              <span className="font-display text-sm glow-text-pink" style={{ color: '#C2185B' }}>We've been in love for</span>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {[
                { value: countdown.days, label: 'Days' },
                { value: countdown.hours, label: 'Hours' },
                { value: countdown.minutes, label: 'Minutes' },
                { value: countdown.seconds, label: 'Seconds' },
              ].map((item, i) => (
                <div key={i} className="text-center px-3 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.15), rgba(255, 215, 0, 0.1))', border: '1px solid rgba(255, 107, 157, 0.2)', minWidth: '70px' }}>
                  <div className="font-display text-2xl glow-text-gold" style={{ color: '#D50000' }}>{item.value}</div>
                  <div className="text-xs" style={{ color: '#880E4F' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 font-italic-emphasis" style={{ color: '#B8860B' }}>Since May 23, 2023 💕</p>
          </div>
        </div>

        <div className="valentine-card p-8 md:p-12">
          <div className="text-center space-y-4">
            {lines.map((line, index) => (
              <p
                key={index}
                className={`transition-all duration-700 ${line.style} ${visibleLines.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ color: line.color || 'transparent' }}
              >
                {line.text}
              </p>
            ))}
          </div>

          {visibleLines.length >= lines.length - 3 && (
            <div className="mt-12 text-center animate-fade-in-up">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Heart className="w-6 h-6 animate-heartbeat" style={{ color: '#FF6B9D' }} fill="#FF6B9D" />
                <span className="font-display text-2xl glow-text-gold" style={{ color: '#FFD700' }}>KARTHI</span>
                <Heart className="w-4 h-4" style={{ color: '#FF1744' }} fill="#FF1744" />
                <span className="font-display text-2xl glow-text-gold" style={{ color: '#FFD700' }}>NANDHINI</span>
                <Heart className="w-6 h-6 animate-heartbeat" style={{ color: '#FF6B9D' }} fill="#FF6B9D" />
              </div>

              <div className="inline-block px-6 py-3 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 107, 157, 0.2))', border: '1px solid rgba(255, 215, 0, 0.4)' }}>
                <p className="text-sm glow-text-pink" style={{ color: '#880E4F' }}>Written in the Stars</p>
                <p className="text-xs" style={{ color: '#B8860B' }}>Confirmed by the Cosmos</p>
                <p className="text-xs" style={{ color: '#888' }}>Blessed by Lord Murugan</p>
              </div>

              <div className="mt-6">
                <Sparkles className="w-8 h-8 mx-auto" style={{ color: '#FFD700' }} />
                <p className="font-sanskrit text-xl mt-2 glow-text-gold" style={{ color: '#FFD700' }}>ॐ शुभं भवतु</p>
                <p className="text-xs" style={{ color: '#888' }}>(May auspiciousness prevail)</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: '#888' }}>
            Our story continues... in this life and all written futures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Act10;
