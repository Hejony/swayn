
import React from 'react';
import { CalendarIcon } from './icons/CalendarIcon';
import { LocationIcon as MapPinIcon } from './icons/LocationIcon'; // Renaming to avoid conflict

const Location: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col p-6 md:p-8 pb-24 lg:pb-28 lg:min-h-0 lg:rounded-b-xl opacity-0 animate-fade-in">
        <div className="text-center mb-8">
            <h1 className="text-xl lg:text-2xl font-bold text-brand-blue leading-tight">
              2025 홍익대학교<br></br>
              디자인컨버전스학부 졸업전시회
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              2025 HIDC 5th Graduation Show
            </p>
        </div>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div className="border border-gray-200 rounded-lg p-6 space-y-8">
              <div>
                <div className="flex items-center mb-3">
                  <CalendarIcon className="w-6 h-6 text-brand-blue mr-3" />
                  <h3 className="font-bold text-xl text-gray-800">일시</h3>
                </div>
                <div className="pl-9 text-base text-gray-600 space-y-2">
                  <p className="font-semibold">2025.11.29(토) - 12.02(화)</p>
                  <div className="text-sm space-y-1">
                    <p>11.29 (토) <span className="font-sans font-medium">13:00 - 20:00</span></p>
                    <p>11.30 (일) - 12.02 (화) <span className="font-sans font-medium">10:00 - 18:00</span></p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-6 h-6 text-brand-blue mr-3" />
                  <h3 className="font-bold text-xl text-gray-800">장소</h3>
                </div>
                 <div className="pl-9 text-base text-gray-600 space-y-1">
                    <p className="font-semibold">더서울라이티움</p>
                    <p className="text-sm">제1, 3 전시관</p>
                    <p className="text-sm text-gray-500 mt-1">서울특별시 성동구 서울숲2길 32-14</p>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
                <div className="h-64 lg:h-80 rounded-lg overflow-hidden shadow-md border border-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.669522195037!2d127.03990387643566!3d37.54578217204481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca49dad93863d%3A0x34f3ba68dd8f9e4b!2z642U7ISc7Jqw7J207YSw7JuE!5e0!3m2!1sko!2skr!4v1719293415951!5m2!1sko!2skr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="전시장 위치 지도"
                    ></iframe>
                </div>
                <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=서울특별시 성동구 서울숲2길 32-14"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4"
                >
                    길찾기
                </a>
            </div>
        </div>
    </div>
  );
};

export default Location;
