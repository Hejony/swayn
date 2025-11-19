
import React, { useState, useEffect, useRef } from 'react';
import { triggerHapticFeedback } from '../utils/haptics';
import { WingIcon } from './icons/WingIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface QuizIntroProps {
  setUserName: (name: string) => void;
  onBeginQuiz: () => void;
  playSfx: () => void;
}

type IntroStep = 'welcome' | 'intro1' | 'intro2' | 'intro3' | 'meet' | 'chat' | 'story';

const QuizIntro: React.FC<QuizIntroProps> = ({ setUserName, onBeginQuiz, playSfx }) => {
  const [step, setStep] = useState<IntroStep>('welcome');
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Assets
  const characterImg = "https://lh3.googleusercontent.com/d/19r-pZhwGGqQ-Cjs9dlE--lHwEykIKXvr";
  const logoImg = "https://lh3.googleusercontent.com/d/19WDxOCLpp25QhjNqILN8H1L0OdrGHSaK";
  const bgImg = "https://lh3.googleusercontent.com/d/1JlpSjsJTChiaBn03F_ugYvr-2fDmOcHz";

  useEffect(() => {
    if (step === 'chat' && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 600);
    }
  }, [step]);

  const handleNextStep = (nextStep: IntroStep) => {
    if (isAnimating) return;
    playSfx();
    triggerHapticFeedback();
    setIsAnimating(true);
    
    setStep(nextStep);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleSkip = () => {
    playSfx();
    triggerHapticFeedback();
    setUserName(''); // Clear name if skipped
    onBeginQuiz();
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    playSfx();
    triggerHapticFeedback();
    setUserName(name);
    handleNextStep('story');
  };

  const handleCharClick = () => {
    if (step === 'meet') {
        handleNextStep('chat');
    }
  };

  return (
    <div className="min-h-full flex flex-col relative overflow-hidden bg-[#A3CAFF] font-pretendard select-none">
        {/* Background Layer (Common) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#A3CAFF] via-[#9EBEFF] to-[#8EB4FF]"></div>
            
            {/* Texture Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                style={{ backgroundImage: `url(${bgImg})`, opacity: 1 }}
            ></div>

            {/* Pattern */}
            <div 
                className="absolute inset-0 opacity-15"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                }}
            ></div>

            {/* Floating Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[80px] animate-float-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-300/20 rounded-full blur-[100px] animate-gentle-float" style={{ animationDelay: '2s' }}></div>
            
            {/* Sparkles */}
            <div className="absolute top-[15%] left-[12%] w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_4px_white]"></div>
            <div className="absolute top-[25%] right-[18%] w-1.5 h-1.5 bg-white rounded-full animate-sparkle shadow-[0_0_6px_white]" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-[35%] left-[22%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* ================= STEP 1: WELCOME SCREEN ================= */}
        {step === 'welcome' && (
            /* Increased bottom padding from pb-36 to pb-48 to ensure button clears bottom nav on all mobile sizes */
            <div className="relative z-10 flex flex-col items-center justify-between min-h-full py-10 pb-48 px-6 animate-fade-in">
                <div className="h-2"></div>
                <div className="flex flex-col items-center w-full max-w-md">
                    <div className="text-center mb-6 animate-fade-in-delay">
                        <h1 className="text-[3.25rem] leading-none font-bold text-white drop-shadow-lg font-vollkorn tracking-tight mb-3">
                            Welcome<br />To Sway'n
                        </h1>
                        <div className="inline-block bg-white/20 backdrop-blur-md border border-white/40 rounded-full px-5 py-1.5 shadow-sm">
                            <span className="text-white font-semibold text-sm tracking-wider">Find Your Perfect Rest</span>
                        </div>
                    </div>
                    <div className="relative w-full aspect-[4/5] max-h-[340px] flex items-center justify-center mb-8 mt-2">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#66A1FF]/60 to-[#0062FF]/10 rounded-full blur-3xl transform scale-90 opacity-80"></div>
                        <img 
                            src={logoImg} 
                            alt="Silhouette Character" 
                            className="h-full w-auto object-contain relative z-10 brightness-0 invert opacity-95 drop-shadow-[0_0_15px_rgba(102,161,255,0.5)] animate-gentle-float mask-image-gradient-to-b"
                        />
                    </div>
                    <div className="w-full animate-fade-in-delay-2 mb-4">
                        <button 
                            onClick={() => handleNextStep('intro1')}
                            className="w-full bg-[#0062FF] hover:bg-[#0051CC] active:bg-[#0040A1] text-white font-bold text-lg py-4 rounded-2xl shadow-[0_8px_20px_rgba(0,98,255,0.35)] transition-all active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-center gap-2 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            <span className="relative z-10">꿈 속으로 들어가기</span>
                        </button>
                        <p className="text-white/80 text-xs text-center mt-4 font-medium leading-relaxed">
                            테스트를 통해 Sway'n이 제안하는<br/>
                            맞춤형 나이트 리추얼을 만나보세요.
                        </p>
                    </div>
                </div>
                <div className="h-12"></div>
            </div>
        )}


        {/* ================= STEPS: INTERACTION FLOW ================= */}
        {step !== 'welcome' && (
            <div className="relative z-10 flex-grow flex flex-col w-full h-full animate-fade-in pb-20 lg:pb-24">
                
                {/* SKIP Button */}
                <button 
                    onClick={handleSkip}
                    className="absolute top-6 right-6 z-50 text-white/90 font-bold text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 animate-fade-in active:scale-95"
                >
                    SKIP <ChevronRightIcon className="w-3 h-3" />
                </button>

                {/* CENTER CONTENT AREA */}
                <div className="flex-grow flex flex-col items-center justify-center pb-24">
                    
                    {/* 1. Header Text Container (Meet/Story Steps) */}
                    {/* Changed layout logic for Story step: decreased mt (to 4) to move text up, and increased mb (to 12) to create gap between text and character to prevent overlap */}
                    <div className={`h-8 flex items-center justify-center transition-all duration-500 
                        ${step === 'story' ? 'mt-4 mb-12' : 
                          ['intro1', 'intro2', 'intro3', 'meet'].includes(step) ? 'mt-28 mb-4' : 'mb-4'}
                    `}>
                        {step === 'meet' && (
                            <div className="flex items-center gap-2 animate-fade-in">
                                <WingIcon className="w-5 h-5 text-white transform -scale-x-100 drop-shadow-md" />
                                <span className="text-white font-bold text-lg drop-shadow-md tracking-tight whitespace-nowrap">
                                    슈슈에게 말을 걸어보자
                                </span>
                                <WingIcon className="w-5 h-5 text-white drop-shadow-md" />
                            </div>
                        )}
                        {step === 'story' && (
                            <div className="flex items-center gap-2 animate-fade-in">
                                <WingIcon className="w-5 h-5 text-white transform -scale-x-100 drop-shadow-md" />
                                <span className="text-white font-bold text-lg drop-shadow-md tracking-tight whitespace-nowrap">
                                    Sway'n의 세계로 초대할게
                                </span>
                                <WingIcon className="w-5 h-5 text-white drop-shadow-md" />
                            </div>
                        )}
                    </div>

                    {/* 2. CLICK Tooltip Container (Meet Step) */}
                    <div className="h-10 mb-1 flex items-end justify-center">
                        {step === 'meet' && (
                            <div className="animate-bounce z-30 cursor-pointer" onClick={() => handleNextStep('chat')}>
                                <div className="bg-white/90 backdrop-blur-sm text-brand-blue font-black text-xs px-4 py-2 rounded-full shadow-lg border-2 border-white relative whitespace-nowrap">
                                CLICK!
                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 border-b-2 border-r-2 border-white transform rotate-45"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. Character Image */}
                    {/* Wrapper div handles layout position and scale transitions */}
                    {/* Updated 'story' step to use -translate-y-16 to move it up further */}
                    <div 
                        className={`relative transition-all duration-1000 ease-in-out transform
                            ${(step === 'intro1' || step === 'intro2') ? 'opacity-0 scale-90 -translate-y-8' : ''}
                            ${step === 'intro3' ? 'opacity-100 scale-90 -translate-y-8' : ''}
                            ${step === 'meet' ? 'opacity-100 scale-90 -translate-y-8 cursor-pointer hover:scale-95' : ''} 
                            ${step === 'chat' ? 'scale-110 -translate-y-8' : ''}
                            ${step === 'story' ? 'scale-110 -translate-y-16' : ''}
                        `}
                        onClick={handleCharClick}
                        style={{ pointerEvents: (step === 'intro1' || step === 'intro2') ? 'none' : 'auto' }}
                    >
                        <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-90 -z-10"></div>
                        {/* Img handles the floating animation separately to avoid transform conflict */}
                        <img 
                            src={characterImg} 
                            alt="Shushu" 
                            className="w-[260px] md:w-[300px] h-auto drop-shadow-2xl animate-gentle-float"
                        />
                    </div>
                </div>

                {/* Step: Intro 1, 2, 3 Narrative Box */}
                {/* Increased bottom padding to pb-32 to clear bottom nav */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 pb-32 lg:pb-32 transition-transform duration-500 cubic-bezier(0.2, 0.8, 0.2, 1) z-30 ${(step === 'intro1' || step === 'intro2' || step === 'intro3') ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="max-w-md mx-auto relative cursor-pointer" 
                         onClick={() => {
                             if (step === 'intro1') handleNextStep('intro2');
                             else if (step === 'intro2') handleNextStep('intro3');
                             else if (step === 'intro3') handleNextStep('meet');
                         }}>
                        
                        {/* Speaker Badge for Intro 2 */}
                        {step === 'intro2' && (
                            <div className="absolute -top-3 left-6 z-20 animate-fade-in">
                                <div className="bg-[#6ba4ff] text-white font-bold text-xs px-4 py-1 rounded-full shadow-md border border-white/50">
                                    ???
                                </div>
                            </div>
                        )}

                        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 py-8 shadow-2xl border border-white/60 relative">
                            {step === 'intro1' && (
                                <p className="text-gray-800 font-medium text-base text-center leading-7 break-keep animate-fade-in">
                                    피곤한 몸을 이끌고 잠자리에 든 당신,<br/>
                                    눈을 떠보니 <span className="font-bold text-brand-blue">신비로운 저택</span>이 있다.
                                </p>
                            )}
                            {step === 'intro2' && (
                                <p className="text-gray-800 font-medium text-lg text-center leading-7 break-keep animate-fade-in">
                                    처음보는 손님이네, 안녕?
                                </p>
                            )}
                            {step === 'intro3' && (
                                <p className="text-gray-800 font-medium text-base text-center leading-7 break-keep animate-fade-in">
                                    목소리가 들리는 곳을 바라보니<br/>
                                    <span className="font-bold text-brand-blue">한 여자아이</span>가 서 있었다.
                                </p>
                            )}
                             <div className="w-full flex justify-center mt-4 animate-bounce opacity-50">
                                <ChevronRightIcon className="w-6 h-6 text-gray-500 rotate-90" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step: Chat Interface */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 pb-32 lg:pb-32 transition-transform duration-500 cubic-bezier(0.2, 0.8, 0.2, 1) z-30 ${step === 'chat' ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="max-w-md mx-auto relative">
                        <div className="absolute -top-3 left-6 z-20 animate-fade-in-delay">
                            <div className="bg-[#6ba4ff] text-white font-bold text-xs px-4 py-1 rounded-full shadow-md border border-white/50">
                                슈슈
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 pt-8 shadow-2xl border border-white/60 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col gap-5">
                                <p className="text-gray-800 font-bold text-lg text-center tracking-tight">
                                    안녕? 나는 꿈의 요정 슈슈야.<br/>
                                    네 이름이 뭐니?
                                </p>
                                <div className="relative w-full px-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                        placeholder="이름을 입력해줘"
                                        className="w-full bg-transparent border-b-2 border-[#A3CAFF] focus:border-brand-blue px-2 py-2 text-center text-xl text-brand-blue font-bold placeholder:text-gray-300 outline-none transition-colors"
                                        autoComplete="off"
                                    />
                                </div>
                                <button 
                                    onClick={handleSubmit}
                                    disabled={!name.trim()}
                                    className={`w-full py-3.5 rounded-xl font-bold text-base text-white transition-all duration-300 shadow-md ${name.trim() ? 'bg-brand-blue hover:bg-[#0051CC] active:scale-95' : 'bg-gray-300 cursor-not-allowed'}`}
                                >
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step: Story */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 pb-32 lg:pb-32 transition-transform duration-500 cubic-bezier(0.2, 0.8, 0.2, 1) z-30 ${step === 'story' ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="max-w-md mx-auto relative">
                        <div className="absolute -top-3 left-6 z-20">
                            <div className="bg-[#6ba4ff] text-white font-bold text-xs px-4 py-1 rounded-full shadow-md border border-white/50">
                                슈슈
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 pt-8 shadow-2xl border border-white/60 relative">
                            <div className="relative z-10 flex flex-col gap-5">
                                <p className="text-gray-800 font-medium text-base text-center leading-relaxed break-keep">
                                    <span className="font-bold text-brand-blue text-lg">{name}</span>, 반가워!<br/><br/>
                                    오늘 하루도 고생 많았어.<br/>
                                    지금부터 <span className="font-bold">네가 가장 편안하게 쉴 수 있는<br/>밤의 리추얼</span>을 찾아줄게.<br/><br/>
                                    준비됐니?
                                </p>
                                <button 
                                    onClick={onBeginQuiz}
                                    className="w-full py-3.5 rounded-xl font-bold text-base text-white bg-brand-blue hover:bg-[#0051CC] active:scale-95 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                                >
                                    테스트 시작하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default QuizIntro;
