
import React from 'react';

interface InvitationProps {
  onStart: () => void;
  playSfx: () => void;
}

const Invitation: React.FC<InvitationProps> = () => {
  // 이미지 클릭(링크) 기능 완전히 제거됨.
  // 하단 BottomNav를 통해서만 이동 가능.

  return (
    <div className="min-h-full bg-white flex flex-col pb-24 animate-fade-in">
      {/* Main Invitation Image */}
      <div className="relative w-full">
        <img 
          src="https://lh3.googleusercontent.com/d/1D0BetbEelo9es5ygS4VFQuBvqgNnPn2U" 
          alt="Sway'n 졸업 전시회 초대장 메인" 
          className="w-full h-auto object-cover select-none pointer-events-none block"
          width="1080"
          height="1350"
          fetchPriority="high"
        />
      </div>

      {/* Secondary Image Layer */}
      <div className="relative w-full">
        <img 
          src="https://lh3.googleusercontent.com/d/1ZTT9iew9hse85_cg2UogSqgFBJPYPDwX" 
          alt="Sway'n 전시 소개 이미지" 
          className="w-full h-auto object-cover select-none pointer-events-none block"
          loading="lazy"
        />
      </div>
      
      {/* Divider */}
      <div className="w-full px-8 py-4">
        <div className="h-px bg-gray-100 w-full"></div>
      </div>

      
      {/* About Sway'n 섹션 - 기존 텍스트(1년간...)는 제거하고 브랜드 소개만 유지 */}
      <div className="mx-5 mb-2 px-6 py-8 bg-[#F0F7FF] rounded-2xl flex flex-col items-center text-center shadow-sm border border-blue-100">
        <h2 className="text-xl font-bold text-brand-blue mb-5 font-pretendard">About Sway'n</h2>
        
        <p className="text-gray-700 text-[13px] leading-6 break-keep font-medium mb-5">
            Sway'n은 'Feel, swear, sway'라는 슬로건 아래 삶의 균형과 내면의 회복을 돕는 나이트 리추얼 브랜드입니다.
        </p>
        
        <p className="text-gray-500 text-[12px] leading-6 break-keep">
            'Explore' 탭에서 간단한 테스트를 통해 당신의 컨디션에 꼭 맞는 공간을 먼저 둘러보세요. 당신만을 위한 특별한 휴식이 기다리고 있을 거예요.
        </p>
      </div>

      {/* Footer Info */}
       <div className="text-center pb-8 pt-4">
          <p className="text-[11px] text-gray-400">
            2025 Hongik Univ. Design Convergence<br/>
            Graduation Exhibition<br/>
            <span className="mt-1 block font-medium text-gray-500">고예빈 & 이혜정</span>
          </p>
      </div>
    </div>
  );
};

export default Invitation;
