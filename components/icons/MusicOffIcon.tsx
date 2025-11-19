
import React from 'react';

export const MusicOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M9 9v3.153A3.001 3.001 0 0 0 3 18a3 3 0 1 0 6-2.48V15.4" />
    <path d="M21 16a3 3 0 0 0-3-3v-3.81l1.86-.31" />
    <path d="M9 5l6.28-1.05" />
  </svg>
);
