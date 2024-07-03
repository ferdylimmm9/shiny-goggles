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
        id="mask0_3_719"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_719)">
        <path
          fill="currentColor"
          d="M12 10.438l-4.073 4.073a.724.724 0 01-.522.213.707.707 0 01-.532-.213.717.717 0 01-.217-.526c0-.207.072-.382.217-.527l4.494-4.495A.829.829 0 0112 8.708a.829.829 0 01.633.256l4.494 4.494c.138.138.21.312.212.522a.707.707 0 01-.212.531.717.717 0 01-.527.218.717.717 0 01-.527-.217L12 10.438z"
        />
      </g>
    </svg>
  );
}

export default Icon;
