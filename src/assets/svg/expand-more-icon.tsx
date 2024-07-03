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
        id="mask0_3_714"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_714)">
        <path
          fill="currentColor"
          d="M12 14.662a.828.828 0 01-.633-.256L6.873 9.912a.725.725 0 01-.212-.523.707.707 0 01.212-.531.717.717 0 01.527-.218c.206 0 .382.073.527.218L12 12.93l4.073-4.073a.725.725 0 01.522-.213.707.707 0 01.532.213c.145.145.217.32.217.527a.717.717 0 01-.217.527l-4.494 4.494a.829.829 0 01-.633.255z"
        />
      </g>
    </svg>
  );
}

export default Icon;
