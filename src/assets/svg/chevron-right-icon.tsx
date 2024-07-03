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
        id="mask0_3_711"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </mask>
      <g mask="url(#mask0_3_711)">
        <path
          fill="currentColor"
          d="M12.946 12L8.873 7.927a.725.725 0 01-.212-.522.707.707 0 01.212-.532.717.717 0 01.527-.217c.206 0 .382.072.527.217l4.494 4.494a.83.83 0 01.256.633.83.83 0 01-.256.633l-4.494 4.494a.724.724 0 01-.522.212.707.707 0 01-.532-.212.717.717 0 01-.217-.527c0-.206.072-.382.217-.527L12.946 12z"
        />
      </g>
    </svg>
  );
}

export default Icon;
