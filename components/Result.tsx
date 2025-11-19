import React, { useRef, useState } from 'react';
import { SleepType } from '../types';
import { RESULTS_DATA } from '../constants';
import { ShareIcon } from './icons/ShareIcon';
import { RetryIcon } from './icons/RetryIcon';
import { triggerHapticFeedback } from '../utils/haptics';
import { HomeIcon } from './icons/HomeIcon';
import { StarIcon } from './icons/StarIcon';
import { WingIcon } from './icons/WingIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { InstagramIcon } from './icons/InstagramIcon';

// Declare html2canvas on window object
declare global {
  interface Window {
    html2canvas: any;
  }
}

interface ResultProps {
  resultType: SleepType;
  userName?: string;
  onRetry: () => void;
  onGoHome: () => void;
}

const Result: React.FC<ResultProps> = ({ resultType, userName, onRetry, onGoHome }) => {
  const result = RESULTS_DATA[resultType];
  const captureRef = useRef<HTMLDivElement>(null);
  const luckyItem = result.products[0]; // Use the first product as the lucky item
  
  // Image loading states for progressive reveal
  const [isCharLoaded, setIsCharLoaded] = useState(false);
  const [isItemLoaded, setIsItemLoaded] = useState(false);

  // Display Name Logic
  const displayName = userName && userName.trim() !== '' ? userName : '당신';

  const handleTextShare = async () => {
    triggerHapticFeedback();
    const title = "Sway'n 수면 유형 테스트 결과";
    const text = `저의 수면 유형은 '${result.title}'이에요! 🌙\n당신에게 꼭 맞는 나이트 리추얼을 Sway'n에서 찾아보세요.\n\n@sway.n_official #Swayn #나이트리추얼 #졸업전시회`;
    const fallbackText = `나의 수면 유형은 '${result.title}'! Sway'n이 추천하는 '${result.line}'으로 꿀잠 예약 🌙 2025 홍익대학교 디자인컨버전스학부 졸업전시회에서 만나요! @sway.n_official #Swayn #졸업전시회`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fallbackText);
            alert('초대장 링크가 복사되었습니다. 친구에게 공유해보세요!');
        } catch (err) {
            alert('클립보드 복사에 실패했습니다.');
        }
    };

    try {
      const response = await fetch(result.characterImage);
      const blob = await response.blob();
      const file = new File([blob], 'swayn-character.png', { type: blob.type });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ title, text, files: [file] });
      } else {
        await copyToClipboard();
      }
    } catch (e) {
      console.error("Share failed:", e);
      await copyToClipboard();
    }
  };

  const handleImageShare = async () => {
    triggerHapticFeedback();
    if (!captureRef.current || !window.html2canvas) {
        alert('이미지 생성 중 오류가 발생했습니다.');
        return;
    }

    try {
        // Capture the element
        const canvas = await window.html2canvas(captureRef.current, {
            scale: 3, // High resolution
            useCORS: true,
            allowTaint: true,
            backgroundColor: null, // Transparent background
            logging: false,
            // Critical Fix: Reset styles in the cloned document to prevent layout breakage
            onclone: (documentClone: Document) => {
                const target = documentClone.querySelector('[data-capture-target]') as HTMLElement;
                if (target) {
                    // 1. Force full opacity on everything and remove animations
                    const animatedElements = target.querySelectorAll('*');
                    animatedElements.forEach((el) => {
                        const element = el as HTMLElement;
                        element.style.animation = 'none';
                        element.style.transition = 'none';
                        element.style.opacity = '1';
                        // DO NOT reset transform to 'none' here. 
                        // Tailwind relies on transforms (translate, scale, rotate) for layout positioning (e.g., centering, flipping icons).
                    });
                    
                    // 2. Fix specific character image if needed
                    // We just want to stop the floating animation (handled above by animation='none')
                    // but keep the scale-105 and positioning.
                    const charImg = target.querySelector('img[alt="' + result.title + '"]') as HTMLElement;
                    if (charImg) {
                         // Optional: Ensure it has the correct static visual state
                         charImg.style.marginTop = '0px'; 
                    }
                    
                    // 3. Fix container width to prevent wrapping text differently than screen
                    target.style.width = '360px';
                    target.style.maxWidth = '360px';
                    target.style.margin = '0';
                    target.style.borderRadius = '2.5rem';
                }
            }
        });

        canvas.toBlob(async (blob: Blob | null) => {
            if (!blob) return;
            const file = new File([blob], 'swayn-result.png', { type: 'image/png' });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({ 
                    files: [file], 
                    title: "Sway'n 수면 유형 결과" 
                });
            } else {
                // Fallback: Download image
                const link = document.createElement('a');
                link.download = 'swayn-result.png';
                link.href = canvas.toDataURL();
                link.click();
            }
        }, 'image/png');

    } catch (e) {
        console.error("Capture failed", e);
        alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleRetryClick = () => {
    triggerHapticFeedback();
    onRetry();
  }
  
  const handleGoHomeClick = () => {
    triggerHapticFeedback();
    onGoHome();
  }

  return (
    <div className="relative min-h-screen lg:min-h-0 lg:rounded-b-xl text-gray-800 bg-[#E8F3FF]">
      
      {/* Decorative Header to fill empty space */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-center pointer-events-none z-0">
          <span className="font-vollkorn font-bold text-[#8BAADD] opacity-70 text-xs tracking-[0.25em] uppercase mt-1">Your Ritual</span>
      </div>

      {/* Reduced top padding from pt-20 to pt-16 to reduce emptiness */}
      <main className="relative z-10 p-4 sm:p-6 pt-16 pb-24 lg:pb-8 flex flex-col items-center">
        
        {/* Capture Area Wrapper */}
        <div 
            ref={captureRef} 
            data-capture-target
            className="w-full max-w-[360px] bg-white p-3 rounded-[2.5rem] shadow-lg relative"
        >
            {/* Inner Blue Card with Dotted Border - Darkened gradient start for better white text contrast */}
            {/* Increased pt from 6 to 11 to give more breathing room at the top */}
            <div className="bg-gradient-to-b from-[#5B8DEF] to-[#Dbeafe] rounded-[2rem] pt-11 pb-8 px-4 relative overflow-hidden border-[4px] border-dashed border-white/60">
                
                {/* Section 1: Header & Title */}
                <div className="opacity-0 animate-fade-in">
                    {/* Top Text - Modified to include Name */}
                    <div className="text-center mb-4">
                        <p className="text-brand-blue font-extrabold text-[13px] drop-shadow-sm bg-white/90 inline-block px-3 py-1 rounded-full backdrop-blur-sm opacity-100">
                            Sway'n이 분석한 <span className="text-brand-blue underline underline-offset-2">{displayName}</span>님의 결과
                        </p>
                    </div>

                    {/* Title with Wings */}
                    <div className="flex items-center justify-center gap-0.5 mb-1 relative z-10 -ml-1">
                        <WingIcon className="w-8 h-8 text-white/95 transform -scale-x-100 drop-shadow-md mb-1" />
                        <h1 className="text-[1.75rem] leading-none font-black text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)] tracking-tighter whitespace-nowrap font-pretendard">
                            {result.title}
                        </h1>
                        <WingIcon className="w-8 h-8 text-white/95 drop-shadow-md mb-1" />
                    </div>
                    <p className="text-center text-white/90 font-bold text-lg mb-5 drop-shadow-md">입니다</p>
                </div>

                {/* Section 2: Character & Info Grid - Split Layout */}
                <div className="flex flex-row items-end justify-between relative z-10 mb-1 px-1 opacity-0 animate-fade-in-delay">
                    
                    {/* Character Image (Left) */}
                    <div className={`w-[45%] -ml-1 relative ${!isCharLoaded ? 'min-h-[160px]' : ''}`}>
                        {/* Loading Spinner for Character */}
                        {!isCharLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}

                        {/* Enchanting Sparkles */}
                        <div className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${isCharLoaded ? 'opacity-100' : 'opacity-0'}`}>
                             <SparklesIcon className="absolute -top-4 left-4 w-6 h-6 text-yellow-200/90 animate-sparkle drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ animationDuration: '2.5s', animationDelay: '0.2s' }} />
                             <SparklesIcon className="absolute top-1/3 -right-4 w-4 h-4 text-blue-100/90 animate-sparkle drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]" style={{ animationDuration: '3s', animationDelay: '1.2s' }} />
                             <SparklesIcon className="absolute bottom-6 -left-2 w-3 h-3 text-white/90 animate-sparkle" style={{ animationDuration: '2s', animationDelay: '0.7s' }} />
                             {/* Subtle glow behind character */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-white/0 via-white/20 to-white/0 blur-xl rounded-full -z-10"></div>
                        </div>
                        
                        {/* White Oval Shadow/Base */}
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-6 bg-white/80 rounded-[50%] blur-md -z-10 transition-opacity duration-700 ${isCharLoaded ? 'opacity-100' : 'opacity-0'}`}></div>

                        <img 
                            src={result.characterImage} 
                            alt={result.title} 
                            onLoad={() => setIsCharLoaded(true)}
                            className={`w-full object-contain drop-shadow-lg transform scale-105 origin-bottom-left animate-gentle-float transition-opacity duration-700 ${isCharLoaded ? 'opacity-100' : 'opacity-0'}`}
                            decoding="async"
                            crossOrigin="anonymous"
                        />
                    </div>

                    {/* Bubbles (Right) */}
                    {/* Adjusted padding-bottom from pb-1 to pb-[7px] (~3px increase) for better vertical centering */}
                    <div className="w-[51%] flex flex-col gap-2 pb-[7px] items-end">
                        
                        {/* New Sensitivity Design */}
                        <div className="flex flex-col items-start w-full max-w-[180px]">
                             {/* Decoration to fill empty space above sensitivity */}
                             <div className="flex items-center gap-1 mb-1.5 ml-3">
                                <div className="w-1 h-1 rounded-full bg-white/90"></div>
                                <span className="text-[10px] font-bold text-white/90 tracking-wider uppercase">CONDITION</span>
                             </div>

                             {/* Tab Label */}
                             <div className="bg-white rounded-t-xl rounded-br-xl px-3 py-1.5 relative z-10 ml-2 shadow-sm">
                                <p className="text-[12px] text-brand-blue font-extrabold leading-none tracking-tight">
                                    나의 민감지수는?
                                </p>
                             </div>
                             
                             {/* Stars Container (Pill) */}
                             <div className="w-full bg-[#9ecaff] rounded-full p-1.5 flex justify-around items-center relative z-0 -mt-1 border-[3px] border-white shadow-sm">
                                 {[1, 2, 3, 4, 5].map((star) => (
                                     <StarIcon 
                                        key={star} 
                                        className="w-5 h-5 filter drop-shadow-sm" 
                                        filled={star <= result.sensitivity}
                                     />
                                 ))}
                             </div>
                        </div>

                        {/* Description Bubble */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl py-2.5 px-3 shadow-sm border border-white/60 relative w-full mt-1">
                            <p className="text-slate-800 text-xs leading-[1.4] font-bold break-keep tracking-tight">
                                {result.description}
                            </p>
                             {/* Tail Left */}
                             <div className="absolute top-4 -left-1.5 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[7px] border-r-white/95"></div>
                        </div>
                    </div>
                </div>
                
                {/* Divider Line */}
                <div className="w-full px-2 my-6 opacity-0 animate-fade-in-delay-2">
                    <div className="w-full border-t border-dashed border-white/50"></div>
                </div>

                {/* Section 3: Lucky Item */}
                <div className="relative z-10 flex flex-col items-center mt-0 opacity-0 animate-fade-in-delay-2">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-white text-base drop-shadow-sm">✦</span>
                        <h3 className="text-white font-black text-[18px] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.25)] tracking-wide">행운의 아이템</h3>
                        <span className="text-white text-base drop-shadow-sm">✦</span>
                    </div>

                    {/* Item Card */}
                    <div className="relative flex flex-col items-center">
                        
                        {/* Ruffled/Dashed Circle Background */}
                        <div className="relative mb-2">
                             <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-white/60 scale-105"></div>
                             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md relative z-10 border-[3.5px] border-white/50">
                                <div className="w-20 h-20 bg-[#F0F7FF] rounded-full flex items-center justify-center overflow-hidden relative">
                                    {/* Loading Spinner for Item */}
                                    {!isItemLoaded && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-6 h-6 border-[3px] border-blue-100 border-t-brand-blue rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                    <img 
                                        src={luckyItem.image} 
                                        alt={luckyItem.name} 
                                        onLoad={() => setIsItemLoaded(true)}
                                        className={`w-16 h-16 object-contain mix-blend-multiply drop-shadow-md transition-opacity duration-500 ${isItemLoaded ? 'opacity-100' : 'opacity-0'}`}
                                        crossOrigin="anonymous"
                                    />
                                </div>
                             </div>
                        </div>
                        
                        {/* Ribbon Name Badge */}
                        <div className="bg-gradient-to-r from-blue-50 to-white border border-white px-5 py-1 rounded-full shadow-sm mb-3">
                             <span className="text-brand-blue text-[13px] font-black tracking-wide block leading-none pt-0.5 opacity-100">
                                {luckyItem.name}
                            </span>
                        </div>

                        {/* Item Description */}
                        <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 border border-white/60 text-center max-w-[240px] shadow-sm relative">
                             <p className="text-slate-800 text-xs font-bold leading-snug break-keep tracking-tight">
                                {luckyItem.description}
                             </p>
                        </div>
                    </div>
                </div>

                {/* Brand Signature Footer - Enhanced for better closure */}
                <div className="mt-8 mb-2 flex flex-col items-center justify-center opacity-0 animate-fade-in-delay-2 gap-1">
                     <div className="w-px h-3 bg-white/40 mb-1"></div>
                     <span className="font-vollkorn text-white/70 text-[10px] font-medium tracking-widest uppercase">Night Ritual</span>
                     <span className="font-vollkorn text-white/90 text-sm font-bold tracking-[0.3em] uppercase drop-shadow-sm">Sway'n</span>
                </div>

            </div>
        </div>
              
        {/* Circular Share Buttons */}
        <div className="w-full flex items-center justify-center gap-8 mt-6 opacity-0 animate-fade-in-delay-3">
            <button 
                onClick={handleImageShare}
                className="group flex flex-col items-center gap-2"
                aria-label="이미지로 저장하기"
            >
                <div className="w-14 h-14 rounded-full bg-white border border-[#C8E1FF] shadow-[0_4px_12px_rgba(0,98,255,0.15)] flex items-center justify-center transition-all duration-300 group-active:scale-95 group-hover:shadow-[0_6px_16px_rgba(0,98,255,0.25)] group-hover:-translate-y-1">
                    <DownloadIcon className="w-7 h-7 text-brand-blue opacity-90" />
                </div>
                <span className="text-xs font-bold text-[#4A7AC9] group-hover:text-brand-blue transition-colors">이미지 저장</span>
            </button>

            <button 
                onClick={handleTextShare}
                className="group flex flex-col items-center gap-2"
                aria-label="링크로 공유하기"
            >
                <div className="w-14 h-14 rounded-full bg-white border border-[#C8E1FF] shadow-[0_4px_12px_rgba(0,98,255,0.15)] flex items-center justify-center transition-all duration-300 group-active:scale-95 group-hover:shadow-[0_6px_16px_rgba(0,98,255,0.25)] group-hover:-translate-y-1">
                     <ShareIcon className="w-6 h-6 text-brand-blue opacity-90" />
                </div>
                <span className="text-xs font-bold text-[#4A7AC9] group-hover:text-brand-blue transition-colors">링크 공유</span>
            </button>
        </div>

        {/* Event Notice */}
        <div className="mt-5 opacity-0 animate-fade-in-delay-3 px-4 w-full max-w-sm">
            <div className="bg-white/60 backdrop-blur-md border border-brand-blue/20 rounded-xl p-3 text-center shadow-sm flex flex-col items-center gap-1">
                <p className="text-xs text-gray-600 leading-relaxed break-keep">
                   <span className="font-bold text-brand-blue">@sway.n_official</span> 계정을 태그 후<br/> 
                   결과를 공유하면 추첨을 통해 선물을 드려요! 🎁
                </p>
            </div>
        </div>
      </main>

      <footer className="relative z-10 p-4 grid grid-cols-2 gap-3 sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 lg:static lg:bg-transparent lg:border-t-0 lg:rounded-b-xl">
        <button
          onClick={handleRetryClick}
          className="w-full flex items-center justify-center bg-white text-gray-600 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
        >
          <RetryIcon className="w-5 h-5 mr-2" />
          다시하기
        </button>
        <button
          onClick={handleGoHomeClick}
          className="w-full flex items-center justify-center bg-brand-blue text-white font-bold py-3.5 rounded-xl hover:bg-brand-blue-light transition-colors shadow-md shadow-blue-500/30"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          초대장 보기
        </button>
      </footer>
    </div>
  );
};

export default Result;