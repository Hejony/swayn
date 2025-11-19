import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { CompassIcon } from './icons/CompassIcon';
import { LocationIcon } from './icons/LocationIcon';
import { triggerHapticFeedback } from '../utils/haptics';

interface BottomNavProps {
  currentPage: 'invitation' | 'quiz-intro' | 'location';
  onGoHome: () => void;
  onGoToQuizIntro: () => void;
  onGoToLocation: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onGoHome, onGoToQuizIntro, onGoToLocation }) => {
  
  const handleNavClick = (action: () => void) => {
    triggerHapticFeedback();
    action();
  };
  
  const getButtonClass = (page: 'invitation' | 'quiz-intro' | 'location') => {
      const isActive = currentPage === page;
      // A bit of a hack for quiz-intro also highlighting explore
      const isExploreActive = isActive || (page === 'quiz-intro' && currentPage.startsWith('quiz'))

      return `flex flex-col items-center justify-center w-1/3 transition-colors ${
          isExploreActive ? 'text-brand-blue font-semibold' : 'text-gray-500 hover:text-brand-blue'
      }`;
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-20 w-full">
        <button 
          className={getButtonClass('invitation')} 
          onClick={() => handleNavClick(onGoHome)}
          aria-label="메인 초대장 페이지로 이동"
        >
          <HomeIcon className="w-7 h-7 mb-1" aria-hidden="true" />
          <span className="text-xs">Main</span>
        </button>
        <button
          className={getButtonClass('quiz-intro')}
          onClick={() => handleNavClick(onGoToQuizIntro)}
          aria-label="수면 유형 테스트 페이지로 이동"
        >
          <CompassIcon className="w-7 h-7 mb-1" aria-hidden="true" />
          <span className="text-xs">Explore</span>
        </button>
        <button 
          className={getButtonClass('location')}
          onClick={() => handleNavClick(onGoToLocation)}
          aria-label="전시장 위치 안내 페이지로 이동"
          >
          <LocationIcon className="w-7 h-7 mb-1" aria-hidden="true" />
          <span className="text-xs">Location</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;