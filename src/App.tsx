import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import FloatingHearts from './components/FloatingHearts';
import BackgroundAudio from './components/BackgroundAudio';
import SparkleTrail from './components/SparkleTrail';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import LoginPage from './pages/LoginPage';
import DateVerifyPage from './pages/DateVerifyPage';
import Act0 from './pages/Act0';
import Act1 from './pages/Act1';
import Act2 from './pages/Act2';
import Act3 from './pages/Act3';
import Act4 from './pages/Act4';
import Act5 from './pages/Act5';
import Act6 from './pages/Act6';
import Act7 from './pages/Act7';
import Act8 from './pages/Act8';
import Act9 from './pages/Act9';
import Act10 from './pages/Act10';

// Navigation context
import { createContext, useContext } from 'react';

interface NavigationContextType {
  currentPage: string;
  navigate: (page: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentPage: 'login',
  navigate: () => { }
});

export const useNavigation = () => useContext(NavigationContext);


// Main App Content
function AppContent() {
  const [currentPage, setCurrentPage] = useState('login');
  const { isAuthenticated, passwordVerified, dateVerified } = useAuth();

  useEffect(() => {
    // Handle navigation based on auth state
    if (currentPage === 'login') {
      if (isAuthenticated) {
        setCurrentPage('act0');
      } else if (passwordVerified && !dateVerified) {
        setCurrentPage('dateverify');
      }
    }
  }, [isAuthenticated, passwordVerified, dateVerified, currentPage]);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={() => navigate('dateverify')} />;
      case 'dateverify':
        return <DateVerifyPage onNavigate={() => navigate('act0')} />;
      case 'act0':
        return <Act0 onNavigate={() => navigate('act1')} />;
      case 'act1':
        return <Act1 onNavigate={() => navigate('act2')} />;
      case 'act2':
        return <Act2 onNavigate={() => navigate('act3')} />;
      case 'act3':
        return <Act3 onNavigate={() => navigate('act4')} />;
      case 'act4':
        return <Act4 onNavigate={() => navigate('act5')} />;
      case 'act5':
        return <Act5 onNavigate={() => navigate('act6')} />;
      case 'act6':
        return <Act6 onNavigate={() => navigate('act7')} />;
      case 'act7':
        return <Act7 onNavigate={() => navigate('act8')} />;
      case 'act8':
        return <Act8 onNavigate={() => navigate('act9')} />;
      case 'act9':
        return <Act9 onNavigate={() => navigate('act10')} />;
      case 'act10':
        return <Act10 />;
      default:
        return <LoginPage onNavigate={() => navigate('dateverify')} />;
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      <div className="relative min-h-screen" style={{ perspective: '1200px' }}>
        <FloatingHearts count={30} />
        <BackgroundAudio audioSrc={`${import.meta.env.BASE_URL}audio/love-song.mp3`} />
        <SparkleTrail />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.92, rotateY: -5 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -100 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </NavigationContext.Provider>
  );
}

// Root App
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
