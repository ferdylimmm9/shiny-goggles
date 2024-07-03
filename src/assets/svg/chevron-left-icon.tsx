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
        id="mask0_3_724"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_724)">
        <path
          fill="currentColor"
          d="M10.454 12l4.073 4.073c.138.139.21.313.212.522a.706.706 0 01-.212.532.717.717 0 01-.527.217.717.717 0 01-.527-.217L8.98 12.633A.829.829 0 018.723 12a.829.829 0 01.256-.633l4.494-4.494a.725.725 0 01.522-.212.707.707 0 01.532.212c.145.145.217.32.217.527a.717.717 0 01-.217.527L10.454 12z"
        />
      </g>
    </svg>
  );
}

export default Icon;
