
import React from 'react';

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement> & { filled?: boolean }> = ({ filled, ...props }) => {
  const uniqueId = React.useId();
  const gradientId = `star-gradient-${uniqueId}`;
  const shadowId = `star-shadow-${uniqueId}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <defs>
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="rgba(0,0,0,0.1)" />
        </filter>
        <linearGradient id={`${gradientId}-yellow`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFE585" />
          <stop offset="100%" stopColor="#FFC400" />
        </linearGradient>
        <linearGradient id={`${gradientId}-white`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E2E2" />
        </linearGradient>
      </defs>
      
      <path
        d="M12 2.5c.9 0 1.7.5 2.1 1.3l2.2 4.5 4.9.7c.9.1 1.6.8 1.7 1.7.2.9-.4 1.8-1.1 2.5l-3.6 3.5.9 4.9c.2.9-.2 1.8-1 2.4-.7.5-1.7.6-2.5.1L12 21.8l-4.4 2.3c-.8.4-1.8.4-2.5-.1-.8-.6-1.1-1.5-1-2.4l.9-4.9-3.6-3.5c-.7-.7-1.2-1.6-1.1-2.5.1-.9.8-1.6 1.7-1.7l4.9-.7 2.2-4.5c.4-.8 1.2-1.3 2.1-1.3z"
        fill={filled ? `url(#${gradientId}-yellow)` : `url(#${gradientId}-white)`}
        filter={`url(#${shadowId})`}
        stroke={filled ? "#EAB308" : "#D1D5DB"}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Highlight Reflection for glossy effect */}
      <path
        d="M12 4c.5 0 .9.3 1.1.7l1.8 3.8 4.2.6c.4 0 .6.5.3.8l-3 2.9.7 4.1c.1.4-.3.8-.7.6L12 15.5l-4.4 2c-.4.2-.8-.2-.7-.6l.7-4.1-3-2.9c-.3-.3-.1-.8.3-.8l4.2-.6 1.8-3.8c.2-.4.6-.7 1.1-.7z"
        fill="white"
        fillOpacity="0.3"
        transform="scale(0.7) translate(5, 5)"
      />
    </svg>
  );
};
