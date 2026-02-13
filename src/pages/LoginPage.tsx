import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, Lock, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onNavigate: () => void;
}

const LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { verifyPassword } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answer.trim()) {
      setError('Please enter your answer');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const success = verifyPassword(answer);
    
    if (success) {
      onNavigate();
    } else {
      setError('That\'s not quite right... think about our special number');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setShowHint(true);
    }
  };

  return (
    <div className="page-container">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 animate-float-gentle">
        <Heart className="w-12 h-12" style={{ color: '#FF6B9D', opacity: 0.6 }} fill="#FF6B9D" />
      </div>
      <div className="absolute top-20 right-16 animate-float-gentle delay-500">
        <Heart className="w-8 h-8" style={{ color: '#FF1744', opacity: 0.5 }} fill="#FF1744" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float-gentle delay-1000">
        <Heart className="w-10 h-10" style={{ color: '#F8BBD9', opacity: 0.7 }} fill="#F8BBD9" />
      </div>
      <div className="absolute bottom-32 right-24 animate-float-gentle delay-700">
        <Sparkles className="w-8 h-8" style={{ color: '#FFD700', opacity: 0.6 }} />
      </div>

      <div className="content-layer w-full max-w-md">
        {/* Main Card */}
        <div 
          className={`valentine-card p-8 md:p-12 text-center ${isShaking ? 'animate-shake' : ''}`}
        >
          {/* Lock Icon */}
          <div className="mb-6">
            <div 
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center animate-pulse-glow"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #FF1744)' }}
            >
              <Lock className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 
            className="font-script text-4xl md:text-5xl mb-2"
            style={{ color: '#D50000' }}
          >
            Our Secret
          </h1>
          
          <p 
            className="font-romantic text-lg mb-8"
            style={{ color: '#B71C1C' }}
          >
            A Love Story Written in the Stars
          </p>

          {/* Question */}
          <div className="mb-6">
            <p 
              className="font-italic-emphasis text-xl mb-2"
              style={{ color: '#880E4F' }}
            >
              Before we begin...
            </p>
            <p 
              className="text-lg"
              style={{ color: '#C2185B' }}
            >
              What's my favorite number?
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setError('');
                }}
                placeholder="Enter the number..."
                className="w-full px-6 py-4 rounded-full text-center text-xl font-display border-2 focus:outline-none transition-all"
                style={{ 
                  borderColor: error ? '#D50000' : '#FF6B9D',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#880E4F'
                }}
              />
              <Heart 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: '#FF6B9D', opacity: 0.5 }}
                fill="#FF6B9D"
              />
            </div>

            {error && (
              <p 
                className="text-sm animate-fade-in-up"
                style={{ color: '#D50000' }}
              >
                {error}
              </p>
            )}

            {showHint && (
              <p 
                className="text-xs animate-fade-in-up"
                style={{ color: '#888' }}
              >
                Hint: It appears in April, May, July... and your birthday month too
              </p>
            )}

            <button
              type="submit"
              className="btn-valentine w-full text-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" fill="white" />
                Unlock Our Story
                <Heart className="w-5 h-5" fill="white" />
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(255, 107, 157, 0.3)' }}>
            <p className="text-xs" style={{ color: '#888' }}>
              For Nandhini's eyes only
            </p>
          </div>
        </div>
      </div>

      {/* Shake Animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
