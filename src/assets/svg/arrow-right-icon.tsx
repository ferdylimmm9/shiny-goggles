import React from 'react';

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <mask
        id="mask0_64_2890"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_64_2890)">
        <path
          fill="currentColor"
          d="M10 9.414c0-.89 1.077-1.337 1.707-.707l2.586 2.586a1 1 0 010 1.414l-2.586 2.586c-.63.63-1.707.184-1.707-.707V9.414z"
        />
      </g>
    </svg>
  );
}

export default Icon;
