import { useState } from 'react';
import { Star, Sparkles, ArrowRight } from 'lucide-react';

interface Act6Props {
  onNavigate: () => void;
}

const Act6 = ({ onNavigate }: Act6Props) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const cards = [
    { id: 1, symbol: '☀️', label: 'சூரியன்' },
    { id: 2, symbol: '🌙', label: 'சந்திரன்' },
    { id: 3, symbol: '⭐', label: 'நட்சத்திரம்' },
    { id: 4, symbol: '🔱', label: 'முருகன்' },
  ];

  const handleCardClick = (id: number) => {
    setSelectedCard(id);
    setTimeout(() => setRevealed(true), 1000);
    setTimeout(() => setShowTimeline(true), 3000);
  };

  const timeline = [
    { date: 'APRIL 23, 2023', event: 'Our First Kiss', note: 'Destiny begins' },
    { date: 'MAY 23, 2023', event: 'She Says YES', note: 'Destiny confirmed' },
    { date: 'JULY 23, 2023', event: 'Astrologer Predicts', note: 'DESTINY REVEALED' },
  ];

  return (
    <div 
      className="page-container"
      style={{ 
        background: revealed 
          ? 'linear-gradient(135deg, #1A237E, #4A148C)' 
          : 'linear-gradient(135deg, #FFF5F7, #FCE4EC)'
      }}
    >
      <div className="absolute top-6 left-6">
        <div 
          className="px-4 py-2 rounded-full text-sm font-display"
          style={{ 
            backgroundColor: revealed ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 107, 157, 0.2)',
            color: revealed ? '#FFD700' : '#C2185B'
          }}
        >
          Chapter 6 of 11
        </div>
      </div>

      <div className="content-layer w-full max-w-4xl px-4">
        <div className="text-center mb-6">
          <Star className="w-10 h-10 mx-auto mb-3 animate-pulse" style={{ color: revealed ? '#FFD700' : '#4A148C' }} fill={revealed ? '#FFD700' : '#4A148C'} />
          <h1 className="font-display text-3xl md:text-5xl mb-2" style={{ color: revealed ? '#FFD700' : '#4A148C' }}>
            The Astrology Revelation
          </h1>
          <p className="font-italic-emphasis text-lg" style={{ color: revealed ? '#FFD700' : '#880E4F' }}>
            Pick a card to reveal your destiny
          </p>
        </div>

        <div className="text-center mb-6">
          <div 
            className="inline-block px-4 py-2 rounded-full"
            style={{ 
              backgroundColor: revealed ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 215, 0, 0.2)',
              border: revealed ? '2px solid #FFD700' : 'none'
            }}
          >
            <span className="font-display text-xl" style={{ color: revealed ? '#FFD700' : '#B8860B' }}>
              JULY <span style={{ textShadow: revealed ? '0 0 10px #FFD700' : 'none', color: '#D50000' }}>23</span>, 2023
            </span>
          </div>
        </div>

        {!revealed && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`astrology-card p-6 aspect-square flex flex-col items-center justify-center transition-all duration-500 hover:scale-110 ${selectedCard === card.id ? 'scale-110 ring-4 ring-yellow-400' : ''}`}
                disabled={selectedCard !== null}
              >
                <span className="text-4xl mb-2">{card.symbol}</span>
                <span className="font-tamil text-sm" style={{ color: '#FFD700' }}>{card.label}</span>
              </button>
            ))}
          </div>
        )}

        {selectedCard !== null && !revealed && (
          <div className="text-center animate-pulse">
            <Sparkles className="w-12 h-12 mx-auto" style={{ color: '#FFD700' }} />
            <p className="font-tamil text-lg mt-2" style={{ color: '#FFD700' }}>விதி வெளிப்படுகிறது...</p>
            <p className="text-sm" style={{ color: '#FFD700', opacity: 0.8 }}>(Destiny is revealing...)</p>
          </div>
        )}

        {revealed && (
          <div className="animate-scale-in">
            <div 
              className="p-6 rounded-2xl mb-6"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 153, 51, 0.2))',
                border: '2px solid rgba(255, 215, 0, 0.5)'
              }}
            >
              <div className="text-center mb-4">
                <span className="font-tamil text-2xl" style={{ color: '#FFD700' }}>ஜோதிடர் கணிப்பு</span>
                <p className="text-xs" style={{ color: '#FFD700', opacity: 0.8 }}>(The Astrologer's Prediction)</p>
              </div>
              <div className="space-y-4 text-center">
                <p className="font-tamil text-lg" style={{ color: '#FFD700' }}>"அவளது கணவனின் பெயர் முருகனுடன் தொடர்புடையது"</p>
                <p className="text-sm" style={{ color: 'rgba(255, 215, 0, 0.8)' }}>"Her husband's name will be related to Lord Murugan"</p>
                <div className="p-3 rounded-lg inline-block" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)' }}>
                  <p className="font-tamil" style={{ color: '#FFD700' }}>"அவரது பிறந்த தேதி 25ஆம் தேதி"</p>
                  <p className="text-xs" style={{ color: 'rgba(255, 215, 0, 0.8)' }}>"His birthday will fall on the 25th date"</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 215, 0, 0.15)', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
                <p className="font-display text-sm mb-2" style={{ color: '#FFD700' }}>THE PREDICTION</p>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Name: Related to Lord Murugan</p>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Birthday: 25th date</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)', border: '1px solid rgba(255, 107, 157, 0.4)' }}>
                <p className="font-display text-sm mb-2" style={{ color: '#FF6B9D' }}>THE REALITY</p>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Name: <span className="font-display" style={{ color: '#FFD700' }}>KARTHI</span></p>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>(Another name for Lord Murugan)</p>
                <p className="text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Birthday: <span className="font-display" style={{ color: '#FFD700' }}>NOVEMBER 25</span></p>
              </div>
            </div>
          </div>
        )}

        {showTimeline && (
          <div className="animate-fade-in-up">
            <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
              <p className="font-display text-sm text-center mb-4" style={{ color: '#FFD700' }}>THE COSMIC TIMELINE</p>
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg animate-slide-in"
                    style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', animationDelay: `${index * 0.3}s` }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 215, 0, 0.3)' }}>
                      <span className="text-xs font-display" style={{ color: '#FFD700' }}>{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs" style={{ color: '#FFD700' }}>{item.date}</p>
                      <p className="text-sm" style={{ color: 'white' }}>{item.event}</p>
                    </div>
                    <p className="text-xs font-italic-emphasis" style={{ color: item.note.includes('REVEALED') ? '#FFD700' : 'rgba(255,255,255,0.7)' }}>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="inline-block px-6 py-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 153, 51, 0.3))', border: '2px solid #FFD700' }}>
                <p className="font-display text-xl mb-1" style={{ color: '#FFD700' }}>THIS IS DESTINY</p>
                <p className="font-tamil text-lg" style={{ color: '#FFD700' }}>இது விதி</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={onNavigate}
                className="px-8 py-4 rounded-full font-display text-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B9D)', color: '#1A237E', boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}
              >
                <span className="flex items-center gap-2">Continue to Chapter 7<ArrowRight className="w-5 h-5" /></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act6;
