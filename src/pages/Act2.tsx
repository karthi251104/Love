import { useState, useEffect } from 'react';
import { Heart, MessageCircle, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface Act2Props {
  onNavigate: () => void;
}

const Act2 = ({ onNavigate }: Act2Props) => {
  const [activeMonth, setActiveMonth] = useState(0);
  const [showNext, setShowNext] = useState(false);

  const months = [
    {
      icon: MessageCircle,
      title: "Month 1-2",
      subtitle: "Getting to Know You",
      desc: "We talked. About everything. About nothing.",
      realization: "You were my friend. But my heart knew differently.",
      color: "#FF6B9D"
    },
    {
      icon: MapPin,
      title: "Month 3-4",
      subtitle: "The Hangouts Begin",
      desc: "Study holidays. Malls. Movies. Parks.",
      realization: "Every moment together, I was falling deeper.",
      color: "#4A90E2"
    },
    {
      icon: Heart,
      title: "Month 5-6",
      subtitle: "The Growing Feeling",
      desc: "7 months of friendship. 7 months of holding back.",
      realization: "I didn't want to date you. I wanted to MARRY you.",
      color: "#FF1744"
    },
    {
      icon: Calendar,
      title: "Month 7",
      subtitle: "The Decision",
      desc: "READY TO ASK",
      realization: "Not for your hand in dating. For your hand in forever.",
      color: "#FFD700"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowNext(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-container">
      <div className="absolute top-6 left-6">
        <div className="px-4 py-2 rounded-full text-sm font-display" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', color: '#C2185B' }}>
          Chapter 2 of 11
        </div>
      </div>

      <div className="content-layer w-full max-w-5xl px-4">
        <div className="text-center mb-8">
          <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: '#FFD700' }} />
          <h1 className="font-romantic text-4xl md:text-5xl mb-2" style={{ color: '#D50000' }}>
            The 7 Month Journey
          </h1>
          <p className="font-italic-emphasis text-lg" style={{ color: '#880E4F' }}>
            Building trust, one moment at a time
          </p>
        </div>

        <div className="relative mb-8">
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {months.map((month, index) => {
              const Icon = month.icon;
              const isActive = activeMonth === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveMonth(index)}
                  className={`valentine-card p-4 w-36 h-36 flex flex-col items-center justify-center transition-all duration-500 ${isActive ? 'scale-110 shadow-2xl' : 'opacity-70 hover:opacity-100'}`}
                  style={{ borderColor: isActive ? month.color : 'rgba(255, 107, 157, 0.3)', boxShadow: isActive ? `0 0 30px ${month.color}50` : undefined }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${month.color}30` }}>
                    <Icon className="w-6 h-6" style={{ color: month.color }} />
                  </div>
                  <p className="font-display text-xs" style={{ color: month.color }}>{month.title}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="valentine-card p-6 md:p-8 max-w-2xl mx-auto animate-fade-in-up">
          {(() => {
            const month = months[activeMonth];
            const Icon = month.icon;
            return (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${month.color}30` }}>
                  <Icon className="w-8 h-8" style={{ color: month.color }} />
                </div>
                <h2 className="font-romantic text-2xl mb-2" style={{ color: '#D50000' }}>{month.subtitle}</h2>
                <p className="text-lg mb-4" style={{ color: '#880E4F' }}>{month.desc}</p>
                <div className="p-4 rounded-xl inline-block" style={{ backgroundColor: `${month.color}20` }}>
                  <p className="font-italic-emphasis" style={{ color: month.color }}>{month.realization}</p>
                </div>
              </div>
            );
          })()}
        </div>

        <div className="mt-6 text-center">
          <p className="font-italic-emphasis text-lg" style={{ color: '#B8860B' }}>
            "Seven months of patience. One lifetime of love."
          </p>
        </div>

        {showNext && (
          <div className="mt-8 text-center animate-fade-in-up">
            <button onClick={onNavigate} className="btn-valentine">
              <span className="flex items-center gap-2">Continue to Chapter 3<ArrowRight className="w-5 h-5" /></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act2;
