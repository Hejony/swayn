
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { SleepType, QuestionOption } from '../types';
import { triggerHapticFeedback } from '../utils/haptics';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';

interface QuizProps {
  onQuizComplete: (result: SleepType) => void;
  onGoBack: () => void;
  playSfx: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onQuizComplete, onGoBack, playSfx }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionOption[]>([]);
  const [animationState, setAnimationState] = useState<'enter' | 'exit'>('enter');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (option: QuestionOption) => {
    if (isTransitioning) return;

    playSfx();
    triggerHapticFeedback();
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
    setIsTransitioning(true);
    setAnimationState('exit');
    
    setTimeout(() => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);

        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnimationState('enter');
            setIsTransitioning(false);
        } else {
            calculateResult(newAnswers);
        }
    }, 400); // Corresponds to animation duration
  };

  const handleBack = () => {
    if (isTransitioning) return;
    playSfx();
    triggerHapticFeedback();

    if (currentQuestionIndex > 0) {
        setAnimationState('exit'); 
        setCurrentQuestionIndex(prev => prev - 1);
        setAnswers(prev => prev.slice(0, -1));
        setAnimationState('enter');
    } else {
        onGoBack();
    }
  };

  const calculateResult = (finalAnswers: QuestionOption[]) => {
    const scores: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };

    for (const answer of finalAnswers) {
      for (const typeInfo of answer.types) {
        scores[typeInfo.type] += typeInfo.score;
      }
    }

    let maxScore = -1;
    let resultTypes: SleepType[] = [];

    for (const type in scores) {
      if (scores[type] > maxScore) {
        maxScore = scores[type];
        resultTypes = [type as SleepType];
      } else if (scores[type] === maxScore) {
        resultTypes.push(type as SleepType);
      }
    }
    
    if (resultTypes.length === 1) {
      onQuizComplete(resultTypes[0]);
    } else {
      const lastAnswer = finalAnswers[finalAnswers.length - 1];
      const lastPrimaryType = lastAnswer.types[0].type;
      if (resultTypes.includes(lastPrimaryType)) {
        onQuizComplete(lastPrimaryType);
      } else {
        onQuizComplete(resultTypes[0]);
      }
    }
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const imageAnimationClass = animationState === 'enter' ? 'animate-question-image-enter' : 'animate-question-image-exit';
  const contentAnimationClass = animationState === 'enter' ? 'animate-question-enter' : 'animate-question-exit';
  
  // Progress Calculation
  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentNumber = currentQuestionIndex + 1;
  const progressPercentage = (currentNumber / totalQuestions) * 100;

  return (
    <div className="relative h-screen lg:h-auto lg:min-h-[600px] flex flex-col overflow-hidden">
      {/* Dynamic Background Gradients & Blobs */}
      {QUIZ_QUESTIONS.map((question, index) => {
        const [startColor, endColor] = question.background;
        const isActive = index === currentQuestionIndex;
        
        return (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out overflow-hidden"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: 0
            }}
            aria-hidden="true"
          >
             {/* Base Gradient */}
             <div 
                className="absolute inset-0" 
                style={{ background: `linear-gradient(to bottom, ${startColor}, ${endColor})` }} 
             />
             
             {/* Animated Blobs - Enhanced with wandering animation */}
             {/* Large blob top-left */}
             <div 
                className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-wander"
                style={{ backgroundColor: endColor }}
             />
             
             {/* Large blob bottom-right */}
             <div 
                className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-wander-slow"
                style={{ backgroundColor: startColor, animationDelay: '-5s' }}
             />

             {/* Smaller accent blob */}
             <div 
                className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full mix-blend-overlay filter blur-[60px] opacity-30 animate-wander"
                style={{ backgroundColor: 'white', animationDelay: '-2s' }}
             />
          </div>
        );
      })}

      {/* Dot Pattern Overlay - reduced opacity for balance */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 2px, transparent 2px)',
            backgroundSize: '24px 24px'
        }}
      />
      
      {/* Header: Navigation & Progress */}
      {/* Adjusted margin-top and layout to place back button next to the global mute button */}
      <header className="relative z-20 flex items-center px-4 py-3 h-14 w-full max-w-xl mx-auto mt-2">
          {/* Spacer for Global Mute Button (which is absolute top-4 left-4) */}
          <div className="w-12 shrink-0" aria-hidden="true" />

          <button 
            onClick={handleBack}
            className="p-2 mr-2 text-gray-700 hover:text-brand-blue transition-colors rounded-full active:bg-black/5"
            aria-label="이전 질문으로 돌아가기"
          >
              <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 mr-4 h-1.5 bg-black/5 rounded-full overflow-hidden">
              <div 
                  className="h-full bg-brand-blue rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
              />
          </div>

          <div className="text-sm font-bold text-gray-500 font-pretendard w-10 text-right shrink-0">
              <span className="text-brand-blue">{currentNumber}</span>
              <span className="opacity-40">/</span>
              <span className="opacity-60">{totalQuestions}</span>
          </div>
      </header>
      
      {/* Main Content Area */}
      <main className="relative z-10 flex-grow flex flex-col w-full max-w-xl mx-auto overflow-y-auto scrollbar-hide">
        <div className={`w-full flex flex-col items-center px-6 pb-10 pt-2 ${contentAnimationClass}`}>
            
            {/* 1. Question Card Frame */}
            <div className="w-full max-w-md mx-auto mb-4 relative z-10">
                <div className="w-full bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-lg relative overflow-hidden group transition-all hover:bg-white/50">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <div className="flex flex-col items-center text-center relative z-10">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-brand-blue text-white font-pretendard font-bold text-xs sm:text-sm mb-4 shadow-md tracking-wide">
                             Question {currentNumber.toString().padStart(2, '0')}
                        </span>
                        
                        {currentQuestion.description && (
                            <p className="text-gray-600 text-sm font-medium mb-3 break-keep leading-relaxed opacity-90">
                                {currentQuestion.description}
                            </p>
                        )}
                        
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug break-keep drop-shadow-sm">
                            {currentQuestion.text}
                        </h2>
                    </div>
                </div>
            </div>

            {/* 2. Hero Image Area with Particles */}
            <div className="relative w-full flex justify-center items-center mb-8 h-56 sm:h-64 shrink-0">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-white/50 blur-[50px] rounded-full animate-blob-pulse ${animationState === 'enter' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}></div>
                
                <div className={`absolute inset-0 pointer-events-none ${animationState === 'enter' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                        <div className="absolute top-[10%] left-[15%] w-8 h-8 bg-white/80 rounded-full blur-[2px] animate-float-slow" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-brand-blue-light/60 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-[20%] right-[15%] w-5 h-5 bg-white/60 rounded-full animate-float-dynamic" style={{ animationDelay: '1.2s' }}></div>
                        <div className="absolute bottom-[30%] left-[20%] w-2 h-2 bg-brand-blue/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute top-[-5%] left-[60%] w-12 h-12 bg-white/30 rounded-full blur-[4px] animate-gentle-float" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                </div>

                <div className={`relative z-10 w-48 h-48 sm:w-60 sm:h-60 ${imageAnimationClass}`}>
                    <img 
                      src={currentQuestion.image} 
                      alt={`Question ${currentNumber} illustration`}
                      className="w-full h-full object-contain animate-float-breathe drop-shadow-xl"
                    />
                </div>
            </div>
              
            {/* 3. Options */}
            <div className="w-full grid grid-cols-1 gap-3 pb-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={`${currentQuestionIndex}-${index}`}
                    onClick={() => handleAnswer(option)}
                    disabled={isTransitioning}
                    className="w-full text-center py-4 px-5 bg-white/80 border border-white/80 rounded-xl shadow-sm text-gray-700 font-medium hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:shadow-md active:scale-[0.98] focus:outline-none transition-all duration-200 backdrop-blur-sm group relative overflow-hidden"
                  >
                    <span className="relative z-10 block">{option.text}</span>
                  </button>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
