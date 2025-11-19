
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Invitation from './components/Invitation';
import QuizIntro from './components/QuizIntro';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Location from './components/Location';
import { SleepType } from './types';
import BottomNav from './components/BottomNav';
import { QUIZ_QUESTIONS, RESULTS_DATA } from './constants';
import { MusicIcon } from './components/icons/MusicIcon';
import { MusicOffIcon } from './components/icons/MusicOffIcon';

type Page = 'invitation' | 'quiz-intro' | 'quiz' | 'result' | 'location';
type AnimationState = 'entering' | 'exiting' | 'idle';

// 사용자가 검증한 "download" 경로 및 filename 파라미터가 포함된 포맷으로 전면 교체
// 일반적인 /audio/ 경로는 403 차단 가능성이 높음.
const BGM_PLAYLIST = [
    // 1. [검증됨] Relaxing Music Vol.1 (사용자가 직접 제공한 링크)
    "https://cdn.pixabay.com/download/audio/2024/09/22/audio_6a4d382fe6.mp3?filename=-243289.mp3",
    // 2. Grandma's Old Music Box (오르골 명곡 - 다운로드 경로 적용)
    "https://cdn.pixabay.com/download/audio/2022/03/09/audio_c8c91e332c.mp3?filename=grandmas-old-music-box-11193.mp3",
    // 3. Lullaby Music Box (자장가 스타일 - 다운로드 경로 적용)
    "https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff1bdd.mp3?filename=lullaby-music-box-14360.mp3",
    // 4. Music Box (Childhood) - 다운로드 경로 적용
    "https://cdn.pixabay.com/download/audio/2021/11/25/audio_9153679267.mp3?filename=music-box-117500.mp3"
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('invitation');
  const [resultType, setResultType] = useState<SleepType | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [animationState, setAnimationState] = useState<AnimationState>('entering');
  const [isMuted, setIsMuted] = useState(false);
  
  // BGM 상태 관리
  const [bgmIndex, setBgmIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const SFX_URL = "https://actions.google.com/sounds/v1/cartoon/pop.ogg";

  const nextPageRef = useRef<Page | null>(null);
  const bgmRef = useRef<HTMLAudioElement>(null);
  const sfxRef = useRef<HTMLAudioElement>(null);

  // Preload assets
  useEffect(() => {
    const imagesToPreload = [
      ...Object.values(RESULTS_DATA).map(result => result.characterImage),
      ...QUIZ_QUESTIONS.map(q => q.image),
      ...Object.values(RESULTS_DATA).flatMap(result => result.products.map(p => p.image)),
    ];

    imagesToPreload.forEach(src => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []); 

  // BGM Error Handling (Auto-switch to next track)
  const handleAudioError = () => {
      console.warn(`BGM Source ${bgmIndex + 1} failed. Trying next source...`);
      if (bgmIndex < BGM_PLAYLIST.length - 1) {
          setBgmIndex(prev => prev + 1);
      } else {
          console.error("All BGM sources failed.");
      }
  };

  // BGM 재생 시도 함수
  const tryPlayBgm = useCallback(() => {
      if (bgmRef.current && !isMuted && hasInteracted) {
          bgmRef.current.volume = 0.4;
          const playPromise = bgmRef.current.play();
          if (playPromise !== undefined) {
              playPromise.catch(e => {
                  console.log("Playback failed (browser policy or source error):", e);
              });
          }
      }
  }, [isMuted, hasInteracted]);

  // bgmIndex가 변경되면(오류로 인해 소스가 바뀌면) 다시 재생 시도
  useEffect(() => {
      if (hasInteracted) {
          // 소스가 바뀌었으므로 로드 후 재생
          if (bgmRef.current) {
              bgmRef.current.load();
              tryPlayBgm();
          }
      }
  }, [bgmIndex, tryPlayBgm, hasInteracted]);

  // Audio Control Logic - "User Interaction" Trigger
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // 첫 터치 시 즉시 재생
        if (bgmRef.current) {
             bgmRef.current.volume = 0.4;
             bgmRef.current.play().catch(e => {
                 console.log("Autoplay prevented on first click:", e);
             });
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  // Mute/Unmute Control
  useEffect(() => {
    const bgm = bgmRef.current;
    if (!bgm) return;

    if (isMuted) {
        bgm.pause();
    } else if (hasInteracted) {
        tryPlayBgm();
    }
  }, [isMuted, hasInteracted, tryPlayBgm]);


  const playSfx = useCallback(() => {
    if (sfxRef.current && !isMuted) {
      try {
        sfxRef.current.currentTime = 0;
        sfxRef.current.volume = 0.5;
        sfxRef.current.play().catch(() => {});
      } catch (e) {
        // Ignore
      }
    }
  }, [isMuted]);


  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    if (!hasInteracted) {
        setHasInteracted(true);
    }
    
    setIsMuted(prev => !prev);
  };

  const changePage = useCallback((page: Page) => {
    if (animationState !== 'idle' || currentPage === page) return;
    
    playSfx(); 
    nextPageRef.current = page;
    setAnimationState('exiting');
  }, [animationState, currentPage, playSfx]);

  useEffect(() => {
    let timeoutId: number;
    if (animationState === 'exiting') {
      timeoutId = window.setTimeout(() => {
        if (nextPageRef.current) {
          if (currentPage === 'result') {
            setResultType(null);
          }
          setCurrentPage(nextPageRef.current);
          nextPageRef.current = null;
          setAnimationState('entering');
          window.scrollTo(0, 0);
        }
      }, 500);
    } else if (animationState === 'entering') {
      timeoutId = window.setTimeout(() => {
        setAnimationState('idle');
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [animationState, currentPage]);

  // Navigation Handlers
  const handleGoToQuizIntro = useCallback(() => changePage('quiz-intro'), [changePage]);
  const handleBeginQuiz = useCallback(() => changePage('quiz'), [changePage]);
  const handleQuizComplete = useCallback((result: SleepType) => {
    setResultType(result);
    changePage('result');
  }, [changePage]);
  const handleRetryQuiz = useCallback(() => changePage('quiz'), [changePage]);
  const handleGoHome = useCallback(() => changePage('invitation'), [changePage]);
  const handleGoToLocation = useCallback(() => changePage('location'), [changePage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'invitation':
        return <Invitation onStart={handleGoToQuizIntro} playSfx={playSfx} />;
      case 'quiz-intro':
        return <QuizIntro setUserName={setUserName} onBeginQuiz={handleBeginQuiz} playSfx={playSfx} />;
      case 'quiz':
        return <Quiz onQuizComplete={handleQuizComplete} onGoBack={handleGoToQuizIntro} playSfx={playSfx} />;
      case 'location':
        return <Location />;
      case 'result':
        if (resultType) {
          return <Result resultType={resultType} userName={userName} onRetry={handleRetryQuiz} onGoHome={handleGoHome}/>;
        }
        return null;
      default:
        return <Invitation onStart={handleGoToQuizIntro} playSfx={playSfx} />;
    }
  };

  const getAnimationClass = () => {
    switch(animationState) {
        case 'entering': return 'animate-page-enter';
        case 'exiting': return 'animate-page-exit';
        default: return 'opacity-100';
    }
  }

  const showNav = ['invitation', 'quiz-intro', 'location'].includes(currentPage);
  
  return (
    <div className="min-h-screen w-full bg-[#F2F4F6] flex items-center justify-center font-pretendard">
      
      {/* Audio Elements - Robust Fallback System */}
      <audio 
        ref={bgmRef} 
        src={BGM_PLAYLIST[bgmIndex]} 
        loop 
        playsInline 
        preload="auto"
        crossOrigin="anonymous"
        onError={handleAudioError}
      />
      <audio ref={sfxRef} src={SFX_URL} preload="auto" crossOrigin="anonymous" />

      {/* Mobile Frame */}
      <div className="w-full max-w-[430px] h-[100dvh] lg:h-[850px] bg-white shadow-2xl lg:border-[8px] lg:border-gray-900 relative lg:rounded-[40px] overflow-hidden flex flex-col ring-1 ring-black/5">
        
        {/* Mute Button */}
        <button 
            onClick={toggleAudio}
            className="absolute top-4 left-4 z-50 p-2.5 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-white/50 hover:bg-white/80 transition-colors text-gray-600 active:scale-95"
            aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
        >
            {isMuted ? <MusicOffIcon className="w-5 h-5" /> : <MusicIcon className="w-5 h-5" />}
        </button>

        <main className="flex-1 overflow-y-auto scrollbar-hide relative bg-white">
          <div className={`${getAnimationClass()} min-h-full`}>
            {renderPage()}
          </div>
        </main>

        {showNav && (
            <div className="absolute bottom-0 left-0 right-0 z-50 w-full">
                <BottomNav 
                    currentPage={currentPage as 'invitation' | 'quiz-intro' | 'location'} 
                    onGoHome={handleGoHome} 
                    onGoToQuizIntro={handleGoToQuizIntro}
                    onGoToLocation={handleGoToLocation}
                />
            </div>
        )}
      </div>
    </div>
  );
};

export default App;
