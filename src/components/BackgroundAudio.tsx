import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface BackgroundAudioProps {
  audioSrc: string;
}

const BackgroundAudio = ({ audioSrc }: BackgroundAudioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay (may be blocked by browser)
    const attemptPlay = async () => {
      try {
        audio.volume = 0.5;
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay blocked, wait for user interaction
        setIsPlaying(false);
      }
    };

    attemptPlay();

    // Handle user interaction to start audio
    const handleInteraction = () => {
      if (!hasInteracted && audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(() => {
          // Still blocked
        });
      }
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />
      
      {/* Audio Control Button */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ 
            background: 'linear-gradient(135deg, #FF6B9D, #FF1744)',
            boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)'
          }}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          <Music className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ 
            background: isMuted 
              ? 'linear-gradient(135deg, #888, #666)' 
              : 'linear-gradient(135deg, #FF6B9D, #FF1744)',
            boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)'
          }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Initial play prompt */}
      {!isPlaying && !hasInteracted && (
        <div 
          className="fixed bottom-20 right-4 z-50 px-4 py-2 rounded-full text-sm animate-bounce"
          style={{ 
            background: 'linear-gradient(135deg, #FF6B9D, #FF1744)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)'
          }}
        >
          Click anywhere to play music
        </div>
      )}
    </>
  );
};

export default BackgroundAudio;
